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
} from 'lucide-react';
import { useState } from 'react';
import type { GameScreen, PartnerState } from '../types';

interface GuidePanelProps {
  screen: GameScreen;
  currentRound: number;
  actionsRemaining: number;
  actionsThisRound: string[];
  selectedPartner: PartnerState | null;
  conversationPhase: number;
  conversationComplete: boolean;
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
  actionsThisRound,
  selectedPartner,
  conversationPhase,
  conversationComplete,
}: GuidePanelProps) {
  const [tipsOpen, setTipsOpen] = useState(true);

  const content = getGuideContent(
    screen,
    currentRound,
    actionsRemaining,
    actionsThisRound,
    selectedPartner,
    conversationPhase,
    conversationComplete,
  );

  return (
    <div
      data-tutorial="guide-panel"
      style={{
        width: 320,
        minWidth: 320,
        background: 'var(--brand-navy-dark)',
        color: 'var(--white)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRight: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Guide header */}
      <div
        style={{
          padding: '16px 18px 14px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <IconBox bg="rgba(0,159,227,0.2)" size={32}>
          <BookOpen size={16} style={{ color: 'var(--brand-blue-light)' }} />
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
                    fontSize: 12,
                    lineHeight: 1.4,
                    fontWeight: step.active ? 600 : 400,
                    color: step.active
                      ? 'var(--white)'
                      : step.done
                        ? 'rgba(255,255,255,0.45)'
                        : 'rgba(255,255,255,0.6)',
                    textDecoration: step.done ? 'line-through' : 'none',
                  }}
                >
                  {step.text}
                </span>
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
                      borderLeft: '3px solid var(--brand-yellow)',
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
          <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
            {[1, 2, 3].map((r) => (
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
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 600,
            }}
          >
            <span>Round {currentRound}/3</span>
            <span>
              {currentRound === 1 ? 'Week 1' : currentRound === 2 ? 'Week 3' : 'Week 6'}
            </span>
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
  actionsThisRound: string[],
  selectedPartner: PartnerState | null,
  conversationPhase: number,
  conversationComplete: boolean,
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
            done: true,
            active: false,
          },
          {
            icon: <BarChart3 size={13} />,
            text: 'Compare RPD across partners',
            active: actionsRemaining > 0 && actionsThisRound.length === 0,
            done: actionsThisRound.length > 0,
          },
          {
            icon: <Target size={13} />,
            text: `Select a partner (${actionsRemaining} left)`,
            active: actionsRemaining > 0 && actionsThisRound.length > 0,
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
            text: 'Only 3 of 6 partners per round. Neglected partners drift.',
          },
          {
            icon: <Zap size={12} />,
            title: 'Dig deeper',
            text: 'Low RPD can stem from discounts, config issues, or rate parity.',
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
            active: true,
          },
          {
            icon: <AlertTriangle size={13} />,
            text: 'Check rate parity and discounts',
            active: true,
          },
          {
            icon: <Eye size={13} />,
            text: 'Read profile notes',
            active: true,
          },
          {
            icon: <MessageSquare size={13} />,
            text: 'Begin conversation',
            active: false,
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
