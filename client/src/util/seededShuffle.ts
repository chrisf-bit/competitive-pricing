/**
 * Deterministic (seeded) array shuffle.
 *
 * Used to randomise the order of conversation response options at
 * render time so the OPTIMAL pick isn't always first (authoring
 * convention lists it first). Seeding from a stable string - the
 * option ids of the step - means the same step always renders in the
 * same order, so a retake or Practice-Mode replay doesn't reshuffle
 * the layout mid-attempt and disorient the learner. Grading and the
 * `optimal` flag key off option ids, not array position, so shuffling
 * the display order is purely cosmetic.
 */

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Returns a new array shuffled deterministically from `seed`. */
export function seededShuffle<T>(arr: readonly T[], seed: string): T[] {
  const rng = mulberry32(hashString(seed));
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
