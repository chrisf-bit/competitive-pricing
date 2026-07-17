import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Check,
  X,
  Building2,
  Smartphone,
  Sparkles,
  Users,
  ArrowRight,
  ThumbsUp,
  AlertTriangle,
} from 'lucide-react';
import {
  miniScenarios,
  miniScenarioItemId,
  type MiniScenario,
  type MiniScenarioStep,
  type MiniScenarioTheme,
} from '../data/miniScenarios';
import type { KnowledgeCheckResult } from '../types';

/**
 * Mini-scenarios clearance activity.
 *
 * Four case-file scenarios, each walking a 4-step mini Pricing
 * Diagnostic Flow (Signal, Diagnose, Narrative, Next step). Learner
 * works through them one at a time; each step is scored via a
 * KnowledgeCheckResult with a stable itemId so the Clearance Summary
 * retry path can target just the steps they missed.
 *
 * Layout: property "case file" panel on the left as the visual
 * anchor (icon + property name + scenario title on a themed gradient),
 * progressive-reveal step interaction on the right. Reveal-answer
 * coaching after each pick. Good/Bad outcome card between scenarios.
 *
 * Placeholder cover art: the left panel currently renders as a
 * stylised themed gradient with a Lucide icon. When real property
 * WebP images are sourced they can be dropped into the `heroImage`
 * slot on the scenario data model and rendered as a background here.
 */

interface MiniScenariosScreenProps {
  onComplete: (results: KnowledgeCheckResult[]) => void;
  /**
   * When set, restricts the activity to only scenarios that contain
   * at least one of the listed failed itemIds. Retry runs the whole
   * scenario, not partial steps, so the case-file flow stays intact.
   */
  retryItemIds?: string[] | null;
}

type StepResult = { stepId: string; pickedId: 'A' | 'B' | 'C'; correct: boolean };
type ScenarioProgress = {
  scenarioId: string;
  stepResults: StepResult[];
  finished: boolean;
};

