'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Activity, 
  Wifi, 
  Server, 
  Shield, 
  Zap,
  TrendingUp,
  Clock,
  MapPin,
  CheckCircle
} from 'lucide-react'

function AnimatedCounter({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

function MetricCard({ icon: Icon, label, value, suffix, color }: {
  icon: typeof Activity
  label: string
  value: number
  suffix: string
  color: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="glass rounded-xl p-4 sm:p-6"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-electric" />
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-foreground">
        <AnimatedCounter end={value} suffix={suffix} />
      </div>
    </motion.div>
  )
}

function StatusIndicator({ status, label }: { status: 'online' | 'active'; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-green-500' : 'bg-electric'}`} />
        <div className={`absolute inset-0 w-2 h-2 rounded-full ${status === 'online' ? 'bg-green-500' : 'bg-electric'} animate-ping`} />
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}

function NetworkGraph() {
  const [data, setData] = useState<number[]>([65, 72, 68, 85, 78, 92, 88, 95, 82, 90, 87, 93])

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => [...prev.slice(1), Math.floor(Math.random() * 30) + 70])
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-24 flex items-end gap-1">
      {data.map((value, index) => (
        <motion.div
          key={index}
          initial={{ height: 0 }}
          animate={{ height: `${value}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex-1 bg-gradient-to-t from-electric to-electric/50 rounded-t"
        />
      ))}
    </div>
  )
}

export function DashboardSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
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
            Live Operations
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Real-Time Network Monitoring
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our Network Operations Center monitors all deployments 24/7, ensuring maximum uptime and rapid response.
          </p>
        </motion.div>

        {/* Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-strong rounded-3xl p-6 sm:p-8"
        >
          {/* Top bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Network Operations Center</h3>
              <div className="flex flex-wrap gap-4">
                <StatusIndicator status="online" label="All Systems Operational" />
                <StatusIndicator status="active" label="12 Active Deployments" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Last updated: Just now</span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <MetricCard icon={Activity} label="Uptime" value={99} suffix=".99%" color="bg-green-500/20" />
            <MetricCard icon={Clock} label="Response Time" value={24} suffix="/7" color="bg-electric/20" />
            <MetricCard icon={MapPin} label="Coverage" value={100} suffix="%" color="bg-blue-500/20" />
            <MetricCard icon={Zap} label="Deployment" value={4} suffix="h" color="bg-yellow-500/20" />
            <MetricCard icon={Shield} label="Security" value={100} suffix="%" color="bg-purple-500/20" />
          </div>

          {/* Network Activity Graph */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-foreground">Network Throughput</h4>
                <p className="text-sm text-muted-foreground">Real-time bandwidth utilization</p>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500">+12% this hour</span>
              </div>
            </div>
            <NetworkGraph />
          </div>

          {/* Active Systems */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {[
              { icon: Wifi, label: 'WiFi Access Points', count: 156, status: 'Active' },
              { icon: Server, label: 'Edge Servers', count: 24, status: 'Online' },
              { icon: Shield, label: 'Firewalls', count: 12, status: 'Secured' },
              { icon: CheckCircle, label: 'Backup Links', count: 8, status: 'Standby' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="glass rounded-xl p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-electric" />
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">{item.count}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
