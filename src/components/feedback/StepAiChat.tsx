import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { RadioGroup, Radio } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface StepAiChatProps {
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

export function StepAiChat({ answers, setAnswer }: StepAiChatProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      {/* Q12: AI response quality (scale 1-5) */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q12.label')}
        </Label>
        <ScaleSelector
          value={answers.q12 as number | undefined}
          onChange={(v) => setAnswer('q12', v)}
          min={t('q12.scaleMin')}
          max={t('q12.scaleMax')}
        />
      </div>

      {/* Q13: AI understanding (scale 1-5) */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q13.label')}
        </Label>
        <ScaleSelector
          value={answers.q13 as number | undefined}
          onChange={(v) => setAnswer('q13', v)}
          min={t('q13.scaleMin')}
          max={t('q13.scaleMax')}
        />
      </div>

      {/* Q14: Response speed */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q14.label')}
        </Label>
        <RadioGroup
          value={answers.q14 as string | undefined}
          onValueChange={(value) => setAnswer('q14', value)}
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="very_fast" />
              <span className="text-sm">{t('q14.options.very_fast')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="fast" />
              <span className="text-sm">{t('q14.options.fast')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="acceptable" />
              <span className="text-sm">{t('q14.options.acceptable')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="slow" />
              <span className="text-sm">{t('q14.options.slow')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="very_slow" />
              <span className="text-sm">{t('q14.options.very_slow')}</span>
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Q15: Hallucination frequency */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q15.label')}
        </Label>
        <RadioGroup
          value={answers.q15 as string | undefined}
          onValueChange={(value) => setAnswer('q15', value)}
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="never" />
              <span className="text-sm">{t('q15.options.never')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="rarely" />
              <span className="text-sm">{t('q15.options.rarely')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="sometimes" />
              <span className="text-sm">{t('q15.options.sometimes')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="often" />
              <span className="text-sm">{t('q15.options.often')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="always" />
              <span className="text-sm">{t('q15.options.always')}</span>
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Q16: Used advanced features */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q16.label')}
        </Label>
        <RadioGroup
          value={answers.q16 as string | undefined}
          onValueChange={(value) => {
            setAnswer('q16', value)
            if (value !== 'yes') {
              setAnswer('q16b', undefined)
            }
          }}
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="yes" />
              <span className="text-sm">{t('q16.options.yes')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="no" />
              <span className="text-sm">{t('q16.options.no')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="didnt_know" />
              <span className="text-sm">{t('q16.options.didnt_know')}</span>
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Q16b: Which features (conditional) */}
      {answers.q16 === 'yes' && (
        <div className="space-y-3">
          <Label className="text-base font-medium mb-3 block">
            {t('q16b.label')}
          </Label>
          <Input
            value={(answers.q16b as string) ?? ''}
            onChange={(e) => setAnswer('q16b', e.target.value)}
            placeholder={t('q16b.placeholder')}
          />
        </div>
      )}

      {/* Q17: Would recommend */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q17.label')}
        </Label>
        <RadioGroup
          value={answers.q17 as string | undefined}
          onValueChange={(value) => {
            setAnswer('q17', value)
            if (value !== 'yes') {
              setAnswer('q17b', undefined)
            }
          }}
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="yes" />
              <span className="text-sm">{t('q17.options.yes')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="no" />
              <span className="text-sm">{t('q17.options.no')}</span>
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Q17b: Recommendation strength (conditional, scale 1-5) */}
      {answers.q17 === 'yes' && (
        <div className="space-y-3">
          <Label className="text-base font-medium mb-3 block">
            {t('q17b.label')}
          </Label>
          <ScaleSelector
            value={answers.q17b as number | undefined}
            onChange={(v) => setAnswer('q17b', v)}
            min={t('q17b.scaleMin')}
            max={t('q17b.scaleMax')}
          />
        </div>
      )}

      {/* Q18: Open-ended feedback */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q18.label')}
        </Label>
        <Textarea
          value={(answers.q18 as string) ?? ''}
          onChange={(e) => setAnswer('q18', e.target.value)}
          placeholder={t('q18.placeholder')}
          rows={4}
        />
      </div>
    </div>
  )
}
