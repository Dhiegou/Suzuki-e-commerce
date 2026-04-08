import { SuzukiLogo } from '../SuzukiLogo';
import { useNewsletter } from './useNewsletter';

export default function Footer() {
  const newsletter = useNewsletter();
  return (
    <footer className="bg-black text-white pt-24 pb-8 relative overflow-hidden -mt-[2px] z-20">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-suzuki-blue/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Institucional */}
          <div className="lg:col-span-4 space-y-8">
            <SuzukiLogo className="h-10 w-auto" />
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Há mais de 100 anos redefinindo limites, paixão e performance. Suzuki é sinônimo de inovação e confiança mundial.
            </p>
            <div className="flex gap-4 border-b border-white/10 pb-8 lg:border-none lg:pb-0">
              <a href="https://www.instagram.com/suzukimotosbrasil/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-suzuki-red transition-all group border border-white/10 hover:border-suzuki-red" aria-label="Instagram da Suzuki">
                <span className="font-display font-bold italic text-white group-hover:scale-110 transition-transform">IG</span>
              </a>
              <a href="https://www.facebook.com/SuzukiMotosBrasil/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-suzuki-red transition-all group border border-white/10 hover:border-suzuki-red" aria-label="Facebook da Suzuki">
                <span className="font-display font-bold italic text-white group-hover:scale-110 transition-transform">FB</span>
              </a>
              <a href="https://www.youtube.com/user/suzukimotos" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-suzuki-red transition-all group border border-white/10 hover:border-suzuki-red" aria-label="YouTube da Suzuki">
                <span className="font-display font-bold italic text-white group-hover:scale-110 transition-transform">YT</span>
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="font-display font-bold italic uppercase tracking-widest text-sm text-white border-l-2 border-suzuki-red pl-3">Motocicletas</h4>
            <ul className="space-y-4 text-sm font-medium">
              {[
                { label: 'Esportivas', link: 'https://suzukimotos.com.br/motos#super-sport' },
                { label: 'Naked', link: 'https://suzukimotos.com.br/motos#naked' },
                { label: 'Adventure', link: 'https://suzukimotos.com.br/motos#big-trail' },
                { label: 'Scooter', link: 'https://suzukimotos.com.br/motos' },
                { label: 'Lançamentos', link: 'https://suzukimotos.com.br/' },
              ].map(m => (
                <li key={m.label}><a href={m.link} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white hover:translate-x-2 inline-block transition-transform">{m.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="font-display font-bold italic uppercase tracking-widest text-sm text-white border-l-2 border-suzuki-red pl-3">Suzuki</h4>
            <ul className="space-y-4 text-sm font-medium">
              {[
                { label: 'Sobre a JTZ Motors', link: 'https://jtzmotors.com.br/' },
                { label: 'Concessionárias', link: 'https://suzukimotos.com.br/concessionarias' },
                { label: 'Consórcio Nacional', link: 'https://www.consorcionacionalsuzuki.com.br/' },
                { label: 'Peças Oficiais', link: 'https://suzukimotos.com.br/pecas' },
                { label: 'Recall', link: 'https://suzukimotos.com.br/recall' },
              ].map(l => (
                <li key={l.label}><a href={l.link} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white hover:translate-x-2 inline-block transition-transform">{l.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="font-display font-bold italic uppercase tracking-widest text-sm text-white">Inscreva-se</h4>
            <p className="text-sm text-white/50 leading-relaxed">
              Receba aventuras exclusivas, convites para eventos e as novidades mais quentes da Suzuki antes de todo mundo.
            </p>
            <form onSubmit={newsletter.submit} className="space-y-4">
              <div className="flex bg-white/5 rounded-full p-1.5 border border-white/10 focus-within:border-suzuki-red transition-colors backdrop-blur-sm">
                <input
                  type="email"
                  value={newsletter.email}
                  onChange={e => newsletter.setEmail(e.target.value)}
                  placeholder="Informe seu melhor e-mail"
                  className="flex-1 bg-transparent px-5 text-sm focus:outline-none placeholder:text-white/30 text-white"
                  aria-label="E-mail para newsletter"
                  disabled={newsletter.status === 'loading'}
                />
                <button 
                  type="submit"
                  disabled={newsletter.status === 'loading'}
                  className="bg-white text-black px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-suzuki-red hover:text-white transition-colors shadow-lg shadow-white/10 disabled:opacity-50"
                >
                  {newsletter.status === 'loading' ? 'Enviando...' : 'Assinar'}
                </button>
              </div>
              
              <div className="flex items-start gap-2 px-2">
                <input
                  type="checkbox"
                  id="newsletter-lgpd"
                  checked={newsletter.lgpdConsent}
                  onChange={e => newsletter.setLgpdConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-suzuki-red focus:ring-suzuki-red"
                />
                <label htmlFor="newsletter-lgpd" className="text-[10px] text-white/50 leading-relaxed">
                  Concordo em receber comunicações da Suzuki e aceito a política de privacidade. O consentimento pode ser revogado a qualquer momento.*
                </label>
              </div>

              {newsletter.status === 'error' && (
                <p className="text-[11px] text-red-400 font-medium px-2">{newsletter.errorMessage}</p>
              )}
              {newsletter.status === 'success' && (
                <p className="text-[11px] text-green-400 font-medium px-2">Inscrição realizada com sucesso!</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 saturate-0 opacity-50 hover:opacity-100 hover:saturate-100 transition-all cursor-default">
            <span className="font-display font-black italic text-xl tracking-tighter">JTZ MOTORS</span>
            <div className="h-4 w-px bg-white/20" />
            <img src="https://suzukimotos.com.br/images/header/suzuki_logo-v2.svg" alt="Suzuki Logo" className="h-4 w-auto brightness-0 invert" />
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            <a href="https://suzukimotos.com.br/politica-de-privacidade" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="https://suzukimotos.com.br/termos-de-uso" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="https://suzukimotos.com.br/politica-de-cookies" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Gestão de Cookies</a>
          </div>

          <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/30 text-center lg:text-right">
            Copyright © 2026 Suzuki / JTZ.<br className="hidden lg:block" />Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
