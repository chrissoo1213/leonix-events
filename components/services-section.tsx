'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Globe, 
  Signal, 
  Satellite, 
  Wifi, 
  Phone, 
  Shield 
} from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { translations } from '@/lib/translations'

const services = [
  {
    icon: Globe,
    key: 'serviceFiber',
  },
  {
    icon: Signal,
    key: 'service4g',
  },
  {
    icon: Satellite,
    key: 'serviceSatellite',
  },
  {
    icon: Wifi,
    key: 'serviceWifi',
  },
  {
    icon: Phone,
    key: 'serviceVoip',
  },
  {
    icon: Shield,
    key: 'serviceSecurity',
  },
]

function ServiceCard({ service, index, language }: { service: typeof services[0]; index: number; language: 'fr' | 'en' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = service.icon
  const copy = translations[language]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="glass rounded-2xl p-6 sm:p-8 h-full transition-all duration-500 hover:border-electric/30 hover:shadow-[0_0_40px_rgba(227,6,19,0.1)]">
        {/* Icon */}
        <div className="relative mb-6">
          <div className="w-14 h-14 rounded-xl bg-electric/10 flex items-center justify-center transition-all duration-300 group-hover:bg-electric/20 group-hover:scale-110">
            <Icon className="w-7 h-7 text-electric transition-all duration-300 group-hover:scale-110" />
          </div>
          <div className="absolute inset-0 w-14 h-14 bg-electric/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-foreground mb-3 transition-colors group-hover:text-electric">
          {copy[service.key + 'Title' as keyof typeof copy]}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {copy[service.key + 'Desc' as keyof typeof copy]}
        </p>

        {/* Hover line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-electric to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  )
}

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { language } = useLanguage()
  const copy = translations[language]

  return (
    <section id="solutions" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-navy" />
      <div className="absolute inset-0 gradient-radial opacity-50" />

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
            {copy.servicesLabel}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            {copy.servicesTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {copy.servicesSubtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.key} service={service} index={index} language={language} />
          ))}
        </div>
      </div>
    </section>
  )
}
