import { useTranslation } from 'react-i18next'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface StepOverallProps {
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

export function StepOverall({ answers, setAnswer }: StepOverallProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      {/* Q31: Overall satisfaction */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q31.label')}
        </Label>
        <ScaleSelector
          value={answers.q31 as number | undefined}
          onChange={(v) => setAnswer('q31', v)}
          min={t('q31.scaleMin')}
          max={t('q31.scaleMax')}
        />
      </div>

      {/* Q32: NPS score (0-10) */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q32.label')}
        </Label>
        <ScaleSelector
          value={answers.q32 as number | undefined}
          onChange={(v) => setAnswer('q32', v)}
          min={t('q32.scaleMin')}
          max={t('q32.scaleMax')}
          count={11}
          startFrom={0}
        />
      </div>

      {/* Q33: Best thing */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q33.label')}
        </Label>
        <Textarea
          value={(answers.q33 as string) ?? ''}
          onChange={(e) => setAnswer('q33', e.target.value)}
          placeholder={t('q33.placeholder')}
        />
      </div>

      {/* Q34: Worst thing */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q34.label')}
        </Label>
        <Textarea
          value={(answers.q34 as string) ?? ''}
          onChange={(e) => setAnswer('q34', e.target.value)}
          placeholder={t('q34.placeholder')}
        />
      </div>

      {/* Q35: Additional comments */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q35.label')}
        </Label>
        <Textarea
          value={(answers.q35 as string) ?? ''}
          onChange={(e) => setAnswer('q35', e.target.value)}
          placeholder={t('q35.placeholder')}
        />
      </div>
    </div>
  )
}
