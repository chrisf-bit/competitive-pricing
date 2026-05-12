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
  const bothPicked = !!selectedAvatarId && !!selectedArchetype;

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
        height: '100%',
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
        {/* Avatars */}
        <SectionHeading label="Choose your avatar" complete={!!selectedAvatarId} />
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
              onClick={() => handleArchetypeSelect(p)}
            />
          ))}
        </div>

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
              'Pick an avatar and a super power to continue.'
            ) : !selectedAvatarId ? (
              'Pick an avatar to continue.'
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
        background: avatar.bgColor,
        border: isSelected
          ? '2.5px solid var(--brand-yellow)'
          : '2.5px solid rgba(255,255,255,0.10)',
        borderRadius: 14,
        padding: 6,
        cursor: 'pointer',
        transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
        boxShadow: isSelected
          ? '0 6px 18px rgba(254, 186, 2, 0.32), 0 0 0 3px rgba(254, 186, 2, 0.18)'
          : '0 2px 6px rgba(0,0,0,0.25)',
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
  onClick,
}: {
  persona: SuperPowerPersona;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  const Icon = persona.icon;
  const accentColor = `var(--style-${persona.accent})`;

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 + index * 0.06, duration: 0.4, ease: 'easeOut' }}
      onClick={onClick}
      style={{
        position: 'relative',
        textAlign: 'left',
        padding: '18px 20px',
        background: isSelected ? 'rgba(254, 186, 2, 0.10)' : 'rgba(255,255,255,0.05)',
        border: isSelected
          ? '2px solid var(--brand-yellow)'
          : '2px solid rgba(255,255,255,0.10)',
        borderRadius: 12,
        color: 'var(--white)',
        cursor: 'pointer',
        transition: 'background 0.18s ease, border-color 0.18s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        boxShadow: isSelected ? '0 6px 18px rgba(254, 186, 2, 0.18)' : 'none',
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.20)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)';
        }
      }}
    >
      {/* Selected check */}
      {isSelected && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: 'var(--brand-yellow)',
            color: 'var(--brand-navy)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Check size={13} strokeWidth={3.5} />
        </div>
      )}

      {/* Top row: icon + name + super power label */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            background: `${accentColor}1f`,
            color: accentColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: `1.5px solid ${accentColor}50`,
          }}
        >
          <Icon size={20} strokeWidth={2.2} />
        </div>
        <div style={{ flex: 1, minWidth: 0, paddingRight: 28 }}>
          <div
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              color: accentColor,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              marginBottom: 3,
            }}
          >
            Super power: {persona.superPower}
          </div>
          <div
            style={{
              fontSize: 17,
              fontWeight: 800,
              color: 'var(--white)',
              lineHeight: 1.2,
            }}
          >
            {persona.name}
          </div>
        </div>
      </div>

      {/* Succeeds by */}
      <div
        style={{
          fontSize: 13,
          color: 'rgba(255,255,255,0.85)',
          lineHeight: 1.5,
          fontStyle: 'italic',
        }}
      >
        {persona.succeedsBy}
      </div>

      {/* Wins by bullets */}
      <div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
            letterSpacing: '0.10em',
            marginBottom: 6,
          }}
        >
          Wins by
        </div>
        <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0 }}>
          {persona.winsBy.map((item, i) => (
            <li
              key={i}
              style={{
                fontSize: 12.5,
                lineHeight: 1.45,
                color: 'rgba(255,255,255,0.78)',
                marginBottom: 3,
                paddingLeft: 14,
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 7,
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: accentColor,
                }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.button>
  );
}
