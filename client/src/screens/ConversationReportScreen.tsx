import { motion } from 'framer-motion';
import { Star, Check, X, ChevronRight, RotateCcw } from 'lucide-react';
import type { LastConversationGrade, PartnerState } from '../types';
import { getPersonaById } from '../data/characters';

interface ConversationReportScreenProps {
  grade: LastConversationGrade;
  /** All partners in the current run, used to resolve names from ids. */
  partners: PartnerState[];
  /**
   * The learner's selected super-power persona id, or null if none picked.
   * Drives the persona retro line that surfaces on >= 2-star wins and
   * 0-star losses. Nothing rendered for 1-star scrappy passes.
   */
  personaId: string | null;
  /** Called when the learner clicks Continue (only enabled when stars >= 1). */
  onContinue: () => void;
  /**
   * Called when the learner clicks Retake (only shown when stars === 0).
   * Task 3 keeps this as a stub - the round-reset logic lands with the
   * gating work in task 4.
   */
  onRetake: () => void;
}

const STYLE_STRONG_THRESHOLD = 5;
const STYLE_OPTIMAL_THRESHOLD = 6;

export function ConversationReportScreen({
  grade,
  partners,
  personaId,
  onContinue,
  onRetake,
}: ConversationReportScreenProps) {
  const partner = partners.find((p) => p.persona.id === grade.partnerId);
  const persona = getPersonaById(personaId);
  // Persona retro: name the strength on wins (>=2 stars), name the
  // trade-off on losses (0 stars). 1-star scrappy passes get nothing -
  // the persona didn't clearly carry or cost the round.
  const personaRetro = persona
    ? grade.stars >= 2
      ? persona.powerEffect.retroOnWin
      : grade.stars === 0
        ? persona.powerEffect.retroOnLoss
        : null
    : null;
  // Deliberately not naming the expected partner here - revealing
  // it gives the answer away. The criterion line below just signals
  // 'you picked the wrong one' and the learner has to re-read the
  // portfolio data on retake.

  const passed = grade.stars > 0;
  const headline = headlineFor(grade);
  const subline = sublineFor(grade);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        background: 'var(--brand-navy-dark)',
        color: 'var(--white)',
        overflowY: 'auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          width: '100%',
          maxWidth: 640,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--brand-yellow)',
          }}
        >
          Round {grade.round} report
        </div>

        <StarsRow stars={grade.stars} />

        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: 'var(--white)',
            textAlign: 'center',
            margin: 0,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
          }}
        >
          {headline}
        </h1>

        <p
          style={{
            fontSize: 15,
            color: 'rgba(255,255,255,0.75)',
            textAlign: 'center',
            margin: 0,
            lineHeight: 1.55,
            maxWidth: 560,
          }}
        >
          {subline}
        </p>

        {/* Floor criteria */}
        <div
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 12,
            padding: '18px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <Criterion
            label="Picked the right partner"
            passed={grade.rightPartner}
            detail={
              !grade.rightPartner
                ? 'A different partner needed you more this round. Look again at the data.'
                : partner
                  ? `${partner.persona.name}.`
                  : null
            }
          />
          <Criterion
            label="Identified the issue (Diagnosis)"
            passed={grade.diagnosisCorrect}
          />
          <Criterion
            label="Recommended the right fix (Pitch)"
            passed={grade.pitchCorrect}
          />
          <Criterion
            label="All picks compliant"
            passed={grade.allCompliant}
          />
          <Criterion
            label="Avoided a style mismatch"
            passed={grade.noActiveMismatch}
          />
        </div>

        {/* Style alignment readout */}
        <div
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.03)',
            border: '1px dashed rgba(255,255,255,0.10)',
            borderRadius: 10,
            padding: '12px 22px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            fontSize: 13,
            color: 'rgba(255,255,255,0.75)',
          }}
        >
          <span>Style match with {partner?.persona.name ?? 'partner'}</span>
          <span
            style={{
              fontWeight: 700,
              color:
                grade.styleSum >= STYLE_OPTIMAL_THRESHOLD
                  ? 'var(--brand-yellow)'
                  : grade.styleSum >= STYLE_STRONG_THRESHOLD
                    ? 'var(--brand-blue-light, #62B6FF)'
                    : 'rgba(255,255,255,0.65)',
            }}
          >
            {grade.styleSum >= STYLE_OPTIMAL_THRESHOLD
              ? 'Optimal'
              : grade.styleSum >= STYLE_STRONG_THRESHOLD
                ? 'Strong'
                : grade.stars >= 1
                  ? 'Neutral'
                  : 'Off-pitch'}
          </span>
        </div>

        {/* Persona retro - shown on wins and losses, hidden on 1-star passes */}
        {persona && personaRetro && <PersonaRetro persona={persona} text={personaRetro} />}

        {/* CTA */}
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          {passed ? (
            <button
              onClick={onContinue}
              style={primaryButtonStyle()}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--brand-yellow-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--brand-yellow)';
              }}
            >
              Continue
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={onRetake}
              style={primaryButtonStyle()}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--brand-yellow-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--brand-yellow)';
              }}
            >
              <RotateCcw size={16} />
              Retake round
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function StarsRow({ stars }: { stars: 0 | 1 | 2 | 3 }) {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      {[1, 2, 3].map((i) => {
        const earned = i <= stars;
        return (
          <motion.div
            key={i}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.35, ease: 'backOut' }}
          >
            <Star
              size={52}
              strokeWidth={1.5}
              fill={earned ? 'var(--brand-yellow)' : 'transparent'}
              color={earned ? 'var(--brand-yellow)' : 'rgba(255,255,255,0.25)'}
              style={{
                filter: earned
                  ? 'drop-shadow(0 0 12px rgba(254, 186, 2, 0.45))'
                  : 'none',
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

function Criterion({
  label,
  passed,
  detail,
}: {
  label: string;
  passed: boolean;
  detail?: string | null;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
      <div
        style={{
          flexShrink: 0,
          width: 22,
          height: 22,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: passed
            ? 'rgba(34, 197, 94, 0.18)'
            : 'rgba(239, 68, 68, 0.18)',
          color: passed ? 'rgb(74, 222, 128)' : 'rgb(248, 113, 113)',
          marginTop: 2,
        }}
      >
        {passed ? <Check size={13} strokeWidth={3} /> : <X size={13} strokeWidth={3} />}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: passed ? 'var(--white)' : 'rgba(255,255,255,0.92)',
          }}
        >
          {label}
        </div>
        {detail && (
          <div
            style={{
              fontSize: 12.5,
              color: 'rgba(255,255,255,0.55)',
              marginTop: 2,
              lineHeight: 1.45,
            }}
          >
            {detail}
          </div>
        )}
      </div>
    </div>
  );
}

function headlineFor(grade: LastConversationGrade): string {
  if (grade.stars === 3) return 'Optimal call';
  if (grade.stars === 2) return 'Strong call';
  if (grade.stars === 1) return 'Solid call';
  switch (grade.failureReason) {
    case 'wrong-partner':
      return 'Missed call';
    case 'wrong-diagnosis':
      return 'Missed the diagnosis';
    case 'wrong-pitch':
      return 'Wrong recommendation';
    case 'unsafe-pick':
      return 'Stepped over the line';
    case 'style-mismatch':
      return 'Tone-deaf delivery';
    default:
      return 'Round not passed';
  }
}

function sublineFor(grade: LastConversationGrade): string {
  if (grade.stars === 3) {
    return "You spotted the right partner, named the right problem, recommended the right fix, and matched their style throughout. That's how it's done.";
  }
  if (grade.stars === 2) {
    return 'You spotted the right partner, identified the issue and recommended the right fix - and you read their communication style well too.';
  }
  if (grade.stars === 1) {
    return 'You identified the issue and recommended the right fix on the right partner. There is room to read their style more closely next time.';
  }
  switch (grade.failureReason) {
    case 'wrong-partner':
      return "You spent this round on a partner who was not the one most in need. Retake this round and look more carefully at who's struggling.";
    case 'wrong-diagnosis':
      return "You named a cause that doesn't fit the data. Retake the round and look harder at what the numbers are actually telling you.";
    case 'wrong-pitch':
      return "Your diagnosis was right, but the action you recommended would not have fixed the underlying issue. Retake and try a different pitch.";
    case 'unsafe-pick':
      return 'One of your picks would not have been compliant. Retake the round and stay inside the safe options.';
    case 'style-mismatch':
      return "You alienated the partner with how you spoke to them. The substance may have been right but the delivery missed badly. Retake and read them more carefully.";
    default:
      return 'Retake the round and try a different approach.';
  }
}

function PersonaRetro({
  persona,
  text,
}: {
  persona: NonNullable<ReturnType<typeof getPersonaById>>;
  text: string;
}) {
  const Icon = persona.icon;
  return (
    <div
      style={{
        width: '100%',
        background: 'rgba(255,255,255,0.06)',
        borderLeft: `3px solid var(--style-${persona.accent}-bright)`,
        borderTop: '1px solid rgba(255,255,255,0.10)',
        borderRight: '1px solid rgba(255,255,255,0.10)',
        borderBottom: '1px solid rgba(255,255,255,0.10)',
        borderRadius: 10,
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        fontSize: 13,
        color: 'rgba(255,255,255,0.92)',
        lineHeight: 1.55,
      }}
    >
      <Icon
        size={16}
        style={{
          color: 'var(--white)',
          marginTop: 2,
          flexShrink: 0,
          opacity: 0.85,
        }}
      />
      <span>{text}</span>
    </div>
  );
}

function primaryButtonStyle(): React.CSSProperties {
  return {
    background: 'var(--brand-yellow)',
    color: 'var(--brand-navy)',
    padding: '14px 32px',
    borderRadius: 'var(--radius-sm)',
    fontSize: 15,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(254, 186, 2, 0.25)',
    transition: 'background 0.15s ease',
  };
}
