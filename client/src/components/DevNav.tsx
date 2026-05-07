import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X, RotateCcw } from 'lucide-react';
import type { GameState } from '../types';

/**
 * Dev-only floating nav panel for jumping to any screen during MVP testing.
 *
 * Visible when:
 *   - The Vite build is in dev mode (`import.meta.env.DEV`), OR
 *   - The URL has `?dev=1` (works on Render previews / production builds).
 *
 * Remove or gate further before final delivery.
 */
interface DevNavProps {
  currentScreen: GameState['screen'];
  onJump: (screen: GameState['screen']) => void;
  onShowSplash: () => void;
  onRestart: () => void;
}

interface ScreenJump {
  screen: GameState['screen'];
  label: string;
  group: 'level0' | 'level1' | 'wrap';
}

const screenJumps: ScreenJump[] = [
  { screen: 'briefing', label: 'Briefing', group: 'level0' },
  { screen: 'l0-market-select', label: 'Market Select', group: 'level0' },
  { screen: 'l0-gm-chat', label: 'GM Chat', group: 'level0' },
  { screen: 'l0-email-audit', label: 'Email Audit', group: 'level0' },
  { screen: 'portfolio', label: 'Portfolio', group: 'level1' },
  { screen: 'debrief', label: 'Debrief', group: 'wrap' },
];

const groupLabels: Record<ScreenJump['group'], string> = {
  level0: 'Level 0 - Clearance',
  level1: 'Level 1',
  wrap: 'Wrap',
};

function shouldShowDevNav(): boolean {
  if (import.meta.env.DEV) return true;
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).has('dev');
}

export function DevNav({ currentScreen, onJump, onShowSplash, onRestart }: DevNavProps) {
  const [open, setOpen] = useState(false);

  if (!shouldShowDevNav()) return null;

  const groups: ScreenJump['group'][] = ['level0', 'level1', 'wrap'];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 18,
        right: 18,
        zIndex: 999,
        fontFamily: 'var(--font)',
      }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              bottom: 56,
              right: 0,
              width: 260,
              background: 'rgba(20, 30, 50, 0.96)',
              color: 'var(--white)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 12,
              boxShadow: '0 12px 36px rgba(0,0,0,0.45)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              padding: '10px 8px 8px',
              maxHeight: '70vh',
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 10px 8px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                marginBottom: 6,
              }}
            >
              <Zap size={13} style={{ color: 'var(--brand-yellow)' }} />
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'var(--brand-yellow)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  flex: 1,
                }}
              >
                Dev Nav
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.5)',
                  border: 'none',
                  padding: 2,
                  display: 'flex',
                  cursor: 'pointer',
                }}
                aria-label="Close dev nav"
              >
                <X size={14} />
              </button>
            </div>

            {groups.map((group) => (
              <div key={group} style={{ marginBottom: 4 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    padding: '8px 10px 4px',
                  }}
                >
                  {groupLabels[group]}
                </div>
                {screenJumps
                  .filter((s) => s.group === group)
                  .map((s) => {
                    const active = s.screen === currentScreen;
                    return (
                      <JumpRow
                        key={s.screen}
                        label={s.label}
                        active={active}
                        onClick={() => {
                          onJump(s.screen);
                          setOpen(false);
                        }}
                      />
                    );
                  })}
              </div>
            ))}

            <div
              style={{
                marginTop: 6,
                paddingTop: 6,
                borderTop: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                gap: 6,
              }}
            >
              <button
                onClick={() => {
                  onShowSplash();
                  setOpen(false);
                }}
                style={extraBtnStyle}
              >
                Show Splash
              </button>
              <button
                onClick={() => {
                  onRestart();
                  setOpen(false);
                }}
                style={{ ...extraBtnStyle, gap: 5 }}
              >
                <RotateCcw size={11} />
                Reset
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: 44,
          height: 44,
          borderRadius: 14,
          background: open ? 'var(--brand-yellow)' : 'rgba(20, 30, 50, 0.95)',
          color: open ? 'var(--brand-navy)' : 'var(--brand-yellow)',
          border: '1px solid rgba(255,255,255,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: open
            ? '0 8px 24px rgba(254, 186, 2, 0.4)'
            : '0 6px 18px rgba(0,0,0,0.4)',
          transition: 'background 0.15s ease, color 0.15s ease',
        }}
        aria-label="Open dev nav"
      >
        <Zap size={18} fill={open ? 'currentColor' : 'none'} strokeWidth={2.2} />
      </button>
    </div>
  );
}

function JumpRow({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        width: '100%',
        textAlign: 'left',
        padding: '8px 10px',
        background: active ? 'rgba(254, 186, 2, 0.15)' : 'transparent',
        color: active ? 'var(--brand-yellow)' : 'rgba(255,255,255,0.85)',
        border: 'none',
        borderRadius: 8,
        fontSize: 13,
        fontWeight: active ? 700 : 500,
        cursor: 'pointer',
        transition: 'background 0.12s ease',
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.background = 'transparent';
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: active ? 'var(--brand-yellow)' : 'rgba(255,255,255,0.25)',
          flexShrink: 0,
        }}
      />
      {label}
    </button>
  );
}

const extraBtnStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 10px',
  background: 'rgba(255,255,255,0.06)',
  color: 'rgba(255,255,255,0.85)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: 8,
  fontSize: 12,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'background 0.12s ease',
};
