import { useEffect, type ReactNode } from 'react';
import {
  Heart,
  Star,
  Award,
  RotateCcw,
  Lock,
  Play,
  Download,
  Search,
  Handshake,
  Target,
  Check,
  ArrowUp,
  TrendingUp,
  Trophy,
} from 'lucide-react';
import type {
  ScoreBreakdown,
  PartnerState,
  ParityRegime,
  LearnerProfile,
  RoundAttemptStats,
} from '../types';
import { getCorrectPartnerForRound } from '../data/correctPartnerPerRound';
import { TOTAL_ROUNDS } from '../engine/gameEngine';
import { getPersonaById } from '../data/characters';
import { reportLessonStatus } from '../util/persistence';
import { downloadDebriefPdf } from '../util/debriefPdf';

// Derived from the engine's TOTAL_ROUNDS so Practice Mode always covers
// every playable round (all 20 today) - previously hard-coded to 3, which
// left rounds 4-20 unreachable for practice and made the star math wrong.
const PRACTICE_AVAILABLE_ROUNDS = Array.from(
  { length: TOTAL_ROUNDS },
  (_, i) => i + 1,
);
const TOTAL_ROUNDS_DISPLAYED = TOTAL_ROUNDS;

interface DebriefScreenProps {
  score: ScoreBreakdown;
  partners: PartnerState[];
  /**
   * Partner IDs the learner actually engaged with during the main
   * run. Filters the Partner Outcomes grid (so only the ~3 calls
   * they made render, not the whole 21-partner regime portfolio).
   */
  engagedPartnerIds: string[];
  /** Best stars earned per round across all attempts. */
  roundStars: Record<number, 0 | 1 | 2 | 3>;
  /**
   * Per-round attempt breakdown - how many run-throughs it took to
   * clear the Diagnosis and Pitch gates on each round. Drives the
   * "diagnosed well / pitched well / focus development" section.
   */
  roundAttempts: Record<number, RoundAttemptStats>;
  /**
   * Learner's parity regime - used to look up the "right partner" name
   * for each practice round card.
   */
  regime: ParityRegime | null;
  /**
   * The learner's selected super-power persona id, or null if none picked.
   * Drives the aggregate persona block ("X of 10 rounds your strength
   * carried...") shown at the end of the run.
   */
  personaId: string | null;
  /**
   * Full learner profile - used to generate the downloadable summary
   * PDF (player name, persona resolution, regime). Optional for
   * backwards compat; the download button hides if absent.
   */
  learnerProfile?: LearnerProfile;
  /**
   * Replay the sim without wiping clearance or the learner profile.
   * Bound to the 'Play Again' button. Distinct from a full onRestart
   * (Splash 'Reset progress', DevNav 'Reset') so a completed learner
   * who wants another go doesn't have to redo clearance.
   */
  onPlayAgain: () => void;
  onPracticeRound: (round: number) => void;
}

// Grade labels are deliberately supportive / growth-framed - the sim is
// a learning experience, so even the lower grades name where the learner
// is on the journey rather than passing judgement ("Needs Work" ->
// "Keep building").
const gradeConfig: Record<
  string,
  { color: string; bg: string; label: string }
> = {
  A: { color: 'var(--success)', bg: 'var(--success-bg)', label: 'Excellent' },
  B: { color: 'var(--brand-blue)', bg: '#e6f0f8', label: 'Good' },
  C: { color: 'var(--warning)', bg: 'var(--warning-bg)', label: 'On the right track' },
  D: { color: 'var(--danger)', bg: 'var(--danger-bg)', label: 'Getting started' },
};

