/**
 * PARKED 2026-05-07.
 *
 * This screen makes specific click-where claims about a stylised mock
 * dashboard, but in real life LPS access several different existing
 * tools - each with their own layout. Training learners on "the eRPD
 * tile" of OUR mock would embed a wrong mental model.
 *
 * Also: the original copy framed eRPD at country level, but for daily
 * LPS work eRPD is observed at partner-account level (country-level
 * is only the rollup objective).
 *
 * Resume work once the team confirms which real dashboards LPS
 * actually use day-to-day, what each surfaces, and how to embed
 * click-where exercises that map onto the real tools.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Check,
  X,
  TrendingDown,
  TrendingUp,
  BarChart3,
  Layers,
} from 'lucide-react';
import {
  dashboardHotspotChallenges,
  type DashboardTileId,
  type HotspotChallenge,
} from '../data/dashboardHotspot';
import type { KnowledgeCheckResult } from '../types';

interface DashboardHotspotScreenProps {
  onComplete: (results: KnowledgeCheckResult[]) => void;
}

interface ChallengeResult {
  challengeId: string;
  pickedTileId: DashboardTileId;
  isCorrect: boolean;
}

export function DashboardHotspotScreen({ onComplete }: DashboardHotspotScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<ChallengeResult[]>([]);
  const [pickedTile, setPickedTile] = useState<DashboardTileId | null>(null);

  const challenge: HotspotChallenge | undefined = dashboardHotspotChallenges[currentIndex];
  const isDone = currentIndex >= dashboardHotspotChallenges.length;
  const result = pickedTile ? results.find((r) => r.challengeId === challenge?.id) : null;
  const correctCount = results.filter((r) => r.isCorrect).length;

  function handleTileClick(tileId: DashboardTileId) {
    if (!challenge || pickedTile) return;
    const isCorrect = tileId === challenge.correctTileId;
    setPickedTile(tileId);
    setResults((prev) => [
      ...prev,
      { challengeId: challenge.id, pickedTileId: tileId, isCorrect },
    ]);
  }

  function handleNext() {
    setPickedTile(null);
    setCurrentIndex((i) => i + 1);
  }

  function handleContinue() {
    const kcResults: KnowledgeCheckResult[] = results.map((r) => ({
      itemId: `dashboard-hotspot-${r.challengeId}`,
      correct: r.isCorrect,
      attempts: 1,
    }));
    onComplete(kcResults);
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--brand-navy-dark)',
        color: 'var(--white)',
        overflow: 'hidden',
      }}
    >
      {/* Top bar - prompt + progress */}
      <div
        style={{
          padding: '18px 28px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.18)',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--brand-yellow)',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
            }}
          >
            Dashboard Tour
          </div>
          <div style={{ flex: 1 }} />
          <ProgressDots
            total={dashboardHotspotChallenges.length}
            current={currentIndex}
            results={results}
          />
        </div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: 'var(--white)',
            lineHeight: 1.4,
          }}
        >
          {isDone
            ? `${correctCount} of ${dashboardHotspotChallenges.length} hotspots found`
            : challenge?.prompt}
        </div>
      </div>

      {/* Dashboard area */}
      <div
        style={{
          flex: 1,
          padding: '24px 28px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <DashboardMock
          correctTileId={challenge?.correctTileId ?? null}
          pickedTileId={pickedTile}
          onTileClick={handleTileClick}
          locked={!!pickedTile || isDone}
        />
      </div>

      {/* Feedback / Continue */}
      <AnimatePresence>
        {result && challenge && (
          <motion.div
            key={`fb-${challenge.id}`}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              padding: '18px 28px 22px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(0,0,0,0.28)',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 18,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: result.isCorrect ? 'var(--success)' : 'var(--danger)',
                color: 'var(--white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {result.isCorrect ? (
                <Check size={20} strokeWidth={3} />
              ) : (
                <X size={20} strokeWidth={3} />
              )}
            </div>
            <div
              style={{
                fontSize: 14,
                lineHeight: 1.55,
                color: 'rgba(255,255,255,0.9)',
                flex: 1,
              }}
            >
              {result.isCorrect ? challenge.feedback.correct : challenge.feedback.incorrect}
            </div>
            <button
              onClick={handleNext}
              style={{
                background: 'var(--brand-yellow)',
                color: 'var(--brand-navy)',
                padding: '11px 22px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 14,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(254, 186, 2, 0.25)',
                transition: 'background 0.15s ease',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--brand-yellow-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--brand-yellow)';
              }}
            >
              {currentIndex < dashboardHotspotChallenges.length - 1 ? 'Next' : 'See summary'}
              <ChevronRight size={16} />
            </button>
          </motion.div>
        )}
        {isDone && (
          <motion.div
            key="done"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              padding: '18px 28px 22px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(0,0,0,0.28)',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
            }}
          >
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
              {correctCount} of {dashboardHotspotChallenges.length} correct
            </div>
            <button
              onClick={handleContinue}
              style={{
                background: 'var(--brand-yellow)',
                color: 'var(--brand-navy)',
                padding: '12px 28px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 15,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(254, 186, 2, 0.25)',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--brand-yellow-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--brand-yellow)';
              }}
            >
              Continue
              <ChevronRight size={17} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ───────────────────────── Progress dots ─────────────────────────

