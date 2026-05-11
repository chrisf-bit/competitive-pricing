import {
  TrendingUp,
  DollarSign,
  Heart,
  Star,
  AlertCircle,
  MessageSquare,
  RotateCcw,
  Lock,
  Play,
} from 'lucide-react';
import type { ScoreBreakdown, PartnerState, ParityRegime } from '../types';
import { getRPDLevel } from '../engine/gameEngine';
import { RPDBadge, RelationshipBadge } from '../components/MetricBadge';
import { initialPartners } from '../data/partners';
import { getCorrectPartnerForRound } from '../data/correctPartnerPerRound';

const PRACTICE_AVAILABLE_ROUNDS = [1, 2, 3] as const;
const TOTAL_ROUNDS_DISPLAYED = 10;

interface DebriefScreenProps {
  score: ScoreBreakdown;
  partners: PartnerState[];
  /** Best stars earned per round across all attempts. */
  roundStars: Record<number, 0 | 1 | 2 | 3>;
  /**
   * Learner's parity regime - used to look up the "right partner" name
   * for each practice round card.
   */
  regime: ParityRegime | null;
  onRestart: () => void;
  onPracticeRound: (round: number) => void;
}

const gradeConfig: Record<
  string,
  { color: string; bg: string; label: string }
> = {
  A: { color: 'var(--success)', bg: 'var(--success-bg)', label: 'Excellent' },
  B: { color: 'var(--brand-blue)', bg: '#e6f0f8', label: 'Good' },
  C: { color: 'var(--warning)', bg: 'var(--warning-bg)', label: 'Developing' },
  D: { color: 'var(--danger)', bg: 'var(--danger-bg)', label: 'Needs Work' },
};

