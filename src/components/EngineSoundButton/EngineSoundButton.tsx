import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import { EngineSoundButtonProps } from './EngineSoundButton.types';
import { useEngineSoundButton } from './useEngineSoundButton';

export default function EngineSoundButton({ className, audioUrl }: EngineSoundButtonProps) {
  const { isPlaying, toggle } = useEngineSoundButton(audioUrl);

  const waveVariants = {
    initial: { scale: 0.8, opacity: 0.8 },
    animate: { scale: 2.2, opacity: 0 },
  };

  return (
    <div className="relative group">
      {/* Sound Waves Propagation */}
      <AnimatePresence>
        {isPlaying && (
          <>
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                variants={waveVariants}
                initial="initial"
                animate="animate"
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "easeOut",
                }}
                className="absolute inset-0 rounded-full border border-suzuki-red/40 z-[-1] pointer-events-none"
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Button Body with Vibration Effect */}
      <motion.button
        onClick={toggle}
        animate={{
          x: isPlaying ? [0, -0.8, 0.8, -0.6, 0] : 0,
          y: isPlaying ? [0, 0.6, -0.8, 0.6, 0] : 0,
          boxShadow: isPlaying 
            ? ["0 0 20px rgba(230,0,0,0.3)", "0 0 40px rgba(230,0,0,0.6)", "0 0 20px rgba(230,0,0,0.3)"]
            : "0 0 0px transparent"
        }}
        transition={isPlaying ? { repeat: Infinity, duration: 0.12 } : { duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex items-center gap-3 px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all overflow-hidden ${
          isPlaying 
            ? "bg-suzuki-red text-white" 
            : "border-[1.5px] border-white/40 text-white hover:bg-white/10 hover:border-white backdrop-blur-md"
        } ${className}`}
      >
        {/* Internal Heat Glow */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-radial from-white via-transparent to-transparent pointer-events-none"
            />
          )}
        </AnimatePresence>

        {isPlaying ? <VolumeX className="w-5 h-5 animate-pulse" /> : <Volume2 className="w-5 h-5" />}
        <span>{isPlaying ? 'Desligar Ignicão' : 'Sentir a Potência'}</span>
      </motion.button>
    </div>
  );
}
