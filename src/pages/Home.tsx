import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import Lenis from 'lenis';
import Swup from 'swup';
import SwupScrollPlugin from '@swup/scroll-plugin';

import { useGSAPAnimations } from '../hooks/useGSAPAnimations';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import StatsBar from '../components/StatsBar';
import ProductGrid from '../components/ProductGrid';
import ConsorcioSection from '../components/ConsorcioSection';
import LaunchesSection from '../components/LaunchesSection';
import ServicesSection from '../components/ServicesSection';
import BrandsMarquee from '../components/BrandsMarquee';
import AdventuresSection from '../components/AdventuresSection';
import GarageSidebar from '../components/GarageSidebar';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function Home() {
  // ── Refs ──
  const heroSectionRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const swupRef = useRef<Swup | null>(null);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  // ── Scroll reset on reload ──
  useEffect(() => {
    if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    setTimeout(() => window.scrollTo(0, 0), 50);

    const onBeforeUnload = () => window.scrollTo(0, 0);
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, []);

  // ── Lenis Smooth Scroll ──
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.scrollTo(0, { immediate: true });
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => { lenis.raf(time * 1000); });
    };
  }, []);

  // ── Swup Page Transitions ──
  useEffect(() => {
    if (!swupRef.current) {
      swupRef.current = new Swup({
        plugins: [
          new SwupScrollPlugin({
            doScrollingRightAway: false,
            animateScroll: {
              betweenPages: true,
              samePageWithHash: true,
              samePage: true,
            },
          }),
        ],
        animateHistoryBrowsing: true,
      });
    }
    return () => {
      if (swupRef.current) {
        swupRef.current.destroy();
        swupRef.current = null;
      }
    };
  }, []);

  // ── GSAP Scroll Animations ──
  useGSAPAnimations(mainRef, heroSectionRef);

  return (
    <div ref={mainRef} className="min-h-screen font-sans selection:bg-suzuki-red selection:text-white bg-ghost-white">
      <Header scrollToProducts={scrollToProducts} />

      <main>
        <HeroSection heroSectionRef={heroSectionRef} scrollToProducts={scrollToProducts} />
        <StatsBar />
        <ProductGrid scrollToProducts={scrollToProducts} />
        <ConsorcioSection />
        <LaunchesSection />
        <ServicesSection />
        <BrandsMarquee />
        <AdventuresSection />
      </main>

      <GarageSidebar />

      <Footer />
    </div>
  );
}
