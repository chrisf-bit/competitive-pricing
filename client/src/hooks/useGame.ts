import { useState, useCallback } from 'react';
import type { GameState } from '../types';
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
  };
}
