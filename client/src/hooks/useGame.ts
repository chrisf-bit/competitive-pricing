import { useState, useCallback } from 'react';
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
  calculateScore,
} from '../engine/gameEngine';

export function useGame() {
  const [state, setState] = useState<GameState>(createInitialState);

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

  const onBackToPortfolio = useCallback(() => {
    setState((s) => ({
      ...s,
      screen: 'portfolio',
      selectedPartnerId: null,
      conversationInProgress: null,
    }));
  }, []);

  const onRestart = useCallback(() => {
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
    onBackToPortfolio,
    onRestart,
    setLearnerMarket,
    setLearnerStrengths,
    setLearnerArchetype,
    recordKnowledgeCheckResults,
    finishLevel0Activity,
    requestLevel0Retry,
  };
}
