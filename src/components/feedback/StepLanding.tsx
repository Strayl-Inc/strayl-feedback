import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { RadioGroup, Radio } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'

interface StepLandingProps {
  answers: Record<string, unknown>
  setAnswer: (key: string, value: unknown) => void
}

function ScaleSelector({
  value,
  onChange,
  min,
  max,
  count = 5,
}: {
  value: number | undefined
  onChange: (v: number) => void
  min: string
  max: string
  count?: number
}) {
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {Array.from({ length: count }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={cn(
              'flex size-10 items-center justify-center rounded-lg border text-sm font-medium transition-colors',
              value === n
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-input bg-background text-foreground hover:bg-accent',
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

export function StepLanding({ answers, setAnswer }: StepLandingProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      {/* Q5: First impression (scale 1-5) */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q5.label')} <span className="text-destructive">*</span>
        </Label>
        <ScaleSelector
          value={answers.q5 as number | undefined}
          onChange={(v) => setAnswer('q5', v)}
          min={t('q5.scaleMin')}
          max={t('q5.scaleMax')}
        />
      </div>

      {/* Q6: Emotional reaction */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q6.label')} <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={answers.q6 as string | undefined}
          onValueChange={(value) => setAnswer('q6', value)}
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="very_positive" />
              <span className="text-sm">{t('q6.options.very_positive')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="positive" />
              <span className="text-sm">{t('q6.options.positive')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="neutral" />
              <span className="text-sm">{t('q6.options.neutral')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="negative" />
              <span className="text-sm">{t('q6.options.negative')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="very_negative" />
              <span className="text-sm">{t('q6.options.very_negative')}</span>
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Q7: Clear value proposition */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q7.label')} <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={answers.q7 as string | undefined}
          onValueChange={(value) => setAnswer('q7', value)}
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="yes" />
              <span className="text-sm">{t('q7.options.yes')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="somewhat" />
              <span className="text-sm">{t('q7.options.somewhat')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="no" />
              <span className="text-sm">{t('q7.options.no')}</span>
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Q8: Open-ended feedback */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q8.label')}
        </Label>
        <Textarea
          value={(answers.q8 as string) ?? ''}
          onChange={(e) => setAnswer('q8', e.target.value)}
          placeholder={t('q8.placeholder')}
          rows={4}
        />
      </div>
    </div>
  )
}
