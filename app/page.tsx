'use client';

import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import { RadialScrollGallery } from '@/components/ui/radial-scroll-gallery';
import { Gallery4, type Gallery4Item } from '@/components/ui/gallery4';
import { Check } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const approachSteps = [
  {
    num: '01',
    title: 'Diagnose',
    desc: 'I dig into how your business actually runs — where time disappears, where money leaks, and what\'s quietly costing you growth.',
  },
  {
    num: '02',
    title: 'Plan',
    desc: 'Once the problem is clear, I map the solution. The right tool for the right job — no over-engineering, no off-the-shelf guesswork.',
  },
  {
    num: '03',
    title: 'Build',
    desc: 'I build the solution tailored to your exact situation. Automations, AI tools, workflows — whatever moves the needle.',
  },
  {
    num: '04',
    title: 'Deliver',
    desc: 'You get back time, run leaner, and earn more. No jargon, no dependency on me — just a solution that works.',
  },
];

const builds: Gallery4Item[] = [
  {
    id: 'onboarding',
    tag: 'Automation',
    stat: '4 hrs saved / week',
    title: 'Client onboarding, on autopilot',
    description: 'A coach was spending 4+ hours manually sending welcome emails and contracts. Now it all fires the moment a client books — zero manual input.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1080&q=80',
  },
  {
    id: 'leadfollow',
    tag: 'AI Tool',
    stat: '6 hrs saved / week',
    title: 'Lead follow-up that never drops the ball',
    description: 'A consultant was losing warm leads when life got busy. A custom AI system now tracks every enquiry and follows up at exactly the right time.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1080&q=80',
  },
  {
    id: 'viewings',
    tag: 'Automation',
    stat: '5 hrs saved / week',
    title: 'Viewing follow-ups that actually happen',
    description: 'A property agent was losing leads through manual follow-up. Now a message fires within an hour of every viewing — nothing slips through.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1080&q=80',
  },
  {
    id: 'invoices',
    tag: 'AI Tool',
    stat: '2 hrs saved / week',
    title: 'Invoice chasing without the awkwardness',
    description: 'Automated payment reminders sent on a set schedule — escalating only if needed, stopping the moment payment lands.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1080&q=80',
  },
];

// ─── Sections ────────────────────────────────────────────────────────────────

function ApproachSection() {
  return (
    <section className='w-full py-24 px-6' style={{ borderTop: '1px solid #1c1c1c' }}>
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-center gap-5 mb-4'>
          <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: '#C5A05A', letterSpacing: '0.1em' }}>01</span>
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
          approachSteps.map((item, index) => {
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

function BuildsSection() {
  return (
    <Gallery4
      title='Example Builds'
      description="A sample of what's possible. Every build starts with a real problem."
      items={builds}
    />
  );
}

function ContactSection() {
  return (
    <section className='w-full px-6 py-24' style={{ borderTop: '1px solid #1c1c1c' }}>
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-center gap-5 mb-16'>
          <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: '#C5A05A', letterSpacing: '0.1em' }}>03</span>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 300, letterSpacing: '-0.015em', lineHeight: 1 }}>
            Contact
          </h2>
          <div className='flex-1 h-px' style={{ background: '#1c1c1c' }} />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(3rem, 7vw, 7rem)',
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: '-0.025em',
          }}>
            Tell me about your business.<br />
            <em style={{ color: '#C5A05A' }}>I&apos;ll find the gaps.</em>
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
                className='flex items-center gap-4 py-5 group'
                style={{ borderBottom: '1px solid #1c1c1c', textDecoration: 'none', color: '#EDE8E0' }}
              >
                <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#575757', width: '5rem', flexShrink: 0 }}>
                  {link.label}
                </span>
                <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.9rem', flex: 1 }}>
                  {link.value}
                </span>
                <svg width='18' height='18' viewBox='0 0 24 24' fill='none' style={{ opacity: 0.3, transition: 'opacity 0.2s, transform 0.2s' }}>
                  <path d='M5 12h14M13 6l6 6-6 6' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
              </a>
            ))}
            <a href='mailto:adam@adamthor.co.uk' />
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
      <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem', letterSpacing: '0.25em', color: '#C5A05A' }}>AT</span>
      <a href='#contact' style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', letterSpacing: '0.18em', color: '#575757', textDecoration: 'none', textTransform: 'uppercase' }}>
        Get in touch
      </a>
    </nav>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Nav />
      <ScrollExpandMedia
        mediaType='image'
        mediaSrc='https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=1280&q=80'
        bgImageSrc='https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80'
        title='Adam Thor'
        date='AI Developer'
        scrollToExpand='Scroll to explore'
        textBlend
      >
        <ApproachSection />
        <BuildsSection />
        <ContactSection />
        <footer className='w-full px-6 py-6 flex justify-between' style={{ borderTop: '1px solid #1c1c1c', fontFamily: 'var(--font-dm-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', color: '#2a2a2a', textTransform: 'uppercase' }}>
          <span>© 2026 Adam Thor</span>
          <span style={{ color: '#8a6e3a' }}>adamthor.co.uk</span>
        </footer>
      </ScrollExpandMedia>
    </>
  );
}
