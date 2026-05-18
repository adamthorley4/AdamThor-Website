'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  tag: string;
  stat: string;
  image: string;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items: Gallery4Item[];
}

const Gallery4 = ({ title = 'Example Builds', description, items }: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on('select', updateSelection);
    return () => { carouselApi.off('select', updateSelection); };
  }, [carouselApi]);

  return (
    <section className='py-24 px-6 w-full' style={{ borderTop: '1px solid #1c1c1c' }}>
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-end justify-between mb-12'>
          <div>
            <div className='flex items-center gap-5 mb-6'>
              <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: '#C5A05A', letterSpacing: '0.1em' }}>02</span>
              <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 300, letterSpacing: '-0.015em', lineHeight: 1 }}>
                {title}
              </h2>
              <div className='flex-1 h-px' style={{ background: '#1c1c1c' }} />
            </div>
            {description && (
              <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.875rem', color: '#575757', maxWidth: '36rem', lineHeight: 1.7 }}>
                {description}
              </p>
            )}
          </div>
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

      <div className='w-full'>
        <Carousel setApi={setCarouselApi} opts={{ breakpoints: { '(max-width: 768px)': { dragFree: true } } }}>
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
                    <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.8rem', lineHeight: 1.7, color: '#888', marginBottom: '1.25rem' }}>
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
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              style={{ width: '6px', height: '6px', borderRadius: '50%', background: currentSlide === index ? '#C5A05A' : '#1c1c1c', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery4 };
