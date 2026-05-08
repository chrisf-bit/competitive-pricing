import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Check,
  X,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import {
  samplePartnerData,
  dataInsightsChallenges,
  type SamplePartnerRow,
  type DataInsightsChallenge,
} from '../data/dashboardHotspot';
import type { KnowledgeCheckResult } from '../types';

/**
 * Data & Insights screen.
 *
 * Shows a table of sample partner KPIs (the actual fields PFRs have
 * access to: eRPD, eRPD change, Public/Loyal RPD, Lose Price Public,
 * active scenarios, competitor) and asks the learner to interpret it.
 * Replaces the parked "Dashboard Hotspot" mock - we no longer claim
 * any specific dashboard layout, just teach the data itself, since
 * real LPS use multiple existing tools.
 */
interface DashboardHotspotScreenProps {
  onComplete: (results: KnowledgeCheckResult[]) => void;
}

interface ChallengeResult {
  challengeId: string;
  pickedId: string;
  isCorrect: boolean;
}

export function DashboardHotspotScreen({ onComplete }: DashboardHotspotScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<ChallengeResult[]>([]);
  const [pickedId, setPickedId] = useState<string | null>(null);

  const challenge: DataInsightsChallenge | undefined = dataInsightsChallenges[currentIndex];
  const isDone = currentIndex >= dataInsightsChallenges.length;
  const result = pickedId ? results.find((r) => r.challengeId === challenge?.id) : null;
  const correctCount = results.filter((r) => r.isCorrect).length;

  function handlePick(id: string) {
    if (!challenge || pickedId) return;
    const isCorrect = id === challenge.correctHotelId;
    setPickedId(id);
    setResults((prev) => [
      ...prev,
      { challengeId: challenge.id, pickedId: id, isCorrect },
    ]);
  }

  function handleNext() {
    setPickedId(null);
    setCurrentIndex((i) => i + 1);
  }

  function handleContinue() {
    const kc: KnowledgeCheckResult[] = results.map((r) => ({
      itemId: `data-insights-${r.challengeId}`,
      correct: r.isCorrect,
      attempts: 1,
    }));
    onComplete(kc);
  }

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--brand-navy-dark)',
        color: 'var(--white)',
        overflow: 'hidden',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          padding: '14px 28px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.18)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
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
          Data & Insights
        </div>
        <div style={{ flex: 1 }} />
        <ProgressDots
          total={dataInsightsChallenges.length}
          current={currentIndex}
          results={results}
        />
      </div>

      {/* Heading */}
      <div
        style={{
          textAlign: 'center',
          padding: '20px 32px 12px',
          flexShrink: 0,
        }}
      >
        <h1
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: 'var(--white)',
            letterSpacing: '-0.02em',
            marginBottom: 4,
          }}
        >
          What does the data tell you?
        </h1>
        <p
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.6)',
            maxWidth: 640,
            margin: '0 auto',
            lineHeight: 1.5,
          }}
        >
          A partial view of what you'd typically see across our pricing tools. Spotting where
          attention is needed is half the job.
        </p>
      </div>

      {/* Table */}
      <div
        style={{
          flex: 1,
          padding: '8px 28px 16px',
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <KpiTable
          rows={samplePartnerData}
          highlightedHotelId={result?.pickedId ?? null}
          correctHotelId={result ? challenge?.correctHotelId ?? null : null}
        />
      </div>

      {/* Question + answers OR feedback OR done */}
      <div
        style={{
          flexShrink: 0,
          padding: '14px 28px 20px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.22)',
        }}
      >
        <AnimatePresence mode="wait">
          {!isDone && challenge && !result && (
            <motion.div
              key={`q-${challenge.id}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--white)',
                  lineHeight: 1.4,
                  marginBottom: 10,
                  maxWidth: 800,
                }}
              >
                {challenge.prompt}
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 8,
                }}
              >
                {challenge.options.map((opt) => (
                  <button
                    key={opt.hotelId}
                    onClick={() => handlePick(opt.hotelId)}
                    style={{
                      padding: '10px 14px',
                      background: 'rgba(255,255,255,0.06)',
                      color: 'var(--white)',
                      border: '1.5px solid rgba(255,255,255,0.10)',
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.15s ease, border-color 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.10)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)';
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
          {!isDone && result && challenge && (
            <motion.div
              key={`fb-${challenge.id}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
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
                  <Check size={18} strokeWidth={3} />
                ) : (
                  <X size={18} strokeWidth={3} />
                )}
              </div>
              <div
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: 'rgba(255,255,255,0.9)',
                  flex: 1,
                }}
              >
                {result.isCorrect ? challenge.feedback.correct : challenge.feedback.incorrect}
              </div>
              <button
                onClick={handleNext}
                style={primaryBtn(true)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--brand-yellow-light)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--brand-yellow)';
                }}
              >
                {currentIndex < dataInsightsChallenges.length - 1 ? 'Next' : 'See summary'}
                <ChevronRight size={16} />
              </button>
            </motion.div>
          )}
          {isDone && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
              }}
            >
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                {correctCount} of {dataInsightsChallenges.length} correct
              </div>
              <button
                onClick={handleContinue}
                style={primaryBtn(true)}
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
    </div>
  );
}

// ───────────────────────── KPI Table ─────────────────────────

