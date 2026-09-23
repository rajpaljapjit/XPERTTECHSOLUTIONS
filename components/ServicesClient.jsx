'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  FaLaptop, FaShieldVirus, FaTabletScreenButton, FaMobileScreen,
  FaCloudArrowUp, FaWifi, FaEnvelope, FaUserLock, FaPrint, FaDesktop,
  FaBolt, FaPhone, FaArrowRight, FaCircleCheck, FaServer, FaBuilding,
  FaPalette, FaFire
} from 'react-icons/fa6'
import AnimateIn, { StaggerChildren } from './AnimateIn'
import ParticleField from './ParticleField'

const services = [
  {
    icon: FaLaptop, color: '#a78bfa', bg: 'rgba(124,58,237,0.14)',
    title: 'Computer and Laptop Repairs',
    desc: 'Whether your PC crashes at startup, runs unbearably slow, or has hardware damage -- our technicians diagnose and fix the root cause. We work on all brands and models, Windows and Mac, desktops and notebooks.',
    tags: ['Screen Replacement', 'OS Reinstall', 'Hardware Upgrade', 'Slow PC Fix', "Won't Turn On", 'Overheating'],
    details: [
      { title: 'Hardware Repairs', body: 'Screen, keyboard, battery, charging port, RAM and SSD replacements. We carry common parts and order specialist components quickly.' },
      { title: 'Software and OS Fixes', body: 'Windows reinstall, driver updates, startup repair, system optimisation, and software conflict resolution.' },
    ],
  },
  {
    icon: FaShieldVirus, color: '#f87171', bg: 'rgba(239,68,68,0.12)',
    title: 'Virus Removal and Security',
    desc: 'Malware, ransomware, spyware and adware -- we remove every trace and make sure it cannot return. We then put proper layered defences in place so you stay protected.',
    tags: ['Full Malware Scan', 'Ransomware Removal', 'Spyware Clean', 'Antivirus Setup', 'Browser Cleanup', 'Security Audit'],
    details: [
      { title: 'Complete Removal', body: 'Deep scan and removal of all malicious software. Browser hijackers, keyloggers, rootkits, crypto miners -- all gone.' },
      { title: 'Ongoing Protection', body: 'Setup of enterprise-grade antivirus, firewall rules and safe-browsing practices to prevent re-infection.' },
    ],
  },
  {
    icon: FaTabletScreenButton, color: '#60a5fa', bg: 'rgba(37,99,235,0.14)',
    title: 'Tablet Repairs',
    desc: 'Cracked iPad screen? Frozen Android tablet? Our technicians repair and restore tablets of all brands and generations, including iPads, Samsung Galaxy Tabs, and more.',
    tags: ['Screen Replacement', 'Battery Replacement', 'Software Reset', 'iPad Repair', 'Android Tablets', 'App Issues'],
    details: [
      { title: 'Physical Repairs', body: 'Screen digitiser, LCD, battery and charging port replacements using quality parts. Most repairs completed same day.' },
      { title: 'Software Support', body: 'Factory reset, iOS and Android updates, app troubleshooting, passcode removal, and data transfer to a new device.' },
    ],
  },
  {
    icon: FaMobileScreen, color: '#f472b6', bg: 'rgba(236,72,153,0.12)',
    title: 'Mobile Phone Support',
    desc: 'Setup, data migration, account recovery, app troubleshooting and more. We help with iPhones and Android phones without the need for a factory reset.',
    tags: ['Data Transfer', 'Account Recovery', 'App Setup', 'iOS Support', 'Android Support', 'New Phone Setup'],
    details: [
      { title: 'New Phone Setup', body: 'Complete setup of a new handset including account sign-in, app restoration, contacts, email and photos migration.' },
      { title: 'Troubleshooting', body: 'Fix software glitches, stuck updates, connectivity problems and app crashes without losing your data.' },
    ],
  },
  {
    icon: FaCloudArrowUp, color: '#34d399', bg: 'rgba(52,211,153,0.12)',
    title: 'File Backup and Data Recovery',
    desc: 'Lost documents, deleted photos or a crashed hard drive -- we recover what matters most. We also set up automatic backups so it never happens again.',
    tags: ['Photo Recovery', 'Hard Drive Recovery', 'Cloud Backup', 'Automated Backup', 'Document Recovery', 'NAS Setup'],
    details: [
      { title: 'Data Recovery', body: 'Recovery from formatted, corrupt or failed drives. We work with mechanical drives, SSDs and USB devices using professional tools.' },
      { title: 'Backup Solutions', body: 'Automated daily backups to external drive and cloud. Setup of OneDrive, Google Drive, iCloud or Backblaze.' },
    ],
  },
  {
    icon: FaWifi, color: '#22d3ee', bg: 'rgba(6,182,212,0.12)',
    title: 'Internet and Wi-Fi Setup',
    desc: 'Dead spots, slow speeds, devices dropping off -- we diagnose and fix your network so every corner of your home or office has fast, reliable Wi-Fi.',
    tags: ['Router Setup', 'Wi-Fi Extenders', 'NBN Troubleshooting', 'Mesh Network', 'Guest Network', 'Cable Runs'],
    details: [
      { title: 'Network Installation', body: 'Modem and router setup, channel optimisation, SSID and password configuration, and securing your network.' },
      { title: 'Coverage and Speed', body: 'Dead spot analysis, extender or mesh node placement, and QoS settings for consistent performance across all rooms.' },
    ],
  },
  {
    icon: FaEnvelope, color: '#fb923c', bg: 'rgba(249,115,22,0.12)',
    title: 'Email Setup and Support',
    desc: 'Getting email working correctly on every device is surprisingly tricky. We set it up right first time -- Outlook, Gmail, Apple Mail, on computer, phone and tablet.',
    tags: ['Outlook Setup', 'Gmail Setup', 'Business Email', 'Spam Filtering', 'Email Migration', 'Microsoft 365'],
    details: [
      { title: 'Email Configuration', body: 'IMAP and POP3 account setup, signature creation, folder rules and synchronisation across all your devices.' },
      { title: 'Business Email', body: 'Microsoft 365 and Google Workspace setup, migration from old providers, and shared mailbox configuration.' },
    ],
  },
  {
    icon: FaUserLock, color: '#fbbf24', bg: 'rgba(234,179,8,0.12)',
    title: 'Privacy and Security',
    desc: 'We audit your digital footprint, secure your accounts and make sure your personal data stays private. Ideal after a scam, hack or security scare.',
    tags: ['Password Manager', 'Two-Factor Auth', 'Account Audit', 'Scam Recovery', 'Privacy Review', 'VPN Setup'],
    details: [
      { title: 'Account Security', body: 'Setup of strong passwords, two-factor authentication and a password manager across all critical accounts.' },
      { title: 'Scam and Hack Recovery', body: 'Containment of a compromised account, notification of affected services, and a full review of what was accessed.' },
    ],
  },
  {
    icon: FaPrint, color: '#2dd4bf', bg: 'rgba(20,184,166,0.12)',
    title: 'Printer and Scanner Setup',
    desc: 'Nothing is more frustrating than a printer that will not cooperate. We install, connect and test your printer on every device in the house -- and get scanning working too.',
    tags: ['Wireless Setup', 'Driver Install', 'Network Printer', 'Scan to Email', 'All Brands', 'Fax Setup'],
    details: [
      { title: 'Printer Installation', body: 'Wireless and wired printer setup, driver installation, queue configuration and test printing from all devices.' },
      { title: 'Scanner and Fax', body: 'Scan to email, scan to folder and network scanning setup. Works with HP, Canon, Epson, Brother and more.' },
    ],
  },
  {
    icon: FaDesktop, color: '#818cf8', bg: 'rgba(99,102,241,0.12)',
    title: 'Remote IT Support',
    desc: 'Fast, secure help without waiting for a home visit. Connect with a technician in minutes and watch the fix happen on your screen in real time.',
    tags: ['Screen Share', 'Instant Session', 'Secure Connection', 'Software Help', 'Email Issues', 'Settings & Config'],
    details: [
      { title: 'Secure Remote Session', body: 'We use encrypted screen-sharing software. You watch and approve every action. Session ends immediately on request.' },
      { title: 'What We Can Do Remotely', body: 'Software installs, settings changes, virus removal, email setup, browser cleanup and general troubleshooting.' },
    ],
  },
]

