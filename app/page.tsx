'use client';

import React from 'react';
import VideoHero from '@/components/ui/video-hero';
import { RadialScrollGallery } from '@/components/ui/radial-scroll-gallery';
import { ServiceSection, type Tab } from '@/components/ui/service-tabs';
import { Check } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const approachStepsByTab: Record<Tab, { num: string; title: string; desc: string }[]> = {
  'AI Automation': [
    { num: '01', title: 'Diagnose', desc: 'I dig into how your business actually runs — where time disappears, where money leaks, and what\'s quietly costing you growth.' },
    { num: '02', title: 'Plan', desc: 'Once the problem is clear, I map the solution. The right tool for the right job — no over-engineering, no off-the-shelf guesswork.' },
    { num: '03', title: 'Build', desc: 'I build the solution tailored to your exact situation. Automations, AI tools, workflows — whatever moves the needle.' },
    { num: '04', title: 'Deliver', desc: 'You get back time, run leaner, and earn more. No jargon, no dependency on me — just a solution that works.' },
  ],
  'Website Design': [
    { num: '01', title: 'Discover', desc: 'I learn your brand, your goals, and who you\'re trying to reach. No wireframes until I understand what the site needs to achieve.' },
    { num: '02', title: 'Design', desc: 'Visual direction, layout systems, type choices, and motion. Every decision made deliberately — not because it looked good somewhere else.' },
    { num: '03', title: 'Build', desc: 'Clean, performant code with smooth animations, full responsiveness, and a CMS if you want to manage content yourself.' },
    { num: '04', title: 'Launch', desc: 'Live and tested. Fast load times, SEO foundations in place, and support available as your business evolves.' },
  ],
  'App Creation': [
    { num: '01', title: 'Scope', desc: 'Define exactly what the app does, who it\'s for, and what success looks like. No wasted sprints chasing the wrong thing.' },
    { num: '02', title: 'Design', desc: 'UX architecture and interface design before a line of code is written. Structure and flow first, pixels second.' },
    { num: '03', title: 'Build', desc: 'Full-stack development with real data, clean APIs, and AI features added where they genuinely add value — not for show.' },
    { num: '04', title: 'Ship', desc: 'Deployed, tested, and in users\' hands. Iterate based on real feedback — not assumptions.' },
  ],
};


// ─── Sections ────────────────────────────────────────────────────────────────

