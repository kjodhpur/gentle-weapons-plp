/**
 * Placeholder logo: a generated monogram badge + wordmark.
 * Swap in a real image by passing `src` (a path under /public) once
 * client-specific logo files exist — this component then renders that
 * image instead of the generated mark.
 */
export function LogoMark({
  text,
  src,
  className,
}: {
  text: string
  src?: string
  className?: string
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={text} className={className} />
  }

  const initials = text
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('')

  return (
    <div className={`flex items-center gap-2 ${className ?? ''}`}>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
        {initials}
      </span>
      <span className="text-sm font-semibold tracking-tight text-foreground">{text}</span>
    </div>
  )
}
