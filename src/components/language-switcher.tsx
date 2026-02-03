import { useTranslation } from 'react-i18next'
import { Languages } from 'lucide-react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectItem,
} from '@/components/ui/select'

const languages = [
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
  { code: 'kk', label: 'Қазақша' },
]

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <Select
      value={i18n.language}
      onValueChange={(value) => i18n.changeLanguage(value)}
    >
      <SelectTrigger size="sm" className="w-auto min-w-0 gap-1.5">
        <Languages className="size-4" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectPopup>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  )
}
