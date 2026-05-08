import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { GameScreen } from '../types';
import {
  clearanceActivities,
  clearanceIndexOf,
} from '../data/clearanceActivities';

/**
 * Wrapper applied to every clearance activity. Provides:
 * - A persistent progress strip at the top showing all clearance steps
 *   and where the learner is in the journey.
 * - A flex:1 content area below where the activity itself renders.
 *
 * Children should fill 100% of their parent container - they no longer
 * need to claim 100vh themselves.
 */
interface ClearanceShellProps {
  currentScreen: GameScreen;
  children: ReactNode;
}

export function ClearanceShell({ currentScreen, children }: ClearanceShellProps) {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--brand-navy-dark)',
      }}
    >
      <ClearanceProgressStrip currentScreen={currentScreen} />
      <div
        style={{
          flex: 1,
          minHeight: 0,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ───────────────────────── Progress strip ─────────────────────────

function ClearanceProgressStrip({ currentScreen }: { currentScreen: GameScreen }) {
  const currentIndex = clearanceIndexOf(currentScreen);

  return (
    <div
      style={{
        flexShrink: 0,
        padding: '12px 28px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(0,0,0,0.20)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        overflowX: 'auto',
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.4)',
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          marginRight: 16,
          flexShrink: 0,
        }}
      >
        Clearance
      </div>
      {clearanceActivities.map((activity, i) => {
        const isCurrent = i === currentIndex;
        const isPast = i < currentIndex;
        return (
          <div
            key={activity.id}
            style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
          >
            <ProgressStep activity={activity} index={i} isCurrent={isCurrent} isPast={isPast} />
            {i < clearanceActivities.length - 1 && (
              <div
                style={{
                  width: 14,
                  height: 1.5,
                  background: isPast
                    ? 'rgba(0, 159, 227, 0.45)'
                    : 'rgba(255,255,255,0.10)',
                  margin: '0 2px',
                  transition: 'background 0.3s ease',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ProgressStep({
  activity,
  index,
  isCurrent,
  isPast,
}: {
  activity: { id: string; label: string };
  index: number;
  isCurrent: boolean;
  isPast: boolean;
}) {
  let dotBg = 'rgba(255,255,255,0.10)';
  let dotBorder = 'rgba(255,255,255,0.20)';
  let dotInner: ReactNode = null;
  let labelColor = 'rgba(255,255,255,0.35)';
  let labelWeight = 500;

  if (isPast) {
    dotBg = 'rgba(0, 159, 227, 0.18)';
    dotBorder = 'rgba(0, 159, 227, 0.55)';
    dotInner = <Check size={10} strokeWidth={3} style={{ color: 'var(--brand-blue-light)' }} />;
    labelColor = 'rgba(255,255,255,0.55)';
  } else if (isCurrent) {
    dotBg = 'rgba(254, 186, 2, 0.18)';
    dotBorder = 'var(--brand-yellow)';
    dotInner = (
      <span
        style={{
          fontSize: 10,
          fontWeight: 800,
          color: 'var(--brand-yellow)',
        }}
      >
        {index + 1}
      </span>
    );
    labelColor = 'var(--brand-yellow)';
    labelWeight = 700;
  } else {
    dotInner = (
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.45)',
        }}
      >
        {index + 1}
      </span>
    );
  }

  return (
    <motion.div
      animate={{ scale: isCurrent ? 1.04 : 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 7,
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: '50%',
          background: dotBg,
          border: `1.5px solid ${dotBorder}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}
      >
        {dotInner}
      </div>
      <div
        style={{
          fontSize: 11,
          fontWeight: labelWeight,
          color: labelColor,
          letterSpacing: '0.02em',
          whiteSpace: 'nowrap',
          transition: 'color 0.3s ease',
        }}
      >
        {activity.label}
      </div>
    </motion.div>
  );
}