function ApproachSection({ activeTab }: { activeTab: Tab }) {
  const steps = approachStepsByTab[activeTab];
  return (
    <section className='w-full py-24 px-6' style={{ borderTop: '1px solid #1c1c1c' }}>
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-center gap-5 mb-4'>
          <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: '#C5A05A', letterSpacing: '0.1em' }}>02</span>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 300, letterSpacing: '-0.015em', lineHeight: 1 }}>
            The Approach
          </h2>
          <div className='flex-1 h-px' style={{ background: '#1c1c1c' }} />
        </div>
        <p className='mb-2' style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: '#575757', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Scroll to rotate
        </p>
      </div>
      <RadialScrollGallery
        baseRadius={480}
        mobileRadius={200}
        scrollDuration={2000}
        visiblePercentage={42}
        initialRotation={270}
      >
        {(hoveredIndex) =>
          steps.map((item, index) => {
            const isActive = hoveredIndex === index;
            return (
              <div
                key={index}
                className='w-[180px] h-[260px] sm:w-[220px] sm:h-[300px] rounded-xl p-5 flex flex-col gap-3 transition-all duration-500'
                style={{
                  background: isActive ? '#C5A05A' : '#0f0f0f',
                  border: `1px solid ${isActive ? '#C5A05A' : '#1c1c1c'}`,
                  color: isActive ? '#070707' : '#EDE8E0',
                }}
              >
                <div className='flex justify-between items-start'>
                  <span style={{
                    fontFamily: 'var(--font-dm-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    opacity: 0.5,
                  }}>
                    {item.num}
                  </span>
                  {isActive && <Check size={16} />}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: '1.9rem',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.05,
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-jost)',
                  fontSize: '0.76rem',
                  lineHeight: 1.65,
                  opacity: 0.75,
                }}>
                  {item.desc}
                </p>
              </div>
            );
          })
        }
      </RadialScrollGallery>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? 'sent' : 'error');
  };

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #1c1c1c',
    padding: '1rem 0',
    color: '#EDE8E0',
    fontFamily: 'var(--font-jost)',
    fontSize: '0.9rem',
    outline: 'none',
  } as React.CSSProperties;

  return (
    <section id='contact' className='w-full px-6 py-24' style={{ borderTop: '1px solid #1c1c1c' }}>
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-center gap-5 mb-16'>
          <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: '#C5A05A', letterSpacing: '0.1em' }}>03</span>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 300, letterSpacing: '-0.015em', lineHeight: 1 }}>
            Contact
          </h2>
          <div className='flex-1 h-px' style={{ background: '#1c1c1c' }} />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
          <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(3rem, 7vw, 7rem)', fontWeight: 300, lineHeight: 0.95, letterSpacing: '-0.025em' }}>
            Get in touch.<br />
            <em style={{ color: '#C5A05A' }}>Let&apos;s see what&apos;s possible.</em>
          </p>
          <div className='flex flex-col'>
            {[
              { label: 'Email', value: 'adam@adamthor.co.uk', href: 'mailto:adam@adamthor.co.uk' },
              { label: 'X', value: '@adamthorai', href: 'https://x.com/adamthorai' },
              { label: 'Instagram', value: '@adamthorai', href: 'https://instagram.com/adamthorai' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className='flex items-center gap-4 py-5'
                style={{ borderBottom: '1px solid #1c1c1c', textDecoration: 'none', color: '#EDE8E0' }}
              >
                <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#575757', width: '5rem', flexShrink: 0 }}>
                  {link.label}
                </span>
                <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.9rem', flex: 1 }}>
                  {link.value}
                </span>
                <svg width='18' height='18' viewBox='0 0 24 24' fill='none' style={{ opacity: 0.3 }}>
                  <path d='M5 12h14M13 6l6 6-6 6' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
              </a>
            ))}

            {/* Contact form */}
            <form onSubmit={handleSubmit} className='mt-10 flex flex-col gap-0'>
              <div style={{ borderBottom: '1px solid #1c1c1c', marginBottom: 0 }}>
                <input
                  required
                  placeholder='Your name'
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div style={{ borderBottom: '1px solid #1c1c1c' }}>
                <input
                  required
                  type='email'
                  placeholder='Your email'
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div style={{ borderBottom: '1px solid #1c1c1c' }}>
                <textarea
                  required
                  rows={4}
                  placeholder='Tell me about your business...'
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>
              <div className='mt-8 flex items-center justify-between'>
                <button
                  type='submit'
                  disabled={status === 'sending' || status === 'sent'}
                  style={{
                    fontFamily: 'var(--font-dm-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: status === 'sent' ? '#C5A05A' : '#EDE8E0',
                    background: 'transparent',
                    border: '1px solid',
                    borderColor: status === 'sent' ? '#C5A05A' : '#2a2a2a',
                    padding: '0.85rem 2rem',
                    cursor: status === 'sent' ? 'default' : 'pointer',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                >
                  {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message sent' : 'Send message'}
                </button>
                {status === 'error' && (
                  <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.6rem', color: '#8a3a3a', letterSpacing: '0.1em' }}>
                    Something went wrong — try emailing directly.
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav className='fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6' style={{ background: 'linear-gradient(to bottom, rgba(7,7,7,0.95), transparent)' }}>
      <a href='#top' onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem', letterSpacing: '0.25em', color: '#C5A05A', textDecoration: 'none', cursor: 'pointer' }}>AT</a>
      <a href='#contact' style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', letterSpacing: '0.18em', color: '#575757', textDecoration: 'none', textTransform: 'uppercase' }}>
        Work with me
      </a>
    </nav>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeTab, setActiveTab] = React.useState<Tab>('AI Automation');

  return (
    <>
      <Nav />
      <VideoHero
        src='/hero-video.mp4'
        subtitle='AI Developer'
      />
      <main style={{ background: '#070707' }}>
        <ServiceSection activeTab={activeTab} onTabChange={setActiveTab} />
        <ApproachSection activeTab={activeTab} />
        <ContactSection />
        <footer className='w-full px-6 py-6 flex justify-between' style={{ borderTop: '1px solid #1c1c1c', fontFamily: 'var(--font-dm-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', color: '#2a2a2a', textTransform: 'uppercase' }}>
          <span>© 2026 Adam Thor</span>
          <span style={{ color: '#8a6e3a' }}>adamthor.co.uk</span>
        </footer>
      </main>
    </>
  );
}