export function DebriefScreen({
  score,
  partners,
  roundStars,
  regime,
  onRestart,
  onPracticeRound,
}: DebriefScreenProps) {
  const gc = gradeConfig[score.overallGrade];

  const totalStars = Object.values(roundStars).reduce<number>(
    (sum, s) => sum + s,
    0,
  );
  const maxStars = TOTAL_ROUNDS_DISPLAYED * 3;

  return (
    <div
      style={{
        flex: 1,
        overflow: 'auto',
        padding: '24px 32px',
      }}
    >
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 28,
            animation: 'fadeIn 0.4s ease',
          }}
        >
          <h1 style={{ marginBottom: 4 }}>Simulation Complete</h1>
          <p style={{ color: 'var(--grey-400)', fontSize: 14 }}>
            Here's how your portfolio performed over the six-week period.
          </p>
        </div>

        {/* Grade card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
            marginBottom: 28,
            animation: 'fadeIn 0.4s ease 0.1s backwards',
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              background: gc.bg,
              border: `3px solid ${gc.color}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{ fontSize: 36, fontWeight: 700, color: gc.color, lineHeight: 1 }}
            >
              {score.overallGrade}
            </span>
            <span style={{ fontSize: 11, fontWeight: 600, color: gc.color }}>
              {gc.label}
            </span>
          </div>

          <div style={{ display: 'flex', gap: 20 }}>
            <ScoreMetric
              icon={<TrendingUp size={18} />}
              label="Avg RPD Change"
              value={`${score.portfolioRPD >= 0 ? '+' : ''}${score.portfolioRPD}`}
              positive={score.portfolioRPD > 0}
            />
            <ScoreMetric
              icon={<DollarSign size={18} />}
              label="Revenue Impact"
              value={`${score.revenueImpact >= 0 ? '+' : ''}${score.revenueImpact}`}
              positive={score.revenueImpact > 0}
            />
            <ScoreMetric
              icon={<Heart size={18} />}
              label="Relationship Health"
              value={`${score.relationshipHealth}`}
              positive={score.relationshipHealth >= 55}
            />
          </div>
        </div>

        {/* Partner outcomes */}
        <div
          style={{
            background: 'var(--white)',
            border: '1px solid var(--grey-100)',
            borderRadius: 'var(--radius-md)',
            padding: 20,
            marginBottom: 20,
            animation: 'fadeIn 0.4s ease 0.2s backwards',
          }}
        >
          <h4 style={{ marginBottom: 16, fontSize: 14 }}>Partner Outcomes</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {partners.map((partner) => {
              const initial = initialPartners.find(
                (p) => p.persona.id === partner.persona.id,
              );
              const rpdDelta = initial
                ? partner.metrics.experiencedRPD - initial.metrics.experiencedRPD
                : 0;

              return (
                <div
                  key={partner.persona.id}
                  style={{
                    padding: 16,
                    background: 'var(--off-white)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: `var(--style-${partner.persona.style})`,
                        color: 'var(--white)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {partner.persona.avatar}
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 14,
                          color: 'var(--brand-navy)',
                        }}
                      >
                        {partner.persona.name}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--grey-400)' }}>
                        {partner.persona.propertyName}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 8,
                      marginBottom: 10,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: 'var(--grey-400)',
                          textTransform: 'uppercase',
                          marginBottom: 2,
                        }}
                      >
                        RPD Change
                      </div>
                      <div
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                          color:
                            rpdDelta > 0
                              ? 'var(--success)'
                              : rpdDelta < 0
                                ? 'var(--danger)'
                                : 'var(--grey-500)',
                        }}
                      >
                        {rpdDelta >= 0 ? '+' : ''}
                        {rpdDelta}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: 'var(--grey-400)',
                          textTransform: 'uppercase',
                          marginBottom: 2,
                        }}
                      >
                        RPD Now
                      </div>
                      <div
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                          color: 'var(--brand-navy)',
                        }}
                      >
                        {partner.metrics.experiencedRPD}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 6 }}>
                    <RPDBadge
                      level={getRPDLevel(partner.metrics.experiencedRPD)}
                    />
                    <RelationshipBadge status={partner.relationship} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Insights */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
            marginBottom: 20,
            animation: 'fadeIn 0.4s ease 0.3s backwards',
          }}
        >
          {/* Highlights */}
          <div
            style={{
              background: 'var(--white)',
              border: '1px solid var(--grey-100)',
              borderRadius: 'var(--radius-md)',
              padding: 20,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 12,
              }}
            >
              <Star size={16} style={{ color: 'var(--brand-yellow)' }} />
              <h4 style={{ fontSize: 14, margin: 0 }}>Highlights</h4>
            </div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {score.highlights.map((h, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 13,
                    color: 'var(--grey-600)',
                    lineHeight: 1.4,
                    paddingLeft: 16,
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      color: 'var(--success)',
                      fontWeight: 700,
                    }}
                  >
                    +
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div
            style={{
              background: 'var(--white)',
              border: '1px solid var(--grey-100)',
              borderRadius: 'var(--radius-md)',
              padding: 20,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 12,
              }}
            >
              <AlertCircle size={16} style={{ color: 'var(--warning)' }} />
              <h4 style={{ fontSize: 14, margin: 0 }}>Areas for Improvement</h4>
            </div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {score.improvements.map((imp, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 13,
                    color: 'var(--grey-600)',
                    lineHeight: 1.4,
                    paddingLeft: 16,
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      color: 'var(--warning)',
                      fontWeight: 700,
                    }}
                  >
                    !
                  </span>
                  {imp}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Communication style insights */}
        <div
          style={{
            background: 'var(--white)',
            border: '1px solid var(--grey-100)',
            borderRadius: 'var(--radius-md)',
            padding: 20,
            marginBottom: 24,
            animation: 'fadeIn 0.4s ease 0.4s backwards',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 12,
            }}
          >
            <MessageSquare size={16} style={{ color: 'var(--brand-blue)' }} />
            <h4 style={{ fontSize: 14, margin: 0 }}>
              Communication Style Insights
            </h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {score.styleInsights.map((insight, i) => (
              <div
                key={i}
                style={{
                  padding: '10px 14px',
                  background: 'var(--off-white)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 13,
                  color: 'var(--grey-600)',
                  lineHeight: 1.5,
                }}
              >
                {insight}
              </div>
            ))}
          </div>
        </div>

        {/* Practice Mode - round-select grid */}
        <div
          style={{
            background: 'var(--white)',
            border: '1px solid var(--grey-100)',
            borderRadius: 'var(--radius-md)',
            padding: '20px 24px',
            marginBottom: 24,
            boxShadow: 'var(--shadow-sm)',
            animation: 'fadeIn 0.4s ease 0.45s backwards',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 4,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--brand-navy)',
              }}
            >
              Practice Mode
            </h3>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--brand-navy)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Star
                size={14}
                fill="var(--brand-yellow)"
                color="var(--brand-yellow)"
              />
              {totalStars} / {maxStars}
            </div>
          </div>
          <p
            style={{
              margin: '0 0 16px',
              fontSize: 13,
              color: 'var(--grey-400)',
              lineHeight: 1.5,
            }}
          >
            Replay any round to chase a higher star score. Partner state
            resets to baseline for each practice attempt. Your stars only
            ever go up.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 10,
            }}
          >
            {Array.from({ length: TOTAL_ROUNDS_DISPLAYED }).map((_, i) => {
              const round = i + 1;
              const stars = roundStars[round] ?? 0;
              const available = (PRACTICE_AVAILABLE_ROUNDS as readonly number[]).includes(
                round,
              );
              const targetPartnerId = regime
                ? getCorrectPartnerForRound(regime, round)
                : null;
              const targetPartner = targetPartnerId
                ? partners.find((p) => p.persona.id === targetPartnerId)
                : null;
              return (
                <PracticeRoundCard
                  key={round}
                  round={round}
                  stars={stars}
                  available={available}
                  targetPartnerName={targetPartner?.persona.name ?? null}
                  onPlay={() => onPracticeRound(round)}
                />
              );
            })}
          </div>
        </div>

        {/* Replay button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: 32,
            animation: 'fadeIn 0.4s ease 0.5s backwards',
          }}
        >
          <button
            onClick={onRestart}
            style={{
              background: 'var(--brand-navy)',
              color: 'var(--white)',
              padding: '12px 28px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 15,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={16} />
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}

function PracticeRoundCard({
  round,
  stars,
  available,
  targetPartnerName,
  onPlay,
}: {
  round: number;
  stars: 0 | 1 | 2 | 3;
  available: boolean;
  targetPartnerName: string | null;
  onPlay: () => void;
}) {
  const isLocked = !available;
  const isOptimal = stars === 3;
  return (
    <button
      onClick={onPlay}
      disabled={isLocked}
      style={{
        padding: '12px 10px',
        background: isLocked
          ? 'var(--grey-100)'
          : isOptimal
            ? 'rgba(254, 186, 2, 0.10)'
            : 'var(--white)',
        border: `1.5px solid ${
          isLocked
            ? 'var(--grey-200)'
            : isOptimal
              ? 'var(--brand-yellow)'
              : 'var(--grey-100)'
        }`,
        borderRadius: 'var(--radius-sm)',
        textAlign: 'left',
        cursor: isLocked ? 'not-allowed' : 'pointer',
        opacity: isLocked ? 0.6 : 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        transition: 'border-color 0.15s ease, background 0.15s ease, transform 0.15s ease',
      }}
      onMouseEnter={(e) => {
        if (!isLocked) {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.borderColor = 'var(--brand-yellow)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isLocked) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.borderColor = isOptimal
            ? 'var(--brand-yellow)'
            : 'var(--grey-100)';
        }
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--grey-400)',
          }}
        >
          Round {round}
        </span>
        {isLocked && <Lock size={11} color="var(--grey-400)" />}
      </div>
      <div style={{ display: 'flex', gap: 2 }}>
        {[1, 2, 3].map((i) => {
          const earned = i <= stars;
          return (
            <Star
              key={i}
              size={13}
              strokeWidth={1.5}
              fill={earned ? 'var(--brand-yellow)' : 'transparent'}
              color={earned ? 'var(--brand-yellow)' : 'var(--grey-200)'}
            />
          );
        })}
      </div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--brand-navy)',
          lineHeight: 1.3,
          minHeight: 26,
        }}
      >
        {isLocked
          ? 'Coming soon'
          : targetPartnerName
            ? targetPartnerName
            : 'Available'}
      </div>
      {!isLocked && (
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: 'var(--brand-navy)',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            opacity: 0.7,
          }}
        >
          <Play size={9} fill="currentColor" />
          {stars === 0 ? 'Retake' : stars < 3 ? 'Chase 3 stars' : 'Replay'}
        </div>
      )}
    </button>
  );
}

function ScoreMetric({
  icon,
  label,
  value,
  positive,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  positive: boolean;
}) {
  return (
    <div
      style={{
        padding: '14px 18px',
        background: 'var(--white)',
        border: '1px solid var(--grey-100)',
        borderRadius: 'var(--radius-md)',
        textAlign: 'center',
        minWidth: 130,
      }}
    >
      <div
        style={{
          color: positive ? 'var(--success)' : 'var(--danger)',
          marginBottom: 6,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: 10,
          fontWeight: 600,
          color: 'var(--grey-400)',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: positive ? 'var(--success)' : 'var(--danger)',
        }}
      >
        {value}
      </div>
    </div>
  );
}
