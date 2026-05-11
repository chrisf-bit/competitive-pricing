import { useState, useCallback, useEffect, useRef } from 'react';
import type {
  GameState,
  LearnerMarket,
  LearnerStrength,
  CharacterArchetype,
  KnowledgeCheckResult,
} from '../types';
import {
  createInitialState,
  selectPartner,
  startConversation,
  processConversationChoice,
  endConversation,
  advanceRound,
  resetRoundForRetake,
  calculateScore,
} from '../engine/gameEngine';
import {
  loadPersistedState,
  savePersistedState,
  clearPersistedState,
} from '../util/persistence';

export function useGame() {
  const [state, setState] = useState<GameState>(() => {
    const persisted = loadPersistedState();
    return createInitialState(
      persisted
        ? {
            learnerProfile: persisted.learnerProfile,
            level0Cleared: persisted.level0Cleared,
            roundStars: persisted.roundStars,
          }
        : undefined,
    );
  });

  // Persist the durable slice of state whenever any of its inputs change.
  // Tracked fields are intentionally narrow so we don't write to storage on
  // every screen transition.
  const lastPersistedRef = useRef<string>('');
  useEffect(() => {
    const snapshot = JSON.stringify({
      profile: state.learnerProfile,
      cleared: state.level0Progress.cleared,
      stars: state.roundStars,
    });
    if (snapshot !== lastPersistedRef.current) {
      lastPersistedRef.current = snapshot;
      savePersistedState(state);
    }
  }, [state.learnerProfile, state.level0Progress.cleared, state.roundStars, state]);

  const goToScreen = useCallback((screen: GameState['screen']) => {
    setState((s) => ({ ...s, screen }));
  }, []);

  const onSelectPartner = useCallback((partnerId: string) => {
    setState((s) => selectPartner(s, partnerId));
  }, []);

  const onStartConversation = useCallback((partnerId: string) => {
    setState((s) => startConversation(s, partnerId));
  }, []);

  const onConversationChoice = useCallback((optionId: string) => {
    setState((s) => processConversationChoice(s, optionId));
  }, []);

  const onEndConversation = useCallback(() => {
    setState((s) => endConversation(s));
  }, []);

  const onAdvanceRound = useCallback(() => {
    setState((s) => advanceRound(s));
  }, []);

  /**
   * Acknowledge the conversation report and continue. For passing rounds
   * this advances to the next round (or debrief at game end). The grade
   * itself is cleared so the report screen doesn't re-trigger.
   */
  const onContinueAfterReport = useCallback(() => {
    setState((s) => {
      const advanced = advanceRound(s);
      return {
        ...advanced,
        lastConversationGrade: null,
        conversationInProgress: null,
        selectedPartnerId: null,
      };
    });
  }, []);

  /**
   * Acknowledge a 0-star round and ask for a retake. The engine
   * restores the engaged partner from the snapshot captured at
   * conversation start, returns the action budget for the round, and
   * routes the learner back to the portfolio.
   */
  const onRetakeAfterReport = useCallback(() => {
    setState((s) => resetRoundForRetake(s));
  }, []);

  const onBackToPortfolio = useCallback(() => {
    setState((s) => ({
      ...s,
      screen: 'portfolio',
      selectedPartnerId: null,
      conversationInProgress: null,
    }));
  }, []);

  const onRestart = useCallback(() => {
    clearPersistedState();
    setState(createInitialState());
  }, []);

  // ── Level 0 learner-profile setters ──

  const setLearnerMarket = useCallback((market: LearnerMarket) => {
    setState((s) => ({
      ...s,
      learnerProfile: { ...s.learnerProfile, market },
    }));
  }, []);

  const setLearnerStrengths = useCallback((strengths: LearnerStrength[]) => {
    setState((s) => ({
      ...s,
      learnerProfile: { ...s.learnerProfile, strengths },
    }));
  }, []);

  const setLearnerArchetype = useCallback((archetype: CharacterArchetype) => {
    setState((s) => ({
      ...s,
      learnerProfile: { ...s.learnerProfile, archetype },
    }));
  }, []);

  const setLearnerAvatar = useCallback((avatarId: string) => {
    setState((s) => ({
      ...s,
      learnerProfile: { ...s.learnerProfile, avatarId },
    }));
  }, []);

  const setLearnerName = useCallback((playerName: string) => {
    setState((s) => ({
      ...s,
      learnerProfile: { ...s.learnerProfile, playerName },
    }));
  }, []);

  const recordKnowledgeCheckResults = useCallback((results: KnowledgeCheckResult[]) => {
    setState((s) => ({
      ...s,
      level0Progress: {
        ...s.level0Progress,
        knowledgeCheckResults: [...s.level0Progress.knowledgeCheckResults, ...results],
      },
    }));
  }, []);

  /**
   * Record results from a Level 0 activity AND navigate. If a return-to
   * screen is set (via requestLevel0Retry), navigates there instead of
   * the activity's default next screen, then clears the return-to.
   */
  const finishLevel0Activity = useCallback(
    (defaultNext: GameState['screen'], results: KnowledgeCheckResult[]) => {
      setState((s) => {
        const target = s.level0ReturnTo ?? defaultNext;
        return {
          ...s,
          screen: target,
          level0ReturnTo: null,
          level0Progress: {
            ...s.level0Progress,
            knowledgeCheckResults: [
              ...s.level0Progress.knowledgeCheckResults,
              ...results,
            ],
          },
        };
      });
    },
    [],
  );

  /** Mark the partner-sim tutorial as having been auto-shown. */
  const markTutorialShown = useCallback(() => {
    setState((s) => ({ ...s, tutorialShown: true }));
  }, []);

  /** Mark Level 0 as cleared so the Briefing button adapts on a return visit. */
  const markLevel0Cleared = useCallback(() => {
    setState((s) => ({
      ...s,
      level0Progress: { ...s.level0Progress, cleared: true },
    }));
  }, []);

  /**
   * Mark an activity for retry from the Clearance Summary: clears any
   * stored results matching the given prefix, sets the return-to to the
   * summary, and navigates the learner to the activity. When they finish
   * the activity, finishLevel0Activity navigates them back to the summary.
   */
  const requestLevel0Retry = useCallback(
    (
      activityScreen: GameState['screen'],
      itemMatcher: (itemId: string) => boolean,
    ) => {
      setState((s) => ({
        ...s,
        screen: activityScreen,
        level0ReturnTo: 'l0-clearance-summary',
        level0Progress: {
          ...s.level0Progress,
          knowledgeCheckResults: s.level0Progress.knowledgeCheckResults.filter(
            (r) => !itemMatcher(r.itemId),
          ),
        },
      }));
    },
    [],
  );

  const score = state.gameComplete ? calculateScore(state) : null;

  return {
    state,
    score,
    goToScreen,
    onSelectPartner,
    onStartConversation,
    onConversationChoice,
    onEndConversation,
    onAdvanceRound,
    onContinueAfterReport,
    onRetakeAfterReport,
    onBackToPortfolio,
    onRestart,
    setLearnerMarket,
    setLearnerStrengths,
    setLearnerArchetype,
    setLearnerAvatar,
    setLearnerName,
    recordKnowledgeCheckResults,
    finishLevel0Activity,
    requestLevel0Retry,
    markTutorialShown,
    markLevel0Cleared,
  };
}
