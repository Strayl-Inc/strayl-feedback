import { useTranslation } from 'react-i18next'
import { Label } from '@/components/ui/label'
import { RadioGroup, Radio } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface StepDeployProps {
  answers: Record<string, unknown>
  setAnswer: (key: string, value: unknown) => void
}

function ScaleSelector({
  value,
  onChange,
  min,
  max,
  count = 5,
  startFrom = 1,
}: {
  value: number | undefined
  onChange: (v: number) => void
  min: string
  max: string
  count?: number
  startFrom?: number
}) {
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {Array.from({ length: count }, (_, i) => i + startFrom).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={cn(
              'flex size-10 items-center justify-center rounded-lg border text-sm font-medium transition-colors',
              value === n
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-input bg-background text-foreground hover:bg-accent'
            )}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}

export function StepDeploy({ answers, setAnswer }: StepDeployProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      {/* Q24: Deployment experience */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q24.label')}
        </Label>
        <RadioGroup
          value={answers.q24 as string | undefined}
          onValueChange={(value) => {
            setAnswer('q24', value)
            if (value !== 'yes_hard') {
              setAnswer('q24b', undefined)
            }
          }}
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="yes_easy" />
              <span className="text-sm">{t('q24.options.yes_easy')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="yes_hard" />
              <span className="text-sm">{t('q24.options.yes_hard')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="no" />
              <span className="text-sm">{t('q24.options.no')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="didnt_try" />
              <span className="text-sm">{t('q24.options.didnt_try')}</span>
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Q24b: Deployment difficulties (conditional) */}
      {answers.q24 === 'yes_hard' && (
        <div className="space-y-3">
          <Label className="text-base font-medium mb-3 block">
            {t('q24b.label')}
          </Label>
          <Textarea
            value={(answers.q24b as string) ?? ''}
            onChange={(e) => setAnswer('q24b', e.target.value)}
            placeholder={t('q24b.placeholder')}
          />
        </div>
      )}

      {/* Q25: Deployment speed */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q25.label')}
        </Label>
        <RadioGroup
          value={answers.q25 as string | undefined}
          onValueChange={(value) => setAnswer('q25', value)}
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="very_fast" />
              <span className="text-sm">{t('q25.options.very_fast')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="fast" />
              <span className="text-sm">{t('q25.options.fast')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="acceptable" />
              <span className="text-sm">{t('q25.options.acceptable')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="slow" />
              <span className="text-sm">{t('q25.options.slow')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="na" />
              <span className="text-sm">{t('q25.options.na')}</span>
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Q26: Overall deployment satisfaction */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q26.label')}
        </Label>
        <ScaleSelector
          value={answers.q26 as number | undefined}
          onChange={(v) => setAnswer('q26', v)}
          min={t('q26.scaleMin')}
          max={t('q26.scaleMax')}
        />
      </div>
    </div>
  )
}
