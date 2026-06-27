'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { Logo } from '@/components/logo'
import { useLanguage } from '@/components/language-provider'
import { translations } from '@/lib/translations'

const footerLinks = {
  solutions: [
    { key: 'serviceFiberTitle', href: '#solutions' },
    { key: 'service4gTitle', href: '#solutions' },
    { key: 'serviceSatelliteTitle', href: '#solutions' },
    { key: 'serviceWifiTitle', href: '#solutions' },
    { key: 'serviceVoipTitle', href: '#solutions' },
    { key: 'serviceSecurityTitle', href: '#solutions' },
  ],
  industries: [
    { key: 'industryFashionTitle', href: '#industries' },
    { key: 'industrySportsTitle', href: '#industries' },
    { key: 'industryMusicTitle', href: '#industries' },
    { key: 'industryCorporateTitle', href: '#industries' },
    { key: 'industryGovernmentTitle', href: '#industries' },
  ],
  company: [
    { key: 'footerAboutUs', href: '#about' },
    { key: 'footerReferences', href: '#references' },
    { key: 'footerContact', href: '#contact' },
    { key: 'footerCareers', href: '#' },
  ],
}

export function Footer() {
  const { language } = useLanguage()
  const copy = translations[language]
  return (
    <footer className="section-dark relative bg-navy pt-16 pb-8">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6 inline-block bg-white rounded-lg px-4 py-2">
              <Logo href="#home" />
            </div>
            <p className="text-white/60 mb-6 max-w-sm">
              {copy.footerText}
            </p>
            <div className="space-y-3">
              <a href="mailto:contact@leonix-events.fr" className="flex items-center gap-3 text-white/60 hover:text-electric transition-colors">
                <Mail className="w-5 h-5" />
                <span>contact@leonix-events.fr</span>
              </a>
              <a href="tel:+33123456789" className="flex items-center gap-3 text-white/60 hover:text-electric transition-colors">
                <Phone className="w-5 h-5" />
                <span>+33 1 23 45 67 89</span>
              </a>
              <div className="flex items-center gap-3 text-white/60">
                <MapPin className="w-5 h-5" />
                <span>Paris, France</span>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{copy.footerSolutions}</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-white/60 hover:text-electric transition-colors text-sm">
                    {copy[link.key as keyof typeof copy]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{copy.footerIndustries}</h4>
            <ul className="space-y-3">
              {footerLinks.industries.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-white/60 hover:text-electric transition-colors text-sm">
                    {copy[link.key as keyof typeof copy]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{copy.footerCompany}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-white/60 hover:text-electric transition-colors text-sm">
                    {copy[link.key as keyof typeof copy]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} LEONIX EVENTS. {copy.footerCopyright}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/leonix-events/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg glass flex items-center justify-center text-white/60 hover:text-electric hover:bg-white/5 transition-all"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg glass flex items-center justify-center text-white/60 hover:text-electric hover:bg-white/5 transition-all"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
