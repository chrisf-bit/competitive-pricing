import { useEffect, useState } from 'react';
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
import { Level1CompleteScreen } from './screens/Level1CompleteScreen';
import { PortfolioScreen } from './screens/PortfolioScreen';
import { RoundSelectScreen } from './screens/RoundSelectScreen';
import { PartnerDetailScreen } from './screens/PartnerDetailScreen';
import { ConversationScreen } from './screens/ConversationScreen';
import { BranchingConversationScreen } from './screens/BranchingConversationScreen';
import { ConversationReportScreen } from './screens/ConversationReportScreen';
import { DebriefScreen } from './screens/DebriefScreen';
import { reportLessonStatus, reportScore } from './util/persistence';
import { getPortfolioForRound } from './data/portfolioByRound';

export default function App() {
  const game = useGame();
  const { state } = game;
  const [showTutorial, setShowTutorial] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Auto-fire the Portfolio tutorial the first time the learner
  // actually lands on the Portfolio screen. Previously fired inline
  // from the clearance / celebration onContinue callbacks, but the
  // Round Select hub sits between clearance and Portfolio now, so
  // that path fired the tour on Round Select where its target
  // (guide-panel) isn't rendered. Watching state.screen defers the
  // fire until Portfolio actually mounts.
  useEffect(() => {
    if (
      state.screen === 'portfolio' &&
      !state.tutorialShown &&
      !showTutorial &&
      !showSplash
    ) {
      setShowTutorial(true);
      game.markTutorialShown();
    }
  }, [state.screen, state.tutorialShown, showTutorial, showSplash, game]);

  // Auto-fire the Partner Detail tutorial the first time the learner
  // lands on that screen. Same pattern as above: gated on the
  // partner-detail-specific flag so the Portfolio tour doesn't
  // trigger this one and vice versa.
  useEffect(() => {
    if (
      state.screen === 'partner-detail' &&
      !state.partnerDetailTutorialShown &&
      !showTutorial &&
      !showSplash
    ) {
      setShowTutorial(true);
      game.markPartnerDetailTutorialShown();
    }
  }, [state.screen, state.partnerDetailTutorialShown, showTutorial, showSplash, game]);

  if (showSplash) {
    return (
      <>
        <SplashScreen
          onBegin={() => setShowSplash(false)}
          onResetProgress={() => {
            // game.onRestart already calls clearPersistedState and
            // hands us a fresh in-memory GameState. Stay on the
            // splash screen so the next Begin click runs the
            // full clearance / regime / persona flow from scratch.
            game.onRestart();
          }}
        />
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
  // The Level 1 Complete celebration is a full-bleed moment too - same
  // treatment as the Clearance Cleared screen.
  const isLevel0Chrome =
    state.screen === 'briefing' ||
    state.screen.startsWith('l0-') ||
    state.screen === 'level-1-complete';
  // The conversation-report screen is a moment, not a panel. The Guide
  // doesn't have anything relevant to say while it's up, so hide it -
  // otherwise it sits beside the report showing empty section headers.
  const isReportMoment = state.screen === 'conversation-report';
  const showGuide = !isLevel0Chrome && !isReportMoment;
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
              // Always route through Market Select + Character Build,
              // even for cleared returning learners. Both screens
              // pre-fill from the persisted learnerProfile so the
              // returner can just click Continue twice if they want
              // to keep their previous choices, or change them on
              // the way through. The clearance activities themselves
              // are still skipped for cleared learners - that's
              // gated downstream of Character Build.
              onStart={() => game.goToScreen('l0-market-select')}
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
                // Cleared learners jump to the Round Select hub after
                // confirming / changing their regime + persona.
                // Exception: if they switched to a regime they haven't
                // cleared under, route through the Call Audit for the
                // new regime first (the phrase set and compliance rules
                // differ per regime). Fresh learners still go through
                // the full clearance from GM Chat onwards.
                onContinue={() => {
                  if (!state.level0Progress.cleared) {
                    game.goToScreen('l0-gm-chat');
                    return;
                  }
                  const currentRegime =
                    state.learnerProfile.market?.parityRegime ?? null;
                  const clearedFor = state.level0Progress.clearedForRegime;
                  if (currentRegime && currentRegime !== clearedFor) {
                    // Route back to Round Select once the audit finishes -
                    // consumed by finishLevel0Activity in the useGame
                    // reducer.
                    game.requestReturnToAfterActivity('round-select');
                    game.goToScreen('l0-email-audit');
                    return;
                  }
                  game.goToScreen('round-select');
                }}
              />
            </ClearanceShell>
          )}
          {state.screen === 'l0-gm-chat' && (
            <ClearanceShell currentScreen={state.screen}>
              <GameMasterChatScreen
                playerName={state.learnerProfile.playerName}
                retryItemIds={state.level0RetryItemIds}
                onComplete={(results) =>
                  game.finishLevel0Activity('l0-dashboard-hotspot', results)
                }
              />
            </ClearanceShell>
          )}
          {state.screen === 'l0-dashboard-hotspot' && (
            <ClearanceShell currentScreen={state.screen}>
              <DashboardHotspotScreen
                retryItemIds={state.level0RetryItemIds}
                onComplete={(results) =>
                  game.finishLevel0Activity('l0-email-audit', results)
                }
              />
            </ClearanceShell>
          )}
          {state.screen === 'l0-email-audit' && (
            <ClearanceShell currentScreen={state.screen}>
              <EmailAuditScreen
                regime={state.learnerProfile.market?.parityRegime ?? null}
                retryItemIds={state.level0RetryItemIds}
                onComplete={(results) => {
                  // Cleared learners who came here via the regime-change
                  // path (Character Build set level0ReturnTo to
                  // 'round-select') should have their clearedForRegime
                  // snapshot refreshed so the routing doesn't re-fire on
                  // the next visit under the same regime. Fresh clearance
                  // path also refreshes it - harmless duplicate work,
                  // simpler than branching.
                  if (state.level0Progress.cleared) {
                    game.markClearedForCurrentRegime();
                  }
                  game.finishLevel0Activity('l0-issue-tree-reveal', results);
                }}
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
                regime={state.learnerProfile.market?.parityRegime ?? null}
                onContinue={(cleared, scorePct) => {
                  game.markLevel0Cleared();
                  reportScore(Math.round(scorePct * 100));
                  if (cleared) {
                    reportLessonStatus('passed');
                    // Show the celebration before the tutorial fires.
                    game.goToScreen('l0-cleared-celebration');
                  } else {
                    // "Continue anyway" path - skip the celebration.
                    // Tutorial fires from the state.screen === 'portfolio'
                    // watcher above, once the learner actually lands on
                    // Portfolio via Round Select.
                    game.goToScreen('round-select');
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
                // Tutorial fires from the state.screen === 'portfolio'
                // watcher above, once the learner actually lands on
                // Portfolio via Round Select.
                game.goToScreen('round-select');
              }}
            />
          )}
          {state.screen === 'round-select' && (
            <RoundSelectScreen
              roundStars={state.roundStars}
              onEnterRound={game.onEnterRound}
            />
          )}
          {state.screen === 'portfolio' && (
            <PortfolioScreen
              partners={(() => {
                // No regime chosen yet (e.g. dev nav jumped straight
                // here) - show every partner so the screen renders.
                if (!state.learnerProfile.market) return state.partners;
                // Prefer the explicit per-round portfolio mapping when
                // defined. The mapping is the source of truth - it
                // lists priority + distractors by partner id, and
                // ignores parityRegime, so the same distractor partner
                // record can appear on multiple regimes' portfolios
                // without authoring per-regime clones of it.
                const ids = getPortfolioForRound(
                  state.learnerProfile.market.parityRegime,
                  state.currentRound,
                );
                if (ids) {
                  return state.partners.filter((p) =>
                    ids.includes(p.persona.id),
                  );
                }
                // Fallback: no explicit mapping for this regime+round,
                // so show every partner whose parityRegime matches
                // the learner's chosen regime. Used for round / regime
                // combinations that haven't been wired into
                // portfolioByRound yet.
                return state.partners.filter(
                  (p) =>
                    p.persona.parityRegime ===
                    state.learnerProfile.market!.parityRegime,
                );
              })()}
              // Merge actionsThisRound + previouslyEngagedThisRound so
              // a wrong-pick partner from before a retake still reads
              // as "Engaged this round" on their portfolio card.
              actionsThisRound={[
                ...state.actionsThisRound,
                ...state.previouslyEngagedThisRound,
              ]}
              marketContext={state.marketContext}
              onSelectPartner={game.onSelectPartner}
            />
          )}
          {state.screen === 'partner-detail' && state.selectedPartnerId && (
            <PartnerDetailScreen
              partner={state.partners.find(
                (p) => p.persona.id === state.selectedPartnerId,
              )!}
              currentRound={state.currentRound}
              alreadyEngaged={
                state.actionsThisRound.includes(state.selectedPartnerId) ||
                state.previouslyEngagedThisRound.includes(state.selectedPartnerId)
              }
              personaId={state.learnerProfile.archetype?.id ?? null}
              issueTreeHelperStates={state.issueTreeHelperStates}
              onSetIssueTreeHelperState={game.setIssueTreeHelperState}
              hasOpenedIssueTreeHelper={state.hasOpenedIssueTreeHelper}
              onMarkIssueTreeHelperOpened={game.markIssueTreeHelperOpened}
              onStartConversation={game.onStartConversation}
              onBack={game.onBackToPortfolio}
            />
          )}
          {state.screen === 'conversation' &&
            state.conversationInProgress &&
            state.conversationInProgress.shape !== 'branching' && (
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
          {state.screen === 'conversation' &&
            state.conversationInProgress &&
            state.conversationInProgress.shape === 'branching' && (
              <BranchingConversationScreen
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
              personaId={state.learnerProfile.archetype?.id ?? null}
              onContinue={game.onContinueAfterReport}
              onRetake={game.onRetakeAfterReport}
            />
          )}
          {state.screen === 'level-1-complete' && (
            <Level1CompleteScreen
              playerName={state.learnerProfile.playerName}
              archetype={state.learnerProfile.archetype}
              avatarId={state.learnerProfile.avatarId}
              onContinue={game.onContinueAfterLevel1Complete}
            />
          )}
          {state.screen === 'debrief' && game.score && (
            <DebriefScreen
              score={game.score}
              partners={state.partners}
              engagedPartnerIds={state.engagedPartnerIds}
              roundStars={state.roundStars}
              regime={state.learnerProfile.market?.parityRegime ?? null}
              personaId={state.learnerProfile.archetype?.id ?? null}
              learnerProfile={state.learnerProfile}
              onPlayAgain={game.onPlayAgain}
              onPracticeRound={game.onStartPracticeRound}
            />
          )}
        </div>
      </div>

      {showTutorial && (
        <TutorialOverlay
          // Route the Help icon to the step set matching the current
          // screen. Anywhere outside Partner Detail falls back to the
          // Portfolio tour - the only two tour shapes today.
          mode={state.screen === 'partner-detail' ? 'partner-detail' : 'portfolio'}
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
