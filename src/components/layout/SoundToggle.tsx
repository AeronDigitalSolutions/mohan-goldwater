'use client';

import { motion } from 'framer-motion';
import { useSound } from '@/providers/SoundProvider';

export default function SoundToggle() {
  const { isMuted, toggleMute } = useSound();

  return (
    <motion.button
      onClick={toggleMute}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center"
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        WebkitBackdropFilter: 'blur(var(--glass-blur))',
        border: '1px solid var(--glass-border)',
      }}
      aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
    >
      {isMuted ? (
        /* Muted speaker icon */
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--steel-400)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        /* Speaker icon with animated wave bars */
        <div className="relative flex items-center">
          <svg
            width="16"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--gold-500)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          </svg>
          {/* Animated sound wave bars */}
          <div className="flex items-center gap-[2px] ml-0.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-[2px] rounded-full"
                style={{
                  backgroundColor: 'var(--gold-500)',
                  animation: `soundBar 0.6s ease-in-out ${i * 0.15}s infinite alternate`,
                  height: '8px',
                }}
              />
            ))}
          </div>
          <style jsx>{`
            @keyframes soundBar {
              0% {
                height: 4px;
              }
              100% {
                height: 14px;
              }
            }
          `}</style>
        </div>
      )}
    </motion.button>
  );
}
