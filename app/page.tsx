import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { ServicesSection } from '@/components/services-section'
import { WhyLeonixSection } from '@/components/why-leonix-section'
import { IndustriesSection } from '@/components/industries-section'
import { ReferencesSection } from '@/components/references-section'
import { ProcessSection } from '@/components/process-section'
import { DashboardSection } from '@/components/dashboard-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WhyLeonixSection />
      <IndustriesSection />
      <ReferencesSection />
      <ProcessSection />
      <DashboardSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
