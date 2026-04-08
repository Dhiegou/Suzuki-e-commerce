import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import EngineSoundButton from '../EngineSoundButton';

interface HeroSectionProps {
  heroSectionRef: React.RefObject<HTMLElement>;
  scrollToProducts: () => void;
}

export default function HeroSection({ heroSectionRef, scrollToProducts }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Video load handler
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => setVideoLoaded(true);
      video.addEventListener('canplaythrough', handleCanPlay);
      if (video.readyState >= 4) setVideoLoaded(true);
      return () => video.removeEventListener('canplaythrough', handleCanPlay);
    }
  }, []);

  // Cinematic autoplay, looping at 93% of video duration
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration * 0.93) {
        video.currentTime = 0;
        video.play();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    const attemptPlay = () => {
      video.play().catch((e) => {
        console.log('Autoplay temporarily prevented by browser:', e);
      });
    };

    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      video.addEventListener('canplay', attemptPlay, { once: true });
    }

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [videoLoaded]);

  return (
    <section
      ref={heroSectionRef}
      className="relative w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Poster/Fallback Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/moto.jpg"
          alt="Suzuki Motorcycle"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
        />
      </div>

      {/* Video Background */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster="/moto.jpg"
          className="w-full h-full object-cover transform scale-105"
        >
          <source src="/moto.webm" type="video/webm" />
          <source src="/moto.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-suzuki-blue/80 via-transparent to-suzuki-blue/90 z-[1] gsap-hero-overlay opacity-0" />

      <div className="text-center z-10 px-6 gsap-hero-content pt-20">
        <p className="gsap-hero-badge text-sm md:text-base font-bold uppercase text-white/60 mb-4 opacity-0 inline-block">Way of Life</p>

        <h1 className="gsap-hero-title font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold italic leading-[0.85] tracking-tighter text-white mb-6 drop-shadow-2xl" style={{ perspective: '1000px' }}>
          <div className="overflow-hidden pb-2"><div className="line opacity-0 relative">Estilo de</div></div>
          <div className="overflow-hidden pt-2"><div className="line opacity-0 text-suzuki-red relative">Vida!</div></div>
        </h1>

        <p className="gsap-hero-desc text-lg md:text-2xl font-medium text-white/80 max-w-2xl mx-auto mb-10 opacity-0">
          Traçando linhas, acelerando emoções. A verdadeira potência exige atitude e adrenalina.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{ perspective: '1000px' }}>
          <button
            onClick={scrollToProducts}
            className="gsap-hero-btn opacity-0 bg-suzuki-red text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-red-600 transition-all shadow-2xl shadow-suzuki-red/40 hover:scale-105 hover:-translate-y-1 active:scale-95"
          >
            Dominar as Ruas
          </button>
          
          <EngineSoundButton 
            className="gsap-hero-btn opacity-0"
            audioUrl="https://suzukimotos.com.br/storage/public/audio/GSX-S1000GX_M4_engine_sound.mp3" 
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 z-10 flex flex-col items-center gap-2 gsap-hero-scroll opacity-0">
        <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">Ignite the engine</span>
        <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
            <ChevronDown className="w-6 h-6 text-white/40" />
        </motion.div>
      </div>
    </section>
  );
}
