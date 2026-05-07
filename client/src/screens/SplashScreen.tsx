import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, ChevronRight } from 'lucide-react';
import splashImage from '../assets/splash-dark.png';

interface SplashScreenProps {
  onBegin: () => void;
}

export function SplashScreen({ onBegin }: SplashScreenProps) {
  const [showBegin, setShowBegin] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowBegin(true), 4800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--brand-navy-dark)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
            'radial-gradient(ellipse at center, rgba(0,15,40,0.3) 0%, rgba(0,15,40,0.0) 55%, rgba(0,15,40,0.5) 100%)',
        }}
      />

      {/* Title block (top) */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(48px, 12vh, 120px)',
          left: 0,
          right: 0,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 32px',
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
            textShadow: '0 4px 32px rgba(0,15,40,0.45)',
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
          Pricing Competitiveness Simulation
        </motion.div>
      </div>

      {/* Centred plane with rotating dot-ring loader */}
      <PlaneLoader />

      {/* Begin button (appears after the dot ring has had a moment to play) */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={showBegin ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: 'clamp(48px, 9vh, 96px)',
          zIndex: 3,
        }}
      >
        <button
          onClick={onBegin}
          disabled={!showBegin}
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
            cursor: showBegin ? 'pointer' : 'default',
            boxShadow: '0 8px 24px rgba(254, 186, 2, 0.25)',
            transition: 'background 0.15s ease',
            pointerEvents: showBegin ? 'auto' : 'none',
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
        </button>
      </motion.div>
    </div>
  );
}

function PlaneLoader() {
  const dotCount = 12;
  const radius = 70; // px from centre
  const cycleSeconds = 1.8;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 200,
        height: 200,
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      {/* The plane in the centre, gently bobbing */}
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'var(--brand-yellow)',
          filter: 'drop-shadow(0 4px 18px rgba(254, 186, 2, 0.5))',
        }}
      >
        <div style={{ transform: 'rotate(-12deg)' }}>
          <Plane size={48} fill="currentColor" strokeWidth={1.4} />
        </div>
      </motion.div>

      {/* Dot ring around the plane — wave of opacity travels around */}
      {Array.from({ length: dotCount }).map((_, i) => {
        const angleRad = ((i / dotCount) * 2 - 0.5) * Math.PI; // start at top, go clockwise
        const x = Math.cos(angleRad) * radius;
        const y = Math.sin(angleRad) * radius;
        return (
          <motion.div
            key={i}
            animate={{ opacity: [0.15, 1, 0.15] }}
            transition={{
              duration: cycleSeconds,
              repeat: Infinity,
              delay: (i / dotCount) * cycleSeconds,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              top: `calc(50% + ${y}px)`,
              left: `calc(50% + ${x}px)`,
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 8px rgba(255,255,255,0.4)',
            }}
          />
        );
      })}
    </motion.div>
  );
}
