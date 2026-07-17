import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Trophy, Sparkles } from 'lucide-react';
import clearedImage from '../assets/cleared-dark.webp';
import type { CharacterArchetype } from '../types';
import { getAvatarById } from '../data/characters';

interface Level1CompleteScreenProps {
  playerName: string;
  archetype: CharacterArchetype | null;
  avatarId: string | null;
  onContinue: () => void;
}

export function Level1CompleteScreen({
  playerName,
  archetype,
  avatarId,
  onContinue,
}: Level1CompleteScreenProps) {
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowContinue(true), 2400);
    return () => clearTimeout(t);
  }, []);

  const avatar = getAvatarById(avatarId);

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
      {/* Background image - darkened for legibility. Same asset as the
          Clearance Cleared screen so the two celebration beats share
          a visual identity. */}
      <motion.img
        src={clearedImage}
        alt=""
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          filter: 'brightness(0.55)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(0,15,40,0.30) 0%, rgba(0,15,40,0.10) 45%, rgba(0,15,40,0.55) 100%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.55, ease: 'easeOut' }}
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '40px 48px 44px',
          gap: 16,
          maxWidth: 720,
          background: 'rgba(6, 18, 42, 0.62)',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: 24,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow:
            '0 24px 64px rgba(0,10,30,0.55), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '6px 14px 6px 10px',
            background: 'rgba(254, 186, 2, 0.18)',
            border: '1.5px solid var(--brand-yellow)',
            borderRadius: 100,
            color: 'var(--brand-yellow)',
            fontSize: 12,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            backdropFilter: 'blur(6px)',
          }}
        >
          <Trophy size={14} strokeWidth={2.6} />
          Level 1 Complete
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7, ease: 'easeOut' }}
          style={{
            fontSize: 'clamp(40px, 6vw, 68px)',
            fontWeight: 800,
            color: 'var(--white)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            textShadow: '0 4px 32px rgba(0,15,40,0.5)',
            margin: 0,
          }}
        >
          Ten out of ten,{' '}
          <span style={{ color: 'var(--brand-yellow)' }}>{playerName}</span>.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6, ease: 'easeOut' }}
          style={{
            fontSize: 'clamp(15px, 1.5vw, 18px)',
            fontWeight: 600,
            color: 'var(--white)',
            lineHeight: 1.55,
            maxWidth: 620,
            textShadow: '0 2px 14px rgba(0,15,40,0.95), 0 0 24px rgba(0,15,40,0.7)',
          }}
        >
          You've cleared every Level 1 round. Level 2 is now unlocked -
          more complex pricing situations that layer on the OPC metrics
          you'll steer partners with next.
        </motion.div>

        {/* Level 2 unlocked pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5, ease: 'easeOut' }}
          style={{
            marginTop: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            background: 'rgba(76, 209, 55, 0.18)',
            border: '1.5px solid rgba(76, 209, 55, 0.75)',
            borderRadius: 100,
            color: '#7AF08A',
            fontSize: 12,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            backdropFilter: 'blur(6px)',
          }}
        >
          <Sparkles size={13} strokeWidth={2.6} />
          Level 2 unlocked
        </motion.div>

        {(avatar || archetype) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.55, duration: 0.5, ease: 'easeOut' }}
            style={{
              marginTop: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '8px 18px 8px 8px',
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.16)',
              borderRadius: 100,
              backdropFilter: 'blur(8px)',
            }}
          >
            {avatar && (
              <img
                src={avatar.dataUri}
                alt={avatar.label}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            )}
            {archetype && (
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'var(--white)',
                  letterSpacing: '0.01em',
                }}
              >
                {archetype.name}
              </div>
            )}
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={showContinue ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: 'clamp(48px, 9vh, 96px)',
          zIndex: 3,
        }}
      >
        <button
          onClick={onContinue}
          disabled={!showContinue}
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
            cursor: showContinue ? 'pointer' : 'default',
            boxShadow: '0 8px 24px rgba(254, 186, 2, 0.3)',
            transition: 'background 0.15s ease',
            pointerEvents: showContinue ? 'auto' : 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--brand-yellow-light)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--brand-yellow)';
          }}
        >
          See your debrief
          <ChevronRight size={18} />
        </button>
      </motion.div>
    </div>
  );
}
