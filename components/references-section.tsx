'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Quote } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { translations } from '@/lib/translations'

const references = [
  { key: 'referenceFashion', category: 'Fashion' },
  { key: 'referenceGaming', category: 'Gaming' },
  { key: 'referenceFestival', category: 'Festival' },
  { key: 'referenceLuxury', category: 'Luxury' },
  { key: 'referenceGovernment', category: 'Government' },
  { key: 'referenceSports', category: 'Sports' },
]

const testimonials = [
  {
    key: 'testimonial1',
  },
  {
    key: 'testimonial2',
  },
]

function LogoCard({ reference, index, language }: { reference: typeof references[0]; index: number; language: 'fr' | 'en' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const copy = translations[language]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="glass rounded-xl p-6 sm:p-8 h-full flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-electric/30 hover:scale-105">
        <div className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-electric transition-colors">
          {copy[reference.key as keyof typeof copy]}
        </div>
        <div className="text-sm text-electric/70">{reference.category}</div>
      </div>
    </motion.div>
  )
}

function TestimonialCard({ testimonial, index, language }: { testimonial: typeof testimonials[0]; index: number; language: 'fr' | 'en' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const copy = translations[language]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="glass rounded-2xl p-8 relative"
    >
      <Quote className="w-10 h-10 text-electric/30 absolute top-6 left-6" />
      <div className="pt-8">
        <p className="text-lg text-foreground/80 leading-relaxed mb-6 italic">
          &ldquo;{copy[testimonial.key + 'Quote' as keyof typeof copy]}&rdquo;
        </p>
        <div>
          <div className="font-semibold text-foreground">{copy[testimonial.key + 'Author' as keyof typeof copy]}</div>
          <div className="text-sm text-electric">{copy[testimonial.key + 'Company' as keyof typeof copy]}</div>
        </div>
      </div>
    </motion.div>
  )
}

export function ReferencesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { language } = useLanguage()
  const copy = translations[language]

  return (
    <section id="references" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-navy" />
      <div className="absolute inset-0 gradient-radial opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-electric text-sm font-semibold tracking-wider uppercase mb-4">
            {copy.referencesLabel}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            {copy.referencesTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {copy.referencesSubtitle}
          </p>
        </motion.div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {references.map((reference, index) => (
            <LogoCard key={reference.key} reference={reference} index={index} language={language} />
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.key} testimonial={testimonial} index={index} language={language} />
          ))}
        </div>
      </div>
    </section>
  )
}
