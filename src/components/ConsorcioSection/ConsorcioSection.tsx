import { ChevronRight } from 'lucide-react';
import { SuzukiLogo } from '../SuzukiLogo';

export default function ConsorcioSection() {
  return (
    <section id="consorcio" className="bg-ghost-white py-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="gsap-fade-up space-y-6">
          <p className="text-suzuki-red text-xs font-bold uppercase tracking-[0.3em]">Consórcio Nacional Suzuki</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold italic text-suzuki-blue leading-tight">
            Sua Suzuki Zero <br />Sem Pagar Juros.
          </h2>
          <p className="text-suzuki-blue/60 text-lg leading-relaxed">
            Planeje a compra da sua moto ideal de forma inteligente. Com o Consórcio Nacional Suzuki, você investe no seu sonho com as menores parcelas do mercado, sem juros e com a garantia direto da fábrica.
          </p>
          <ul className="space-y-4 pt-2">
            {['Planos em até 80 meses para pagar', 'Zero taxa de adesão ou juros', 'Sorteios mensais e lances livres'].map(item => (
              <li key={item} className="flex items-center gap-3 text-suzuki-blue/80 font-medium">
                <div className="w-8 h-8 rounded-full bg-suzuki-red/10 flex items-center justify-center flex-shrink-0">
                  <ChevronRight className="w-4 h-4 text-suzuki-red" />
                </div>
                {item}
              </li>
            ))}
          </ul>
          <div className="pt-4">
            <a href="https://www.consorcionacionalsuzuki.com.br/" target="_blank" rel="noopener noreferrer" className="bg-suzuki-blue text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-suzuki-red transition-all shadow-xl shadow-suzuki-blue/20 active:scale-95 inline-flex items-center gap-2">
              Simular Consórcio <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="gsap-fade-up relative rounded-[2rem] overflow-hidden aspect-square bg-transparent shadow-2xl group border border-suzuki-blue/5">
          <img src="/suzuki_consorcio_lifestyle.png" alt="Consórcio Suzuki" className="w-full h-full object-cover scale-[1.02] group-hover:scale-[1.08] opacity-90 group-hover:opacity-100 transition-all duration-[2s] ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform" />

          {/* Shine Effect */}
          <div className="absolute inset-0 z-10 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-150%] group-hover:translate-x-[150%] skew-x-[-30deg] transition-transform duration-[1.5s] ease-in-out pointer-events-none" />

          {/* Gradient backdrop */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />

          {/* Selo Consórcio */}
          <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 z-20 flex shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,159,227,0.4)] transition-all duration-500 pointer-events-auto rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 group-hover:scale-105">
            <div className="bg-white/95 flex flex-col items-center justify-center px-3 py-2 sm:px-6 sm:py-4 border-r border-[#009fe3]/10">
              <div className="text-[#002f5b] text-center font-black leading-[0.85] tracking-tighter text-[1rem] sm:text-[1.7rem] uppercase">
                Consórcio<br/>Nacional
              </div>
              <div className="mt-1 sm:mt-2 w-[60px] sm:w-[130px]">
                <SuzukiLogo className="w-full h-auto object-contain" />
              </div>
            </div>
            <div className="bg-[#009fe3]/95 flex flex-col items-center justify-center px-3 py-2 sm:px-8 sm:py-4">
              <div className="text-white text-center font-black leading-[0.9] tracking-tighter text-[1.1rem] sm:text-[1.8rem]">
                Realize<br/>seus sonhos
              </div>
            </div>
          </div>

          {/* 0% Juros badge */}
          <div className="absolute top-4 right-4 bg-suzuki-red rounded-full w-16 h-16 sm:w-28 sm:h-28 flex items-center justify-center text-white flex-col shadow-2xl rotate-12 group-hover:rotate-6 hover:scale-110 transition-all duration-500 z-20 pointer-events-auto border-[3px] sm:border-4 border-white/20 hover:border-white">
            <span className="font-display font-black text-xl sm:text-3xl italic leading-none">0%</span>
            <span className="text-[7px] sm:text-[10px] uppercase font-bold tracking-[0.2em] mt-0 sm:mt-1">Juros</span>
          </div>
        </div>
      </div>
    </section>
  );
}
