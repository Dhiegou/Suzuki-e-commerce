import { useState, useRef, useEffect, useCallback } from 'react';
import { EngineSoundState } from './EngineSoundButton.types';

export function useEngineSoundButton(audioUrl: string): EngineSoundState {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Lazy Initialization of Audio
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setIsPlaying(false);
      audioRef.current.onpause = () => setIsPlaying(false);
      audioRef.current.onplay = () => setIsPlaying(true);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioUrl]);

  const toggle = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => {
        console.warn('Playback prevented:', err);
      });
    }
  }, [isPlaying]);

  return { isPlaying, toggle };
}
