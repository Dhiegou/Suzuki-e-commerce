export default function BrandsMarquee() {
  const brands = [
    { src: 'https://suzukimotos.com.br/images/header/suzuki_logo-v2.svg', alt: 'Suzuki', height: 'h-8 sm:h-10 md:h-12' },
    { src: 'https://suzukimotos.com.br/images/brands/logo_haojue.png', alt: 'Haojue', height: 'h-8 sm:h-10 md:h-12' },
    { src: 'https://suzukimotos.com.br/images/brands/logo_zontes.png', alt: 'Zontes', height: 'h-5 sm:h-7 md:h-8' },
    { src: 'https://suzukimotos.com.br/images/brands/logo_hisun.png', alt: 'Hisun', height: 'h-8 sm:h-10 md:h-14' },
    { src: 'https://suzukimotos.com.br/images/brands/logo_kymco.png', alt: 'Kymco', height: 'h-7 sm:h-8 md:h-10' },
  ];

  const BrandSet = () => (
    <div className="flex flex-shrink-0 gap-12 sm:gap-16 md:gap-32 items-center pr-12 sm:pr-16 md:pr-32">
      {brands.map(b => (
        <img key={b.alt} src={b.src} alt={b.alt} className={`${b.height} w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-500 cursor-pointer`} />
      ))}
    </div>
  );

  return (
    <section id="marcas-mundiais" className="bg-ghost-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="gsap-fade-up max-w-2xl mx-auto mb-16">
          <p className="text-suzuki-red text-xs font-bold uppercase tracking-[0.3em] mb-3">Linha Completa</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold italic text-suzuki-blue leading-tight mb-4">
            As Melhores Marcas Mundiais
          </h2>
          <p className="text-suzuki-blue/60 text-lg">
            Conheça todo o ecossistema JTZ Motors que representa oficialmente as maiores referências em qualidade e design do universo duas rodas no Brasil.
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative w-full overflow-hidden py-12 gsap-fade-up">
        <div className="animate-marquee-right flex w-max relative z-0">
          <BrandSet />
          <BrandSet />
        </div>

        {/* Fading Edges */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-ghost-white via-ghost-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-ghost-white via-ghost-white/80 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
