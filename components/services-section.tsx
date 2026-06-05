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

const services = [
  {
    icon: Globe,
    title: 'Fiber Optic Internet',
    description: 'Dedicated high-speed connectivity with guaranteed bandwidth for your most demanding events.',
  },
  {
    icon: Signal,
    title: '4G/5G Aggregation',
    description: 'Reliable internet through bonded cellular connections, ensuring redundancy and high availability.',
  },
  {
    icon: Satellite,
    title: 'Satellite Internet',
    description: 'Connectivity anywhere, even in the most remote areas. Perfect for outdoor events.',
  },
  {
    icon: Wifi,
    title: 'Event WiFi',
    description: 'Scalable secure WiFi for guests, staff, and media with custom SSIDs and captive portals.',
  },
  {
    icon: Phone,
    title: 'VoIP Communications',
    description: 'Professional voice solutions with dedicated phone lines and call routing.',
  },
  {
    icon: Shield,
    title: 'Access Control & Surveillance',
    description: 'Temporary security and monitoring systems with real-time video feeds and access management.',
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = service.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="glass rounded-2xl p-6 sm:p-8 h-full transition-all duration-500 hover:bg-white/5 hover:border-electric/40 hover:shadow-[0_0_40px_rgba(0,174,239,0.15)]">
        {/* Icon */}
        <div className="relative mb-6">
          <div className="w-14 h-14 rounded-xl bg-electric/10 flex items-center justify-center transition-all duration-300 group-hover:bg-electric/20 group-hover:scale-110">
            <Icon className="w-7 h-7 text-electric transition-all duration-300 group-hover:scale-110" />
          </div>
          <div className="absolute inset-0 w-14 h-14 bg-electric/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-white mb-3 transition-colors group-hover:text-electric">
          {service.title}
        </h3>
        <p className="text-white/60 leading-relaxed">
          {service.description}
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
            Our Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
            Enterprise-Grade Connectivity Solutions
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Comprehensive telecommunications infrastructure designed for the unique demands of professional events.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