const remoteHands = {
  icon: FaServer, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',
  title: 'Remote Hands & On-Site Hardware Support',
  tagline: "Your remote team's local hands — on-site in South East QLD",
  desc: 'Based in Melbourne, Sydney, or anywhere else in Australia — but need a trusted pair of hands on the ground in South East Queensland? XTS Tech Support offers professional Remote Hands services for businesses and IT teams Australia-wide. Your IT team stays in control remotely; Jamie handles the physical work on-site.',
  tags: ['Router / Switch Install', 'Server Hardware', 'Cable Runs', 'Patch Panels', 'Network Inspection', 'Hardware Upgrades'],
  details: [
    {
      title: 'What We Can Do On-Site',
      body: "Install or swap out routers and switches, replace or upgrade server hardware, run cables and patch panels, physically inspect network equipment, and carry out hardware changes while your team remote-logins and manages the software side.",
    },
    {
      title: 'How It Works',
      body: "Your IT team sends the instructions, Jamie arrives on-site in Brisbane, Gold Coast or Northern NSW and carries out the physical work — fully coordinated with your existing IT staff. Fast, professional and reliable.",
    },
  ],
}

export default function ServicesClient() {
  return (
    <div>
      {/* Hero */}
      <section className="page-hero-bg dot-grid pt-36 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <ParticleField count={40} />
        <div className="orb-purple" style={{ width: 400, height: 400, top: '-10%', right: '5%', opacity: 0.4 }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <AnimateIn>
            <p className="section-label">Our Services</p>
            <h1 className="font-extrabold mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-space)' }}>
              10 Ways We Can <span className="gradient-text">Help You Today</span>
            </h1>
            <p className="section-sub mx-auto text-center">
              From a single virus removal to a full office network — same rate, same friendly team, same-day where possible.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <Link href="/contact" className="btn-primary"><FaBolt /> Book a Service</Link>
              <a href="tel:0424424444" className="btn-ghost"><FaPhone /> 0424 424 444</a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Services detail sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {services.map((svc, idx) => (
          <AnimateIn key={svc.title} delay={0.05}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Service header */}
              <div className="lg:col-span-1">
                <div className="icon-box mb-4" style={{ background: svc.bg, width: 60, height: 60, borderRadius: 16, fontSize: '1.5rem' }}>
                  <svc.icon style={{ color: svc.color }} />
                </div>
                <h2 className="text-xl font-extrabold text-white mb-3" style={{ fontFamily: 'var(--font-space)' }}>{svc.title}</h2>
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#94a3b8' }}>{svc.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {svc.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Detail cards */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {svc.details.map((detail) => (
                  <div key={detail.title} className="glass-card p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <FaCircleCheck style={{ color: svc.color }} className="text-sm flex-shrink-0" />
                      <h3 className="font-bold text-white text-sm" style={{ fontFamily: 'var(--font-space)' }}>{detail.title}</h3>
                    </div>
                    <p className="text-sm" style={{ color: '#94a3b8', lineHeight: '1.7' }}>{detail.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {idx < services.length - 1 && (
              <div className="mt-10" style={{ borderBottom: '1px solid rgba(124,58,237,0.1)' }} />
            )}
          </AnimateIn>
        ))}
      </div>

      {/* Branding & Web Design — New Service */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <AnimateIn>
          <div className="rounded-3xl p-8 sm:p-10 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(37,99,235,0.07) 100%)', border: '2px solid rgba(124,58,237,0.28)' }}>
            {/* Orb */}
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)', filter: 'blur(40px)' }} />

            <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.35)', color: '#fbbf24' }}>
              <FaFire className="text-xs" /> New Service
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-1">
                <div className="icon-box mb-4" style={{ background: 'rgba(124,58,237,0.18)', width: 60, height: 60, borderRadius: 16, fontSize: '1.5rem' }}>
                  <FaPalette style={{ color: '#a78bfa' }} />
                </div>
                <h2 className="text-xl font-extrabold text-white mb-2" style={{ fontFamily: 'var(--font-space)' }}>Branding &amp; Web Design</h2>
                <p className="text-sm font-semibold mb-3" style={{ color: '#a78bfa' }}>Complete packages from logo to live website</p>
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#94a3b8' }}>
                  XTS now offers full branding and web design services. From a custom logo to a complete 5-page website — everything handled by Jamie personally. No outsourcing, no agency markup.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Logo Design', 'Website', 'Business Cards', 'Social Media', 'SEO Setup', 'Brand Identity'].map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Starter Brand Package', body: 'Logo, colour palette, font selection, business card, email signature. From $499. Perfect for new businesses.', color: '#60a5fa' },
                  { title: 'Business Brand Package', body: 'Everything in Starter plus a 5-page website, social media setup, SEO basics and more. From $999.', color: '#a78bfa' },
                  { title: 'Complete Brand Package', body: 'The full suite — unlimited pages, booking system, Google Business Profile, brand style guide and 3 months of free updates. From $1,999.', color: '#f59e0b' },
                  { title: 'À La Carte Add-ons', body: 'Need just a logo ($199), flyer ($129), or Google Business Profile setup ($149)? Mix and match exactly what you need.', color: '#34d399' },
                ].map((card) => (
                  <div key={card.title} className="glass-card p-6" style={{ borderColor: `${card.color}22` }}>
                    <div className="flex items-center gap-2 mb-3">
                      <FaCircleCheck style={{ color: card.color }} className="text-sm flex-shrink-0" />
                      <h3 className="font-bold text-white text-sm" style={{ fontFamily: 'var(--font-space)' }}>{card.title}</h3>
                    </div>
                    <p className="text-sm" style={{ color: '#94a3b8', lineHeight: '1.7' }}>{card.body}</p>
                  </div>
                ))}

                <div className="sm:col-span-2 text-center pt-2">
                  <Link href="/branding" className="btn-primary">
                    <FaPalette /> View All Branding Packages <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* Remote Hands Business Service */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <AnimateIn>
          <div className="rounded-3xl p-8 sm:p-10 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.09) 0%, rgba(5,8,22,0.8) 100%)', border: '2px solid rgba(245,158,11,0.25)' }}>
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />
            <div className="absolute top-5 right-5">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.35)', color: '#fbbf24' }}>
                <FaBuilding className="text-xs" /> Business Service
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-1">
                <div className="icon-box mb-4" style={{ background: remoteHands.bg, width: 60, height: 60, borderRadius: 16, fontSize: '1.5rem' }}>
                  <remoteHands.icon style={{ color: remoteHands.color }} />
                </div>
                <h2 className="text-xl font-extrabold text-white mb-2" style={{ fontFamily: 'var(--font-space)' }}>{remoteHands.title}</h2>
                <p className="text-sm font-semibold mb-3" style={{ color: '#f59e0b' }}>{remoteHands.tagline}</p>
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#94a3b8' }}>{remoteHands.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {remoteHands.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full"
                      style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: '#fcd34d' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {remoteHands.details.map((detail) => (
                  <div key={detail.title} className="glass-card p-6" style={{ borderColor: 'rgba(245,158,11,0.15)' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <FaCircleCheck style={{ color: '#f59e0b' }} className="text-sm flex-shrink-0" />
                      <h3 className="font-bold text-white text-sm" style={{ fontFamily: 'var(--font-space)' }}>{detail.title}</h3>
                    </div>
                    <p className="text-sm" style={{ color: '#94a3b8', lineHeight: '1.7' }}>{detail.body}</p>
                  </div>
                ))}
                <div className="sm:col-span-2 glass-card p-6" style={{ borderColor: 'rgba(245,158,11,0.15)', background: 'rgba(245,158,11,0.04)' }}>
                  <p className="text-sm font-semibold text-white mb-2" style={{ fontFamily: 'var(--font-space)' }}>✓ What your IT team handles remotely:</p>
                  <p className="text-sm mb-4" style={{ color: '#94a3b8', lineHeight: '1.7' }}>Software configuration, remote logins, OS management, network settings — your team stays in the driver's seat while Jamie is your hands on the ground.</p>
                  <Link href="/contact" className="inline-flex items-center gap-2 font-bold text-sm" style={{ color: '#f59e0b' }}>
                    Enquire about Remote Hands <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <AnimateIn direction="zoom">
          <div className="max-w-4xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden dot-grid"
            style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #1e3a8a 50%, #7c3aed 100%)' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,255,255,0.07) 0%, transparent 70%)' }} />
            <div className="relative z-10">
              <p className="section-label" style={{ color: '#fcd34d' }}>Get Started</p>
              <h2 className="text-3xl font-extrabold text-white mb-4" style={{ fontFamily: 'var(--font-space)' }}>
                Not sure which service you need?
              </h2>
              <p className="mb-8 max-w-md mx-auto" style={{ color: '#c4b5fd' }}>
                Just call or book and describe the problem — we will figure it out together. No jargon, no pressure.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn-white"><FaBolt /> Book a Technician</Link>
                <a href="tel:0424424444" className="btn-ghost" style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'white' }}>
                  <FaPhone /> 0424 424 444
                </a>
              </div>
            </div>
          </div>
        </AnimateIn>
      </section>
    </div>
  )
}
