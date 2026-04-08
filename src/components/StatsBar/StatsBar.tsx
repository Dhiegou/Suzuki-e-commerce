export default function StatsBar() {
  const stats = [
    { value: '100+', label: 'Anos de História' },
    { value: '15+', label: 'Modelos Disponíveis' },
    { value: '200+', label: 'Concessionárias' },
    { value: '#1', label: 'Em Performance' },
  ];

  return (
    <section className="gsap-stats bg-suzuki-blue py-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="gsap-stats-item">
            <p className="text-3xl md:text-4xl font-display font-bold italic text-white">{stat.value}</p>
            <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
