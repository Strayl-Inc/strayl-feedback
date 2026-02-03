import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { ThemedLogo } from './themed-logo'
import { LanguageSwitcher } from './language-switcher'
import { Button } from '@/components/ui/button'

export function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <ThemedLogo width={28} height={28} />
        <span className="text-lg font-normal font-[family-name:var(--font-bitcount)]">STRAYL</span>
      </div>
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          aria-label={t('toggleTheme')}
        >
          {mounted ? (
            resolvedTheme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />
          ) : (
            <div className="size-4" />
          )}
        </Button>
      </div>
    </header>
  )
}
