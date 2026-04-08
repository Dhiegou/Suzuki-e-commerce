import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Bike, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProductGrid } from './useProductGrid';
import { ProductGridProps } from './ProductGrid.types';
import { useGarage } from '../../contexts/GarageContext';

const IMAGE_ADJUSTMENTS: Record<string, string> = {
  'hayabusa': 'group-hover:scale-[1.12]',
  'vstrom1050': 'group-hover:scale-[1.12]',
  'gsx_s1000': 'group-hover:scale-[1.12]',
  'gsxr1000': 'group-hover:scale-[1.12]',
  'gsx_s1000gx': 'group-hover:scale-[1.12]',
  'gsx_s1000gt': 'group-hover:scale-[1.12]',
  'gsx_8s': 'group-hover:scale-[1.12]',
  'vstrom_800_de': 'group-hover:scale-[1.12]',
  'gsxr1000r_2024': 'group-hover:scale-[1.12]',
};

export default function ProductGrid({ scrollToProducts }: ProductGridProps) {
  const navigate = useNavigate();
  const { addToGarage } = useGarage();
  const {
    filter,
    setFilter,
    currentSlide,
    setCurrentSlide,
    itemsPerSlide,
    setIsCarouselHovered,
    carouselRef,
    filteredVehicles,
    totalSlides,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    loading,
    error,
  } = useProductGrid();

  const handleInterest = (motoName: string) => {
    navigate(`/interesse?moto=${encodeURIComponent(motoName)}`);
  };

  return (
    <section
      id="products"
      ref={carouselRef}
      onMouseEnter={() => setIsCarouselHovered(true)}
      onMouseLeave={() => setIsCarouselHovered(false)}
      className="max-w-7xl mx-auto px-6 py-24"
    >
      <div className="gsap-fade-up flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <p className="text-suzuki-red text-xs font-bold uppercase tracking-[0.3em] mb-3">Ofertas</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold italic text-suzuki-blue">Motos em <br />Oferta</h2>
          <p className="mt-4 text-suzuki-blue/50 font-medium">Qual você quer levar para casa hoje?</p>
        </div>
        <div className="flex gap-2">
          {(['all', 'motorcycle'] as const).map((t) => (
            <button
              key={t}
              id={`filter-${t}`}
              onClick={() => setFilter(t)}
              className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                filter === t
                  ? 'bg-suzuki-blue text-white shadow-lg shadow-suzuki-blue/20'
                  : 'bg-white text-suzuki-blue/40 border border-suzuki-blue/10 hover:border-suzuki-blue/30'
              }`}
            >
              {t === 'all' ? 'Todas' : 'Motos'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex gap-6 w-full pb-8 overflow-hidden touch-none px-1">
          {Array.from({ length: itemsPerSlide }).map((_, i) => (
            <div key={i} className="animate-pulse flex-shrink-0 w-full md:w-[calc(33.333%-1rem)] bg-white rounded-3xl border border-suzuki-blue/5 overflow-hidden flex flex-col aspect-[3/4]">
              <div className="bg-gray-200 h-16 w-full" />
              <div className="h-56 bg-gray-100" />
              <div className="p-5 flex-1 flex flex-col">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" />
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
                <div className="mt-auto flex gap-2">
                   <div className="h-10 bg-gray-200 rounded-full w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="py-24 text-center bg-red-50/50 rounded-3xl border border-red-100 mx-1">
          <p className="text-red-500 font-bold uppercase tracking-wider mb-2">Não foi possível carregar as ofertas</p>
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      ) : (
        <div
          className="relative overflow-hidden w-full pb-8 touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className={`w-full flex-shrink-0 grid grid-cols-1 ${itemsPerSlide === 3 ? 'md:grid-cols-3' : ''} gap-6 px-1`}>
              <AnimatePresence mode="popLayout">
                {filteredVehicles.slice(slideIndex * itemsPerSlide, slideIndex * itemsPerSlide + itemsPerSlide).map((vehicle) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={vehicle.id}
                    className="gsap-card group bg-white rounded-3xl border border-suzuki-blue/5 hover:border-suzuki-red/20 transition-all duration-500 hover:shadow-2xl hover:shadow-suzuki-blue/10 flex flex-col relative z-0 hover:z-30"
                  >
                    <div className="bg-suzuki-blue px-5 py-3 rounded-t-[1.4rem] relative z-20 flex justify-between items-center">
                      <h3 className="font-display text-lg font-bold italic text-white uppercase tracking-wide">{vehicle.name}</h3>
                      <button 
                        onClick={() => addToGarage(vehicle)}
                        className="text-white/40 hover:text-suzuki-red transition-colors p-1 cursor-pointer hover:scale-110 active:scale-95"
                        title="Salvar na Garagem"
                      >
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
                    </div>

                    <div className="relative aspect-[4/3] bg-ghost-white z-10">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className={`w-full h-full object-contain drop-shadow-lg group-hover:-translate-y-3 group-hover:drop-shadow-[0_30px_30px_rgba(0,0,0,0.15)] transition-all duration-[0.8s] ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform relative z-30 ${IMAGE_ADJUSTMENTS[vehicle.id] || 'group-hover:scale-110'}`}
                        loading="lazy"
                      />
                    </div>

                    <div className="p-5 flex flex-col flex-1 bg-white rounded-b-3xl relative z-20">
                      <div className="mb-3">
                        <p className="text-xs text-suzuki-blue/40 font-bold uppercase tracking-wider">A partir de</p>
                        <p className="text-2xl font-display font-bold italic text-suzuki-blue">R$ {vehicle.price.toLocaleString('pt-BR')}<span className="text-sm font-sans font-normal text-suzuki-blue/40">,00</span></p>
                      </div>
                      <p className="text-suzuki-blue/60 text-sm leading-relaxed mb-4">{vehicle.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {vehicle.features.map(f => (
                          <span key={f} className="text-[9px] font-bold uppercase tracking-wider bg-suzuki-blue/5 text-suzuki-blue/50 px-2.5 py-1 rounded-full">{f}</span>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-auto">
                        <button
                          onClick={() => {
                            handleInterest(vehicle.name);
                          }}
                          className="flex-1 bg-suzuki-blue text-white py-3 rounded-full font-bold uppercase tracking-wider text-[11px] hover:bg-suzuki-red transition-all shadow-md active:scale-95 transform cursor-pointer hover:shadow-lg"
                        >
                          Tenho Interesse
                        </button>
                        <button
                          onClick={() => addToGarage(vehicle)}
                          className="px-4 py-3 rounded-full font-bold uppercase tracking-wider text-[11px] bg-suzuki-red text-white hover:bg-suzuki-red/80 hover:shadow-lg hover:shadow-suzuki-red/30 transition-all cursor-pointer flex items-center gap-2 active:scale-95 hover:scale-[1.03]"
                        >
                          <Bike className="w-3.5 h-3.5" />
                          Salvar
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        {totalSlides > 1 && (
          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
              disabled={currentSlide === 0}
              className="p-3 rounded-full border border-suzuki-blue/20 text-suzuki-blue hover:bg-suzuki-blue hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-suzuki-blue transition-colors"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-3 rounded-full transition-all ${currentSlide === idx ? 'bg-suzuki-red w-8' : 'bg-suzuki-blue/20 hover:bg-suzuki-blue/40 w-3'}`}
                  aria-label={`Ir para slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentSlide(prev => Math.min(totalSlides - 1, prev + 1))}
              disabled={currentSlide === totalSlides - 1}
              className="p-3 rounded-full border border-suzuki-blue/20 text-suzuki-blue hover:bg-suzuki-blue hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-suzuki-blue transition-colors"
              aria-label="Próximo slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      )}
    </section>
  );
}
