import {
  BookOpen,
  Target,
  MousePointerClick,
  MessageSquare,
  BarChart3,
  Award,
  Lightbulb,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Zap,
  Eye,
  Users,
  Check,
  Gauge,
  Tag,
  Sparkles,
  Route,
  Unlock,
} from 'lucide-react';
import { useState } from 'react';
import type { GameScreen, PartnerState } from '../types';

interface GuidePanelProps {
  screen: GameScreen;
  currentRound: number;
  selectedPartner: PartnerState | null;
  conversationPhase: number;
  conversationComplete: boolean;
}

interface GuideStep {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  done?: boolean;
  /**
   * Optional `data-tutorial` selector for the tile/block on the main
   * screen this step refers to. Kept at block granularity (a partner
   * card, a metric tile, an action button) rather than per-number so
   * the target is always visually obvious. Consumed by the idle-nudge
   * pulse in useIdleNudge / IdleNudgeProvider.
   */
  target?: string;
  /**
   * Optional call-to-action button rendered beneath the step text
   * (e.g. the post-sim "Toolkit" unlock on the Debrief). `href` opens
   * in a new tab when set; left undefined while the destination is
   * still being finalised, in which case the button is a no-op.
   */
  cta?: { label: string; href?: string };
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
  selectedPartner,
  conversationPhase,
  conversationComplete,
}: GuidePanelProps) {
  const [tipsOpen, setTipsOpen] = useState(true);

  const content = getGuideContent(
    screen,
    currentRound,
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
                data-guide-step-for={step.target}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
                          : 'rgba(255,255,255,0.65)',
                    }}>
                      {step.icon}
                    </div>
                  </IconBox>
                  <span
                    style={{
                      flex: 1,
                      fontSize: 12,
                      lineHeight: 1.4,
                      fontWeight: step.active ? 600 : step.done ? 500 : 500,
                      color: step.active
                        ? 'var(--white)'
                        : step.done
                          ? 'rgba(255,255,255,0.85)'
                          : 'rgba(255,255,255,0.92)',
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
                {step.cta && (
                  <a
                    href={step.cta.href ?? undefined}
                    target={step.cta.href ? '_blank' : undefined}
                    rel={step.cta.href ? 'noopener noreferrer' : undefined}
                    onClick={(e) => {
                      // Destination TBC - swallow the click until an href
                      // is wired so the button doesn't jump to top-of-page.
                      if (!step.cta?.href) e.preventDefault();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      textDecoration: 'none',
                      padding: '10px 14px',
                      borderRadius: 8,
                      background:
                        'linear-gradient(135deg, var(--brand-yellow) 0%, var(--brand-yellow-light) 100%)',
                      color: 'var(--brand-navy-dark)',
                      fontSize: 13,
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 2px 10px rgba(254,186,2,0.3)',
                    }}
                  >
                    <Unlock size={14} />
                    {step.cta.label}
                  </a>
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
                        color: 'rgba(255,255,255,0.82)',
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

      </div>
    </div>
  );
}

function getGuideContent(
  screen: GameScreen,
  currentRound: number,
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
      // Portfolio steps render as neutral, untracked reminders. The
      // engine doesn't observe whether the learner actually read the
      // market update or which partner they picked, so neither step
      // carries a `done` flag - faking partial tracking would make
      // the whole list look permanently incomplete. The Advance
      // Round step was removed alongside the action bar - the
      // Conversation Report's Continue button is the only thing
      // that advances rounds now.
      return {
        screenLabel: 'Portfolio Dashboard',
        objective:
          'One partner needs your attention more than the others. Compare each partner card data to prioritize which partner you will handle first.',
        steps: [
          {
            icon: <Eye size={13} />,
            text: 'Read the market update at the top',
            target: 'market-bar',
          },
          {
            icon: <BarChart3 size={13} />,
            text: 'Compare eRPD, Partner Value and Lose Price across the cards to shortlist candidates',
            target: 'partner-card',
          },
          {
            icon: <BookOpen size={13} />,
            text: 'Open your strongest candidate to review the full picture before you commit',
            target: 'partner-card',
          },
          {
            icon: <Target size={13} />,
            text: 'Pick the partner where value and pricing risk both stack up',
            target: 'partner-card',
          },
        ],
        tips: [
          {
            icon: <AlertTriangle size={12} />,
            title: 'Prioritize wisely',
            text: 'One partner per round. Pick the one whose numbers need you most - neglected partners drift.',
          },
          {
            icon: <Zap size={12} />,
            title: 'Dig deeper',
            text: 'High RPD can stem from missing or misconfigured discounts, config issues, or weak price competitiveness.',
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
          ? `Look at ${selectedPartner.persona.name.split(' ')[0]}'s numbers, form a hypothesis, then start the call.`
          : 'Review the partner data.',
        steps: [
          {
            icon: <Gauge size={13} />,
            text: 'Check the eRPD Price Bucket - where do they sit?',
            target: 'partner-detail-bucket-strip',
          },
          {
            icon: <BarChart3 size={13} />,
            text: 'Scan the Secondary Metrics for context and pace',
            target: 'partner-detail-secondary',
          },
          {
            icon: <Tag size={13} />,
            text: 'Read the Discount Products - active vs inactive',
            target: 'partner-detail-discounts',
          },
          // Round 1 introduces The Pricing Pathway
          // drawer as a mandatory pre-call step. The yellow winding-road
          // tab to the right is the entry point. After Round 1 the step
          // drops away.
          ...(currentRound === 1
            ? [{
                icon: <Route size={13} />,
                text: 'Open The Pricing Pathway (yellow tab, right edge)',
                target: 'partner-detail-tree-tab',
              }]
            : []),
          {
            icon: <MessageSquare size={13} />,
            text: 'Hit Begin Conversation when you have a plan',
            target: 'partner-detail-action',
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
              {
                icon: <Sparkles size={12} />,
                title: 'On the Job Tip',
                text: "PPAI isn't available inside this simulation. However, you can use it back on the job to diagnose issues, shape your key message, and prep before actual calls.",
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
          {
            icon: <Unlock size={13} />,
            text: 'Access your toolkit',
            active: true,
            // href to be provided later - the button is a no-op until then.
            cta: { label: 'Toolkit' },
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
      title: 'Price competitiveness alert',
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
