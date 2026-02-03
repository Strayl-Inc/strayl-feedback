import { useTranslation } from 'react-i18next'
import { CheckCircle2 } from 'lucide-react'

export function ThankYou() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-700">
      <CheckCircle2 className="size-16 text-primary mb-6" />
      <h2 className="text-2xl font-semibold tracking-tight mb-3">
        {t('thankYou.title')}
      </h2>
      <p className="text-base text-muted-foreground max-w-md mb-2">
        {t('thankYou.message')}
      </p>
      <p className="text-sm text-muted-foreground/80">
        {t('thankYou.subtitle')}
      </p>
    </div>
  )
}