export function MiniScenariosScreen({
  onComplete,
  retryItemIds,
}: MiniScenariosScreenProps) {
  // Filter to scenarios that carry any of the failed itemIds on retry.
  const scenarios = useMemo(() => {
    if (!retryItemIds || retryItemIds.length === 0) return miniScenarios;
    const failed = new Set(retryItemIds);
    return miniScenarios.filter((sc) =>
      sc.steps.some((st) => failed.has(miniScenarioItemId(sc.id, st.id))),
    );
  }, [retryItemIds]);

  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [pickedId, setPickedId] = useState<'A' | 'B' | 'C' | null>(null);
  const [progress, setProgress] = useState<ScenarioProgress[]>([]);
  const [showOutcome, setShowOutcome] = useState(false);

  const scenario: MiniScenario | undefined = scenarios[scenarioIndex];
  const step: MiniScenarioStep | undefined = scenario?.steps[stepIndex];
  const isLastScenario = scenarioIndex >= scenarios.length - 1;
  const isLastStep = scenario ? stepIndex >= scenario.steps.length - 1 : false;

  const currentProgress = progress.find((p) => p.scenarioId === scenario?.id) ?? {
    scenarioId: scenario?.id ?? '',
    stepResults: [],
    finished: false,
  };

  function handlePick(optionId: 'A' | 'B' | 'C') {
    if (!scenario || !step || pickedId) return;
    const correct = optionId === step.correctOptionId;
    setPickedId(optionId);
    setProgress((prev) => {
      const existing = prev.find((p) => p.scenarioId === scenario.id);
      const nextStepResults = [
        ...(existing?.stepResults ?? []),
        { stepId: step.id, pickedId: optionId, correct },
      ];
      const finished = nextStepResults.length >= scenario.steps.length;
      if (existing) {
        return prev.map((p) =>
          p.scenarioId === scenario.id
            ? { ...p, stepResults: nextStepResults, finished }
            : p,
        );
      }
      return [
        ...prev,
        { scenarioId: scenario.id, stepResults: nextStepResults, finished },
      ];
    });
  }

  function handleNextStep() {
    if (!scenario) return;
    if (isLastStep) {
      // Reveal the scenario-level outcome card before advancing.
      setShowOutcome(true);
      setPickedId(null);
      return;
    }
    setPickedId(null);
    setStepIndex((i) => i + 1);
  }

  function handleAdvanceScenario() {
    setShowOutcome(false);
    if (isLastScenario) {
      // Emit all KC results.
      const kc: KnowledgeCheckResult[] = [];
      for (const scen of scenarios) {
        const scenProg = progress.find((p) => p.scenarioId === scen.id);
        if (!scenProg) continue;
        for (const step of scen.steps) {
          const r = scenProg.stepResults.find((s) => s.stepId === step.id);
          if (!r) continue;
          kc.push({
            itemId: miniScenarioItemId(scen.id, step.id),
            correct: r.correct,
            attempts: 1,
          });
        }
      }
      onComplete(kc);
      return;
    }
    setScenarioIndex((i) => i + 1);
    setStepIndex(0);
  }

  if (!scenario) {
    // No scenarios to run (shouldn't happen in practice - retry path
    // only triggers when items are missed). Emit an empty result set.
    return (
      <div style={{ padding: 32 }}>
        <button onClick={() => onComplete([])}>Continue</button>
      </div>
    );
  }

  const allCorrect = currentProgress.stepResults.every((r) => r.correct);
  const stepCorrect = pickedId === step?.correctOptionId;

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--off-white)',
      }}
    >
      {/* Top progress bar: which scenario the learner is on. */}
      <ScenarioProgressStrip
        scenarios={scenarios}
        currentIndex={scenarioIndex}
        progress={progress}
      />

      <div
        style={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        {/* Left: property case-file cover */}
        <ScenarioCover scenario={scenario} scenarioIndex={scenarioIndex} />

        {/* Right: step-by-step interaction OR outcome card */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            background: 'var(--white)',
          }}
        >
          <AnimatePresence mode="wait">
            {showOutcome ? (
              <OutcomePanel
                key={`outcome-${scenario.id}`}
                scenario={scenario}
                allCorrect={allCorrect}
                isLastScenario={isLastScenario}
                onContinue={handleAdvanceScenario}
              />
            ) : (
              <InteractionPanel
                key={`interact-${scenario.id}-${stepIndex}`}
                scenario={scenario}
                step={step!}
                stepIndex={stepIndex}
                pickedId={pickedId}
                stepResults={currentProgress.stepResults}
                stepCorrect={stepCorrect}
                onPick={handlePick}
                onNext={handleNextStep}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ── Progress strip (top-of-screen scenario counter) ──

function ScenarioProgressStrip({
  scenarios,
  currentIndex,
  progress,
}: {
  scenarios: MiniScenario[];
  currentIndex: number;
  progress: ScenarioProgress[];
}) {
  return (
    <div
      style={{
        flexShrink: 0,
        padding: '12px 24px',
        borderBottom: '1px solid rgba(0, 30, 60, 0.08)',
        background: 'var(--white)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <span
        style={{
          fontSize: 10,
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
          color: 'var(--brand-navy)',
        }}
      >
        Scenario {currentIndex + 1} of {scenarios.length}
      </span>
      <div style={{ display: 'flex', gap: 6, flex: 1 }}>
        {scenarios.map((sc, i) => {
          const scProg = progress.find((p) => p.scenarioId === sc.id);
          const isCurrent = i === currentIndex;
          const isDone = scProg?.finished ?? false;
          return (
            <div
              key={sc.id}
              style={{
                flex: 1,
                height: 6,
                borderRadius: 100,
                background: isDone
                  ? 'var(--success)'
                  : isCurrent
                    ? 'var(--brand-yellow)'
                    : 'rgba(0, 30, 60, 0.10)',
                transition: 'background 0.2s ease',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ── Left panel: property case-file cover ──

function themeGradient(theme: MiniScenarioTheme): string {
  switch (theme) {
    case 'brand-gap':
      return 'linear-gradient(160deg, #0F2E5C 0%, #1D4A8F 60%, #2E6FB8 100%)';
    case 'mobile-gap':
      return 'linear-gradient(160deg, #0F3A4A 0%, #1E6480 60%, #2C93AF 100%)';
    case 'genius-offset':
      return 'linear-gradient(160deg, #4A2E0F 0%, #8F5E1D 60%, #C58A2C 100%)';
    case 'family-undercut':
      return 'linear-gradient(160deg, #2E1D4A 0%, #5A3D8F 60%, #8163B8 100%)';
  }
}

function ThemeIcon({ theme, size = 96 }: { theme: MiniScenarioTheme; size?: number }) {
  const props = { size, strokeWidth: 1.4, color: 'rgba(255,255,255,0.92)' };
  switch (theme) {
    case 'brand-gap':
      return <Building2 {...props} />;
    case 'mobile-gap':
      return <Smartphone {...props} />;
    case 'genius-offset':
      return <Sparkles {...props} />;
    case 'family-undercut':
      return <Users {...props} />;
  }
}

function ScenarioCover({
  scenario,
  scenarioIndex,
}: {
  scenario: MiniScenario;
  scenarioIndex: number;
}) {
  return (
    <motion.div
      key={scenario.id}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        flexBasis: '36%',
        maxWidth: 440,
        minWidth: 320,
        background: themeGradient(scenario.theme),
        color: 'var(--white)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Text header - loads at the top for natural top-down reading.
          Case file badge, property name, scenario title. Objective
          copy has moved to the outcome card at the end of the
          scenario so the cover stays focused on WHERE and WHAT. */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '28px 28px 20px',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '4px 12px 4px 8px',
            fontSize: 10,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: 'var(--brand-yellow)',
            background: 'rgba(0,0,0,0.28)',
            border: '1px solid rgba(254,186,2,0.4)',
            borderRadius: 100,
            marginBottom: 16,
          }}
        >
          <ThemeIcon theme={scenario.theme} size={12} />
          Case file {scenarioIndex + 1}
        </span>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'rgba(255,255,255,0.62)',
            marginBottom: 4,
          }}
        >
          {scenario.propertyName}
        </div>
        <h2
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: 'var(--white)',
            margin: 0,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
          }}
        >
          {scenario.scenarioTitle}
        </h2>
      </div>

      {/* Photo fills the remainder. Gradient overlay at the top of the
          image so the header text stays crisp when the photo is
          bright. */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          minHeight: 220,
        }}
      >
        <img
          src={scenario.heroImage}
          alt={scenario.propertyName}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
        {/* Top gradient blends into the theme colour above */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 60,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </motion.div>
  );
}

// ── Right panel: step-by-step interaction ──

function InteractionPanel({
  scenario,
  step,
  stepIndex,
  pickedId,
  stepResults,
  stepCorrect,
  onPick,
  onNext,
}: {
  scenario: MiniScenario;
  step: MiniScenarioStep;
  stepIndex: number;
  pickedId: 'A' | 'B' | 'C' | null;
  stepResults: StepResult[];
  stepCorrect: boolean;
  onPick: (id: 'A' | 'B' | 'C') => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '28px 36px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      {/* Step dot indicator */}
      <StepDots
        steps={scenario.steps}
        stepIndex={stepIndex}
        stepResults={stepResults}
      />

      {/* Prior steps: collapsed "You picked" chips */}
      {stepResults.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {stepResults.map((r, i) => {
            const priorStep = scenario.steps.find((s) => s.id === r.stepId);
            if (!priorStep) return null;
            return (
              <PriorStepChip
                key={r.stepId}
                index={i + 1}
                label={priorStep.label}
                pickedText={
                  priorStep.options.find((o) => o.id === r.pickedId)?.text ?? ''
                }
                correct={r.correct}
              />
            );
          })}
        </div>
      )}

      {/* Current step */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: 'var(--brand-navy)',
              marginBottom: 6,
            }}
          >
            Step {stepIndex + 1} · {step.label}
          </div>
        </div>

        {step.showBullets && step.showBullets.length > 0 && (
          <div
            style={{
              padding: '14px 16px',
              background: 'rgba(0, 53, 128, 0.05)',
              border: '1px solid rgba(0, 53, 128, 0.12)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: 'var(--brand-navy)',
                marginBottom: 8,
              }}
            >
              From the data
            </div>
            <ul
              style={{
                margin: 0,
                paddingLeft: 18,
                fontSize: 14,
                color: 'var(--brand-navy)',
                lineHeight: 1.55,
              }}
            >
              {step.showBullets.map((b, i) => (
                <li key={i} style={{ marginBottom: 4 }}>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        )}

        {step.contextNote && (
          <div
            style={{
              fontSize: 14,
              fontStyle: 'italic',
              color: 'rgba(0, 30, 60, 0.72)',
              lineHeight: 1.55,
              padding: '4px 0',
            }}
          >
            {step.contextNote}
          </div>
        )}

        <div
          style={{
            fontSize: 17,
            fontWeight: 700,
            color: 'var(--brand-navy)',
            lineHeight: 1.35,
          }}
        >
          {step.prompt}
        </div>

        {/* Options */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          {step.options.map((opt) => {
            const isPicked = pickedId === opt.id;
            const isCorrect = opt.id === step.correctOptionId;
            const revealed = pickedId !== null;

            let borderColor = 'rgba(0, 30, 60, 0.14)';
            let background = 'var(--white)';
            let color = 'var(--brand-navy)';
            let opacity = 1;
            if (revealed) {
              if (isCorrect) {
                borderColor = 'var(--success)';
                background = 'var(--success-bg)';
              } else if (isPicked && !isCorrect) {
                borderColor = 'var(--danger)';
                background = 'var(--danger-bg)';
              } else {
                opacity = 0.55;
              }
              color = 'var(--brand-navy)';
            }

            return (
              <button
                key={opt.id}
                onClick={() => onPick(opt.id)}
                disabled={revealed}
                style={{
                  textAlign: 'left',
                  padding: '14px 16px',
                  border: `1.5px solid ${borderColor}`,
                  background,
                  color,
                  borderRadius: 'var(--radius-md)',
                  cursor: revealed ? 'default' : 'pointer',
                  fontSize: 14,
                  lineHeight: 1.5,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  opacity,
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (!revealed) {
                    e.currentTarget.style.background = 'var(--off-white)';
                    e.currentTarget.style.borderColor = 'var(--brand-navy)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!revealed) {
                    e.currentTarget.style.background = 'var(--white)';
                    e.currentTarget.style.borderColor = 'rgba(0, 30, 60, 0.14)';
                  }
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background:
                      revealed && isCorrect
                        ? 'var(--success)'
                        : revealed && isPicked
                          ? 'var(--danger)'
                          : 'rgba(0, 30, 60, 0.08)',
                    color:
                      revealed && (isCorrect || isPicked)
                        ? 'var(--white)'
                        : 'var(--brand-navy)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 800,
                  }}
                >
                  {revealed && isCorrect ? (
                    <Check size={14} strokeWidth={3} />
                  ) : revealed && isPicked ? (
                    <X size={14} strokeWidth={3} />
                  ) : (
                    opt.id
                  )}
                </span>
                <span style={{ flex: 1, fontWeight: revealed && isCorrect ? 700 : 500 }}>
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Coaching + next-step affordance. Plain white card with only a
            coloured left rail + tiny label, so the correct option
            above remains the single clear "answer" moment on-screen. */}
        {pickedId !== null && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              marginTop: 4,
              padding: '12px 16px',
              background: 'var(--white)',
              border: '1px solid rgba(0, 30, 60, 0.10)',
              borderLeft: `3px solid ${
                stepCorrect ? 'var(--success)' : 'var(--warning)'
              }`,
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: stepCorrect ? 'var(--success)' : 'var(--warning)',
                marginBottom: 4,
              }}
            >
              Why
            </div>
            <div
              style={{
                fontSize: 13,
                color: 'var(--brand-navy)',
                lineHeight: 1.55,
              }}
            >
              {stepCorrect
                ? step.correctCoaching ??
                  'That\'s the strongest choice at this step.'
                : `The strongest pick here was ${step.correctOptionId}. ${
                    step.correctCoaching ?? ''
                  }`}
            </div>
          </motion.div>
        )}

        {pickedId !== null && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={onNext}
              style={{
                background: 'var(--brand-yellow)',
                color: 'var(--brand-navy)',
                border: 'none',
                padding: '11px 22px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 14,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(254,186,2,0.35)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--brand-yellow-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--brand-yellow)';
              }}
            >
              {stepIndex >= scenario.steps.length - 1 ? 'See outcome' : 'Next step'}
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Step dots indicator ──

function StepDots({
  steps,
  stepIndex,
  stepResults,
}: {
  steps: MiniScenarioStep[];
  stepIndex: number;
  stepResults: StepResult[];
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {steps.map((s, i) => {
        const isDone = i < stepIndex;
        const isCurrent = i === stepIndex;
        const r = stepResults.find((rr) => rr.stepId === s.id);
        const wasCorrect = r?.correct === true;
        const wasWrong = r && !r.correct;
        return (
          <div
            key={s.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              opacity: isCurrent || isDone ? 1 : 0.4,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: wasCorrect
                  ? 'var(--success)'
                  : wasWrong
                    ? 'var(--warning)'
                    : isCurrent
                      ? 'var(--brand-yellow)'
                      : 'rgba(0, 30, 60, 0.1)',
                color: wasCorrect || wasWrong
                  ? 'var(--white)'
                  : isCurrent
                    ? 'var(--brand-navy)'
                    : 'rgba(0, 30, 60, 0.55)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 800,
              }}
            >
              {isDone && wasCorrect ? (
                <Check size={12} strokeWidth={3} />
              ) : isDone && wasWrong ? (
                <X size={12} strokeWidth={3} />
              ) : (
                i + 1
              )}
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: isCurrent ? 'var(--brand-navy)' : 'rgba(0, 30, 60, 0.55)',
              }}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <div
                style={{
                  width: 12,
                  height: 1,
                  background: 'rgba(0, 30, 60, 0.15)',
                  marginLeft: 4,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function PriorStepChip({
  index,
  label,
  pickedText,
  correct,
}: {
  index: number;
  label: string;
  pickedText: string;
  correct: boolean;
}) {
  // Breadcrumb-style: neutral background, tiny status dot as the only
  // colour signal. Reads as a subtle history trail rather than another
  // green/amber panel competing with the current step's answer.
  return (
    <div
      style={{
        padding: '8px 12px',
        background: 'var(--white)',
        border: '1px solid rgba(0, 30, 60, 0.08)',
        borderRadius: 'var(--radius-sm)',
        display: 'flex',
        gap: 10,
        alignItems: 'center',
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: correct ? 'var(--success)' : 'var(--warning)',
        }}
      />
      <span
        style={{
          fontSize: 10,
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: 'rgba(0, 30, 60, 0.65)',
          flexShrink: 0,
        }}
      >
        Step {index} · {label}
      </span>
      <span
        style={{
          fontSize: 12,
          color: 'rgba(0, 30, 60, 0.6)',
          lineHeight: 1.4,
          fontStyle: 'italic',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {pickedText}
      </span>
    </div>
  );
}

// ── Outcome panel (end of each scenario) ──

function OutcomePanel({
  scenario,
  allCorrect,
  isLastScenario,
  onContinue,
}: {
  scenario: MiniScenario;
  allCorrect: boolean;
  isLastScenario: boolean;
  onContinue: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '40px 40px 44px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 20,
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          padding: '6px 14px 6px 10px',
          background: allCorrect ? 'var(--success-bg)' : 'var(--warning-bg)',
          border: `1.5px solid ${allCorrect ? 'var(--success)' : 'var(--warning)'}`,
          color: allCorrect ? 'var(--success)' : 'var(--warning)',
          borderRadius: 100,
          fontSize: 11,
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
          alignSelf: 'flex-start',
        }}
      >
        {allCorrect ? (
          <ThumbsUp size={13} strokeWidth={2.6} />
        ) : (
          <AlertTriangle size={13} strokeWidth={2.6} />
        )}
        {allCorrect ? 'Good outcome' : 'Coaching moment'}
      </div>

      <h2
        style={{
          fontSize: 26,
          fontWeight: 800,
          color: 'var(--brand-navy)',
          margin: 0,
          lineHeight: 1.15,
          letterSpacing: '-0.01em',
        }}
      >
        {scenario.propertyName}
      </h2>

      <div
        style={{
          fontSize: 15,
          color: 'var(--brand-navy)',
          lineHeight: 1.6,
          opacity: 0.9,
        }}
      >
        {allCorrect ? scenario.goodOutcome : scenario.badOutcome}
      </div>

      <div
        style={{
          marginTop: 12,
          padding: '14px 16px',
          background: 'rgba(0, 53, 128, 0.05)',
          borderLeft: '3px solid var(--brand-navy)',
          borderRadius: 'var(--radius-sm)',
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            color: 'var(--brand-navy)',
            marginBottom: 6,
          }}
        >
          Player objective
        </div>
        <div
          style={{
            fontSize: 13,
            color: 'var(--brand-navy)',
            lineHeight: 1.55,
          }}
        >
          {scenario.objective}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
        <button
          onClick={onContinue}
          style={{
            background: 'var(--brand-yellow)',
            color: 'var(--brand-navy)',
            border: 'none',
            padding: '13px 26px',
            borderRadius: 'var(--radius-sm)',
            fontSize: 15,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            boxShadow: '0 6px 18px rgba(254,186,2,0.4)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--brand-yellow-light)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--brand-yellow)';
          }}
        >
          {isLastScenario ? 'Finish activity' : 'Next scenario'}
          <ChevronRight size={17} />
        </button>
      </div>
    </motion.div>
  );
}
