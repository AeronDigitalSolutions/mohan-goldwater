'use client';

import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playEffect: (name: string) => void;
}

const SoundContext = createContext<SoundContextType>({
  isMuted: true,
  toggleMute: () => {},
  playEffect: () => {},
});

export const useSound = () => useContext(SoundContext);

export default function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Restore preference
    const stored = localStorage.getItem('mgwbl-sound-muted');
    if (stored === 'false') {
      setIsMuted(false);
    }
  }, []);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
    }
    return { ctx: audioContextRef.current, gain: gainNodeRef.current! };
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      localStorage.setItem('mgwbl-sound-muted', String(next));

      if (!next) {
        const { ctx, gain } = getAudioContext();
        if (ctx.state === 'suspended') ctx.resume();
        gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.5);
      } else if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(
          0,
          audioContextRef.current.currentTime + 0.3
        );
      }

      return next;
    });
  }, [getAudioContext]);

  const playEffect = useCallback(
    (name: string) => {
      if (isMuted) return;
      // Placeholder for sound effects - can be expanded with actual audio files
      console.log(`Playing sound effect: ${name}`);
    },
    [isMuted]
  );

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playEffect }}>
      {children}
    </SoundContext.Provider>
  );
}