export function DebriefScreen({
  score,
  partners,
  roundStars,
  roundAttempts,
  regime,
  personaId,
  learnerProfile,
  onPlayAgain,
  onPracticeRound,
}: DebriefScreenProps) {
  const gc = gradeConfig[score.overallGrade];

  const totalStars = Object.values(roundStars).reduce<number>(
    (sum, s) => sum + s,
    0,
  );
  const maxStars = TOTAL_ROUNDS_DISPLAYED * 3;
  const allRoundsMaxed = totalStars === maxStars && totalStars > 0;

  // Build a per-round view over the rounds the learner actually played
  // (roundAttempts is written only for main-run, right-partner calls),
  // joining in the round's best stars and the partner record. This is
  // the source for both the skill summary and the standout-rounds panel.
  const roundViews: RoundView[] = Object.entries(roundAttempts)
    .map(([r, stats]) => {
      const round = Number(r);
      return {
        round,
        stats,
        stars: roundStars[round] ?? 0,
        partner: partners.find((p) => p.persona.id === stats.partnerId),
      };
    })
    .sort((a, b) => a.round - b.round);

  // Tell the LMS the sim is complete the moment the debrief mounts.
  // Idempotent at the LMS level - repeat mounts (e.g. returning from
  // practice mode) just re-write the same terminal status.
  useEffect(() => {
    reportLessonStatus('completed');
  }, []);

  // Aggregate persona block over the rounds actually played (roundStars
  // only stores rounds the learner cleared). Strength = a clean pass
  // (>= 2 stars); trade-off = a scrappy single-star pass, where the
  // persona's trade-off showed even though they got through. (A 0-star
  // round can't reach the debrief - you can't advance past it - so the
  // old `=== 0` count was structurally always zero.)
  const persona = getPersonaById(personaId);
  const attemptedRounds = Object.values(roundStars);
  const strengthRounds = attemptedRounds.filter((s) => s >= 2).length;
  const tradeOffRounds = attemptedRounds.filter((s) => s === 1).length;

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
            Here's how you performed across the {TOTAL_ROUNDS} rounds.
          </p>
        </div>

        {/* Hero stat tiles */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 14,
            marginBottom: 22,
            animation: 'fadeIn 0.4s ease 0.1s backwards',
          }}
        >
          <StatTile
            iconBg={gc.bg}
            icon={<Award size={20} style={{ color: gc.color }} />}
            value={score.overallGrade}
            valueColor={gc.color}
            secondary={gc.label}
            secondaryColor={gc.color}
          />
          <StatTile
            iconBg="var(--success-bg)"
            icon={<Heart size={20} style={{ color: 'var(--success)' }} />}
            value={`${score.relationshipHealth}`}
            valueColor={
              score.relationshipHealth >= 55 ? 'var(--success)' : 'var(--warning)'
            }
            caption="Relationship health"
          />
          <StatTile
            iconBg="#fff5d6"
            icon={
              <Star size={20} fill="var(--brand-yellow)" color="var(--brand-yellow)" />
            }
            value={
              <>
                {totalStars}
                <span
                  style={{ fontSize: 16, fontWeight: 700, color: 'var(--grey-400)' }}
                >
                  /{maxStars}
                </span>
              </>
            }
            valueColor="var(--brand-navy)"
            caption="Stars earned"
          />
        </div>

        {/* Persona aggregate block - subtle gameplay readback for the
            learner's chosen super-power. Hidden if no persona picked. */}
        {persona && attemptedRounds.length > 0 && (
          <PersonaAggregateBlock
            persona={persona}
            totalRounds={attemptedRounds.length}
            strengthRounds={strengthRounds}
            tradeOffRounds={tradeOffRounds}
          />
        )}

        {/* Skill summary - how each stage went, as stat tiles with
            the specific rounds as chips. */}
        {roundViews.length > 0 && <SkillSummary rounds={roundViews} />}

        {/* Standout rounds - the qualitative per-round read (wins + the
            rounds to build on), replacing the old Partner Outcomes +
            Communication Style Insights blocks. */}
        {roundViews.length > 0 && <StandoutRounds rounds={roundViews} />}

        {/* Practice Mode - round-select grid. Hidden entirely on a
            perfect run (all attempted rounds already at 3 stars) -
            there's nothing to chase and the "replay to try different
            approaches" framing reads as busywork. */}
        {!allRoundsMaxed && (
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
        )}

        {/* Footer actions: download summary + replay */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 12,
            paddingBottom: 32,
            flexWrap: 'wrap',
            animation: 'fadeIn 0.4s ease 0.5s backwards',
          }}
        >
          {learnerProfile && (
            <button
              onClick={() =>
                downloadDebriefPdf({
                  learnerProfile,
                  score,
                  partners,
                  roundStars,
                  regime,
                  personaId,
                })
              }
              style={{
                background: 'var(--brand-yellow)',
                color: 'var(--brand-navy-dark)',
                padding: '12px 24px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 15,
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                boxShadow: '0 3px 12px rgba(254,186,2,0.3)',
              }}
            >
              <Download size={16} />
              Download your summary
            </button>
          )}
          <button
            onClick={onPlayAgain}
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

// A round the learner actually played (correct partner, main run),
// joined with its best stars and the partner record. Source for the
// skill summary + standout-rounds panel.
interface RoundView {
  round: number;
  stats: RoundAttemptStats;
  stars: 0 | 1 | 2 | 3;
  partner: PartnerState | undefined;
}

