import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, ChevronRight } from 'lucide-react';
import splashImage from '../assets/splash-dark.png';

interface SplashScreenProps {
  onBegin: () => void;
}

export function SplashScreen({ onBegin }: SplashScreenProps) {
  const [showBegin, setShowBegin] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowBegin(true), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--brand-navy-dark)',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <motion.img
        src={splashImage}
        alt=""
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      {/* Soft vignette to lift the title and centre piece off the image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(0,15,40,0.35) 0%, rgba(0,15,40,0.0) 55%, rgba(0,15,40,0.5) 100%)',
        }}
      />

      {/* Title block - centred vertically */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 32px',
          width: '100%',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
          style={{
            fontSize: 'clamp(48px, 7vw, 88px)',
            fontWeight: 800,
            color: 'var(--white)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            textShadow: '0 4px 32px rgba(0,15,40,0.55)',
          }}
        >
          Rate Right
          <span
            style={{
              display: 'inline-block',
              width: '0.16em',
              height: '0.16em',
              background: 'var(--brand-yellow)',
              borderRadius: '50%',
              marginLeft: '0.06em',
              verticalAlign: 'super',
              marginTop: '-0.45em',
              boxShadow: '0 0 24px rgba(254, 186, 2, 0.5)',
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.7, ease: 'easeOut' }}
          style={{
            marginTop: 14,
            fontSize: 'clamp(13px, 1.3vw, 16px)',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.78)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          Competitive Pricing Simulation
        </motion.div>
      </div>

      {/* Loader / Begin slot - sits below the title and swaps from one to the other at 4s */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(50% + 130px)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 200,
        }}
      >
        <AnimatePresence mode="wait">
          {showBegin ? (
            <motion.button
              key="begin"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onClick={onBegin}
              style={{
                background: 'var(--brand-yellow)',
                color: 'var(--brand-navy)',
                padding: '14px 36px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 16,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(254, 186, 2, 0.25)',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--brand-yellow-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--brand-yellow)';
              }}
            >
              Begin
              <ChevronRight size={18} />
            </motion.button>
          ) : (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <PlaneLoader />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Plane sitting in the centre of a 12-dot ring. The ring runs an
 * opacity-wave animation that travels clockwise around the plane.
 * Sized as a self-contained square; layout above positions it.
 */
function PlaneLoader() {
  const dotCount = 12;
  const radius = 56; // px from centre of the loader square
  const cycleSeconds = 1.6;
  const size = 160;

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        pointerEvents: 'none',
      }}
    >
      {/* Static centring wrapper for the bobbing plane (avoids framer-motion
          animate prop conflicting with our centring transform) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            color: 'var(--brand-yellow)',
            filter: 'drop-shadow(0 4px 18px rgba(254, 186, 2, 0.5))',
          }}
        >
          <div style={{ transform: 'rotate(-12deg)', display: 'flex' }}>
            <Plane size={44} fill="currentColor" strokeWidth={1.4} />
          </div>
        </motion.div>
      </div>

      {/* Dot ring - wave of opacity travels clockwise around the plane */}
      {Array.from({ length: dotCount }).map((_, i) => {
        const angleRad = ((i / dotCount) * 2 - 0.5) * Math.PI; // start at top
        const x = Math.cos(angleRad) * radius;
        const y = Math.sin(angleRad) * radius;
        return (
          <motion.div
            key={i}
            animate={{ opacity: [0.18, 1, 0.18] }}
            transition={{
              duration: cycleSeconds,
              repeat: Infinity,
              delay: (i / dotCount) * cycleSeconds,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              top: `calc(50% + ${y}px - 3px)`,
              left: `calc(50% + ${x}px - 3px)`,
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              boxShadow: '0 0 8px rgba(255,255,255,0.4)',
            }}
          />
        );
      })}
    </div>
  );
}
