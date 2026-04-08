export default function ServicesSection() {
  return (
    <section id="services-pin" className="relative h-screen overflow-hidden bg-black text-white">
      <div className="services-bg absolute inset-0 scale-110">
        <img
          src="/service-mechanic.png"
          alt="Pós-venda Suzuki"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            <div className="services-anim-text-wrapper relative h-[1.25rem] sm:h-[1.5rem] md:h-[1.75rem] w-full mb-4">
              <p className="services-anim-text absolute left-0 top-0 bottom-0 my-auto h-max text-suzuki-red text-[28px] sm:text-[42px] md:text-[54px] lg:text-[63px] origin-left font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] inline-block will-change-transform whitespace-nowrap">
                Pós-Venda Suzuki
              </p>
            </div>
            <h2 className="services-title font-display text-4xl md:text-6xl font-bold italic text-white leading-tight mb-6 opacity-0">
              Cuidado Total
            </h2>
            <p className="services-desc text-white/70 text-lg leading-relaxed mb-8 opacity-0">
              Atendimento personalizado, peças genuínas e cuidados de excelência com sua motocicleta. Nossa rede de concessionárias está pronta para cuidar da sua Suzuki.
            </p>
            <div className="services-btns flex flex-col sm:flex-row gap-3 opacity-0">
              <a href="https://suzukimotos.com.br/concessionarias" target="_blank" rel="noopener noreferrer" className="bg-white text-suzuki-blue px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-suzuki-red hover:text-white transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center">
                Encontrar Concessionária
              </a>
              <a href="https://suzukimotos.com.br/servicos" target="_blank" rel="noopener noreferrer" className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-all flex items-center justify-center">
                Agendar Revisão
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