const STYLE_NAMES: Record<string, string> = {
  red: 'Director',
  yellow: 'Socialiser',
  green: 'Nurturer',
  blue: 'Thinker',
};

const styleOf = (v: RoundView): string => v.partner?.persona.style ?? 'blue';
const hotelOf = (v: RoundView): string => {
  const p = v.partner?.persona;
  return p?.companyName ?? p?.propertyName ?? 'this partner';
};

// How many extra run-throughs a gate cost (0 = cleared first time).
const struggleOf = (v: RoundView): number =>
  Math.max(
    (v.stats.diagnosisFirstCorrectAttempt ?? 1) - 1,
    (v.stats.pitchFirstCorrectAttempt ?? 1) - 1,
  );

// Deterministic variant pick - stable across re-renders and replays
// because it keys off the (fixed) round number, not randomness. Two
// rounds that share a style + issue land on different phrasings so the
// templated lines don't read as duplicates side by side.
function pick<T>(pool: T[], round: number): T {
  return pool[round % pool.length];
}

// Template-generated "what you did well" line for a strong round,
// keyed off the partner's communication style + the round's issue.
function wellDoneLine(v: RoundView): string {
  const byStyle: Record<string, string[]> = {
    red: [
      'led with the data and closed on a clear, concrete action',
      'kept it direct, let the numbers make the argument, and landed a firm next step',
      'cut straight to the outcome and secured a concrete commitment',
    ],
    blue: [
      'matched their analytical style with an evidence-led case',
      'built the case methodically and let the detail carry the decision',
      'walked the data step by step and earned the call on the merits',
    ],
    green: [
      'built trust with a warm, collaborative approach and landed the ask',
      'kept it consultative, protected the relationship, and still moved things forward',
      'led with rapport and brought them to the ask without pressure',
    ],
    yellow: [
      'kept it personable and carried them to a clear next step',
      'brought energy to the call and turned it into momentum',
      'made it a genuine conversation and closed on real enthusiasm',
    ],
  };
  const pool = byStyle[styleOf(v)] ?? byStyle.blue;
  return `${pick(pool, v.round)}.`;
}

// Template-generated "how to lift it" line for a round to build on.
// Priority: whichever gate took the most retakes; if both cleared first
// time (so the round only lost stars on tone), a style note instead.
function howToLiftLine(v: RoundView): string {
  const diag = v.stats.diagnosisFirstCorrectAttempt ?? 1;
  const pitch = v.stats.pitchFirstCorrectAttempt ?? 1;
  const style = styleOf(v);
  if (diag > 1 && pitch > 1) {
    return pick(
      [
        `both the diagnosis and the close needed a few passes - work the Pricing Pathway, then lead into the pitch with the outcome.`,
        `the read and the close each took a couple of goes - tighten the diagnosis first, then open the pitch on the outcome.`,
      ],
      v.round,
    );
  }
  if (diag > 1) {
    return pick(
      [
        `the read took a few passes - work the Pricing Pathway to name it sooner.`,
        `it took a couple of goes to land the diagnosis - lean on the Pricing Pathway to get there faster.`,
      ],
      v.round,
    );
  }
  if (pitch > 1) {
    const tip: Record<string, string[]> = {
      red: ['get to the outcome faster and lead with the number', 'open on the bottom line and keep it tight'],
      blue: ['give the pitch the setup context it needs before the number', 'lay the evidence out before you land the ask'],
      green: ['frame the ask more collaboratively', 'soften the close and invite them into the decision'],
      yellow: ['add a personal hook to bring them with you', 'bring more energy to the close to carry them there'],
    };
    return `the close needed a couple of goes - ${pick(tip[style] ?? tip.blue, v.round)}.`;
  }
  const tone: Record<string, string[]> = {
    red: ['a tighter, outcome-first delivery', 'a more direct, bottom-line framing'],
    blue: ['a more evidence-led, structured delivery', 'a more methodical, data-first build'],
    green: ['a warmer, more collaborative framing', 'a more consultative, relationship-led approach'],
    yellow: ['a more personable, energetic framing', 'a livelier, more conversational approach'],
  };
  return `right call, but ${pick(tone[style] ?? tone.blue, v.round)} would land better with a ${STYLE_NAMES[style]} partner.`;
}

function SectionLabel({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        margin: '4px 2px 10px',
        color: 'var(--grey-400)',
        fontSize: 11,
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}
    >
      {icon}
      {children}
    </div>
  );
}

