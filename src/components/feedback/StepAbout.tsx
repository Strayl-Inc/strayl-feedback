import { useTranslation } from 'react-i18next'
import { Label } from '@/components/ui/label'
import { RadioGroup, Radio } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'

interface StepAboutProps {
  answers: Record<string, unknown>
  setAnswer: (key: string, value: unknown) => void
}

export function StepAbout({ answers, setAnswer }: StepAboutProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      {/* Email */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('email.label')} <span className="text-destructive">*</span>
        </Label>
        <Input
          type="email"
          value={(answers.email as string) ?? ''}
          onChange={(e) => setAnswer('email', e.target.value)}
          placeholder={t('email.placeholder')}
        />
      </div>

      {/* Q1: Role */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q1.label')} <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={answers.q1 as string | undefined}
          onValueChange={(value) => setAnswer('q1', value)}
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="developer" />
              <span className="text-sm">{t('q1.options.developer')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="designer" />
              <span className="text-sm">{t('q1.options.designer')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="pm" />
              <span className="text-sm">{t('q1.options.pm')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="founder" />
              <span className="text-sm">{t('q1.options.founder')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="student" />
              <span className="text-sm">{t('q1.options.student')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="other" />
              <span className="text-sm">{t('q1.options.other')}</span>
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Q2: Experience level */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q2.label')} <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={answers.q2 as string | undefined}
          onValueChange={(value) => setAnswer('q2', value)}
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="beginner" />
              <span className="text-sm">{t('q2.options.beginner')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="junior" />
              <span className="text-sm">{t('q2.options.junior')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="middle" />
              <span className="text-sm">{t('q2.options.middle')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="senior" />
              <span className="text-sm">{t('q2.options.senior')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="expert" />
              <span className="text-sm">{t('q2.options.expert')}</span>
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Q3: How did you find us */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q3.label')} <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={answers.q3 as string | undefined}
          onValueChange={(value) => setAnswer('q3', value)}
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="social" />
              <span className="text-sm">{t('q3.options.social')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="friend" />
              <span className="text-sm">{t('q3.options.friend')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="search" />
              <span className="text-sm">{t('q3.options.search')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="article" />
              <span className="text-sm">{t('q3.options.article')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="ad" />
              <span className="text-sm">{t('q3.options.ad')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="other" />
              <span className="text-sm">{t('q3.options.other')}</span>
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Q4: Have you used similar products */}
      <div className="space-y-3">
        <Label className="text-base font-medium mb-3 block">
          {t('q4.label')} <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={answers.q4 as string | undefined}
          onValueChange={(value) => {
            setAnswer('q4', value)
            if (value !== 'yes') {
              setAnswer('q4b', undefined)
            }
          }}
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="yes" />
              <span className="text-sm">{t('q4.options.yes')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Radio value="no" />
              <span className="text-sm">{t('q4.options.no')}</span>
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Q4b: Which products (conditional) */}
      {answers.q4 === 'yes' && (
        <div className="space-y-3">
          <Label className="text-base font-medium mb-3 block">
            {t('q4b.label')}
          </Label>
          <Input
            value={(answers.q4b as string) ?? ''}
            onChange={(e) => setAnswer('q4b', e.target.value)}
            placeholder={t('q4b.placeholder')}
          />
        </div>
      )}
    </div>
  )
}
