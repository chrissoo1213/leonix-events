'use client'

import { useLanguage } from '@/components/language-provider'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { translations } from '@/lib/translations'



export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, changeLanguage } = useLanguage()


  const navItems = [
    { label: translations[language].home, href: '#home' },
    { label: translations[language].solutions, href: '#solutions' },
    { label: translations[language].industries, href: '#industries' },
    { label: translations[language].references, href: '#references' },
    { label: translations[language].about, href: '#about' },
    { label: translations[language].contact, href: '#contact' },
  ]
  
  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'glass-strong py-3 shadow-sm'
            : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-foreground/80 hover:text-electric transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-electric transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">

              <button
                onClick={() =>
                  changeLanguage(language === 'fr' ? 'en' : 'fr')
                }
                className="px-3 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition"
              >
                {language === 'fr' ? 'EN' : 'FR'}
              </button>

              <Link
                href="#contact"
                className="relative inline-flex items-center gap-2 px-6 py-2"
              >
                <span className="relative z-10">
                  {translations[language].quote}
                </span>
              </Link>

            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:text-electric transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden pt-20"
          >
            <div className="glass-strong h-full">
              <div className="flex flex-col items-center justify-center h-full gap-8 px-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl font-medium text-foreground hover:text-electric transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-electric text-white font-semibold rounded-lg hover:bg-electric-dark transition-colors"
                  >
                    {translations[language].quote}
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
