import { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Card, CardPanel } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Loader } from '@/components/ui/loader'
import { ChevronLeft, ChevronRight, Send } from 'lucide-react'
import { submitFeedback } from '@/server/submit-feedback'
import { TablerGiftIcon } from '@/components/icons/tabler-gift'

import { StepAbout } from './StepAbout'
import { StepLanding } from './StepLanding'
import { StepOnboarding } from './StepOnboarding'
import { StepAiChat } from './StepAiChat'
import { StepInterface } from './StepInterface'
import { StepDeploy } from './StepDeploy'
import { StepValue } from './StepValue'
import { StepOverall } from './StepOverall'
import { ThankYou } from './ThankYou'

const SECTION_KEYS = [
  'about',
  'landing',
  'onboarding',
  'aiChat',
  'interface',
  'deploy',
  'value',
  'overall',
] as const

const STEPS = [
  StepAbout,
  StepLanding,
  StepOnboarding,
  StepAiChat,
  StepInterface,
  StepDeploy,
  StepValue,
  StepOverall,
]

const SUPPORTED_LANGS = new Set(['en', 'ru', 'kk'])

type RewardStatus =
  | 'granted'
  | 'already_granted'
  | 'user_not_found'
  | 'invalid_email'
  | 'reward_error'

type RewardResult = {
  status: RewardStatus
  awardedCredits: number
}

// Required questions per step (non-text questions only — text fields are optional)
const REQUIRED_PER_STEP: string[][] = [
  ['email', 'q1', 'q2', 'q3', 'q4'], // About
  ['q5', 'q6', 'q7'], // Landing
  ['q9', 'q10'], // Onboarding
  ['q12', 'q13', 'q14', 'q15', 'q16', 'q17'], // AI Chat
  ['q19', 'q20', 'q21'], // Interface
  ['q24', 'q25'], // Deploy
  ['q27', 'q28', 'q29'], // Value
  ['q31', 'q32'], // Overall
]

function isAnswered(value: unknown): boolean {
  if (value === undefined || value === null) return false
  if (typeof value === 'string' && value.trim() === '') return false
  if (Array.isArray(value) && value.length === 0) return false
  return true
}

export function FeedbackForm() {
  const { t, i18n } = useTranslation()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, unknown>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const [entrySource, setEntrySource] = useState<string | undefined>(undefined)
  const [entryReturnTo, setEntryReturnTo] = useState<string | undefined>(undefined)
  const [submissionId, setSubmissionId] = useState<string | undefined>(undefined)
  const [returnTo, setReturnTo] = useState('https://app.strayl.dev/dashboard')
  const [reward, setReward] = useState<RewardResult>({
    status: 'reward_error',
    awardedCredits: 0,
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const source = params.get('source')
    const returnToFromQuery = params.get('returnTo')
    const emailFromQuery = params.get('email')?.trim()
    const langFromQuery = params.get('lang')?.trim().toLowerCase()
    setEntrySource(source ?? undefined)
    setEntryReturnTo(returnToFromQuery ?? undefined)
    if (langFromQuery && SUPPORTED_LANGS.has(langFromQuery)) {
      void i18n.changeLanguage(langFromQuery)
    }
    if (emailFromQuery) {
      setAnswers((prev) => ({
        ...prev,
        email: prev.email ?? emailFromQuery,
      }))
    }
  }, [i18n])

  const setAnswer = useCallback((key: string, value: unknown) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }, [])

  const totalSteps = STEPS.length
  const progressValue = ((currentStep + 1) / totalSteps) * 100

  const requiredFields = REQUIRED_PER_STEP[currentStep]
  const missingFields = requiredFields.filter((key) => !isAnswered(answers[key]))
  const isStepValid = missingFields.length === 0

  const handleNext = () => {
    if (!isStepValid) {
      setShowErrors(true)
      return
    }
    setShowErrors(false)
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    setShowErrors(false)
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async () => {
    if (!isStepValid) {
      setShowErrors(true)
      return
    }
    setSubmitting(true)
    try {
      const result = await submitFeedback({
        data: {
          answers,
          language: i18n.language,
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
          source: entrySource,
          returnTo: entryReturnTo,
        },
      })
      setReward(result.reward)
      setSubmissionId(result.submissionId)
      setReturnTo(result.returnTo)
      setSubmitted(true)
    } catch (err) {
      console.error('Failed to submit feedback:', err)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <ThankYou
        reward={reward}
        submissionId={submissionId}
        returnTo={returnTo}
      />
    )
  }

  const CurrentStepComponent = STEPS[currentStep]
  const sectionKey = SECTION_KEYS[currentStep]
  const isLastStep = currentStep === totalSteps - 1

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      {/* Header with progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{currentStep + 1}/{totalSteps}</Badge>
            <span className="text-sm text-muted-foreground">
              {t('progressLabel', { current: currentStep + 1, total: totalSteps })}
            </span>
          </div>
        </div>
        <Progress value={progressValue} />
      </div>

      <Alert variant="info">
        <TablerGiftIcon className="size-4" />
        <AlertTitle>{t('feedbackBonus.title')}</AlertTitle>
        <AlertDescription>{t('feedbackBonus.subtitle')}</AlertDescription>
      </Alert>

      {/* Section title */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          {t(`sections.${sectionKey}`)}
        </h2>
      </div>

      {/* Step content */}
      <Card>
        <CardPanel>
          <CurrentStepComponent answers={answers} setAnswer={setAnswer} />
        </CardPanel>
      </Card>

      {/* Validation message */}
      {showErrors && !isStepValid && (
        <p className="text-sm text-destructive">
          {t('required')} — {missingFields.map((f) => t(`${f}.label`)).join(', ')}
        </p>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="size-4" />
          {t('back')}
        </Button>

        {isLastStep ? (
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? (
              <Loader size={14} />
            ) : (
              <Send className="size-4" />
            )}
            {t('submit')}
          </Button>
        ) : (
          <Button onClick={handleNext}>
            {t('next')}
            <ChevronRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
