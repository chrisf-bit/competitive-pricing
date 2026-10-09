/**
 * Rollback-switch harness. Launches with `?granular=0` and asserts:
 *   - granularEnabled() is false,
 *   - the three GRANULAR emitters (clearance item, round-started, decision)
 *     post NOTHING,
 *   - the HIGH-LEVEL set (initialized, round-completed, completed) still
 *     posts (the proven baseline is never gated).
 *
 * Run: bundled to scripts/xapi-rollback.mjs then `node`.
 */

const captured: { stmt: Record<string, unknown> }[] = [];
const g = globalThis as unknown as Record<string, unknown>;
let n = 0;
g.window = {
  location: {
    search:
      `?endpoint=${encodeURIComponent('https://lrs.example/')}` +
      `&auth=${encodeURIComponent('Basic Zm9vOmJhcg==')}` +
      `&registration=reg-1&activity_id=${encodeURIComponent('https://booking.com/xapi/rate-right')}` +
      `&actor=${encodeURIComponent(JSON.stringify({ name: 'Test', mbox: 'mailto:t@x.com' }))}` +
      `&granular=0`,
  },
  crypto: { randomUUID: () => `uuid-${(n++).toString(16)}` },
};
g.localStorage = (() => {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
    removeItem: (k: string) => void m.delete(k),
  };
})();
g.fetch = (_url: string, opts: { body: string }) => {
  try {
    const p = JSON.parse(opts.body);
    captured.push({ stmt: Array.isArray(p) ? p[0] : p });
  } catch {
    /* ignore */
  }
  return Promise.resolve({ ok: true, status: 200, text: () => Promise.resolve('') });
};

const xapi = await import('../src/util/xapi');

let fail = 0;
const bad = (m: string) => {
  console.log('  FAIL ' + m);
  fail++;
};

if (xapi.granularEnabled()) bad('granularEnabled() true despite ?granular=0');

// Granular emitters must be silent.
captured.length = 0;
xapi.xapiClearanceItem('A1', true);
xapi.xapiRoundStarted(1, 'L1');
xapi.xapiDecision({
  round: 1,
  level: 'L1',
  partnerId: 'royal-crest',
  stepId: 's1',
  stepNumber: 1,
  optionId: 'o1',
  compliance: 'safe',
  styleMatch: 2,
  optimal: true,
});
if (captured.length !== 0) bad(`granular emitters posted ${captured.length} despite rollback (expected 0)`);

// High-level emitters must still fire.
captured.length = 0;
xapi.xapiInitialized();
xapi.xapiRoundCompleted(1, 'L1', 3);
xapi.xapiCompleted(100);
if (captured.length !== 3) bad(`high-level emitters posted ${captured.length} (expected 3 - baseline must never be gated)`);

console.log(`${fail === 0 ? 'PASS' : 'FAIL'} - rollback harness: ${fail} failure(s)`);
if (fail > 0) process.exit(1);
