import { useState } from 'react';
import './index.css';
import { useGame } from './hooks/useGame';
import { Header } from './components/Header';
import { GuidePanel } from './components/GuidePanel';
import { TutorialOverlay } from './components/TutorialOverlay';
import { BriefingScreen } from './screens/BriefingScreen';
import { PortfolioScreen } from './screens/PortfolioScreen';
import { PartnerDetailScreen } from './screens/PartnerDetailScreen';
import { ConversationScreen } from './screens/ConversationScreen';
import { RoundTransitionScreen } from './screens/RoundTransitionScreen';
import { DebriefScreen } from './screens/DebriefScreen';

export default function App() {
  const game = useGame();
  const { state } = game;
  const [showTutorial, setShowTutorial] = useState(false);

  const showGuide = state.screen !== 'briefing';
  const selectedPartner =
    state.selectedPartnerId
      ? state.partners.find((p) => p.persona.id === state.selectedPartnerId) ?? null
      : state.conversationInProgress
        ? state.partners.find((p) => p.persona.id === state.conversationInProgress!.partnerId) ?? null
        : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {state.screen !== 'briefing' && (
        <Header
          currentRound={state.currentRound}
          actionsRemaining={state.actionsRemaining}
          screen={state.screen}
        />
      )}

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
        {/* Guide panel */}
        {showGuide && (
          <GuidePanel
            screen={state.screen}
            currentRound={state.currentRound}
            actionsRemaining={state.actionsRemaining}
            actionsThisRound={state.actionsThisRound}
            selectedPartner={selectedPartner}
            conversationPhase={state.conversationInProgress?.phaseIndex ?? 0}
            conversationComplete={
              state.conversationInProgress
                ? state.conversationInProgress.choices.length >= 3
                : false
            }
          />
        )}

        {/* Main content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {state.screen === 'briefing' && (
            <BriefingScreen
              onStart={() => game.goToScreen('portfolio')}
              onTutorial={() => {
                game.goToScreen('portfolio');
                setShowTutorial(true);
              }}
            />
          )}
          {state.screen === 'portfolio' && (
            <PortfolioScreen
              partners={state.partners}
              currentRound={state.currentRound}
              actionsRemaining={state.actionsRemaining}
              actionsThisRound={state.actionsThisRound}
              marketContext={state.marketContext}
              onSelectPartner={game.onSelectPartner}
              onAdvanceRound={game.onAdvanceRound}
            />
          )}
          {state.screen === 'partner-detail' && state.selectedPartnerId && (
            <PartnerDetailScreen
              partner={state.partners.find(
                (p) => p.persona.id === state.selectedPartnerId,
              )!}
              currentRound={state.currentRound}
              actionsRemaining={state.actionsRemaining}
              alreadyEngaged={state.actionsThisRound.includes(
                state.selectedPartnerId,
              )}
              onStartConversation={game.onStartConversation}
              onBack={game.onBackToPortfolio}
            />
          )}
          {state.screen === 'conversation' && state.conversationInProgress && (
            <ConversationScreen
              partner={state.partners.find(
                (p) =>
                  p.persona.id === state.conversationInProgress!.partnerId,
              )!}
              currentRound={state.currentRound}
              conversation={state.conversationInProgress}
              onChoice={game.onConversationChoice}
              onEnd={game.onEndConversation}
            />
          )}
          {state.screen === 'round-transition' && (
            <RoundTransitionScreen
              currentRound={state.currentRound}
              previousRound={state.currentRound - 1}
              summaries={
                state.roundSummaries[state.roundSummaries.length - 1] ?? []
              }
              partners={state.partners}
              marketContext={state.marketContext}
              onContinue={() => game.goToScreen('portfolio')}
            />
          )}
          {state.screen === 'debrief' && game.score && (
            <DebriefScreen
              score={game.score}
              partners={state.partners}
              onRestart={game.onRestart}
            />
          )}
        </div>
      </div>

      {showTutorial && (
        <TutorialOverlay
          onClose={() => setShowTutorial(false)}
          onStartGame={() => setShowTutorial(false)}
        />
      )}
    </div>
  );
}
