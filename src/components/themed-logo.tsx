import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface ThemedLogoProps {
  width?: number
  height?: number
  className?: string
  alt?: string
  inverted?: boolean
}

export function ThemedLogo({
  width = 24,
  height = 24,
  className = "",
  alt = "Strayl Logo",
  inverted = false,
}: ThemedLogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div style={{ width, height }} className={className} />
  }

  const isDark = resolvedTheme === "dark"
  const logoSrc = inverted
    ? (isDark ? "/logo-dark.webp" : "/logo-light.webp")
    : (isDark ? "/logo-light.webp" : "/logo-dark.webp")

  return (
    <img
      src={logoSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  )
}
