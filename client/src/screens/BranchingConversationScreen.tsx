import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
  PhoneCall,
} from 'lucide-react';
import type { PartnerState } from '../types';
import { getBranchingScenario } from '../data/branchingScenarios';

interface BranchingConversationScreenProps {
  partner: PartnerState;
  currentRound: number;
  conversation: {
    partnerId: string;
    phaseIndex: number;
    choices: string[];
    currentResponse: string | null;
    currentEmotion: 'positive' | 'neutral' | 'cautious' | 'negative' | null;
    styleMatchScore: number | null;
  };
  onChoice: (optionId: string) => void;
  onEnd: () => void;
  onBack: () => void;
}

const styleColors: Record<string, string> = {
  red: 'var(--style-red)',
  yellow: 'var(--style-yellow)',
  green: 'var(--style-green)',
  blue: 'var(--style-blue)',
};

function getReactionLabel(styleMatch: number): {
  text: string;
  color: string;
  bg: string;
} | null {
  if (styleMatch >= 2) {
    return {
      text: 'Really connected with that approach',
      color: 'var(--success)',
      bg: 'var(--success-bg)',
    };
  }
  if (styleMatch >= 1) {
    return { text: 'Responded well', color: 'var(--success)', bg: 'var(--success-bg)' };
  }
  if (styleMatch <= -2) {
    return {
      text: "That didn't land well",
      color: 'var(--danger)',
      bg: 'var(--danger-bg)',
    };
  }
  if (styleMatch <= -1) {
    return { text: 'Seemed hesitant', color: 'var(--warning)', bg: 'var(--warning-bg)' };
  }
  return null;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function BranchingConversationScreen({
  partner,
  currentRound,
  conversation,
  onChoice,
  onEnd,
  onBack,
}: BranchingConversationScreenProps) {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Live call-duration ticker. Restarts on remount (e.g. a retake or
  // a fresh partner). Cosmetic only - feeds the softphone metaphor;
  // no engine state depends on it.
  const [callSeconds, setCallSeconds] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setCallSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const tree = getBranchingScenario(partner.persona.id, currentRound);
  if (!tree) return null;

  const isComplete = conversation.choices.length >= tree.steps.length;
  const currentStep = tree.steps[conversation.phaseIndex];

  // Resolve the partner's prompt for the current step. The previous
  // step's picked option may override the default via `nextPrompt`.
  const prevStepIndex = conversation.phaseIndex - 1;
  const prevChoiceId =
    prevStepIndex >= 0 ? conversation.choices[prevStepIndex] : undefined;
  const prevOption =
    prevStepIndex >= 0
      ? tree.steps[prevStepIndex]?.options.find((o) => o.id === prevChoiceId)
      : undefined;
  const partnerPrompt = prevOption?.nextPrompt ?? currentStep?.partnerPrompt ?? '';

  const handleSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setTimeout(() => {
      onChoice(optionId);
      setSelectedOption(null);
    }, 400);
  };

  const partnerColor = styleColors[partner.persona.style] ?? 'var(--brand-blue)';
  const firstName = partner.persona.name.split(' ')[0];

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: 'var(--off-white)',
        padding: '12px',
      }}
    >
      <motion.div
        initial={{ y: 8 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          flex: 1,
          maxWidth: 820,
          width: '100%',
          margin: '0 auto',
          background: 'var(--white)',
          borderRadius: 18,
          boxShadow: '0 16px 50px rgba(0,15,40,0.18)',
          border: '1px solid var(--grey-100)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Call header */}
        <div
          style={{
            padding: '16px 22px',
            background:
              'linear-gradient(135deg, var(--brand-navy) 0%, var(--brand-navy-dark) 100%)',
            color: 'var(--white)',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          {conversation.choices.length === 0 && (
            <button
              onClick={onBack}
              style={{
                background: 'rgba(255,255,255,0.10)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--white)',
                cursor: 'pointer',
                transition: 'background 0.15s ease',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.10)';
              }}
            >
              <ArrowLeft size={13} />
              Back
            </button>
          )}

          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'var(--success)',
              color: 'var(--white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 0 4px rgba(0, 138, 14, 0.20)',
              flexShrink: 0,
            }}
          >
            <PhoneCall size={16} />
          </div>

          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: partnerColor,
              color: 'var(--white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {partner.persona.avatar}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 800 }}>{partner.persona.name}</div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 11.5,
                color: 'rgba(255,255,255,0.75)',
                marginTop: 2,
              }}
            >
              <span
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {partner.persona.propertyName}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
              <motion.span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#3ee27a',
                  flexShrink: 0,
                }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <span style={{ color: '#3ee27a', fontWeight: 700 }}>Live</span>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                {formatDuration(callSeconds)}
              </span>
            </div>
          </div>

          {/* Step dots - call progress along the diagnostic arc. Hover
              shows the step label for sighted users; assistive tech
              still gets the count from the visible content. */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              flexShrink: 0,
            }}
          >
            {tree.steps.map((step, i) => {
              const isActive = i === conversation.phaseIndex && !isComplete;
              const isDone = i < conversation.choices.length;
              return (
                <div
                  key={step.id}
                  title={step.label ?? step.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    fontSize: 10.5,
                    fontWeight: 800,
                    background: isActive
                      ? 'var(--brand-yellow)'
                      : isDone
                        ? 'rgba(255,255,255,0.14)'
                        : 'rgba(255,255,255,0.06)',
                    color: isActive
                      ? 'var(--brand-navy)'
                      : isDone
                        ? 'rgba(255,255,255,0.9)'
                        : 'rgba(255,255,255,0.4)',
                    border: isActive ? '1.5px solid var(--brand-yellow)' : '1.5px solid transparent',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isDone ? <CheckCircle2 size={11} /> : i + 1}
                </div>
              );
            })}
          </div>
        </div>

        {/* Transcript */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '28px 36px',
            background:
              'linear-gradient(180deg, var(--white) 0%, var(--off-white) 100%)',
          }}
        >
          <motion.div
            key={`turn-${conversation.phaseIndex}-${conversation.choices.length}`}
            initial={{ y: 6 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: 'var(--brand-navy)',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginBottom: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: partnerColor,
                }}
              />
              {firstName} says
            </div>
            <div
              style={{
                fontSize: 17,
                lineHeight: 1.6,
                color: 'var(--grey-700)',
                fontWeight: 500,
                borderLeft: `3px solid ${partnerColor}`,
                paddingLeft: 16,
              }}
            >
              &ldquo;
              {isComplete && conversation.currentResponse
                ? conversation.currentResponse
                : partnerPrompt}
              &rdquo;
            </div>

            {conversation.styleMatchScore !== null &&
              (() => {
                const reaction = getReactionLabel(conversation.styleMatchScore);
                if (!reaction) return null;
                return (
                  <div
                    style={{
                      marginTop: 14,
                      marginLeft: 19,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '5px 12px',
                      borderRadius: 'var(--radius-pill)',
                      background: reaction.bg,
                      color: reaction.color,
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: reaction.color,
                      }}
                    />
                    {reaction.text}
                  </div>
                );
              })()}
          </motion.div>
        </div>

        {/* Response footer / completion CTA */}
        {isComplete ? (
          <div
            style={{
              padding: '18px 28px',
              background: 'var(--off-white)',
              borderTop: '1px solid var(--grey-100)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'var(--success)',
                  color: 'var(--white)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 0 4px rgba(0, 138, 14, 0.18)',
                  flexShrink: 0,
                }}
              >
                <CheckCircle2 size={18} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: 'var(--brand-navy)',
                  }}
                >
                  Call complete
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--grey-500)' }}>
                  Duration {formatDuration(callSeconds)}
                </div>
              </div>
            </div>
            <button
              onClick={onEnd}
              style={{
                background:
                  'linear-gradient(135deg, var(--brand-yellow) 0%, #ffc933 100%)',
                color: 'var(--brand-navy-dark)',
                padding: '12px 28px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 14,
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                boxShadow: '0 3px 14px rgba(254,186,2,0.35)',
                border: 'none',
                flexShrink: 0,
              }}
            >
              See round report
              <ChevronRight size={16} />
            </button>
          </div>
        ) : (
          <div
            style={{
              padding: '16px 28px 20px',
              background: 'var(--off-white)',
              borderTop: '1px solid var(--grey-100)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                  background: 'var(--brand-navy)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <User size={12} style={{ color: 'var(--white)' }} />
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: 'var(--brand-navy)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                }}
              >
                Your response
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {currentStep?.options.map((option) => {
                const isHovered = hoveredOption === option.id;
                const isSelected = selectedOption === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    onMouseEnter={() => setHoveredOption(option.id)}
                    onMouseLeave={() => setHoveredOption(null)}
                    disabled={selectedOption !== null}
                    style={{
                      background: isSelected
                        ? 'linear-gradient(135deg, var(--brand-navy) 0%, var(--brand-navy-light) 100%)'
                        : 'var(--white)',
                      border: isSelected
                        ? '2px solid var(--brand-navy)'
                        : isHovered
                          ? '2px solid var(--brand-blue)'
                          : '2px solid var(--grey-100)',
                      borderRadius: 'var(--radius-md)',
                      padding: '12px 16px',
                      textAlign: 'left',
                      cursor: selectedOption ? 'default' : 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected
                        ? '0 4px 16px rgba(0,53,128,0.25)'
                        : isHovered
                          ? '0 3px 10px rgba(0,53,128,0.10)'
                          : 'var(--shadow-sm)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: isSelected ? 'rgba(255,255,255,0.75)' : 'var(--brand-blue)',
                        marginBottom: 3,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {option.label}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: isSelected
                          ? 'rgba(255,255,255,0.95)'
                          : 'var(--grey-700)',
                        lineHeight: 1.5,
                              }}
                    >
                      &ldquo;{option.playerDialogue}&rdquo;
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
