import { useSearchParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { LeadForm } from '../../components/LeadForm/LeadForm';
import { SuzukiLogo } from '../../components/SuzukiLogo';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';

export default function InteressePage() {
  const [searchParams] = useSearchParams();
  const moto = searchParams.get('moto');

  const scrollToProducts = () => {
    window.location.href = '/#products';
  };

  return (
    <div className="min-h-screen bg-ghost-white selection:bg-suzuki-red selection:text-white">
      <Header scrollToProducts={scrollToProducts} />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb / Back button */}
          <div className="mb-12">
            <button
              onClick={() => window.history.back()}
              className="group flex items-center gap-2 text-suzuki-blue/40 hover:text-suzuki-red text-[11px] font-bold uppercase tracking-widest transition-colors"
            >
              <div className="w-8 h-8 rounded-full border border-suzuki-blue/5 flex items-center justify-center group-hover:border-suzuki-red transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </div>
              Voltar para catálogo
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Title Section */}
            <div className="lg:col-span-5 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 h-1 bg-suzuki-red mb-6" />
                <h1 className="font-display text-5xl md:text-7xl font-black italic text-suzuki-blue leading-[0.9] tracking-tighter">
                  TENHO <br />
                  <span className="text-suzuki-red">INTERESSE</span>
                </h1>
                <p className="mt-8 text-suzuki-blue/60 font-medium text-lg leading-relaxed">
                  Preencha os campos ao lado para que um de nossos especialistas entre em contato com você o mais breve possível.
                </p>
                
                <div className="mt-12 flex items-center gap-4 p-6 bg-white rounded-3xl border border-suzuki-blue/5 shadow-xl">
                    <SuzukiLogo className="h-6 w-auto opacity-20" />
                    <div className="h-10 w-px bg-suzuki-blue/5" />
                    <div>
                        <p className="text-[10px] font-black text-suzuki-blue/40 uppercase tracking-widest">Atendimento Oficial</p>
                        <p className="text-sm font-bold text-suzuki-blue">Suzuki JTZ Motors Brasil</p>
                    </div>
                </div>
              </motion.div>
            </div>

            {/* Form Section */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <LeadForm selectedModel={moto || undefined} />
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