// ── Skill summary (how each stage went) ──────────────────────────
function SkillSummary({ rounds }: { rounds: RoundView[] }) {
  const total = rounds.length;
  const diagFirst = rounds.filter(
    (r) => r.stats.diagnosisFirstCorrectAttempt === 1,
  );
  const pitchFirst = rounds.filter(
    (r) => r.stats.pitchFirstCorrectAttempt === 1,
  );
  const build = rounds
    .filter((r) => struggleOf(r) > 0)
    .sort((a, b) => struggleOf(b) - struggleOf(a));

  return (
    <div style={{ marginBottom: 22, animation: 'fadeIn 0.4s ease 0.25s backwards' }}>
      <SectionLabel icon={<TrendingUp size={13} />}>
        How you handled each stage
      </SectionLabel>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 14,
        }}
      >
        <SkillTile
          iconBg="var(--success-bg)"
          icon={<Search size={19} style={{ color: 'var(--success)' }} />}
          count={diagFirst.length}
          denom={total}
          label="Diagnosed right first time"
        />
        <SkillTile
          iconBg="var(--success-bg)"
          icon={<Handshake size={19} style={{ color: 'var(--success)' }} />}
          count={pitchFirst.length}
          denom={total}
          label="Pitched right first time"
        />
        <SkillTile
          iconBg="var(--warning-bg)"
          icon={<Target size={19} style={{ color: 'var(--warning)' }} />}
          count={build.length}
          label="Rounds to build on"
        />
      </div>
    </div>
  );
}

function SkillTile({
  iconBg,
  icon,
  count,
  denom,
  label,
}: {
  iconBg: string;
  icon: ReactNode;
  count: number;
  denom?: number;
  label: string;
}) {
  return (
    <div
      style={{
        background: 'var(--white)',
        border: '1px solid var(--grey-100)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)',
        padding: '18px 20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <IconSquare bg={iconBg}>{icon}</IconSquare>
        <div>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--brand-navy)', lineHeight: 1 }}>
            {count}
            {denom != null && (
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--grey-400)' }}>
                {' / '}
                {denom}
              </span>
            )}
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--grey-600)', marginTop: 4 }}>
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Standout rounds (wins + rounds to build on) ──────────────────
function StandoutRounds({ rounds }: { rounds: RoundView[] }) {
  const excelled = rounds.filter((r) => r.stars === 3).slice(0, 3);
  const build = rounds
    .filter((r) => r.stars < 3)
    .sort((a, b) => struggleOf(b) - struggleOf(a) || a.stars - b.stars)
    .slice(0, 3);

  return (
    <div style={{ marginBottom: 24, animation: 'fadeIn 0.4s ease 0.35s backwards' }}>
      <SectionLabel icon={<Trophy size={13} />}>Your standout rounds</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        <StandoutColumn
          kind="win"
          heading="Where you excelled"
          headingColor="var(--success)"
          headIcon={<Check size={15} strokeWidth={2.6} style={{ color: 'var(--success)' }} />}
          headIconBg="var(--success-bg)"
          rounds={excelled}
          emptyText="Your cleanest calls will show here as your star scores climb."
        />
        <StandoutColumn
          kind="build"
          heading="Where to build next"
          headingColor="var(--warning)"
          headIcon={<ArrowUp size={15} strokeWidth={2.4} style={{ color: 'var(--warning)' }} />}
          headIconBg="var(--warning-bg)"
          rounds={build}
          emptyText="Clean run - no rounds to revisit."
        />
      </div>
    </div>
  );
}

function StandoutColumn({
  kind,
  heading,
  headingColor,
  headIcon,
  headIconBg,
  rounds,
  emptyText,
}: {
  kind: 'win' | 'build';
  heading: string;
  headingColor: string;
  headIcon: ReactNode;
  headIconBg: string;
  rounds: RoundView[];
  emptyText: string;
}) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
        <IconSquare bg={headIconBg} size={26} radius={8}>
          {headIcon}
        </IconSquare>
        <span style={{ fontSize: 13, fontWeight: 800, color: headingColor }}>{heading}</span>
      </div>
      {rounds.length === 0 ? (
        <div
          style={{
            background: 'var(--white)',
            border: '1px solid var(--grey-100)',
            borderRadius: 'var(--radius-md)',
            padding: 16,
            fontSize: 13,
            color: 'var(--grey-400)',
            lineHeight: 1.5,
          }}
        >
          {emptyText}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {rounds.map((v) => (
            <RoundCard key={v.round} v={v} kind={kind} />
          ))}
        </div>
      )}
    </div>
  );
}

