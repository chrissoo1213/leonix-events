import Image from 'next/image'
import Link from 'next/link'

type LogoProps = {
  className?: string
  height?: number
  href?: string
}

export function Logo({ className = 'h-10 w-auto', height = 40, href = '#home' }: LogoProps) {
  const image = (
    <Image
      src="/logo_leonix.png"
      alt="LEONIX EVENTS"
      width={200}
      height={height}
      className={className}
      priority
    />
  )

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center shrink-0">
        {image}
      </Link>
    )
  }

  return image
}
