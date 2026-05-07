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
    const t = setTimeout(() => setShowBegin(true), 3200);
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

      {/* Subtle vignette to lift the title off the image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center top, rgba(0,15,40,0.0) 30%, rgba(0,15,40,0.45) 80%)',
        }}
      />

      {/* Title block */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 32px',
          marginTop: '-8vh',
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
            textShadow: '0 4px 32px rgba(0,15,40,0.4)',
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

      {/* Plane + contrail loading animation */}
      <PlaneLoader />

      {/* Begin button (appears after plane has crossed) */}
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
            transition: 'background 0.15s ease, transform 0.15s ease',
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
  return (
    <div
      style={{
        position: 'absolute',
        top: '58%',
        left: 0,
        right: 0,
        height: 80,
        zIndex: 2,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* The plane + its trail travel together */}
      <motion.div
        initial={{ x: '-12vw' }}
        animate={{ x: '110vw' }}
        transition={{
          duration: 3.0,
          delay: 1.2,
          ease: [0.42, 0, 0.4, 1],
          repeat: Infinity,
          repeatDelay: 1.0,
        }}
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Dotted contrail behind the plane */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginRight: 10,
          }}
        >
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.7)',
                opacity: 0.15 + (i / 14) * 0.55,
              }}
            />
          ))}
        </div>

        {/* The plane itself, tilted slightly up as if climbing */}
        <div
          style={{
            transform: 'rotate(-12deg)',
            color: 'var(--brand-yellow)',
            filter: 'drop-shadow(0 2px 12px rgba(254, 186, 2, 0.45))',
          }}
        >
          <Plane size={28} fill="currentColor" strokeWidth={1.4} />
        </div>
      </motion.div>
    </div>
  );
}
