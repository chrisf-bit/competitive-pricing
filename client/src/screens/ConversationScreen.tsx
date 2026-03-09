import { useState } from 'react';
import { User, ChevronRight, AlertTriangle, CheckCircle2, Shield } from 'lucide-react';
import type { PartnerState } from '../types';
import { getConversationTree } from '../data/conversations';

interface ConversationScreenProps {
  partner: PartnerState;
  currentRound: number;
  conversation: {
    partnerId: string;
    phaseIndex: number;
    choices: string[];
    currentResponse: string | null;
  };
  onChoice: (optionId: string) => void;
  onEnd: () => void;
}

const phaseLabels = ['Opening', 'Recommendation', 'Objection Handling'];

export function ConversationScreen({
  partner,
  currentRound,
  conversation,
  onChoice,
  onEnd,
}: ConversationScreenProps) {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const tree = getConversationTree(partner.persona.id, currentRound);
  if (!tree) return null;

  const isComplete = conversation.choices.length >= tree.phases.length;
  const currentPhaseData = tree.phases[conversation.phaseIndex];
  const phase = currentPhaseData?.phase;

  const prevNodeChoice =
    conversation.phaseIndex > 0 && conversation.choices.length > 0
      ? conversation.choices[conversation.choices.length - 1]
      : null;
  const prevPhaseData =
    conversation.phaseIndex > 0
      ? tree.phases[conversation.phaseIndex - 1]
      : null;
  const prevNode = prevPhaseData?.nodes.find(
    (n) => n.optionId === prevNodeChoice,
  );
  const partnerPrompt =
    prevNode?.nextPhasePrompt ?? phase?.partnerPrompt ?? '';

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
      {/* Conversation header */}
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
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'linear-gradient(135deg, var(--brand-navy) 0%, var(--brand-navy-light) 100%)',
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
            <div style={{ fontWeight: 700, color: 'var(--brand-navy)', fontSize: 15 }}>
              {partner.persona.name}
            </div>
            <div style={{ fontSize: 12, color: 'var(--grey-400)' }}>
              {partner.persona.propertyName}
            </div>
          </div>
        </div>

        {/* Phase progress — bolder */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {phaseLabels.map((label, i) => {
            const isActive = i === conversation.phaseIndex && !isComplete;
            const isDone = i < conversation.choices.length;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '5px 14px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: 12,
                    fontWeight: 700,
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
                  {isDone && <CheckCircle2 size={12} />}
                  {label}
                </div>
                {i < phaseLabels.length - 1 && (
                  <div style={{
                    width: 16,
                    height: 2,
                    background: isDone ? 'var(--success)' : 'var(--grey-200)',
                    borderRadius: 1,
                    transition: 'background 0.3s ease',
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Conversation body */}
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
                background: 'linear-gradient(135deg, var(--brand-navy) 0%, var(--brand-navy-light) 100%)',
                color: 'var(--white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 800,
                flexShrink: 0,
                boxShadow: '0 3px 12px rgba(0,53,128,0.2)',
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
            </div>
          </div>
        </div>

        {/* Player options or completion */}
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
                background: 'linear-gradient(135deg, var(--brand-yellow) 0%, #ffc933 100%)',
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
              Return to Portfolio
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
              {phase?.options.map((option, idx) => {
                const isHovered = hoveredOption === option.id;
                const isSelected = selectedOption === option.id;
                const isDisabled = selectedOption !== null && !isSelected;

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
                      padding: '16px 20px',
                      textAlign: 'left',
                      cursor: selectedOption ? 'default' : 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected
                        ? '0 4px 16px rgba(0,53,128,0.25)'
                        : isHovered
                          ? 'var(--shadow-lg)'
                          : 'var(--shadow-sm)',
                      opacity: isDisabled ? 0.3 : 1,
                      transform: isHovered && !isDisabled ? 'translateX(4px)' : 'none',
                      animation: `fadeIn 0.3s ease ${idx * 0.06}s backwards`,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Left accent bar */}
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 4,
                        background: isSelected
                          ? 'var(--brand-yellow)'
                          : isHovered
                            ? 'var(--brand-blue)'
                            : 'transparent',
                        borderRadius: '0 2px 2px 0',
                        transition: 'background 0.2s ease',
                      }}
                    />

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: 14,
                          color: isSelected ? 'var(--white)' : 'var(--brand-navy)',
                        }}
                      >
                        {option.label}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {option.compliance === 'safe' && isHovered && (
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              color: 'var(--success)',
                              background: 'var(--success-bg)',
                              padding: '2px 7px',
                              borderRadius: 'var(--radius-pill)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 3,
                            }}
                          >
                            <Shield size={9} />
                            Compliant
                          </span>
                        )}
                        {option.compliance === 'risky' && (
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              color: 'var(--danger)',
                              background: 'var(--danger-bg)',
                              padding: '2px 7px',
                              borderRadius: 'var(--radius-pill)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 3,
                            }}
                          >
                            <AlertTriangle size={9} />
                            Compliance risk
                          </span>
                        )}
                        {option.compliance === 'borderline' && (
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              color: 'var(--warning)',
                              background: 'var(--warning-bg)',
                              padding: '2px 7px',
                              borderRadius: 'var(--radius-pill)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 3,
                            }}
                          >
                            <AlertTriangle size={9} />
                            Borderline
                          </span>
                        )}
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: isSelected ? 'rgba(255,255,255,0.8)' : 'var(--grey-500)',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {option.description}
                    </p>
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
