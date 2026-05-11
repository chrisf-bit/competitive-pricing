import { useState } from 'react';
import './index.css';
import { useGame } from './hooks/useGame';
import { Header } from './components/Header';
import { GuidePanel } from './components/GuidePanel';
import { TutorialOverlay } from './components/TutorialOverlay';
import { DevNav } from './components/DevNav';
import { ClearanceShell } from './components/ClearanceShell';
import { SplashScreen } from './screens/SplashScreen';
import { BriefingScreen } from './screens/BriefingScreen';
import { MarketSelectScreen } from './screens/MarketSelectScreen';
import { CharacterBuildScreen } from './screens/CharacterBuildScreen';
import { GameMasterChatScreen } from './screens/GameMasterChatScreen';
import { EmailAuditScreen } from './screens/EmailAuditScreen';
import { DashboardHotspotScreen } from './screens/DashboardHotspotScreen';
import { IssueTreeRevealScreen } from './screens/IssueTreeRevealScreen';
import { ClearanceSummaryScreen } from './screens/ClearanceSummaryScreen';
import { ClearedCelebrationScreen } from './screens/ClearedCelebrationScreen';
import { PortfolioScreen } from './screens/PortfolioScreen';
import { PartnerDetailScreen } from './screens/PartnerDetailScreen';
import { ConversationScreen } from './screens/ConversationScreen';
import { ConversationReportScreen } from './screens/ConversationReportScreen';
import { RoundTransitionScreen } from './screens/RoundTransitionScreen';
import { DebriefScreen } from './screens/DebriefScreen';

export default function App() {
  const game = useGame();
  const { state } = game;
  const [showTutorial, setShowTutorial] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return (
      <>
        <SplashScreen onBegin={() => setShowSplash(false)} />
        <DevNav
          currentScreen={state.screen}
          onJump={(screen) => {
            setShowSplash(false);
            game.goToScreen(screen);
          }}
          onShowSplash={() => setShowSplash(true)}
          onRestart={() => {
            game.onRestart();
            setShowSplash(true);
          }}
        />
      </>
    );
  }

  // Level 0 screens (and briefing) run chrome-free - no Header, no GuidePanel.
  const isLevel0Chrome = state.screen === 'briefing' || state.screen.startsWith('l0-');
  const showGuide = !isLevel0Chrome;
  const selectedPartner =
    state.selectedPartnerId
      ? state.partners.find((p) => p.persona.id === state.selectedPartnerId) ?? null
      : state.conversationInProgress
        ? state.partners.find((p) => p.persona.id === state.conversationInProgress!.partnerId) ?? null
        : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {!isLevel0Chrome && (
        <Header
          currentRound={state.currentRound}
          actionsRemaining={state.actionsRemaining}
          screen={state.screen}
          onTutorial={() => setShowTutorial(true)}
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
              hasCleared={state.level0Progress.cleared}
              onStart={() => {
                if (state.level0Progress.cleared) {
                  game.goToScreen('portfolio');
                } else {
                  game.goToScreen('l0-market-select');
                }
              }}
            />
          )}
          {state.screen === 'l0-market-select' && (
            <ClearanceShell currentScreen={state.screen}>
              <MarketSelectScreen
                selected={state.learnerProfile.market}
                onSelect={game.setLearnerMarket}
                onContinue={() => game.goToScreen('l0-character-build')}
              />
            </ClearanceShell>
          )}
          {state.screen === 'l0-character-build' && (
            <ClearanceShell currentScreen={state.screen}>
              <CharacterBuildScreen
                selectedAvatarId={state.learnerProfile.avatarId}
                selectedArchetype={state.learnerProfile.archetype}
                playerName={state.learnerProfile.playerName}
                onSelectAvatar={game.setLearnerAvatar}
                onSelectArchetype={game.setLearnerArchetype}
                onContinue={() => game.goToScreen('l0-gm-chat')}
              />
            </ClearanceShell>
          )}
          {state.screen === 'l0-gm-chat' && (
            <ClearanceShell currentScreen={state.screen}>
              <GameMasterChatScreen
                playerName={state.learnerProfile.playerName}
                onComplete={(results) =>
                  game.finishLevel0Activity('l0-dashboard-hotspot', results)
                }
              />
            </ClearanceShell>
          )}
          {state.screen === 'l0-dashboard-hotspot' && (
            <ClearanceShell currentScreen={state.screen}>
              <DashboardHotspotScreen
                onComplete={(results) =>
                  game.finishLevel0Activity('l0-email-audit', results)
                }
              />
            </ClearanceShell>
          )}
          {state.screen === 'l0-email-audit' && (
            <ClearanceShell currentScreen={state.screen}>
              <EmailAuditScreen
                onComplete={(results) =>
                  game.finishLevel0Activity('l0-issue-tree-reveal', results)
                }
              />
            </ClearanceShell>
          )}
          {state.screen === 'l0-issue-tree-reveal' && (
            <ClearanceShell currentScreen={state.screen}>
              <IssueTreeRevealScreen
                onComplete={() => game.finishLevel0Activity('l0-clearance-summary', [])}
              />
            </ClearanceShell>
          )}
          {state.screen === 'l0-clearance-summary' && (
            <ClearanceShell currentScreen={state.screen}>
              <ClearanceSummaryScreen
                results={state.level0Progress.knowledgeCheckResults}
                onContinue={(cleared) => {
                  game.markLevel0Cleared();
                  if (cleared) {
                    // Show the celebration before the tutorial fires.
                    game.goToScreen('l0-cleared-celebration');
                  } else {
                    // "Continue anyway" path - skip the celebration.
                    game.goToScreen('portfolio');
                    if (!state.tutorialShown) {
                      setShowTutorial(true);
                      game.markTutorialShown();
                    }
                  }
                }}
                onRetry={(activityScreen, itemMatcher) =>
                  game.requestLevel0Retry(activityScreen, itemMatcher)
                }
              />
            </ClearanceShell>
          )}
          {state.screen === 'l0-cleared-celebration' && (
            <ClearedCelebrationScreen
              playerName={state.learnerProfile.playerName}
              archetype={state.learnerProfile.archetype}
              avatarId={state.learnerProfile.avatarId}
              onContinue={() => {
                game.goToScreen('portfolio');
                if (!state.tutorialShown) {
                  setShowTutorial(true);
                  game.markTutorialShown();
                }
              }}
            />
          )}
          {state.screen === 'portfolio' && (
            <PortfolioScreen
              partners={
                // Filter to partners whose parityRegime matches the learner's
                // chosen regime. If no regime is chosen yet (e.g. dev nav
                // jumped straight here), show all partners.
                state.learnerProfile.market
                  ? state.partners.filter(
                      (p) => p.persona.parityRegime === state.learnerProfile.market!.parityRegime,
                    )
                  : state.partners
              }
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
              onBack={game.onBackToPortfolio}
            />
          )}
          {state.screen === 'conversation-report' && state.lastConversationGrade && (
            <ConversationReportScreen
              grade={state.lastConversationGrade}
              partners={state.partners}
              onContinue={game.onContinueAfterReport}
              onRetake={game.onRetakeAfterReport}
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

      <DevNav
        currentScreen={state.screen}
        onJump={(screen) => game.goToScreen(screen)}
        onShowSplash={() => setShowSplash(true)}
        onRestart={() => {
          game.onRestart();
          setShowSplash(true);
        }}
      />
    </div>
  );
}
