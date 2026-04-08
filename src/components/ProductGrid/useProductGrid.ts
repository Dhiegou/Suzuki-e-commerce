import { useState, useEffect, useRef } from 'react';
import { useMotorcycles } from '../../hooks/useMotorcycles';

export function useProductGrid() {
  const [filter, setFilter] = useState<'all' | 'motorcycle'>('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const carouselRef = useRef<HTMLElement>(null);

  const { vehicles, loading, error } = useMotorcycles();

  const filteredVehicles = vehicles.filter(v => filter === 'all' || v.type === filter);
  const totalSlides = Math.ceil(filteredVehicles.length / itemsPerSlide);

  // Responsive items per slide
  useEffect(() => {
    const handleResize = () => setItemsPerSlide(window.innerWidth < 768 ? 1 : 3);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection Observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => setIsCarouselVisible(entries[0].isIntersecting),
      { threshold: 0.1 }
    );
    if (carouselRef.current) observer.observe(carouselRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (!isCarouselVisible || isCarouselHovered || totalSlides <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [isCarouselVisible, isCarouselHovered, totalSlides]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50 && currentSlide < totalSlides - 1) setCurrentSlide(prev => prev + 1);
    if (distance < -50 && currentSlide > 0) setCurrentSlide(prev => prev - 1);
  };

  return {
    filter,
    setFilter: (t: 'all' | 'motorcycle') => { setFilter(t); setCurrentSlide(0); },
    currentSlide,
    setCurrentSlide,
    itemsPerSlide,
    isCarouselHovered,
    setIsCarouselHovered,
    carouselRef,
    filteredVehicles,
    totalSlides,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    loading,
    error,
  };
}
