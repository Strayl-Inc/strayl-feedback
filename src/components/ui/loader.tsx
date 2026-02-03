"use client"

interface LoaderProps {
  color?: string
  size?: number
  className?: string
}

export function Loader({ color, size = 16, className }: LoaderProps) {
  const lines = 8
  const lineWidth = size * 0.1
  const lineHeight = size * 0.28

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        position: "relative",
      }}
    >
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: lineWidth,
            height: lineHeight,
            backgroundColor: color || "currentColor",
            borderRadius: lineWidth,
            transform: `rotate(${i * (360 / lines)}deg) translateY(-${size * 0.38}px)`,
            transformOrigin: "center top",
            animation: `fade-loader 0.8s linear infinite`,
            animationDelay: `${(i * 0.8) / lines}s`,
            opacity: 0.2,
          }}
        />
      ))}
    </div>
  )
}
