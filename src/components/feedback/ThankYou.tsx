import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type RewardStatus =
  | 'granted'
  | 'already_granted'
  | 'user_not_found'
  | 'invalid_email'
  | 'reward_error'

interface ThankYouProps {
  returnTo: string
  submissionId?: string
  reward: {
    status: RewardStatus
    awardedCredits: number
  }
}

function buildReturnHref(input: {
  returnTo: string
  submissionId?: string
  rewardStatus: RewardStatus
  rewardCredits: number
}) {
  let url: URL
  try {
    url = new URL(input.returnTo)
  } catch {
    url = new URL('https://app.strayl.dev/dashboard')
  }
  url.searchParams.set('feedbackRewardStatus', input.rewardStatus)
  url.searchParams.set('feedbackRewardCredits', String(input.rewardCredits))
  if (input.submissionId) {
    url.searchParams.set('feedbackSubmissionId', input.submissionId)
  }
  return url.toString()
}

export function ThankYou({ reward, submissionId, returnTo }: ThankYouProps) {
  const { t } = useTranslation()

  const rewardUi = useMemo(() => {
    if (reward.status === 'granted') {
      return {
        icon: CheckCircle2,
        variant: 'success' as const,
        title: t('thankYou.reward.granted.title'),
        message: t('thankYou.reward.granted.message'),
      }
    }
    if (reward.status === 'already_granted') {
      return {
        icon: Info,
        variant: 'info' as const,
        title: t('thankYou.reward.already_granted.title'),
        message: t('thankYou.reward.already_granted.message'),
      }
    }
    if (reward.status === 'user_not_found' || reward.status === 'invalid_email') {
      return {
        icon: AlertTriangle,
        variant: 'warning' as const,
        title: t('thankYou.reward.user_not_found.title'),
        message: t('thankYou.reward.user_not_found.message'),
      }
    }
    return {
      icon: AlertTriangle,
      variant: 'default' as const,
      title: t('thankYou.reward.reward_error.title'),
      message: t('thankYou.reward.reward_error.message'),
    }
  }, [reward.status, t])

  const backHref = buildReturnHref({
    returnTo,
    submissionId,
    rewardStatus: reward.status,
    rewardCredits: reward.awardedCredits,
  })

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-700">
      <CheckCircle2 className="size-16 text-primary mb-6" />
      <h2 className="text-2xl font-semibold tracking-tight mb-3">
        {t('thankYou.title')}
      </h2>
      <p className="text-base text-muted-foreground max-w-md mb-2">
        {t('thankYou.message')}
      </p>
      <p className="text-sm text-muted-foreground/80 mb-6">
        {t('thankYou.subtitle')}
      </p>

      <div className="w-full max-w-md text-left mb-6">
        <Alert variant={rewardUi.variant}>
          <rewardUi.icon className="size-4" />
          <AlertTitle>{rewardUi.title}</AlertTitle>
          <AlertDescription className="gap-1.5">
            <span>{rewardUi.message}</span>
            {reward.status === 'granted' && (
              <Badge variant="success" size="sm">
                +{reward.awardedCredits} {t('thankYou.reward.credits_label')}
              </Badge>
            )}
          </AlertDescription>
        </Alert>
      </div>

      <Button render={<a href={backHref} />} size="lg">
        {t('thankYou.back_to_strayl')}
      </Button>
    </div>
  )
}
