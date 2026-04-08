import { useState, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { useMotorcycles, MEGA_MENU_CATEGORIES, type MotorcycleCategory } from '../../hooks/useMotorcycles';

export function MotosMegaMenu() {
  const [activeCategory, setActiveCategory] = useState<MotorcycleCategory | 'TODOS'>('TODOS');

  const { megaMenuMotos, loading, error } = useMotorcycles();

  const filteredMotos = useMemo(() => {
    if (activeCategory === 'TODOS') return megaMenuMotos;
    return megaMenuMotos.filter(m => m.category === activeCategory);
  }, [activeCategory, megaMenuMotos]);

  return (
    <div className="fixed top-[72px] left-0 w-full pt-0 opacity-0 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:pointer-events-auto group-focus-within/nav:opacity-100 group-focus-within/nav:pointer-events-auto transition-all duration-300 z-50">
      <div className="bg-white shadow-2xl flex border-t-[3px] border-suzuki-red max-h-[calc(100vh-72px)]">
        {/* ── Sidebar: Marcas do Grupo ── */}
        <div className="w-[200px] flex-shrink-0 bg-[#f4f4f4] flex flex-col items-start py-6 pl-8 gap-2 border-r border-[#e0e0e0]">
          <span className="font-bold text-[9px] uppercase tracking-[0.15em] text-[#999] mb-3 pl-4">Marcas do Grupo</span>
          {['SUZUKI', 'HAOJUE', 'ZONTES', 'HISUN', 'KYMCO'].map(brand => (
            <button
              key={brand}
              className={`text-[11px] font-bold tracking-[0.1em] uppercase transition-all w-full text-left px-4 py-2.5 border-l-[3px] rounded-r-md ${
                brand === 'SUZUKI'
                  ? 'border-suzuki-red text-suzuki-blue bg-white shadow-sm'
                  : 'border-transparent text-[#777] hover:text-suzuki-red hover:bg-white/60'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* ── Content Area ── */}
        <div className="flex-1 bg-white flex flex-col overflow-hidden">
          {/* Category Filters */}
          <div className="flex gap-1.5 px-8 pt-5 pb-0 flex-wrap">
            {MEGA_MENU_CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.12em] transition-all border ${
                  activeCategory === cat.value
                    ? 'bg-suzuki-blue text-white border-suzuki-blue shadow-sm'
                    : 'text-[#888] border-[#e0e0e0] hover:bg-[#f0f0f0] hover:text-suzuki-blue hover:border-suzuki-blue/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="mx-8 mt-3 border-b border-[#eee]" />

          {/* Grid of Motorcycles */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden px-8 py-5">
            {loading ? (
              <div className="grid grid-cols-4 xl:grid-cols-6 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-white border border-[#eaeaea] rounded-xl flex flex-col items-center p-3 h-[160px]">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-1" />
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
                    <div className="flex-1 w-full bg-gray-100 rounded-lg mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/3 mb-1" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="w-full h-full flex flex-col items-center justify-center py-10 opacity-60">
                <p className="text-[#888] text-[10px] font-bold uppercase tracking-widest text-center mt-2">Falha ao se conectar com o servidor<br/><span className="text-[8px] font-normal lowercase">{error}</span></p>
              </div>
            ) : (
            <div className="grid grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredMotos.map(moto => (
                <a
                  key={moto.id}
                  href={moto.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/moto flex flex-col items-center bg-white hover:bg-[#f8f9fa] rounded-xl transition-all border border-transparent hover:border-suzuki-blue/10 p-3 cursor-pointer hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 relative"
                  onClick={(e) => { e.stopPropagation(); }}
                >
                  {/* Badge */}
                  {moto.badge && (
                    <span className="absolute top-2 left-2 bg-suzuki-blue text-white text-[7px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded-full z-10 shadow-sm">
                      {moto.badge}
                    </span>
                  )}

                  {/* Name */}
                  <span className="text-[10px] font-black text-suzuki-blue uppercase text-center tracking-[0.08em] w-full block leading-tight mb-1 min-h-[28px] flex items-center justify-center">
                    {moto.name}
                  </span>

                  {/* Image */}
                  <div className="h-20 w-full flex items-center justify-center my-1">
                    <img
                      src={moto.image}
                      alt={moto.name}
                      className="max-h-full max-w-full object-contain group-hover/moto:scale-[1.12] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
                      loading="lazy"
                    />
                  </div>

                  {/* Price */}
                  <div className="text-center w-full border-t border-suzuki-blue/5 pt-2 mt-1">
                    <span className="text-[8px] text-[#999] uppercase tracking-[0.15em] block font-bold">A partir de</span>
                    {moto.priceNote && (
                      <span className="text-[8px] text-[#bbb] line-through block">{moto.priceNote}</span>
                    )}
                    <span className="text-[13px] font-black italic text-[#222] tracking-tight block leading-none mt-0.5">
                      R$ {moto.price.toLocaleString('pt-BR')}
                    </span>
                  </div>

                  {/* CTA */}
                  <span className="mt-2 text-[8px] font-bold uppercase tracking-[0.12em] text-suzuki-blue/60 group-hover/moto:text-suzuki-red transition-colors inline-flex items-center border-b border-transparent group-hover/moto:border-suzuki-red pb-0.5">
                    SAIBA MAIS <ChevronRight className="w-2.5 h-2.5 ml-0.5" />
                  </span>
                </a>
              ))}
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
