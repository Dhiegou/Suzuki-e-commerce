import { motion } from 'motion/react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function AdventuresSection() {
  return (
    <section id="wayoflife-pin" className="relative h-screen overflow-hidden bg-black text-white" style={{ perspective: '1200px' }}>
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/rider-adventure.png"
          alt="Piloto Suzuki na estrada"
          className="wol-bg w-full h-full object-cover origin-center"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-[1] opacity-80" />

      {/* Seamless fade to Footer */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent to-black z-[2]" />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6">
        {/* Intro Module */}
        <div className="wol-intro absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full max-w-5xl px-4">
          <p className="text-suzuki-red text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.2em] sm:tracking-[0.5em] mb-4 text-center">Descubra o nosso</p>
          <h2 className="font-display text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-bold italic tracking-tighter drop-shadow-2xl text-center">SUZUKI ADVENTURES</h2>
          <div className="mt-12 flex flex-col items-center opacity-70">
            <span className="text-[10px] uppercase tracking-[0.3em] mb-3 font-bold">Role para iniciar a viagem</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </div>
        </div>

        {/* Sequence 1 */}
        <div className="wol-text-1 absolute inset-0 max-w-5xl mx-auto opacity-0 flex flex-col items-center justify-center pointer-events-none w-full px-4 text-center">
          <h3 className="font-display text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-bold italic leading-[1.1] text-balance mb-6">
            Compartilhamos sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-suzuki-red to-red-500">paixão por aventura</span>.
          </h3>
          <p className="text-lg md:text-2xl lg:text-3xl font-medium text-white/70 max-w-3xl text-balance leading-relaxed">
            Nossas motocicletas são para aqueles que conhecem suas estradas favoritas e exploram trechos selvagens.
          </p>
        </div>

        {/* Sequence 2 */}
        <div className="wol-text-2 absolute inset-0 max-w-5xl mx-auto opacity-0 flex flex-col items-center justify-center pointer-events-none w-full px-4 text-center">
          <h3 className="font-display text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-bold italic leading-[1.1] text-balance mb-6">
            Buscamos a emoção <br/>nas <span className="text-transparent bg-clip-text bg-gradient-to-r from-suzuki-red to-orange-500">pistas de corrida</span>.
          </h3>
          <p className="text-lg md:text-2xl lg:text-3xl font-medium text-white/70 max-w-3xl text-balance leading-relaxed">
            Porque compartilhamos o mesmo entusiasmo que você. A vontade incontrolável de sair e ir além do horizonte.
          </p>
        </div>

        {/* Sequence 3 & Button */}
        <div className="wol-text-3 absolute inset-0 max-w-5xl mx-auto opacity-0 flex flex-col items-center justify-center pointer-events-auto w-full px-4 text-center">
          <h3 className="font-display text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-bold italic leading-tight mb-8 sm:mb-12">
            Para nós, isso é um <br/>
            <span className="text-suzuki-red tracking-tighter">Estilo de Vida.</span>
          </h3>
          <div className="flex flex-col sm:flex-row gap-5 items-center">
            <a
              href="https://suzukimotos.com.br/suzuki-no-brasil?utm_source=Google&utm_medium=cpc&utm_campaign=21515698302"
              target="_blank"
              rel="noopener noreferrer"
              className="wol-btn bg-white text-suzuki-blue px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-[12px] hover:bg-suzuki-red hover:text-white transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,26,26,0.5)] hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              Way Of Life <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="https://suzukimotos.com.br/suzuki-adventures"
              target="_blank"
              rel="noopener noreferrer"
              className="wol-btn bg-transparent border-2 border-white/30 text-white px-10 py-4 rounded-full font-black uppercase tracking-[0.2em] text-[12px] hover:bg-white/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              Suzuki Adventures <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
