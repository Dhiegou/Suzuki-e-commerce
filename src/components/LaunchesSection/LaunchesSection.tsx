import { ChevronRight } from 'lucide-react';

const LAUNCHES = [
  { name: 'GSX-8S', desc: 'A nova era das Nakeds chega com um motor revolucionário de 776cc, quick shift e potência infinita.', tag: 'NOVIDADE', img: 'https://suzukimotos.com.br/storage/images/uploads/modelos/cores/2026-02-25-20-34-13-cor-1.png', link: 'https://suzukimotos.com.br/gsx-8s' },
  { name: 'V-STROM 800 DE', desc: 'Aventura levada ao extremo. Domine o asfalto e a terra com o modo G (Gravel) avançado.', tag: 'NOVIDADE', img: 'https://suzukimotos.com.br/storage/images/uploads/modelos/cores/2025-11-06-14-43-38-Cor1.png', link: 'https://suzukimotos.com.br/v-strom-800-de' },
];

export default function LaunchesSection() {
  return (
    <section id="lancamentos" className="bg-white py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-display font-bold italic text-suzuki-blue/[0.02] pointer-events-none whitespace-nowrap">
        NOVA GERAÇÃO
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 gsap-fade-up">
          <p className="text-suzuki-red text-xs font-bold uppercase tracking-[0.3em] mb-3">Lançamentos</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold italic text-suzuki-blue">As Mais Recentes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LAUNCHES.map(promo => (
            <div key={promo.name} className="gsap-fade-up group relative rounded-[2rem] bg-ghost-white p-8 sm:p-10 flex flex-col justify-between min-h-[500px] overflow-hidden border border-suzuki-blue/5 hover:border-suzuki-red/20 transition-all hover:shadow-2xl hover:shadow-suzuki-blue/10">
              <div className="absolute inset-0 bg-gradient-to-b from-ghost-white/80 via-transparent to-ghost-white/90 z-0 pointer-events-none" />

              <div className="relative z-20">
                <div className="bg-suzuki-red text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-md inline-block mb-4">
                  {promo.tag}
                </div>
                <h3
                  data-text={promo.name}
                  className="gsap-typewriter font-display text-3xl sm:text-4xl lg:text-5xl font-black italic text-suzuki-blue uppercase min-h-[1.2em]"
                />
              </div>

              <div className="absolute inset-x-0 bottom-24 top-32 p-4 sm:p-8 pointer-events-none z-10 flex items-center justify-center pb-28 sm:pb-8">
                <img src={promo.img} alt={promo.name} className="w-full h-full object-contain scale-[1.25] group-hover:scale-[1.35] group-hover:-translate-y-4 group-hover:rotate-1 transition-all duration-[0.9s] ease-[cubic-bezier(0.19,1,0.22,1)] drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)] group-hover:drop-shadow-[0_30px_30px_rgba(0,0,0,0.25)] will-change-transform" />
              </div>

              <div className="relative z-20 mt-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pointer-events-auto">
                <p className="text-sm font-medium text-suzuki-blue/60 leading-relaxed max-w-sm">{promo.desc}</p>
                <a href={promo.link} className="inline-flex bg-white px-6 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest text-suzuki-blue hover:text-white hover:bg-suzuki-red transition-all items-center gap-2 shadow-lg shadow-suzuki-blue/5 group-hover:scale-105 active:scale-95 flex-shrink-0">
                  Detalhes <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
