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
          padding: '64px 40px 40px',
          maxWidth: 1280,
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 14,
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
              onClick={() => option.available && onSelect(option.market)}
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
  const disabled = !option.available;

  return (
    <motion.button
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.08, duration: 0.45, ease: 'easeOut' }}
      onClick={onClick}
      disabled={disabled}
      style={{
        position: 'relative',
        textAlign: 'center',
        padding: '32px 18px',
        background: isSelected
          ? 'rgba(254, 186, 2, 0.10)'
          : disabled
            ? 'rgba(255,255,255,0.025)'
            : 'rgba(255,255,255,0.05)',
        border: isSelected
          ? '2px solid var(--brand-yellow)'
          : disabled
            ? '2px dashed rgba(255,255,255,0.10)'
            : '2px solid rgba(255,255,255,0.10)',
        borderRadius: 'var(--radius-lg)',
        color: 'var(--white)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        transition: 'background 0.18s ease, border-color 0.18s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        minHeight: 220,
      }}
      onMouseEnter={(e) => {
        if (!isSelected && !disabled) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.20)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected && !disabled) {
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

      {/* Parity regime label */}
      <div
        style={{
          fontSize: 10.5,
          fontWeight: 700,
          color: disabled ? 'rgba(255,255,255,0.4)' : 'var(--brand-yellow)',
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
        }}
      >
        Parity regime
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 800,
          lineHeight: 1.15,
          color: 'var(--white)',
          letterSpacing: '-0.01em',
        }}
      >
        {option.label}
      </div>
      {disabled && (
        <div
          style={{
            marginTop: 6,
            fontSize: 10.5,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.55)',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            padding: '4px 10px',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: 100,
          }}
        >
          Coming soon
        </div>
      )}
    </motion.button>
  );
}

