'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  MessageSquare, 
  PenTool, 
  Truck, 
  Eye, 
  HeadphonesIcon, 
  CheckCircle2 
} from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { translations } from '@/lib/translations'

const steps = [
  {
    icon: MessageSquare,
    key: 'processConsultation',
  },
  {
    icon: PenTool,
    key: 'processDesign',
  },
  {
    icon: Truck,
    key: 'processDeployment',
  },
  {
    icon: Eye,
    key: 'processMonitoring',
  },
  {
    icon: HeadphonesIcon,
    key: 'processSupport',
  },
  {
    icon: CheckCircle2,
    key: 'processCompletion',
  },
]

function TimelineStep({ step, index, isLast, language }: { step: typeof steps[0]; index: number; isLast: boolean; language: 'fr' | 'en' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const Icon = step.icon
  const copy = translations[language]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative flex flex-col items-center text-center group"
    >
      {/* Connector line */}
      {!isLast && (
        <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] right-[calc(-50%+2rem)] h-0.5 bg-gradient-to-r from-electric/50 to-electric/10" />
      )}

      {/* Step number */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
        className="relative mb-4"
      >
        <div className="w-16 h-16 rounded-full glass flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:glow-electric">
          <Icon className="w-7 h-7 text-electric" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-electric flex items-center justify-center text-xs font-bold text-white">
          {index + 1}
        </div>
      </motion.div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-electric transition-colors">
        {copy[step.key + 'Title' as keyof typeof copy]}
      </h3>
      <p className="text-sm text-white/60 max-w-[200px]">
        {copy[step.key + 'Desc' as keyof typeof copy]}
      </p>
    </motion.div>
  )
}

export function ProcessSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { language } = useLanguage()
  const copy = translations[language]

  return (
    <section className="section-dark relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-section-dark" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/30 to-transparent" />

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
            {copy.processLabel}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
            {copy.processTitle}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {copy.processSubtitle}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4">
          {steps.map((step, index) => (
            <TimelineStep 
              key={step.key} 
              step={step} 
              index={index} 
              isLast={index === steps.length - 1} 
              language={language}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
