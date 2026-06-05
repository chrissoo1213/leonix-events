'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, MapPin, Calendar, Wifi, User, Building2, Mail, Phone } from 'lucide-react'

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setIsSubmitting(true)

  const form = e.currentTarget

  const formData = {
    name: (form.elements.namedItem("name") as HTMLInputElement).value,
    company: (form.elements.namedItem("company") as HTMLInputElement).value,
    email: (form.elements.namedItem("email") as HTMLInputElement).value,
    phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
    location: (form.elements.namedItem("location") as HTMLInputElement).value,
    date: (form.elements.namedItem("date") as HTMLInputElement).value,
    requirements: (form.elements.namedItem("requirements") as HTMLTextAreaElement).value,
  }

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error("Failed to send")
    }

    setIsSubmitted(true)
    form.reset()
  } catch (error) {
    alert("Failed to send request. Please try again.")
    console.error(error)
  } finally {
    setIsSubmitting(false)
  }
}
  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-navy" />
      <div className="absolute inset-0 gradient-radial opacity-30" />
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
            Get Started
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
            Request Your Connectivity Plan
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Tell us about your event and we&apos;ll design a custom connectivity solution tailored to your needs.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-strong rounded-3xl p-8 sm:p-12 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-electric/20 flex items-center justify-center mx-auto mb-6">
                <Send className="w-10 h-10 text-electric" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Request Received!</h3>
              <p className="text-white/60 mb-6">
                Thank you for your interest. Our team will review your requirements and contact you within 24 hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-3 glass text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-strong rounded-3xl p-6 sm:p-8 lg:p-12">
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full pl-12 pr-4 py-3 glass rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric/50 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="relative">
                  <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
                    Company *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      className="w-full pl-12 pr-4 py-3 glass rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric/50 transition-all"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full pl-12 pr-4 py-3 glass rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric/50 transition-all"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="relative">
                  <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full pl-12 pr-4 py-3 glass rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric/50 transition-all"
                      placeholder="+33 1 23 45 67 89"
                    />
                  </div>
                </div>

                {/* Event Location */}
                <div className="relative">
                  <label htmlFor="location" className="block text-sm font-medium text-white/80 mb-2">
                    Event Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      className="w-full pl-12 pr-4 py-3 glass rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric/50 transition-all"
                      placeholder="Paris, France"
                    />
                  </div>
                </div>

                {/* Event Date */}
                <div className="relative">
                  <label htmlFor="date" className="block text-sm font-medium text-white/80 mb-2">
                    Event Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      className="w-full pl-12 pr-4 py-3 glass rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric/50 transition-all [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Requirements */}
                <div className="sm:col-span-2">
                  <label htmlFor="requirements" className="block text-sm font-medium text-white/80 mb-2">
                    Connectivity Requirements *
                  </label>
                  <div className="relative">
                    <Wifi className="absolute left-4 top-4 w-5 h-5 text-white/40" />
                    <textarea
                      id="requirements"
                      name="requirements"
                      required
                      rows={4}
                      className="w-full pl-12 pr-4 py-3 glass rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric/50 transition-all resize-none"
                      placeholder="Describe your connectivity needs: number of attendees, required bandwidth, specific services needed (WiFi, fiber, satellite, etc.)..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-electric text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,174,239,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {isSubmitting ? 'Sending...' : 'Request My Connectivity Plan'}
                  </span>
                  {!isSubmitting && <Send className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#33c1f5] to-electric opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