function KpiTable({
  rows,
  highlightedHotelId,
  correctHotelId,
}: {
  rows: SamplePartnerRow[];
  highlightedHotelId: string | null;
  correctHotelId: string | null;
}) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.96)',
        color: 'var(--grey-700)',
        borderRadius: 8,
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 12,
        }}
      >
        <thead>
          <tr style={{ background: 'var(--brand-navy)', color: 'var(--white)' }}>
            <Th align="left">Hotel</Th>
            <Th>Last contact</Th>
            <Th>eRPD</Th>
            <Th>eRPD Δ</Th>
            <Th>RPD Public</Th>
            <Th>RPD Loyal</Th>
            <Th>Lose Price (Public)</Th>
            <Th>Active scenarios</Th>
            <Th>Competitor</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const isHighlightedWrong =
              highlightedHotelId === row.id && correctHotelId !== row.id;
            const isCorrect = correctHotelId === row.id;
            const rowBg = isCorrect
              ? 'rgba(0, 138, 14, 0.16)'
              : isHighlightedWrong
                ? 'rgba(204, 0, 0, 0.10)'
                : 'transparent';
            return (
              <tr
                key={row.id}
                style={{
                  background: rowBg,
                  borderTop: '1px solid var(--grey-100)',
                  transition: 'background 0.2s ease',
                }}
              >
                <Td align="left">
                  <strong style={{ color: 'var(--brand-navy)' }}>{row.hotelName}</strong>
                </Td>
                <Td muted>{row.lastContact}</Td>
                <Td>
                  <span
                    style={{
                      fontWeight: 700,
                      color: row.erpd >= 12 ? 'var(--danger)' : row.erpd >= 6 ? 'var(--warning)' : 'var(--grey-700)',
                    }}
                  >
                    {row.erpd.toFixed(1)}%
                  </span>
                </Td>
                <Td>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 3,
                      fontWeight: 700,
                      color: row.erpdChange < 0 ? 'var(--success)' : 'var(--danger)',
                    }}
                  >
                    {row.erpdChange < 0 ? (
                      <TrendingDown size={12} />
                    ) : (
                      <TrendingUp size={12} />
                    )}
                    {Math.abs(row.erpdChange).toFixed(2)}
                  </span>
                </Td>
                <Td>{row.rpdPublic.toFixed(1)}%</Td>
                <Td>{row.rpdLoyal.toFixed(1)}%</Td>
                <Td>
                  <span
                    style={{
                      fontWeight: 700,
                      color:
                        row.losePricePublic >= 90
                          ? 'var(--danger)'
                          : row.losePricePublic >= 70
                            ? 'var(--warning)'
                            : 'var(--grey-700)',
                    }}
                  >
                    {row.losePricePublic}%
                  </span>
                </Td>
                <Td>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: 100,
                      background:
                        row.activeScenarios >= 3
                          ? 'rgba(204, 0, 0, 0.14)'
                          : row.activeScenarios >= 2
                            ? 'rgba(232, 150, 12, 0.14)'
                            : 'var(--off-white)',
                      color:
                        row.activeScenarios >= 3
                          ? 'var(--danger)'
                          : row.activeScenarios >= 2
                            ? 'var(--warning)'
                            : 'var(--grey-600)',
                      fontWeight: 700,
                      fontSize: 11,
                    }}
                  >
                    {row.activeScenarios}
                  </span>
                </Td>
                <Td>
                  <span
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: row.competitor === 'brand' ? 'var(--brand-blue)' : 'var(--style-yellow)',
                    }}
                  >
                    {row.competitor === 'brand' ? 'Brand.com' : 'Expedia'}
                  </span>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children, align = 'right' }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return (
    <th
      style={{
        padding: '10px 12px',
        textAlign: align,
        fontSize: 10,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.10em',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  align = 'right',
  muted = false,
}: {
  children: React.ReactNode;
  align?: 'left' | 'right';
  muted?: boolean;
}) {
  return (
    <td
      style={{
        padding: '10px 12px',
        textAlign: align,
        whiteSpace: 'nowrap',
        color: muted ? 'var(--grey-400)' : 'var(--grey-700)',
        fontSize: 12.5,
      }}
    >
      {children}
    </td>
  );
}

// ───────────────────────── Progress Dots ─────────────────────────

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
        let bg = 'rgba(255,255,255,0.18)';
        if (r) bg = r.isCorrect ? 'var(--success)' : 'var(--danger)';
        else if (i === current) bg = 'var(--brand-yellow)';
        return (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: bg,
              transition: 'background 0.2s ease',
            }}
          />
        );
      })}
    </div>
  );
}

// ───────────────────────── helpers ─────────────────────────

function primaryBtn(active: boolean): React.CSSProperties {
  return {
    background: active ? 'var(--brand-yellow)' : 'rgba(255,255,255,0.08)',
    color: active ? 'var(--brand-navy)' : 'rgba(255,255,255,0.4)',
    padding: '11px 22px',
    borderRadius: 'var(--radius-sm)',
    fontSize: 14,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    border: active ? 'none' : '1.5px solid rgba(255,255,255,0.10)',
    cursor: active ? 'pointer' : 'not-allowed',
    boxShadow: active ? '0 6px 18px rgba(254, 186, 2, 0.25)' : 'none',
    transition: 'background 0.15s ease',
    flexShrink: 0,
  };
}
