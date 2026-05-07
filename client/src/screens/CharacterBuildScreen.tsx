import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Check } from 'lucide-react';
import {
  characterAvatars,
  superPowerPersonas,
  type CharacterAvatar,
  type SuperPowerPersona,
} from '../data/characters';
import type { CharacterArchetype } from '../types';

interface CharacterBuildScreenProps {
  selectedAvatarId: string | null;
  selectedArchetype: CharacterArchetype | null;
  playerName: string;
  onSelectAvatar: (avatarId: string) => void;
  onSelectArchetype: (archetype: CharacterArchetype) => void;
  onContinue: () => void;
}

export function CharacterBuildScreen({
  selectedAvatarId,
  selectedArchetype,
  playerName,
  onSelectAvatar,
  onSelectArchetype,
  onContinue,
}: CharacterBuildScreenProps) {
  const [hoveredPersonaId, setHoveredPersonaId] = useState<string | null>(null);

  const bothPicked = !!selectedAvatarId && !!selectedArchetype;
  const detailPersona =
    superPowerPersonas.find((p) => p.id === (hoveredPersonaId ?? selectedArchetype?.id)) ?? null;

  function handleArchetypeSelect(persona: SuperPowerPersona) {
    onSelectArchetype({
      id: persona.id,
      name: persona.name,
      flavourText: persona.succeedsBy,
    });
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--brand-navy)',
        color: 'var(--white)',
        overflow: 'auto',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px 32px 32px',
          maxWidth: 1180,
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ textAlign: 'center', marginBottom: 24 }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--brand-yellow)',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              marginBottom: 12,
            }}
          >
            Build your character
          </div>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: 'var(--white)',
              lineHeight: 1.15,
              marginBottom: 10,
              letterSpacing: '-0.02em',
            }}
          >
            Pick a face and a super power
          </h1>
          <p
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.55,
              maxWidth: 600,
              margin: '0 auto',
            }}
          >
            Your face is just visual identity. Your super power is the way you'll naturally lean
            into commercial conversations - everyone has equal potential to succeed.
          </p>
        </motion.div>

        {/* Avatars */}
        <SectionHeading label="Choose your face" complete={!!selectedAvatarId} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: 12,
            width: '100%',
            marginBottom: 36,
          }}
        >
          {characterAvatars.map((a, i) => (
            <AvatarTile
              key={a.id}
              avatar={a}
              index={i}
              isSelected={selectedAvatarId === a.id}
              onClick={() => onSelectAvatar(a.id)}
            />
          ))}
        </div>

        {/* Super powers */}
        <SectionHeading label="Choose your super power" complete={!!selectedArchetype} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 12,
            width: '100%',
            marginBottom: 24,
          }}
        >
          {superPowerPersonas.map((p, i) => (
            <PersonaCard
              key={p.id}
              persona={p}
              index={i}
              isSelected={selectedArchetype?.id === p.id}
              isHovered={hoveredPersonaId === p.id}
              onClick={() => handleArchetypeSelect(p)}
              onHover={(hover) => setHoveredPersonaId(hover ? p.id : null)}
            />
          ))}
        </div>

        {/* Persona detail (preview) */}
        {detailPersona && (
          <motion.div
            key={`detail-${detailPersona.id}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              width: '100%',
              padding: '14px 18px',
              background: `var(--style-${detailPersona.accent}-bg)`,
              border: `1px solid var(--style-${detailPersona.accent})`,
              borderRadius: 10,
              marginBottom: 24,
              fontSize: 13,
              color: 'rgba(0,0,0,0.85)',
              lineHeight: 1.55,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: `var(--style-${detailPersona.accent})`,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginBottom: 6,
              }}
            >
              {detailPersona.gameplayStyle}
            </div>
            <div style={{ fontWeight: 600, color: 'var(--brand-navy)' }}>
              {detailPersona.identity}
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: 12,
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>
            {bothPicked ? (
              <>
                <strong style={{ color: 'var(--white)', fontWeight: 700 }}>{playerName}</strong>
                {' - '}
                {selectedArchetype?.name}. Ready when you are.
              </>
            ) : !selectedAvatarId && !selectedArchetype ? (
              'Pick a face and a super power to continue.'
            ) : !selectedAvatarId ? (
              'Pick a face to continue.'
            ) : (
              'Pick a super power to continue.'
            )}
          </div>
          <button
            onClick={onContinue}
            disabled={!bothPicked}
            style={{
              background: bothPicked ? 'var(--brand-yellow)' : 'rgba(255,255,255,0.08)',
              color: bothPicked ? 'var(--brand-navy)' : 'rgba(255,255,255,0.4)',
              padding: '12px 28px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 15,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              border: bothPicked ? 'none' : '1.5px solid rgba(255,255,255,0.12)',
              cursor: bothPicked ? 'pointer' : 'not-allowed',
              boxShadow: bothPicked ? '0 6px 18px rgba(254, 186, 2, 0.25)' : 'none',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => {
              if (bothPicked) e.currentTarget.style.background = 'var(--brand-yellow-light)';
            }}
            onMouseLeave={(e) => {
              if (bothPicked) e.currentTarget.style.background = 'var(--brand-yellow)';
            }}
          >
            Continue
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────── Sub-components ─────────────────────────

function SectionHeading({ label, complete }: { label: string; complete: boolean }) {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 14,
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.7)',
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
        }}
      >
        {label}
      </div>
      {complete && (
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: 'var(--success)',
            color: 'var(--white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Check size={11} strokeWidth={3.5} />
        </div>
      )}
    </div>
  );
}

function AvatarTile({
  avatar,
  index,
  isSelected,
  onClick,
}: {
  avatar: CharacterAvatar;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.04, duration: 0.35, ease: 'easeOut' }}
      whileHover={{ scale: isSelected ? 1.02 : 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        position: 'relative',
        aspectRatio: '1 / 1',
        background: isSelected ? 'rgba(254, 186, 2, 0.15)' : 'rgba(255,255,255,0.06)',
        border: isSelected
          ? '2.5px solid var(--brand-yellow)'
          : '2.5px solid rgba(255,255,255,0.10)',
        borderRadius: 14,
        padding: 6,
        cursor: 'pointer',
        transition: 'background 0.18s ease, border-color 0.18s ease',
        boxShadow: isSelected ? '0 6px 18px rgba(254, 186, 2, 0.22)' : 'none',
        overflow: 'hidden',
      }}
    >
      <img
        src={avatar.dataUri}
        alt={avatar.label}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 8,
        }}
      />
      {isSelected && (
        <div
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: 'var(--brand-yellow)',
            color: 'var(--brand-navy)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
          }}
        >
          <Check size={12} strokeWidth={3.5} />
        </div>
      )}
    </motion.button>
  );
}

function PersonaCard({
  persona,
  index,
  isSelected,
  isHovered,
  onClick,
  onHover,
}: {
  persona: SuperPowerPersona;
  index: number;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: (hover: boolean) => void;
}) {
  const Icon = persona.icon;
  const accentColor = `var(--style-${persona.accent})`;

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 + index * 0.06, duration: 0.4, ease: 'easeOut' }}
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{
        position: 'relative',
        textAlign: 'left',
        padding: '16px 18px',
        background: isSelected
          ? `var(--style-${persona.accent}-bg)`
          : isHovered
            ? 'rgba(255,255,255,0.08)'
            : 'rgba(255,255,255,0.05)',
        border: isSelected
          ? `2px solid ${accentColor}`
          : '2px solid rgba(255,255,255,0.10)',
        borderRadius: 12,
        color: 'var(--white)',
        cursor: 'pointer',
        transition: 'background 0.18s ease, border-color 0.18s ease',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 14,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: isSelected ? accentColor : `${accentColor}30`,
          color: isSelected ? 'var(--white)' : accentColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'background 0.18s ease',
        }}
      >
        <Icon size={20} strokeWidth={2.2} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: isSelected ? accentColor : 'rgba(255,255,255,0.55)',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            marginBottom: 4,
          }}
        >
          Super power: {persona.superPower}
        </div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: isSelected ? 'var(--brand-navy)' : 'var(--white)',
            lineHeight: 1.2,
            marginBottom: 6,
          }}
        >
          {persona.name}
        </div>
        <div
          style={{
            fontSize: 12.5,
            color: isSelected ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)',
            lineHeight: 1.5,
            fontStyle: 'italic',
          }}
        >
          {persona.succeedsBy}
        </div>
      </div>
      {isSelected && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: accentColor,
            color: 'var(--white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Check size={11} strokeWidth={3.5} />
        </div>
      )}
    </motion.button>
  );
}
