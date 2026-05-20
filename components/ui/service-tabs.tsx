'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { type Gallery4Item } from '@/components/ui/gallery4';

// ─── Data ─────────────────────────────────────────────────────────────────────

const automationItems: Gallery4Item[] = [
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

const websiteItems: Gallery4Item[] = [
  {
    id: 'luxury-brand',
    tag: 'Website Design',
    stat: 'Custom build',
    title: 'High-end brand presence',
    description: 'Minimal, editorial layouts with intentional whitespace, refined typography, and motion that feels considered. Built for brands that compete on perception.',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1080&q=80',
  },
  {
    id: 'scroll-animation',
    tag: 'Website Design',
    stat: 'Scroll-animated',
    title: 'Immersive scroll experiences',
    description: 'Scroll-triggered animations, parallax layers, and cinematic section transitions that keep visitors engaged from the first pixel to the final CTA.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1080&q=80',
  },
  {
    id: 'ecommerce',
    tag: 'Website Design',
    stat: 'Conversion-focused',
    title: 'Product storefronts that sell',
    description: 'Clean product showcases with frictionless checkout flows, trust signals baked in, and performance optimised for conversion — not just looks.',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1080&q=80',
  },
  {
    id: 'portfolio-site',
    tag: 'Website Design',
    stat: 'Fully responsive',
    title: 'Creative portfolios and studios',
    description: 'Bold type systems, expressive grid layouts, and a visual identity that stands out. Built to make a first impression that actually sticks.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1080&q=80',
  },
];

const appItems: Gallery4Item[] = [
  {
    id: 'dashboard',
    tag: 'App',
    stat: 'Real-time data',
    title: 'Analytics and reporting dashboards',
    description: 'Clean data interfaces with live charts, filterable tables, and the kind of clarity that makes complex information feel effortless to read.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1080&q=80',
  },
  {
    id: 'ai-app',
    tag: 'AI App',
    stat: 'AI-powered',
    title: 'AI-powered productivity tools',
    description: 'Apps with intelligence built in from the start — natural language inputs, smart suggestions, and AI features woven into the core workflow rather than bolted on.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1080&q=80',
  },
  {
    id: 'mobile-app',
    tag: 'App',
    stat: 'Mobile-first',
    title: 'Mobile apps for iOS and Android',
    description: 'Native-feeling mobile apps with smooth interactions, offline support, and push notifications — built to live on the home screen, not gather dust.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1080&q=80',
  },
  {
    id: 'saas-platform',
    tag: 'SaaS',
    stat: 'Subscription-ready',
    title: 'SaaS platforms with auth and billing',
    description: 'Full-stack platforms with user accounts, role permissions, Stripe billing, and an admin panel — everything needed to go from idea to paying customers.',
    image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=1080&q=80',
  },
];

// ─── Tab config ───────────────────────────────────────────────────────────────

export type Tab = 'AI Automation' | 'Website Design' | 'App Creation';

const TABS: Tab[] = ['AI Automation', 'Website Design', 'App Creation'];

const TAB_DATA: Record<Tab, { items: Gallery4Item[]; description: string }> = {
  'AI Automation': {
    items: automationItems,
    description: "A sample of what's possible. Every build starts with a real problem.",
  },
  'Website Design': {
    items: websiteItems,
    description: 'Custom websites with high-end design, scroll animations, and a brand identity that stands out from the crowd.',
  },
  'App Creation': {
    items: appItems,
    description: 'Full-stack applications with clean UIs, real-time data, and AI capabilities built in from the start.',
  },
};

// ─── Carousel ─────────────────────────────────────────────────────────────────

interface ServiceCarouselProps {
  items: Gallery4Item[];
  onApiReady: (api: CarouselApi) => void;
}

function ServiceCarousel({ items, onApiReady }: ServiceCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    onApiReady(api);
    const update = () => setCurrentSlide(api.selectedScrollSnap());
    update();
    api.on('select', update);
    return () => { api.off('select', update); };
  }, [api, onApiReady]);

  return (
    <div className='w-full'>
      <Carousel setApi={setApi} opts={{ breakpoints: { '(max-width: 768px)': { dragFree: true } } }}>
        <CarouselContent className='ml-0 2xl:ml-[max(6rem,calc(50vw-700px))]'>
          {items.map((item) => (
            <CarouselItem key={item.id} className='max-w-[320px] pl-[20px] lg:max-w-[380px]'>
              <div className='group relative h-full min-h-[28rem] max-w-full overflow-hidden rounded-xl lg:aspect-[16/9]'>
                <img
                  src={item.image}
                  alt={item.title}
                  className='absolute h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105'
                />
                <div className='absolute inset-0 h-full' style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(7,7,7,0.5) 50%, rgba(7,7,7,0.92) 100%)' }} />
                <div className='absolute inset-x-0 bottom-0 flex flex-col items-start p-6'>
                  <div className='flex items-center gap-3 mb-3'>
                    <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C5A05A', border: '1px solid #8a6e3a', padding: '0.2rem 0.5rem' }}>
                      {item.tag}
                    </span>
                    <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.6rem', color: '#575757', letterSpacing: '0.08em' }}>
                      {item.stat}
                    </span>
                  </div>
                  <h3 className='mb-2' style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.6rem', fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1.15, color: '#EDE8E0' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.8rem', lineHeight: 1.7, color: '#888' }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className='mt-6 flex justify-center gap-2'>
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            style={{ width: '6px', height: '6px', borderRadius: '50%', background: currentSlide === index ? '#C5A05A' : '#1c1c1c', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

interface ServiceSectionProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function ServiceSection({ activeTab, onTabChange }: ServiceSectionProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    setCarouselApi(undefined);
    setCanScrollPrev(false);
    setCanScrollNext(false);
  }, [activeTab]);

  const handleApiReady = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCarouselApi(api);
    const update = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    update();
    api.on('select', update);
  }, []);

  const { items, description } = TAB_DATA[activeTab];

  return (
    <section className='py-24 w-full' style={{ borderTop: '1px solid #1c1c1c' }}>
      <div className='max-w-7xl mx-auto px-6'>
        {/* Section header */}
        <div className='flex items-center gap-5 mb-10'>
          <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: '#C5A05A', letterSpacing: '0.1em' }}>01</span>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 300, letterSpacing: '-0.015em', lineHeight: 1 }}>
            Services
          </h2>
          <div className='flex-1 h-px' style={{ background: '#1c1c1c' }} />
        </div>

        {/* Tab switcher */}
        <div className='flex gap-8 mb-10' style={{ borderBottom: '1px solid #1c1c1c' }}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: isActive ? '#EDE8E0' : '#575757',
                  background: 'none',
                  border: 'none',
                  borderBottom: `2px solid ${isActive ? '#C5A05A' : 'transparent'}`,
                  paddingBottom: '0.85rem',
                  marginBottom: '-1px',
                  cursor: 'pointer',
                  transition: 'color 0.2s, border-color 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Description + nav arrows */}
        <div className='flex items-end justify-between mb-10'>
          <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.875rem', color: '#575757', maxWidth: '36rem', lineHeight: 1.7 }}>
            {description}
          </p>
          <div className='hidden md:flex gap-2 shrink-0 ml-8'>
            <Button
              size='icon' variant='ghost'
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              style={{ border: '1px solid #1c1c1c', color: canScrollPrev ? '#C5A05A' : '#2a2a2a', background: 'transparent' }}
            >
              <ArrowLeft className='size-4' />
            </Button>
            <Button
              size='icon' variant='ghost'
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              style={{ border: '1px solid #1c1c1c', color: canScrollNext ? '#C5A05A' : '#2a2a2a', background: 'transparent' }}
            >
              <ArrowRight className='size-4' />
            </Button>
          </div>
        </div>
      </div>

      {/* Carousel — full width, fades between tabs */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ServiceCarousel items={items} onApiReady={handleApiReady} />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