function RoundCard({ v, kind }: { v: RoundView; kind: 'win' | 'build' }) {
  const p = v.partner?.persona;
  const style = styleOf(v);
  const line = kind === 'win' ? wellDoneLine(v) : howToLiftLine(v);
  const label = kind === 'win' ? 'What you did well:' : 'How to lift it:';
  const markColor = kind === 'win' ? 'var(--success)' : 'var(--warning)';
  return (
    <div
      style={{
        background: 'var(--white)',
        border: '1px solid var(--grey-100)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)',
        padding: 14,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 9 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: `var(--style-${style})`,
            color: 'var(--white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 800,
            flexShrink: 0,
          }}
        >
          {p?.avatar}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--brand-navy)', lineHeight: 1.15 }}>
            {p?.name}
          </div>
          <div style={{ fontSize: 11, color: 'var(--grey-400)' }}>
            {hotelOf(v)} · Round {v.round}
          </div>
        </div>
        <span
          style={{
            marginLeft: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 10.5,
            fontWeight: 700,
            padding: '4px 9px',
            borderRadius: 'var(--radius-pill)',
            background: `var(--style-${style}-bg)`,
            color: `var(--style-${style})`,
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: `var(--style-${style})`,
            }}
          />
          {STYLE_NAMES[style]}
        </span>
      </div>
      <div style={{ display: 'flex', gap: 8, fontSize: 12.5, color: 'var(--grey-600)', lineHeight: 1.5 }}>
        <span style={{ flexShrink: 0, marginTop: 1, color: markColor }}>
          {kind === 'win' ? (
            <Check size={14} strokeWidth={2.6} />
          ) : (
            <ArrowUp size={14} strokeWidth={2.4} />
          )}
        </span>
        <span>
          <span style={{ fontWeight: 800, color: 'var(--grey-700)' }}>{label}</span> {line}
        </span>
      </div>
    </div>
  );
}

function IconSquare({
  children,
  bg,
  size = 38,
  radius = 10,
}: {
  children: ReactNode;
  bg: string;
  size?: number;
  radius?: number;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

function StatTile({
  iconBg,
  icon,
  value,
  valueColor,
  caption,
  secondary,
  secondaryColor,
}: {
  iconBg: string;
  icon: ReactNode;
  value: ReactNode;
  valueColor: string;
  caption?: string;
  secondary?: string;
  secondaryColor?: string;
}) {
  return (
    <div
      style={{
        background: 'var(--white)',
        border: '1px solid var(--grey-100)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)',
        padding: 18,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
      }}
    >
      <IconSquare bg={iconBg}>{icon}</IconSquare>
      <div>
        <div style={{ fontSize: 30, fontWeight: 800, color: valueColor, lineHeight: 1 }}>
          {value}
        </div>
        {secondary && (
          <div style={{ fontSize: 12, fontWeight: 700, color: secondaryColor, marginTop: 3 }}>
            {secondary}
          </div>
        )}
        {caption && (
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--grey-400)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginTop: 5,
            }}
          >
            {caption}
          </div>
        )}
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

function PersonaAggregateBlock({
  persona,
  totalRounds,
  strengthRounds,
  tradeOffRounds,
}: {
  persona: NonNullable<ReturnType<typeof getPersonaById>>;
  totalRounds: number;
  strengthRounds: number;
  tradeOffRounds: number;
}) {
  const Icon = persona.icon;
  const accent = `var(--style-${persona.accent})`;
  return (
    <div
      style={{
        background: 'var(--white)',
        border: '1px solid var(--grey-100)',
        borderRadius: 'var(--radius-md)',
        padding: 20,
        marginBottom: 20,
        animation: 'fadeIn 0.4s ease 0.18s backwards',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: accent,
            color: 'var(--white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={16} />
        </div>
        <h4 style={{ fontSize: 14, margin: 0 }}>
          As {persona.name}
        </h4>
      </div>
      <p
        style={{
          fontSize: 13,
          color: 'var(--grey-700)',
          lineHeight: 1.55,
          margin: 0,
        }}
      >
        You played{' '}
        <strong style={{ color: 'var(--brand-navy)' }}>
          {strengthRounds} of {totalRounds}
        </strong>{' '}
        rounds where your strength carried the conversation, and{' '}
        <strong style={{ color: 'var(--brand-navy)' }}>
          {tradeOffRounds} of {totalRounds}
        </strong>{' '}
        where a single star showed there's still room to build.{' '}
        {persona.powerEffect.aggregateCoaching}
      </p>
    </div>
  );
}

