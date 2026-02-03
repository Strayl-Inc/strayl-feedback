import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'

// Fontsource imports - must be in JS, not CSS
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import '@fontsource-variable/bitcount-prop-single'

// i18n
import '../lib/i18n'

import { ThemeProvider } from '../components/theme-provider'
import { Header } from '../components/Header'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Strayl Feedback',
      },
      {
        name: 'description',
        content: 'Help us improve Strayl',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
  }),

  shellComponent: RootDocument,
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
