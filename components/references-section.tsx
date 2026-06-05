'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Quote } from 'lucide-react'

const references = [
  { name: 'Paris Fashion Week', category: 'Fashion' },
  { name: 'Paris Games Week', category: 'Gaming' },
  { name: 'Solidays', category: 'Festival' },
  { name: 'LVMH', category: 'Luxury' },
  { name: 'Ministry of Armed Forces', category: 'Government' },
  { name: 'Chantilly Jumping', category: 'Sports' },
]

const testimonials = [
  {
    quote: "LEONIX EVENTS delivered flawless connectivity for our fashion show. Zero downtime during our most critical moments.",
    author: "Production Director",
    company: "Paris Fashion Week",
  },
  {
    quote: "Their team&apos;s professionalism and technical expertise exceeded our expectations. A true partner for large-scale events.",
    author: "Event Manager",
    company: "Major Music Festival",
  },
]

function LogoCard({ reference, index }: { reference: typeof references[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="glass rounded-xl p-6 sm:p-8 h-full flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-white/5 hover:border-electric/30 hover:scale-105">
        <div className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-electric transition-colors">
          {reference.name}
        </div>
        <div className="text-sm text-electric/70">{reference.category}</div>
      </div>
    </motion.div>
  )
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

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
        <p className="text-lg text-white/80 leading-relaxed mb-6 italic">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div>
          <div className="font-semibold text-white">{testimonial.author}</div>
          <div className="text-sm text-electric">{testimonial.company}</div>
        </div>
      </div>
    </motion.div>
  )
}

export function ReferencesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

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
            Our References
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            We&apos;re proud to have supported some of the most prestigious events in France and beyond.
          </p>
        </motion.div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {references.map((reference, index) => (
            <LogoCard key={reference.name} reference={reference} index={index} />
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
