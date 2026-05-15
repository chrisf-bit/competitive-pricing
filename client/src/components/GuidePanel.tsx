import {
  BookOpen,
  Target,
  MousePointerClick,
  MessageSquare,
  BarChart3,
  Clock,
  Award,
  Lightbulb,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Zap,
  Eye,
  Users,
  Check,
  TreeDeciduous,
} from 'lucide-react';
import { useState } from 'react';
import type { GameScreen, PartnerState } from '../types';

interface GuidePanelProps {
  screen: GameScreen;
  currentRound: number;
  actionsRemaining: number;
  selectedPartner: PartnerState | null;
  conversationPhase: number;
  conversationComplete: boolean;
  /** True once the learner has clicked Acknowledge on the market banner. */
  marketUpdateAcknowledged: boolean;
}

interface GuideStep {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  done?: boolean;
}

interface GuideTip {
  icon: React.ReactNode;
  title: string;
  text: string;
}

function IconBox({ children, bg = 'rgba(255,255,255,0.08)', size = 28 }: { children: React.ReactNode; bg?: string; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size / 3.5,
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

export function GuidePanel({
  screen,
  currentRound,
  actionsRemaining,
  selectedPartner,
  conversationPhase,
  conversationComplete,
  marketUpdateAcknowledged,
}: GuidePanelProps) {
  const [tipsOpen, setTipsOpen] = useState(true);

  const content = getGuideContent(
    screen,
    currentRound,
    actionsRemaining,
    selectedPartner,
    conversationPhase,
    conversationComplete,
    marketUpdateAcknowledged,
  );

  return (
    <div
      data-tutorial="guide-panel"
      style={{
        width: 320,
        minWidth: 320,
        margin: '12px 0 12px 12px',
        background: 'linear-gradient(180deg, var(--brand-navy) 0%, var(--brand-navy-dark) 100%)',
        color: 'var(--white)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: 14,
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 12px 32px rgba(0, 12, 35, 0.5), 0 0 0 1px rgba(254, 186, 2, 0.18)',
        position: 'relative',
      }}
    >
      {/* Guide header */}
      <div
        style={{
          padding: '16px 18px 14px',
          borderBottom: '1px solid rgba(255,255,255,0.10)',
          background: 'rgba(254, 186, 2, 0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <IconBox bg="rgba(254, 186, 2, 0.20)" size={32}>
          <BookOpen size={16} style={{ color: 'var(--brand-yellow)' }} />
        </IconBox>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: '0.01em' }}>
            Simulation Guide
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
            {content.screenLabel}
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        {/* Objective */}
        <div style={{ padding: '16px 18px 12px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              marginBottom: 10,
            }}
          >
            <IconBox bg="rgba(254,186,2,0.15)" size={24}>
              <Target size={12} style={{ color: 'var(--brand-yellow)' }} />
            </IconBox>
            <span style={{
              fontSize: 10,
              fontWeight: 800,
              color: 'var(--brand-yellow)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              Objective
            </span>
          </div>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.55,
              color: 'rgba(255,255,255,0.85)',
              margin: 0,
            }}
          >
            {content.objective}
          </p>
        </div>

        {/* Steps */}
        <div
          style={{
            padding: '12px 18px 14px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
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
            <IconBox bg="rgba(0,159,227,0.15)" size={24}>
              <MousePointerClick size={12} style={{ color: 'var(--brand-blue-light)' }} />
            </IconBox>
            <span style={{
              fontSize: 10,
              fontWeight: 800,
              color: 'var(--brand-blue-light)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              What to do
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {content.steps.map((step, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 10px',
                  borderRadius: 8,
                  background: step.active
                    ? 'rgba(0,159,227,0.15)'
                    : step.done
                      ? 'rgba(0,128,9,0.1)'
                      : 'rgba(255,255,255,0.04)',
                  border: step.active
                    ? '1px solid rgba(0,159,227,0.3)'
                    : '1px solid transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                <IconBox
                  bg={
                    step.active
                      ? 'rgba(0,159,227,0.25)'
                      : step.done
                        ? 'rgba(0,138,14,0.2)'
                        : 'rgba(255,255,255,0.06)'
                  }
                  size={26}
                >
                  <div style={{
                    color: step.active
                      ? 'var(--brand-blue-light)'
                      : step.done
                        ? 'var(--success)'
                        : 'rgba(255,255,255,0.35)',
                  }}>
                    {step.icon}
                  </div>
                </IconBox>
                <span
                  style={{
                    flex: 1,
                    fontSize: 12,
                    lineHeight: 1.4,
                    fontWeight: step.active ? 600 : step.done ? 500 : 400,
                    color: step.active
                      ? 'var(--white)'
                      : step.done
                        ? 'rgba(255,255,255,0.85)'
                        : 'rgba(255,255,255,0.6)',
                  }}
                >
                  {step.text}
                </span>
                {step.done && (
                  <Check
                    size={14}
                    strokeWidth={3.5}
                    style={{
                      // --success (#008a0e) reads too muddy on the navy
                      // panel - using a brighter tone so the tick pops
                      // against the dark background.
                      color: '#3ee27a',
                      flexShrink: 0,
                      filter: 'drop-shadow(0 0 6px rgba(62, 226, 122, 0.4))',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tips section */}
        {content.tips.length > 0 && (
          <div
            style={{
              padding: '0 18px 14px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <button
              onClick={() => setTipsOpen(!tipsOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '12px 0 8px',
                background: 'none',
                border: 'none',
                color: 'var(--brand-yellow)',
                fontSize: 10,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <IconBox bg="rgba(254,186,2,0.15)" size={22}>
                  <Lightbulb size={11} style={{ color: 'var(--brand-yellow)' }} />
                </IconBox>
                Tips
              </span>
              {tipsOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>

            {tipsOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {content.tips.map((tip, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '10px 12px',
                      background: 'rgba(255,255,255,0.04)',
                      borderRadius: 8,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 7,
                        marginBottom: 4,
                        color: 'rgba(255,255,255,0.85)',
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      <IconBox bg="rgba(255,255,255,0.08)" size={22}>
                        {tip.icon}
                      </IconBox>
                      {tip.title}
                    </div>
                    <p
                      style={{
                        fontSize: 11,
                        lineHeight: 1.5,
                        color: 'rgba(255,255,255,0.5)',
                        margin: '0 0 0 29px',
                      }}
                    >
                      {tip.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Round progress */}
        <div
          style={{
            padding: '14px 18px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            marginTop: 'auto',
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
            <IconBox bg="rgba(255,255,255,0.06)" size={22}>
              <BarChart3 size={11} style={{ color: 'rgba(255,255,255,0.4)' }} />
            </IconBox>
            <span style={{
              fontSize: 10,
              fontWeight: 800,
              color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              Progress
            </span>
          </div>
          <div style={{ display: 'flex', gap: 3, marginBottom: 8 }}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((r) => (
              <div
                key={r}
                style={{
                  flex: 1,
                  height: 6,
                  borderRadius: 3,
                  background:
                    r < currentRound
                      ? 'var(--success)'
                      : r === currentRound
                        ? 'var(--brand-yellow)'
                        : 'rgba(255,255,255,0.1)',
                  transition: 'background 0.3s ease',
                }}
              />
            ))}
          </div>
          <div
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.4)',
              fontWeight: 600,
            }}
          >
            Round {currentRound}/10
          </div>
        </div>
      </div>
    </div>
  );
}

function getGuideContent(
  screen: GameScreen,
  currentRound: number,
  actionsRemaining: number,
  selectedPartner: PartnerState | null,
  conversationPhase: number,
  conversationComplete: boolean,
  marketUpdateAcknowledged: boolean,
): {
  screenLabel: string;
  objective: string;
  steps: GuideStep[];
  tips: GuideTip[];
} {
  switch (screen) {
    case 'portfolio':
      return {
        screenLabel: 'Portfolio Dashboard',
        objective:
          actionsRemaining > 0
            ? 'Identify which partners need attention most and engage them.'
            : 'All actions used. Advance to the next round.',
        steps: [
          {
            icon: <Eye size={13} />,
            text: 'Check the market update',
            done: marketUpdateAcknowledged,
            active: !marketUpdateAcknowledged,
          },
          {
            icon: <Target size={13} />,
            text: 'Pick the partner who needs you most',
            active:
              marketUpdateAcknowledged && actionsRemaining > 0,
            done: actionsRemaining === 0,
          },
          {
            icon: <Clock size={13} />,
            text: 'Advance round',
            active: actionsRemaining === 0,
          },
        ],
        tips: [
          {
            icon: <AlertTriangle size={12} />,
            title: 'Prioritise wisely',
            text: 'One partner per round. Pick the one whose numbers need you most - neglected partners drift.',
          },
          {
            icon: <Zap size={12} />,
            title: 'Dig deeper',
            text: 'Low RPD can stem from discounts, config issues, or price competitiveness.',
          },
          ...(currentRound > 1
            ? [{
                icon: <Users size={12} />,
                title: 'Relationships shift',
                text: 'Neglected partners cool. This affects conversations.',
              }]
            : []),
        ],
      };

    case 'partner-detail':
      // Partner Detail steps render in a neutral list style with no
      // active highlight and no done check. Most steps here can't be
      // tracked programmatically (the engine doesn't know if the
      // learner has actually read the metrics or notes), so showing
      // any one item ticked would imply the rest are incomplete and
      // make the panel feel stuck. The Issue Tree Helper open is
      // tracked separately - the gate lives on the Begin Conversation
      // button, not in the guide list.
      return {
        screenLabel: selectedPartner
          ? `${selectedPartner.persona.name.split(' ')[0]}'s Profile`
          : 'Partner Detail',
        objective: selectedPartner
          ? `Study ${selectedPartner.persona.name.split(' ')[0]}'s data before engaging.`
          : 'Review the partner data.',
        steps: [
          {
            icon: <BarChart3 size={13} />,
            text: 'Review metrics and trends',
          },
          {
            icon: <AlertTriangle size={13} />,
            text: 'Check pricing competitiveness and discounts',
          },
          {
            icon: <Eye size={13} />,
            text: 'Read profile notes',
          },
          // Round 1 introduces the Issue Tree Helper as a mandatory
          // pre-call step. The yellow tree tab to the right is the
          // entry point. After Round 1 the step drops away.
          ...(currentRound === 1
            ? [{
                icon: <TreeDeciduous size={13} />,
                text: 'Open the Issue Tree Helper',
              }]
            : []),
          {
            icon: <MessageSquare size={13} />,
            text: 'Begin conversation',
          },
        ],
        tips: selectedPartner ? getPartnerSpecificTips(selectedPartner) : [],
      };

    case 'conversation':
      return {
        screenLabel: selectedPartner
          ? `Talking to ${selectedPartner.persona.name.split(' ')[0]}`
          : 'Conversation',
        objective: conversationComplete
          ? 'Done. Return to portfolio.'
          : getConversationPhaseObjective(conversationPhase),
        steps: [
          {
            icon: <MessageSquare size={13} />,
            text: 'Open the conversation',
            done: conversationPhase > 0 || conversationComplete,
            active: conversationPhase === 0 && !conversationComplete,
          },
          {
            icon: <Target size={13} />,
            text: 'Make your recommendation',
            done: conversationPhase > 1 || conversationComplete,
            active: conversationPhase === 1 && !conversationComplete,
          },
          {
            icon: <Zap size={13} />,
            text: 'Handle objections',
            done: conversationComplete,
            active: conversationPhase === 2 && !conversationComplete,
          },
        ],
        tips: conversationComplete
          ? []
          : [
              {
                icon: <Users size={12} />,
                title: 'Style matters',
                text: 'Match your approach to their personality.',
              },
              {
                icon: <AlertTriangle size={12} />,
                title: 'Compliance flags',
                text: 'Risky options may damage trust.',
              },
              ...(conversationPhase === 2
                ? [{
                    icon: <Lightbulb size={12} />,
                    title: 'Objections = opportunity',
                    text: 'Good handling builds lasting trust.',
                  }]
                : []),
            ],
      };

    case 'round-transition':
      return {
        screenLabel: 'Round Summary',
        objective: 'See how your decisions played out.',
        steps: [
          {
            icon: <Eye size={13} />,
            text: 'Review partner outcomes',
            active: true,
          },
          {
            icon: <BarChart3 size={13} />,
            text: 'Note improvements and declines',
            active: true,
          },
          {
            icon: <Target size={13} />,
            text: 'Continue to next round',
            active: false,
          },
        ],
        tips: [
          {
            icon: <Clock size={12} />,
            title: 'Delayed effects',
            text: 'Changes from prior rounds show up over time.',
          },
        ],
      };

    case 'debrief':
      return {
        screenLabel: 'Final Debrief',
        objective: 'Review your grade and performance insights.',
        steps: [
          {
            icon: <Award size={13} />,
            text: 'Check your grade',
            active: true,
          },
          {
            icon: <Users size={13} />,
            text: 'Review style insights',
            active: true,
          },
          {
            icon: <Target size={13} />,
            text: 'Consider what to change',
            active: true,
          },
        ],
        tips: [
          {
            icon: <Lightbulb size={12} />,
            title: 'Try again',
            text: 'Different approaches yield different outcomes.',
          },
        ],
      };

    default:
      return {
        screenLabel: '',
        objective: '',
        steps: [],
        tips: [],
      };
  }
}

function getPartnerSpecificTips(partner: PartnerState): GuideTip[] {
  const tips: GuideTip[] = [];

  if (partner.metrics.rateParity === 'major') {
    tips.push({
      icon: <AlertTriangle size={12} />,
      title: 'Rate parity alert',
      text: 'Major price inconsistency. More discounts may not help.',
    });
  }

  if (partner.discounts.some((d) => d.status === 'misconfigured')) {
    tips.push({
      icon: <AlertTriangle size={12} />,
      title: 'Misconfigured discount',
      text: 'Fixing this could be a quick win.',
    });
  }

  const inactiveCount = partner.discounts.filter((d) => d.status === 'inactive').length;
  if (inactiveCount >= 3) {
    tips.push({
      icon: <Zap size={12} />,
      title: 'Low adoption',
      text: 'Many inactive products. Explore why before pushing.',
    });
  }

  if (partner.relationship === 'cool' || partner.relationship === 'strained') {
    tips.push({
      icon: <Users size={12} />,
      title: 'Strained relationship',
      text: 'Go softer to rebuild trust first.',
    });
  }

  return tips;
}

function getConversationPhaseObjective(phase: number): string {
  switch (phase) {
    case 0:
      return 'Choose your opening approach. Consider their personality.';
    case 1:
      return 'Make your recommendation based on their situation.';
    case 2:
      return 'Handle their pushback. This determines trust.';
    default:
      return 'Continue the conversation.';
  }
}