function ProgressDots({
  total,
  current,
  results,
}: {
  total: number;
  current: number;
  results: ChallengeResult[];
}) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {Array.from({ length: total }).map((_, i) => {
        const r = results[i];
        let background = 'rgba(255,255,255,0.18)';
        if (r) background = r.isCorrect ? 'var(--success)' : 'var(--danger)';
        else if (i === current) background = 'var(--brand-yellow)';
        return (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background,
              transition: 'background 0.2s ease',
            }}
          />
        );
      })}
    </div>
  );
}

// ───────────────────────── Mock dashboard ─────────────────────────

interface DashboardMockProps {
  correctTileId: DashboardTileId | null;
  pickedTileId: DashboardTileId | null;
  onTileClick: (id: DashboardTileId) => void;
  locked: boolean;
}

function DashboardMock({
  correctTileId,
  pickedTileId,
  onTileClick,
  locked,
}: DashboardMockProps) {
  function getTileState(id: DashboardTileId) {
    if (!pickedTileId) return 'idle';
    if (id === pickedTileId && id === correctTileId) return 'correct';
    if (id === pickedTileId) return 'wrong';
    if (id === correctTileId) return 'correct-revealed';
    return 'dimmed';
  }

  return (
    <div
      style={{
        background: 'var(--white)',
        color: 'var(--grey-700)',
        borderRadius: 14,
        boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
        overflow: 'hidden',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}
    >
      {/* Dashboard header */}
      <div
        style={{
          padding: '14px 22px',
          background: 'var(--brand-navy)',
          color: 'var(--white)',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          flexShrink: 0,
        }}
      >
        <BarChart3 size={18} style={{ color: 'var(--brand-yellow)' }} />
        <div style={{ fontSize: 14, fontWeight: 700 }}>
          LPS Competitive Pricing Dashboard
        </div>
        <div style={{ flex: 1 }} />
        <Pill text="Last 4 weeks" />
        <Pill text="USA - Boston" />
      </div>

      {/* Tile grid */}
      <div
        style={{
          padding: 16,
          display: 'grid',
          gap: 12,
          gridTemplateColumns: '2fr 1fr 1fr',
          gridTemplateRows: 'auto auto',
          flex: 1,
          minHeight: 0,
        }}
      >
        <Tile
          id="erpd-headline"
          gridArea="1 / 1 / 2 / 2"
          state={getTileState('erpd-headline')}
          locked={locked}
          onClick={() => onTileClick('erpd-headline')}
        >
          <ERPDHeadlineContent />
        </Tile>

        <Tile
          id="public-vs-loyal"
          gridArea="1 / 2 / 2 / 3"
          state={getTileState('public-vs-loyal')}
          locked={locked}
          onClick={() => onTileClick('public-vs-loyal')}
        >
          <PublicVsLoyalContent />
        </Tile>

        <Tile
          id="driver-pyramid"
          gridArea="1 / 3 / 2 / 4"
          state={getTileState('driver-pyramid')}
          locked={locked}
          onClick={() => onTileClick('driver-pyramid')}
        >
          <DriverPyramidContent />
        </Tile>

        <Tile
          id="partner-priority"
          gridArea="2 / 1 / 3 / 3"
          state={getTileState('partner-priority')}
          locked={locked}
          onClick={() => onTileClick('partner-priority')}
        >
          <PartnerPriorityContent />
        </Tile>

        <Tile
          id="erpd-trend"
          gridArea="2 / 3 / 3 / 4"
          state={getTileState('erpd-trend')}
          locked={locked}
          onClick={() => onTileClick('erpd-trend')}
        >
          <ERPDTrendContent />
        </Tile>
      </div>
    </div>
  );
}

type TileState = 'idle' | 'correct' | 'wrong' | 'correct-revealed' | 'dimmed';

function Tile({
  id,
  gridArea,
  state,
  locked,
  onClick,
  children,
}: {
  id: DashboardTileId;
  gridArea: string;
  state: TileState;
  locked: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  let border = '1.5px solid var(--grey-100)';
  let boxShadow = 'var(--shadow-sm)';
  let badge: React.ReactNode = null;
  let opacity = 1;

  if (state === 'correct') {
    border = '2.5px solid var(--success)';
    boxShadow = '0 6px 20px rgba(0, 138, 14, 0.22)';
    badge = (
      <Badge background="var(--success)">
        <Check size={14} strokeWidth={3} />
      </Badge>
    );
  } else if (state === 'wrong') {
    border = '2.5px solid var(--danger)';
    boxShadow = '0 6px 20px rgba(204, 0, 0, 0.18)';
    badge = (
      <Badge background="var(--danger)">
        <X size={14} strokeWidth={3} />
      </Badge>
    );
  } else if (state === 'correct-revealed') {
    border = '2.5px solid var(--success)';
    boxShadow = '0 6px 20px rgba(0, 138, 14, 0.22)';
    badge = (
      <Badge background="var(--success)">
        <Check size={14} strokeWidth={3} />
      </Badge>
    );
  } else if (state === 'dimmed') {
    opacity = 0.5;
  }

  return (
    <button
      data-tile-id={id}
      onClick={onClick}
      disabled={locked}
      style={{
        gridArea,
        position: 'relative',
        background: 'var(--white)',
        border,
        borderRadius: 10,
        padding: '14px 16px',
        textAlign: 'left',
        cursor: locked ? 'default' : 'pointer',
        boxShadow,
        transition: 'border-color 0.18s ease, box-shadow 0.18s ease, transform 0.12s ease',
        opacity,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        if (!locked) {
          e.currentTarget.style.borderColor = 'var(--brand-blue)';
          e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 159, 227, 0.18)';
        }
      }}
      onMouseLeave={(e) => {
        if (!locked) {
          e.currentTarget.style.borderColor = 'var(--grey-100)';
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        }
      }}
    >
      {badge}
      {children}
    </button>
  );
}

function Badge({ children, background }: { children: React.ReactNode; background: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
        width: 26,
        height: 26,
        borderRadius: '50%',
        background,
        color: 'var(--white)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
      }}
    >
      {children}
    </div>
  );
}

