interface GlowEffectProps {
  className?: string
  color?: string
}

export function GlowEffect({ className = "", color = "rgba(66, 153, 225, 0.3)" }: GlowEffectProps) {
  return (
    <div
      className={`absolute w-[300px] h-[300px] rounded-full opacity-30 blur-[100px] pointer-events-none ${className}`}
      style={{ background: color }}
    />
  )
}
