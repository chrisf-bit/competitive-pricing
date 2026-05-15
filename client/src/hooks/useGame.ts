import { useState, useCallback, useEffect, useRef } from 'react';
import type {
  GameState,
  LearnerMarket,
  LearnerStrength,
  CharacterArchetype,
  KnowledgeCheckResult,
  IssueTreeHelperState,
} from '../types';
import {
  createInitialState,
  selectPartner,
  startConversation,
  processConversationChoice,
  endConversation,
  advanceRound,
  resetRoundForRetake,
  startPracticeRound,
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

  /**
   * Acknowledge the conversation report and continue. In normal play
   * this advances to the next round (or debrief at game end). In
   * Practice Mode it routes straight back to the debrief so the
   * learner can pick another round to chase a higher star score.
   */
  const onContinueAfterReport = useCallback(() => {
    setState((s) => {
      if (s.isPracticeMode) {
        return {
          ...s,
          screen: 'debrief',
          gameComplete: true,
          isPracticeMode: false,
          lastConversationGrade: null,
          conversationInProgress: null,
          selectedPartnerId: null,
        };
      }
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
   * From the Debrief screen, replay a specific round with partners
   * reset to their baseline state. Used by Practice Mode to chase
   * higher star scores on previously-played rounds.
   */
  const onStartPracticeRound = useCallback((round: number) => {
    setState((s) => startPracticeRound(s, round));
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

  /**
   * Flip the one-time flag that records the learner has opened the
   * Issue Tree Helper at least once. Used to lift the Round 1
   * Begin Conversation gate. Idempotent.
   */
  const markIssueTreeHelperOpened = useCallback(() => {
    setState((s) => (s.hasOpenedIssueTreeHelper ? s : { ...s, hasOpenedIssueTreeHelper: true }));
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
          level0RetryItemIds: null,
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

  /** Acknowledge the round's market update banner on the portfolio. */
  const acknowledgeMarketUpdate = useCallback(() => {
    setState((s) => ({ ...s, marketUpdateAcknowledged: true }));
  }, []);

  /**
   * Mark the persona blind-spot card as expanded for a partner-round.
   * After this fires the card is hidden on subsequent visits to that
   * partner-round (until restart or practice-round entry).
   */
  const markBlindSpotExpanded = useCallback(
    (partnerId: string, round: number) => {
      const key = `${partnerId}-${round}`;
      setState((s) =>
        s.expandedBlindSpots.includes(key)
          ? s
          : { ...s, expandedBlindSpots: [...s.expandedBlindSpots, key] },
      );
    },
    [],
  );

  /**
   * Persist Issue Tree Helper picks for a partner-round so the
   * learner can close the drawer to peek at data and resume their
   * picks on reopen. Resets only on full restart / practice-round
   * entry (handled by the engine).
   */
  const setIssueTreeHelperState = useCallback(
    (partnerId: string, round: number, helperState: IssueTreeHelperState) => {
      const key = `${partnerId}-${round}`;
      setState((s) => ({
        ...s,
        issueTreeHelperStates: {
          ...s.issueTreeHelperStates,
          [key]: helperState,
        },
      }));
    },
    [],
  );


  /** Mark Level 0 as cleared so the Briefing button adapts on a return visit. */
  const markLevel0Cleared = useCallback(() => {
    setState((s) => ({
      ...s,
      level0Progress: { ...s.level0Progress, cleared: true },
    }));
  }, []);

  /**
   * Mark an activity for retry from the Clearance Summary. Identifies
   * which items the learner got wrong (from existing results), drops
   * those wrong results so the new attempt can replace them, and
   * stashes the failed itemIds in level0RetryItemIds so the activity
   * screen can filter itself to only those questions. Correct results
   * stay in place - they don't need redoing. Navigates to the activity
   * with a return-to back to the summary on completion.
   */
  const requestLevel0Retry = useCallback(
    (
      activityScreen: GameState['screen'],
      itemMatcher: (itemId: string) => boolean,
    ) => {
      setState((s) => {
        const activityResults = s.level0Progress.knowledgeCheckResults.filter(
          (r) => itemMatcher(r.itemId),
        );
        const failedItemIds = activityResults
          .filter((r) => !r.correct)
          .map((r) => r.itemId);
        return {
          ...s,
          screen: activityScreen,
          level0ReturnTo: 'l0-clearance-summary',
          level0RetryItemIds: failedItemIds.length > 0 ? failedItemIds : null,
          level0Progress: {
            ...s.level0Progress,
            knowledgeCheckResults: s.level0Progress.knowledgeCheckResults.filter(
              (r) => !(itemMatcher(r.itemId) && !r.correct),
            ),
          },
        };
      });
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
    onContinueAfterReport,
    onRetakeAfterReport,
    onStartPracticeRound,
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
    acknowledgeMarketUpdate,
    markBlindSpotExpanded,
    setIssueTreeHelperState,
    markIssueTreeHelperOpened,
    markLevel0Cleared,
  };
}
