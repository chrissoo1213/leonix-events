'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import Link from 'next/link'

function NetworkVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = []
    const numNodes = 60

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      })
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(7, 26, 53, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 174, 239, 0.8)'
        ctx.fill()

        // Draw glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 4
        )
        gradient.addColorStop(0, 'rgba(0, 174, 239, 0.3)')
        gradient.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw connections
      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach((other) => {
          const dist = Math.hypot(node.x - other.x, node.y - other.y)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(0, 174, 239, ${0.3 * (1 - dist / 150)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.7 }}
    />
  )
}

function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-electric text-glow">
        {value}
      </div>
      <div className="text-xs sm:text-sm text-white/60 mt-1">{label}</div>
    </motion.div>
  )
}

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <NetworkVisualization />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 gradient-radial" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
            <span className="text-sm text-white/80">French Telecom Operator</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-5xl mx-auto text-balance"
          >
            Temporary Internet Solutions for{' '}
            <span className="text-electric text-glow">Mission-Critical</span> Events
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-white/70 mt-6 max-w-3xl mx-auto leading-relaxed text-pretty"
          >
            Fiber, Satellite, 4G/5G Aggregation, WiFi, VoIP and Network Infrastructure 
            for Professional Events Across France and Beyond.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <Link
              href="#contact"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-electric text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,174,239,0.5)] hover:scale-105"
            >
              <span className="relative z-10">Request a Quote</span>
              <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#33c1f5] to-electric opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 px-8 py-4 glass text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/10"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Talk to an Expert</span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 sm:mt-20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto glass rounded-2xl p-6 sm:p-8">
              <AnimatedStat value="99.99%" label="Network Availability" delay={1.2} />
              <AnimatedStat value="24/7" label="Monitoring" delay={1.4} />
              <AnimatedStat value="100%" label="Nationwide Coverage" delay={1.6} />
              <AnimatedStat value="4h" label="Rapid Deployment" delay={1.8} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
