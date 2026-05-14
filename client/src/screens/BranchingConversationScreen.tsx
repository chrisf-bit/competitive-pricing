import { useState } from 'react';
import { User, ChevronRight, CheckCircle2, ArrowLeft } from 'lucide-react';
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

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: 'var(--off-white)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 24px',
          background: 'var(--white)',
          borderBottom: '2px solid var(--grey-100)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {conversation.choices.length === 0 && (
            <button
              onClick={onBack}
              style={{
                background: 'var(--white)',
                border: '2px solid var(--grey-100)',
                borderRadius: 'var(--radius-sm)',
                padding: '7px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--grey-500)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <ArrowLeft size={13} />
              Back
            </button>
          )}
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: styleColors[partner.persona.style] ?? 'var(--brand-navy)',
              color: 'var(--white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              fontWeight: 800,
              boxShadow: '0 2px 8px rgba(0,53,128,0.25)',
            }}
          >
            {partner.persona.avatar}
          </div>
          <div>
            <div
              style={{ fontWeight: 700, color: 'var(--brand-navy)', fontSize: 15 }}
            >
              {partner.persona.name}
            </div>
            <div style={{ fontSize: 12, color: 'var(--grey-400)' }}>
              {partner.persona.propertyName}
            </div>
          </div>
        </div>

        {/* Step progress - dots rather than named pills, since branching
            scenarios can have up to ~6 steps and named pills would
            overflow the header. Hover shows the step label. */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
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
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  fontSize: 11,
                  fontWeight: 800,
                  background: isActive
                    ? 'var(--brand-navy)'
                    : isDone
                      ? 'var(--success)'
                      : 'var(--grey-100)',
                  color: isActive || isDone ? 'var(--white)' : 'var(--grey-400)',
                  boxShadow: isActive ? '0 2px 8px rgba(0,53,128,0.25)' : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                {isDone ? <CheckCircle2 size={12} /> : i + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '20px 32px',
          gap: 20,
          maxWidth: 800,
          margin: '0 auto',
          width: '100%',
          overflowY: 'auto',
        }}
      >
        {/* Partner says */}
        <div style={{ animation: 'fadeIn 0.4s ease' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background:
                  styleColors[partner.persona.style] ?? 'var(--brand-navy)',
                color: 'var(--white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 800,
                flexShrink: 0,
                boxShadow: '0 3px 12px rgba(0,0,0,0.15)',
              }}
            >
              {partner.persona.avatar}
            </div>
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'var(--brand-navy)',
                  marginBottom: 6,
                }}
              >
                {partner.persona.name.split(' ')[0]}
              </div>
              <div
                style={{
                  background: 'var(--white)',
                  border: '2px solid var(--grey-100)',
                  borderRadius: '4px 16px 16px 16px',
                  padding: '16px 20px',
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: 'var(--grey-700)',
                  boxShadow: 'var(--shadow-md)',
                  maxWidth: 580,
                  fontWeight: 500,
                }}
              >
                {isComplete && conversation.currentResponse
                  ? conversation.currentResponse
                  : partnerPrompt}
              </div>
              {conversation.styleMatchScore !== null &&
                (() => {
                  const reaction = getReactionLabel(conversation.styleMatchScore);
                  if (!reaction) return null;
                  return (
                    <div
                      style={{
                        marginTop: 8,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '5px 12px',
                        borderRadius: 'var(--radius-pill)',
                        background: reaction.bg,
                        color: reaction.color,
                        fontSize: 11,
                        fontWeight: 700,
                        animation: 'fadeIn 0.4s ease',
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
            </div>
          </div>
        </div>

        {/* Options or completion CTA */}
        {isComplete ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
              marginTop: 12,
              animation: 'slideUp 0.4s ease',
            }}
          >
            <div
              style={{
                padding: '14px 24px',
                background: 'var(--success)',
                borderRadius: 'var(--radius-md)',
                fontSize: 14,
                color: 'var(--white)',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 3px 12px rgba(0,138,14,0.3)',
              }}
            >
              <CheckCircle2 size={18} />
              Conversation complete
            </div>
            <button
              onClick={onEnd}
              style={{
                background:
                  'linear-gradient(135deg, var(--brand-yellow) 0%, #ffc933 100%)',
                color: 'var(--brand-navy-dark)',
                padding: '13px 36px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 15,
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                boxShadow: '0 3px 14px rgba(254,186,2,0.35)',
              }}
            >
              See round report
              <ChevronRight size={16} />
            </button>
          </div>
        ) : (
          <div style={{ animation: 'slideUp 0.4s ease 0.15s backwards' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  background: 'var(--brand-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <User size={13} style={{ color: 'var(--white)' }} />
              </div>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'var(--brand-navy)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Choose your approach
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
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
                      padding: '14px 18px',
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
                        fontSize: 13.5,
                        fontWeight: 700,
                        color: isSelected ? 'var(--white)' : 'var(--brand-navy)',
                        marginBottom: 4,
                      }}
                    >
                      {option.label}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: isSelected
                          ? 'rgba(255,255,255,0.85)'
                          : 'var(--grey-500)',
                        lineHeight: 1.45,
                      }}
                    >
                      {option.playerDialogue}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