function Pill({ text }: { text: string }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 600,
        color: 'rgba(255,255,255,0.85)',
        background: 'rgba(255,255,255,0.10)',
        padding: '4px 10px',
        borderRadius: 100,
      }}
    >
      {text}
    </div>
  );
}

// ───────────────────────── Tile content ─────────────────────────

function TileHeader({ label }: { label: string }) {
  return (
    <div
      style={{
        fontSize: 10,
        fontWeight: 800,
        color: 'var(--grey-400)',
        textTransform: 'uppercase',
        letterSpacing: '0.11em',
        marginBottom: 8,
      }}
    >
      {label}
    </div>
  );
}

function ERPDHeadlineContent() {
  return (
    <>
      <TileHeader label="Experienced RPD - vs Brand.com & Key OTAs" />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 10 }}>
        <div style={{ fontSize: 42, fontWeight: 800, color: 'var(--brand-navy)', lineHeight: 1 }}>
          -1.4%
        </div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: 'var(--success)',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <TrendingDown size={14} />
          improving vs Q1
        </div>
      </div>
      {/* Sparkline */}
      <Sparkline points={[80, 75, 78, 72, 68, 64, 62]} color="var(--success)" />
      <div
        style={{
          fontSize: 11,
          color: 'var(--grey-500)',
          marginTop: 10,
          lineHeight: 1.4,
        }}
      >
        Lower is better. Goal: stop the upward trend in public price competitiveness.
      </div>
    </>
  );
}

