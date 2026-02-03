import { useTranslation } from 'react-i18next'
import { Label } from '@/components/ui/label'
import { RadioGroup, Radio } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface StepInterfaceProps {
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

export function StepInterface({ answers, setAnswer }: StepInterfaceProps) {
  const { t } = useTranslation()

  const q22Values = (answers.q22 as string[] | undefined) ?? []

  function toggleQ22(option: string) {
    const current = (answers.q22 as string[] | undefined) ?? []
    if (current.includes(option)) {
      setAnswer(
        'q22',
        current.filter((v) => v !== option)
      )
    } else {
      setAnswer('q22', [...current, option])
    }
  }

  return (
    <div className="space-y-8">
      {/* Q19: Interface intuitiveness */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q19.label')} <span className="text-destructive">*</span>
        </Label>
        <ScaleSelector
          value={answers.q19 as number | undefined}
          onChange={(v) => setAnswer('q19', v)}
          min={t('q19.scaleMin')}
          max={t('q19.scaleMax')}
        />
      </div>

      {/* Q20: Visual design */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q20.label')} <span className="text-destructive">*</span>
        </Label>
        <ScaleSelector
          value={answers.q20 as number | undefined}
          onChange={(v) => setAnswer('q20', v)}
          min={t('q20.scaleMin')}
          max={t('q20.scaleMax')}
        />
      </div>

      {/* Q21: Bugs encountered */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q21.label')} <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={answers.q21 as string | undefined}
          onValueChange={(value) => setAnswer('q21', value)}
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="none" />
              <span className="text-sm">{t('q21.options.none')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="minor" />
              <span className="text-sm">{t('q21.options.minor')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="moderate" />
              <span className="text-sm">{t('q21.options.moderate')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="major" />
              <span className="text-sm">{t('q21.options.major')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="critical" />
              <span className="text-sm">{t('q21.options.critical')}</span>
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Q22: Most useful features (multi-select) */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q22.label')}
        </Label>
        <div className="space-y-2">
          {(['ai_chat', 'code_editor', 'preview', 'deploy', 'file_tree', 'version_history'] as const).map(
            (option) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={q22Values.includes(option)}
                  onCheckedChange={() => toggleQ22(option)}
                />
                <span className="text-sm">{t(`q22.options.${option}`)}</span>
              </label>
            )
          )}
        </div>
      </div>

      {/* Q23: Interface feedback (open-ended) */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q23.label')}
        </Label>
        <Textarea
          value={(answers.q23 as string) ?? ''}
          onChange={(e) => setAnswer('q23', e.target.value)}
          placeholder={t('q23.placeholder')}
        />
      </div>
    </div>
  )
}
