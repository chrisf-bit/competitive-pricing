import { useEffect, useRef } from 'react';

const IDLE_MS = 15_000;
const REPEAT_MS = 20_000;
const PULSE_DURATION_MS = 2_400; // 3 iterations of the 800ms keyframe

/**
 * Idle-nudge for stuck learners.
 *
 * Watches for user interaction on the window. If there's been no
 * activity for `IDLE_MS`, a subtle yellow pulse fires on the primary
 * next-action element for the current screen (its `data-tutorial`
 * marker). The Guide step describing that action pulses in sync so
 * the learner's eye is pointed from "you should be doing this" to
 * "here is where it lives on the screen".
 *
 * Interaction (mousedown, keydown, wheel, touchstart) resets the
 * timer. If the learner stays idle after a nudge, another fires
 * every `REPEAT_MS` until they engage or the target changes.
 *
 * Kept intentionally simple:
 *   - No mousemove listener - reading the screen with a still cursor
 *     is the exact state we're trying to interrupt, so ignoring
 *     mouse position lets the nudge fire when it should.
 *   - Class-based pulse - the animation lives in index.css so we can
 *     restyle without touching the hook.
 *   - Selector-based - re-queries the DOM on every fire so tab
 *     switches / re-renders don't trap stale nodes.
 */
export function useIdleNudge(target: string | null, enabled: boolean) {
  const idleTimerRef = useRef<number | null>(null);
  const clearTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || !target) return;

    const findTargets = (): Element[] => {
      const els = document.querySelectorAll(`[data-tutorial="${target}"]`);
      const steps = document.querySelectorAll(
        `[data-guide-step-for="${target}"]`,
      );
      return [...Array.from(els), ...Array.from(steps)];
    };

    const clearPulse = () => {
      findTargets().forEach((el) => el.classList.remove('idle-nudge-pulse'));
    };

    const firePulse = () => {
      const nodes = findTargets();
      if (nodes.length === 0) {
        // Target isn't in the DOM (mid-transition, off-tab, etc.).
        // Skip this cycle and try again on the repeat schedule.
        scheduleNext();
        return;
      }

      // Scroll the on-screen target into view if it's off-screen,
      // so the pulse is actually visible. Skip Guide-panel steps -
      // they always live inside a scrollable panel and self-scrolling
      // that would move the underlying screen, defeating the point.
      const screenTarget = document.querySelector(`[data-tutorial="${target}"]`);
      if (screenTarget) {
        const rect = screenTarget.getBoundingClientRect();
        const off =
          rect.bottom < 0 ||
          rect.top > window.innerHeight ||
          rect.right < 0 ||
          rect.left > window.innerWidth;
        if (off) {
          screenTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }

      nodes.forEach((el) => {
        // Toggle-remove-then-add so the animation restarts cleanly
        // if this element is being re-pulsed on the repeat schedule.
        el.classList.remove('idle-nudge-pulse');
        void (el as HTMLElement).offsetWidth;
        el.classList.add('idle-nudge-pulse');
      });

      if (clearTimerRef.current !== null) {
        window.clearTimeout(clearTimerRef.current);
      }
      clearTimerRef.current = window.setTimeout(clearPulse, PULSE_DURATION_MS);
      scheduleNext();
    };

    const scheduleNext = () => {
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = window.setTimeout(firePulse, REPEAT_MS);
    };

    const resetIdleTimer = () => {
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }
      clearPulse();
      idleTimerRef.current = window.setTimeout(firePulse, IDLE_MS);
    };

    resetIdleTimer();

    const events: (keyof WindowEventMap)[] = [
      'mousedown',
      'keydown',
      'wheel',
      'touchstart',
    ];
    events.forEach((e) => window.addEventListener(e, resetIdleTimer));

    return () => {
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }
      if (clearTimerRef.current !== null) {
        window.clearTimeout(clearTimerRef.current);
      }
      clearPulse();
      events.forEach((e) => window.removeEventListener(e, resetIdleTimer));
    };
  }, [target, enabled]);
}
