import { useTranslation } from 'react-i18next'
import { Label } from '@/components/ui/label'
import { RadioGroup, Radio } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'

interface StepValueProps {
  answers: Record<string, unknown>
  setAnswer: (key: string, value: unknown) => void
}

export function StepValue({ answers, setAnswer }: StepValueProps) {
  const { t } = useTranslation()

  const q30Values = (answers.q30 as string[] | undefined) ?? []

  function toggleQ30(option: string) {
    const current = (answers.q30 as string[] | undefined) ?? []

    if (option === 'nobody') {
      if (current.includes('nobody')) {
        setAnswer('q30', [])
      } else {
        setAnswer('q30', ['nobody'])
      }
      return
    }

    if (current.includes(option)) {
      setAnswer(
        'q30',
        current.filter((v) => v !== option)
      )
    } else {
      setAnswer(
        'q30',
        [...current.filter((v) => v !== 'nobody'), option]
      )
    }
  }

  return (
    <div className="space-y-8">
      {/* Q27: Speed comparison */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q27.label')} <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={answers.q27 as string | undefined}
          onValueChange={(value) => setAnswer('q27', value)}
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="significantly" />
              <span className="text-sm">{t('q27.options.significantly')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="somewhat" />
              <span className="text-sm">{t('q27.options.somewhat')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="same" />
              <span className="text-sm">{t('q27.options.same')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="slower" />
              <span className="text-sm">{t('q27.options.slower')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="cant_tell" />
              <span className="text-sm">{t('q27.options.cant_tell')}</span>
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Q28: Would you continue using */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q28.label')} <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={answers.q28 as string | undefined}
          onValueChange={(value) => setAnswer('q28', value)}
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="definitely" />
              <span className="text-sm">{t('q28.options.definitely')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="probably" />
              <span className="text-sm">{t('q28.options.probably')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="maybe" />
              <span className="text-sm">{t('q28.options.maybe')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="probably_not" />
              <span className="text-sm">{t('q28.options.probably_not')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="no" />
              <span className="text-sm">{t('q28.options.no')}</span>
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Q29: Willingness to pay */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q29.label')} <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={answers.q29 as string | undefined}
          onValueChange={(value) => setAnswer('q29', value)}
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="free" />
              <span className="text-sm">{t('q29.options.free')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="ten" />
              <span className="text-sm">{t('q29.options.ten')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="twenty" />
              <span className="text-sm">{t('q29.options.twenty')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="fifty" />
              <span className="text-sm">{t('q29.options.fifty')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="more" />
              <span className="text-sm">{t('q29.options.more')}</span>
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Q30: Target audience (multi-select) */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q30.label')}
        </Label>
        <div className="space-y-2">
          {(['developers', 'non_tech', 'startups', 'students', 'agencies', 'nobody'] as const).map(
            (option) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={q30Values.includes(option)}
                  onCheckedChange={() => toggleQ30(option)}
                />
                <span className="text-sm">{t(`q30.options.${option}`)}</span>
              </label>
            )
          )}
        </div>
      </div>
    </div>
  )
}
