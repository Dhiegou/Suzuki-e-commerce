export interface EngineSoundButtonProps {
  className?: string;
  audioUrl: string;
}

export interface EngineSoundState {
  isPlaying: boolean;
  toggle: () => void;
}
