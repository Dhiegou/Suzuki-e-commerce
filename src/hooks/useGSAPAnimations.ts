import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React from 'react';

gsap.registerPlugin(ScrollTrigger);

export function useGSAPAnimations(mainRef: React.RefObject<HTMLDivElement>, heroSectionRef: React.RefObject<HTMLElement>) {
  useGSAP(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Just set elements to their final states if necessary, or just skip animations
      gsap.set('.gsap-hero-overlay', { opacity: 1 });
      gsap.set('.gsap-hero-badge', { opacity: 1 });
      gsap.set('.gsap-hero-title .line', { opacity: 1, y: 0, scale: 1, rotateX: 0 });
      gsap.set('.gsap-hero-desc', { opacity: 1, y: 0 });
      gsap.set('.gsap-hero-btn', { opacity: 1, scale: 1, y: 0 });
      gsap.set('.gsap-hero-scroll', { opacity: 1, y: 0 });
      gsap.set('.gsap-fade-up', { opacity: 1, y: 0 });
      gsap.set('.gsap-card', { opacity: 1, y: 0, scale: 1 });
      gsap.set('.gsap-stats-item', { opacity: 1, x: 0 });
      gsap.set('.services-title, .services-desc, .services-btns', { opacity: 1, x: 0, y: 0 });
      gsap.set('.wol-intro, .wol-text-1, .wol-text-2, .wol-text-3, .wol-btn', { opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)' });
      return;
    }

    // Hero Master Timeline (Cinematic Intro)
    const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    heroTl.fromTo('.gsap-hero-overlay', 
      { opacity: 0 }, 
      { opacity: 1, duration: 2, ease: 'linear' }
    )
    .fromTo('.gsap-hero-badge', 
      { opacity: 0, y: 20, letterSpacing: '0em' }, 
      { opacity: 1, y: 0, letterSpacing: '0.3em', duration: 1.2 },
      "-=1.5"
    )
    .fromTo('.gsap-hero-title .line', 
      { y: 150, opacity: 0, rotateX: -45, scale: 0.9 }, 
      { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 1.4, stagger: 0.2, transformOrigin: 'top center' },
      "-=1.2"
    )
    .fromTo('.gsap-hero-desc', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1 },
      "-=0.8"
    )
    .fromTo('.gsap-hero-btn', 
      { opacity: 0, scale: 0.8, y: 20 }, 
      { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'back.out(1.5)' },
      "-=0.6"
    )
    .fromTo('.gsap-hero-scroll', 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 1 },
      "-=0.5"
    );

    // Hero Exit Parallax (Quando o usuário dá scroll para baixo)
    if (heroSectionRef.current) {
      gsap.to('.gsap-hero-content', {
        y: -300,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        }
      });
      gsap.to('.gsap-hero-scroll', {
        opacity: 0,
        y: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.2,
        }
      });
    }

    // Fade-in-up for sections
    gsap.utils.toArray<HTMLElement>('.gsap-fade-up').forEach((el) => {
      gsap.fromTo(el,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
    });

    // Typewriter effect applied via ScrollTrigger
    gsap.utils.toArray<HTMLElement>('.gsap-typewriter').forEach((el) => {
      const originalText = el.getAttribute('data-text') || el.innerText;
      // Pre-clear text to avoid flash
      el.innerText = '';
      gsap.to(el, {
        text: {
          value: originalText,
          delimiter: ""
        },
        duration: 0.8,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Parallax for full-bleed images
    gsap.utils.toArray<HTMLElement>('.gsap-parallax').forEach((el) => {
      gsap.to(el, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement!, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    // Horizontal slide for stats
    gsap.fromTo('.gsap-stats-item',
      { x: -40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: '.gsap-stats', start: 'top 80%' }
      }
    );

    // Scale-in for product cards
    gsap.utils.toArray<HTMLElement>('.gsap-card').forEach((el, i) => {
      gsap.fromTo(el,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.7, delay: i * 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        }
      );
    });

    // Services (Pós-Venda) Sequence
    const servicesTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#services-pin',
        start: 'top top',
        end: '+=200%', // Pin for 2 viewport heights
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true, 
        refreshPriority: 2,
      }
    });    
    
    servicesTl
      .fromTo('.services-anim-text', {
        scale: 1, 
        x: () => {
          const wrapper = document.querySelector('.services-anim-text-wrapper');
          const section = document.querySelector('#services-pin');
          const textEl = document.querySelector('.services-anim-text') as HTMLElement;
          if (!wrapper || !section || !textEl) return 0;
          const targetX = section.clientWidth / 2;
          const wrapperLeft = wrapper.getBoundingClientRect().left - section.getBoundingClientRect().left;
          const currentCenterX = wrapperLeft + (textEl.offsetWidth / 2);
          return targetX - currentCenterX;
        },
        y: () => {
          const wrapper = document.querySelector('.services-anim-text-wrapper');
          const section = document.querySelector('#services-pin');
          const textEl = document.querySelector('.services-anim-text') as HTMLElement;
          if (!wrapper || !section || !textEl) return 0;
          const targetY = section.clientHeight / 2;
          const wrapperTop = wrapper.getBoundingClientRect().top - section.getBoundingClientRect().top;
          const currentCenterY = wrapperTop + (textEl.offsetHeight / 2);
          return targetY - currentCenterY;
        },
        transformOrigin: 'left center'
      }, {
        scale: () => window.innerWidth < 640 ? 1 / 2.5 : window.innerWidth < 768 ? 1 / 3.5 : 1 / 4.5,
        x: 0,
        y: 0,
        duration: 2.5,
        ease: 'power3.inOut'
      })
      .fromTo('.services-bg', { scale: 1.15, filter: 'brightness(1)' }, { scale: 1, filter: 'brightness(0.35)', duration: 2.5, ease: 'power2.out' }, "<")
      .fromTo('.services-title', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1 }, "-=0.5")
      .fromTo('.services-desc', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 1 }, "-=0.7")
      .fromTo('.services-btns', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'back.out(1.2)' }, "-=0.6");

    // Way of Life Sequence
    const wolTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#wayoflife-pin',
        start: 'top top',
        end: '+=220%', // Pin temporário menor para agilizar o scroll
        pin: true,
        scrub: 1,
        refreshPriority: 1,
      }
    });

    wolTl
      .fromTo('.wol-bg', { scale: 1.15, filter: 'brightness(1)' }, { scale: 1, filter: 'brightness(0.25)', duration: 2, ease: 'power1.inOut' })
      .to('.wol-intro', { opacity: 0, scale: 1.5, filter: 'blur(10px)', duration: 1.5, ease: 'power2.in' }, "<0.2")
      .fromTo('.wol-text-1', { opacity: 0, y: 150, rotateX: -30, scale: 0.9 }, { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.5, ease: 'power3.out' }, "-=0.5")
      .to('.wol-text-1', { opacity: 0, y: -150, rotateX: 30, scale: 1.1, filter: 'blur(5px)', duration: 1.5, ease: 'power3.in' }, "+=1")
      .fromTo('.wol-text-2', { opacity: 0, y: 150, rotateX: -30, scale: 0.9 }, { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.5, ease: 'power3.out' }, "-=0.5")
      .to('.wol-text-2', { opacity: 0, y: -150, rotateX: 30, scale: 1.1, filter: 'blur(5px)', duration: 1.5, ease: 'power3.in' }, "+=1")
      .fromTo('.wol-text-3', { opacity: 0, y: 150, rotateX: -30, scale: 0.9 }, { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.5, ease: 'power3.out' }, "-=0.5")
      .fromTo('.wol-btn', { opacity: 0, scale: 0.5, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.5)' }, "-=0.5");

  }, { scope: mainRef });
}
