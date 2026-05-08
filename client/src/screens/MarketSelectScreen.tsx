import { ChevronRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import type { LearnerMarket } from '../types';
import { marketOptions, type MarketOption } from '../data/learnerMarkets';

interface MarketSelectScreenProps {
  selected: LearnerMarket | null;
  onSelect: (market: LearnerMarket) => void;
  onContinue: () => void;
}

export function MarketSelectScreen({ selected, onSelect, onContinue }: MarketSelectScreenProps) {
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
          padding: '64px 40px 40px',
          maxWidth: 1280,
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ textAlign: 'center', marginBottom: 12 }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--brand-yellow)',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              marginBottom: 14,
            }}
          >
            Set the Scene
          </div>
          <h1
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: 'var(--white)',
              lineHeight: 1.15,
              marginBottom: 12,
              letterSpacing: '-0.02em',
            }}
          >
            Pick your parity regime
          </h1>
          <p
            style={{
              fontSize: 15,
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.6,
              maxWidth: 600,
              margin: '0 auto',
            }}
          >
            Parity rules vary by country and dictate what you can and can't say to a partner.
            Pick the regime your portfolio operates under - we'll show you example partners and
            rules for that regime.
          </p>
        </motion.div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 18,
            width: '100%',
            margin: '40px 0 32px',
          }}
        >
          {marketOptions.map((option, i) => (
            <MarketCard
              key={option.market.parityRegime}
              option={option}
              index={i}
              isSelected={selected?.parityRegime === option.market.parityRegime}
              onClick={() => onSelect(option.market)}
            />
          ))}
        </div>

        {/* Continue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          style={{ marginTop: 12 }}
        >
          <button
            onClick={onContinue}
            disabled={!selected}
            style={{
              background: selected ? 'var(--brand-yellow)' : 'rgba(255,255,255,0.08)',
              color: selected ? 'var(--brand-navy)' : 'rgba(255,255,255,0.4)',
              padding: '14px 36px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 16,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              border: selected ? 'none' : '1.5px solid rgba(255,255,255,0.12)',
              cursor: selected ? 'pointer' : 'not-allowed',
              transition: 'background 0.15s ease, color 0.15s ease',
              boxShadow: selected ? '0 8px 24px rgba(254, 186, 2, 0.25)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (selected) e.currentTarget.style.background = 'var(--brand-yellow-light)';
            }}
            onMouseLeave={(e) => {
              if (selected) e.currentTarget.style.background = 'var(--brand-yellow)';
            }}
          >
            Continue
            <ChevronRight size={18} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}

interface MarketCardProps {
  option: MarketOption;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

function MarketCard({ option, index, isSelected, onClick }: MarketCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.08, duration: 0.45, ease: 'easeOut' }}
      onClick={onClick}
      style={{
        position: 'relative',
        textAlign: 'left',
        padding: '22px 22px 20px',
        background: isSelected ? 'rgba(254, 186, 2, 0.10)' : 'rgba(255,255,255,0.05)',
        border: isSelected
          ? '2px solid var(--brand-yellow)'
          : '2px solid rgba(255,255,255,0.10)',
        borderRadius: 'var(--radius-lg)',
        color: 'var(--white)',
        cursor: 'pointer',
        transition: 'background 0.18s ease, border-color 0.18s ease, transform 0.18s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        minHeight: 320,
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
      {/* Selected indicator */}
      {isSelected && (
        <div
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            width: 26,
            height: 26,
            borderRadius: '50%',
            background: 'var(--brand-yellow)',
            color: 'var(--brand-navy)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Check size={16} strokeWidth={3} />
        </div>
      )}

      {/* Parity name + example countries */}
      <div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--brand-yellow)',
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            marginBottom: 6,
          }}
        >
          Parity regime
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.15, color: 'var(--white)' }}>
          {option.label}
        </div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.45)',
            textTransform: 'uppercase',
            letterSpacing: '0.10em',
            marginTop: 10,
            marginBottom: 2,
          }}
        >
          Includes
        </div>
        <div
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.4,
          }}
        >
          {option.exampleCountries.join(' · ')}
        </div>
      </div>

      <div
        style={{
          fontSize: 13,
          color: 'rgba(255,255,255,0.78)',
          lineHeight: 1.5,
        }}
      >
        {option.ruleSummary}
      </div>

      {/* Allowed list */}
      <div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            color: 'rgba(255,255,255,0.55)',
            textTransform: 'uppercase',
            letterSpacing: '0.10em',
            marginBottom: 6,
          }}
        >
          You can
        </div>
        <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0 }}>
          {option.allowed.map((item, i) => (
            <li
              key={i}
              style={{
                fontSize: 12.5,
                lineHeight: 1.45,
                color: 'rgba(255,255,255,0.82)',
                marginBottom: 4,
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
                  background: 'var(--success)',
                }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Not allowed list */}
      <div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            color: 'rgba(255,255,255,0.55)',
            textTransform: 'uppercase',
            letterSpacing: '0.10em',
            marginBottom: 6,
          }}
        >
          You cannot
        </div>
        <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0 }}>
          {option.notAllowed.map((item, i) => (
            <li
              key={i}
              style={{
                fontSize: 12.5,
                lineHeight: 1.45,
                color: 'rgba(255,255,255,0.78)',
                marginBottom: 4,
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
                  background: 'var(--danger)',
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

