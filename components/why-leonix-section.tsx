'use client'
import { Satellite, Signal, Wifi, Shield } from 'lucide-react'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Check, 
  Users, 
  HeadphonesIcon, 
  MapPin, 
  Activity, 
  Server, 
  Network, 
  Globe 
} from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { translations } from '@/lib/translations'

const benefits = [
  { icon: Users, key: 'benefitExpert' },
  { icon: HeadphonesIcon, key: 'benefitSupport' },
  { icon: MapPin, key: 'benefitOnSite' },
  { icon: Activity, key: 'benefitMonitoring' },
  { icon: Server, key: 'benefitArchitecture' },
  { icon: Network, key: 'benefitFiber' },
  { icon: Globe, key: 'benefitInternational' },
]

function BenefitItem({ benefit, index, language }: { benefit: typeof benefits[0]; index: number; language: 'fr' | 'en' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const Icon = benefit.icon
  const copy = translations[language]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-center gap-4 group"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center transition-all duration-300 group-hover:bg-electric/20 group-hover:scale-110">
        <Icon className="w-5 h-5 text-electric" />
      </div>
      <span className="text-foreground/80 font-medium group-hover:text-foreground transition-colors">
        {copy[benefit.key as keyof typeof copy]}
      </span>
    </motion.div>
  )
}

function InfrastructureIllustration() {
  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto">
      {/* Center server icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-2xl glass flex items-center justify-center glow-electric"
      >
        <Server className="w-12 h-12 text-electric" />
      </motion.div>

      {/* Orbiting icons */}
      {[
        { icon: Globe, angle: 0 },
        { icon: Satellite, angle: 60 },
        { icon: Wifi, angle: 120 },
        { icon: Signal, angle: 180 },
        { icon: Network, angle: 240 },
        { icon: Shield, angle: 300 },
      ].map(({ icon: Icon, angle }, index) => {
        const radius = 140
        const x = Math.cos((angle * Math.PI) / 180) * radius
        const y = Math.sin((angle * Math.PI) / 180) * radius

        return (
          <motion.div
            key={angle}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            className="absolute top-1/2 left-1/2 w-14 h-14 -translate-x-1/2 -translate-y-1/2 rounded-xl glass flex items-center justify-center animate-float"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              animationDelay: `${index * 0.5}s`,
            }}
          >
            <Icon className="w-6 h-6 text-electric/80" />
          </motion.div>
        )
      })}

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        {[0, 60, 120, 180, 240, 300].map((angle, index) => {
          const radius = 140
          const x = Number(
            (200 + Math.cos((angle * Math.PI) / 180) * radius).toFixed(4)
          )
          
          const y = Number(
            (200 + Math.sin((angle * Math.PI) / 180) * radius).toFixed(4)
          )

          return (
            <motion.line
              key={angle}
              x1="200"
              y1="200"
              x2={x}
              y2={y}
              stroke="rgba(227, 6, 19, 0.25)"
              strokeWidth="1"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
            />
          )
        })}
      </svg>

      {/* Outer ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 rounded-full border border-electric/10"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute inset-8 rounded-full border border-electric/15"
      />
    </div>
  )
}


export function WhyLeonixSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { language } = useLanguage()
  const copy = translations[language]

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 gradient-radial opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <InfrastructureIllustration />
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-electric text-sm font-semibold tracking-wider uppercase mb-4">
              {copy.whyLabel}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              {copy.whyTitle}
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              {copy.whySubtitle}
            </p>

            {/* Benefits list */}
            <div className="space-y-5">
              {benefits.map((benefit, index) => (
                <BenefitItem key={benefit.key} benefit={benefit} index={index} language={language} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
