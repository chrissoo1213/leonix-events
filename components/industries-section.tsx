'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Sparkles, 
  Trophy, 
  Music, 
  Building2, 
  Shield, 
  Palette 
} from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { translations } from '@/lib/translations'

const industries = [
  {
    icon: Sparkles,
    key: 'industryFashion',
    gradient: 'from-pink-500/20 to-purple-500/20',
  },
  {
    icon: Trophy,
    key: 'industrySports',
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
  {
    icon: Music,
    key: 'industryMusic',
    gradient: 'from-orange-500/20 to-red-500/20',
  },
  {
    icon: Building2,
    key: 'industryCorporate',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: Shield,
    key: 'industryGovernment',
    gradient: 'from-slate-500/20 to-gray-500/20',
  },
  {
    icon: Palette,
    key: 'industryCulture',
    gradient: 'from-violet-500/20 to-indigo-500/20',
  },
]

function IndustryCard({ industry, index, language }: { industry: typeof industries[0]; index: number; language: 'fr' | 'en' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = industry.icon
  const copy = translations[language]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className={`glass rounded-2xl p-6 sm:p-8 h-full transition-all duration-500 hover:scale-[1.02] hover:border-electric/40 overflow-hidden`}>
        {/* Background gradient on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Icon */}
        <div className="relative mb-6">
          <div className="w-14 h-14 rounded-xl bg-electric/10 flex items-center justify-center transition-all duration-300 group-hover:bg-electric/20">
            <Icon className="w-7 h-7 text-electric transition-all duration-300 group-hover:scale-110" />
          </div>
        </div>

        {/* Content */}
        <h3 className="relative text-xl font-semibold text-foreground mb-3 transition-colors group-hover:text-electric">
          {copy[industry.key + 'Title' as keyof typeof copy]}
        </h3>
        <p className="relative text-muted-foreground leading-relaxed">
          {copy[industry.key + 'Desc' as keyof typeof copy]}
        </p>
      </div>
    </motion.div>
  )
}

export function IndustriesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { language } = useLanguage()
  const copy = translations[language]

  return (
    <section id="industries" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/30 to-transparent" />

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
            {copy.industriesLabel}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            {copy.industriesTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {copy.industriesSubtitle}
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <IndustryCard key={industry.key} industry={industry} index={index} language={language} />
          ))}
        </div>
      </div>
    </section>
  )
}