function PublicVsLoyalContent() {
  return (
    <>
      <TileHeader label="Public RPD vs Loyal RPD" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <RPDBar label="Public RPD" value={-1.8} color="var(--brand-blue)" />
        <RPDBar label="Loyal RPD" value={-0.6} color="var(--brand-yellow)" />
      </div>
      <div
        style={{
          fontSize: 11,
          color: 'var(--grey-500)',
          marginTop: 12,
          lineHeight: 1.4,
        }}
      >
        Combined into Experienced RPD by share of searches.
      </div>
    </>
  );
}

function RPDBar({ label, value, color }: { label: string; value: number; color: string }) {
  const width = Math.min(100, Math.abs(value) * 35);
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--grey-700)',
          marginBottom: 4,
        }}
      >
        <span>{label}</span>
        <span style={{ color: 'var(--brand-navy)' }}>{value}%</span>
      </div>
      <div
        style={{
          height: 8,
          background: 'var(--grey-100)',
          borderRadius: 100,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${width}%`,
            height: '100%',
            background: color,
            borderRadius: 100,
          }}
        />
      </div>
    </div>
  );
}

function DriverPyramidContent() {
  return (
    <>
      <TileHeader label="Driver Metrics" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          alignItems: 'stretch',
          marginTop: 4,
        }}
      >
        <PyramidLevel width="58%" label="Public RPD" />
        <PyramidLevel width="72%" label="Loyal RPD" />
        <PyramidLevel width="86%" label="Adoption %" />
        <PyramidLevel width="100%" label="Comp. Partner Share" />
      </div>
    </>
  );
}

function PyramidLevel({ width, label }: { width: string; label: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          width,
          padding: '4px 8px',
          background: 'var(--brand-navy)',
          color: 'var(--white)',
          borderRadius: 4,
          fontSize: 10,
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        {label}
      </div>
    </div>
  );
}

function ERPDTrendContent() {
  return (
    <>
      <TileHeader label="eRPD Trend - Last 8 weeks" />
      <Sparkline
        points={[68, 72, 75, 70, 64, 62, 58, 55]}
        color="var(--brand-blue)"
        height={70}
      />
      <div
        style={{
          fontSize: 11,
          color: 'var(--grey-500)',
          marginTop: 10,
          lineHeight: 1.4,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <TrendingDown size={12} style={{ color: 'var(--success)' }} />
        Trending down (improving)
      </div>
    </>
  );
}

function PartnerPriorityContent() {
  const partners = [
    { name: 'Hotel Marina', rpd: '+2.4%', impact: 'High', impactColor: 'var(--danger)' },
    { name: 'Aegean Grand Resort', rpd: '+1.8%', impact: 'High', impactColor: 'var(--danger)' },
    { name: 'Meadow Lane Guesthouse', rpd: '+0.9%', impact: 'Medium', impactColor: 'var(--warning)' },
    { name: 'Barceloneta Living', rpd: '+0.4%', impact: 'Low', impactColor: 'var(--grey-400)' },
  ];
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <Layers size={14} style={{ color: 'var(--brand-blue)' }} />
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            color: 'var(--grey-400)',
            textTransform: 'uppercase',
            letterSpacing: '0.11em',
          }}
        >
          Partners by impact on country eRPD
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {partners.map((p) => (
          <div
            key={p.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '7px 10px',
              background: 'var(--off-white)',
              borderRadius: 6,
              fontSize: 12,
            }}
          >
            <div style={{ flex: 1, fontWeight: 600, color: 'var(--grey-700)' }}>{p.name}</div>
            <div
              style={{
                fontWeight: 700,
                color: 'var(--danger)',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <TrendingUp size={12} />
              {p.rpd}
            </div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: 'var(--white)',
                background: p.impactColor,
                padding: '2px 8px',
                borderRadius: 100,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {p.impact}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ───────────────────────── Sparkline ─────────────────────────

function Sparkline({
  points,
  color,
  height = 50,
}: {
  points: number[];
  color: string;
  height?: number;
}) {
  if (points.length === 0) return null;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = Math.max(max - min, 1);
  const width = 100;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * height;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <path d={path} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}
