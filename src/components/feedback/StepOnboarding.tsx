import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface StepOnboardingProps {
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

export function StepOnboarding({ answers, setAnswer }: StepOnboardingProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      {/* Q9: Onboarding clarity (scale 1-5) */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q9.label')} <span className="text-destructive">*</span>
        </Label>
        <ScaleSelector
          value={answers.q9 as number | undefined}
          onChange={(v) => setAnswer('q9', v)}
          min={t('q9.scaleMin')}
          max={t('q9.scaleMax')}
        />
      </div>

      {/* Q10: Onboarding speed (scale 1-5) */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q10.label')} <span className="text-destructive">*</span>
        </Label>
        <ScaleSelector
          value={answers.q10 as number | undefined}
          onChange={(v) => setAnswer('q10', v)}
          min={t('q10.scaleMin')}
          max={t('q10.scaleMax')}
        />
      </div>

      {/* Q11: Open-ended feedback */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q11.label')}
        </Label>
        <Textarea
          value={(answers.q11 as string) ?? ''}
          onChange={(e) => setAnswer('q11', e.target.value)}
          placeholder={t('q11.placeholder')}
          rows={4}
        />
      </div>
    </div>
  )
}
