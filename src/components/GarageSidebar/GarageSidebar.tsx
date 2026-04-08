import { motion, AnimatePresence } from 'motion/react';
import { X, Bike, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGarage } from '../../contexts/GarageContext';

export default function GarageSidebar() {
  const navigate = useNavigate();
  const { garage, isGarageOpen: isOpen, closeGarage: onClose, removeFromGarage: onRemove } = useGarage();
  
  const handleInterestAll = () => {
    onClose();
    // Pass model names joined by comma
    const names = garage.map(m => m.name).join(', ');
    navigate(`/interesse?moto=${encodeURIComponent(names)}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-suzuki-blue/30 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 flex items-center justify-between border-b border-suzuki-blue/5 bg-suzuki-blue">
              <div className="flex items-center gap-3">
                <Bike className="w-6 h-6 text-suzuki-red" />
                <h2 className="font-display text-2xl font-bold italic text-white uppercase tracking-tight">Minha Garagem</h2>
              </div>
              <button
                id="garage-close"
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Fechar garagem"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {garage.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-24 h-24 bg-suzuki-blue/5 rounded-full flex items-center justify-center">
                    <Bike className="w-12 h-12 text-suzuki-blue/20" />
                  </div>
                  <div>
                    <p className="text-suzuki-blue font-bold uppercase tracking-widest text-sm">Sua garagem está vazia</p>
                    <p className="text-suzuki-blue/40 text-xs mt-2 font-medium">Explore nosso catálogo e salve <br />suas motos favoritas aqui.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-suzuki-blue/30 uppercase tracking-[0.2em] mb-2">Modelos Selecionados ({garage.length})</p>
                  {garage.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-3xl bg-ghost-white border border-suzuki-blue/5 group hover:border-suzuki-red/20 transition-all">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white flex-shrink-0 border border-suzuki-blue/5">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 py-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-display font-bold text-suzuki-blue text-sm italic uppercase">{item.name}</h4>
                          <button 
                            onClick={() => onRemove(item.id)} 
                            className="text-suzuki-blue/20 hover:text-suzuki-red transition-colors p-1" 
                            aria-label={`Remover ${item.name}`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[10px] text-suzuki-blue/40 font-bold uppercase tracking-wider mt-1">Way of Life / Suzuki</p>
                        <div className="mt-3">
                          <span className="text-xs font-bold text-suzuki-blue">R$ {item.price.toLocaleString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {garage.length > 0 && (
              <div className="p-6 bg-ghost-white border-t border-suzuki-blue/5 space-y-4">
                <button 
                  onClick={handleInterestAll}
                  className="w-full bg-suzuki-red text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-suzuki-red/20 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3 group"
                >
                  Tenho Interesse nestas Motos
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-[9px] text-suzuki-blue/40 font-bold uppercase tracking-widest leading-relaxed">
                  Enviaremos seus modelos favoritos <br />para um de nossos especialistas.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
