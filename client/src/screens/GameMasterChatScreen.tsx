import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, X } from 'lucide-react';
import {
  gmCharacter,
  gmScript,
  type GMBeat,
  type GMQuestion,
  type GMOption,
} from '../data/gameMasterScript';
import type { KnowledgeCheckResult } from '../types';

interface GameMasterChatScreenProps {
  onComplete: (results: KnowledgeCheckResult[]) => void;
}

type ChatMessage =
  | { id: string; from: 'gm'; text: string; flavour?: 'normal' | 'correct' | 'incorrect' }
  | { id: string; from: 'learner'; text: string; isCorrect: boolean };

interface ScriptCursor {
  beatIndex: number;
  /**
   * Phase within a question beat:
   *   'awaiting'   - Alex has asked, waiting on learner reply
   *   'reacting'   - learner answered, Alex's follow-up shown
   * For message beats this is always 'awaiting' before progression.
   */
  phase: 'awaiting' | 'reacting';
}

const TYPING_DELAY_MS = 750;
const MESSAGE_PAUSE_MS = 350;

export function GameMasterChatScreen({ onComplete }: GameMasterChatScreenProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [cursor, setCursor] = useState<ScriptCursor>({ beatIndex: 0, phase: 'awaiting' });
  const [isTyping, setIsTyping] = useState(false);
  const [results, setResults] = useState<KnowledgeCheckResult[]>([]);
  const [done, setDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on every change
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping, cursor]);

  // Drive the script forward whenever cursor changes.
  useEffect(() => {
    const beat = gmScript[cursor.beatIndex];
    if (!beat) {
      // Past the last beat - mark done.
      setDone(true);
      return;
    }

    let cancelled = false;

    const run = async () => {
      if (beat.type === 'message') {
        await wait(MESSAGE_PAUSE_MS);
        if (cancelled) return;
        setIsTyping(true);
        await wait(TYPING_DELAY_MS);
        if (cancelled) return;
        setIsTyping(false);
        appendMessage({
          id: `m-${cursor.beatIndex}`,
          from: 'gm',
          text: beat.text,
        });
        // Auto-advance to the next beat.
        await wait(MESSAGE_PAUSE_MS);
        if (cancelled) return;
        setCursor((c) => ({ beatIndex: c.beatIndex + 1, phase: 'awaiting' }));
      } else {
        // question beat
        if (cursor.phase === 'awaiting') {
          await wait(MESSAGE_PAUSE_MS);
          if (cancelled) return;
          setIsTyping(true);
          await wait(TYPING_DELAY_MS);
          if (cancelled) return;
          setIsTyping(false);
          appendMessage({
            id: `q-${cursor.beatIndex}-prompt`,
            from: 'gm',
            text: beat.question.prompt,
          });
          // Wait for learner click; cursor will move to 'reacting'.
        }
        // 'reacting' phase is handled in handleAnswer (not here) so the GM
        // typing indicator runs after the learner's reply renders.
      }
    };

    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor.beatIndex, cursor.phase]);

  function appendMessage(msg: ChatMessage) {
    setMessages((prev) => [...prev, msg]);
  }

  async function handleAnswer(question: GMQuestion, option: GMOption) {
    // Add learner reply
    appendMessage({
      id: `q-${cursor.beatIndex}-answer`,
      from: 'learner',
      text: option.text,
      isCorrect: option.isCorrect,
    });

    // Record result
    setResults((prev) => [
      ...prev,
      { itemId: question.itemId, correct: option.isCorrect, attempts: 1 },
    ]);

    // Move to reacting phase visually (so options disappear)
    setCursor((c) => ({ ...c, phase: 'reacting' }));

    // GM typing pause + follow-up
    await wait(MESSAGE_PAUSE_MS);
    setIsTyping(true);
    await wait(TYPING_DELAY_MS);
    setIsTyping(false);
    appendMessage({
      id: `q-${cursor.beatIndex}-followup`,
      from: 'gm',
      text: option.isCorrect ? question.followUp.correct : question.followUp.incorrect,
      flavour: option.isCorrect ? 'correct' : 'incorrect',
    });

    // Auto-advance to next beat
    await wait(MESSAGE_PAUSE_MS + 200);
    setCursor((c) => ({ beatIndex: c.beatIndex + 1, phase: 'awaiting' }));
  }

  // Determine current options to display (only when on a question beat in 'awaiting' phase)
  const currentBeat: GMBeat | undefined = gmScript[cursor.beatIndex];
  const showOptions =
    !done &&
    !isTyping &&
    currentBeat &&
    currentBeat.type === 'question' &&
    cursor.phase === 'awaiting' &&
    // Only show options once the prompt itself has been added to messages
    messages.some((m) => m.id === `q-${cursor.beatIndex}-prompt`);

  const correctCount = results.filter((r) => r.correct).length;

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--brand-navy-dark)',
        color: 'var(--white)',
        overflow: 'hidden',
      }}
    >
      {/* Top bar with character & label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '18px 28px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.18)',
        }}
      >
        <Avatar initial={gmCharacter.avatarInitial} size={42} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--white)' }}>
            {gmCharacter.name}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
            {gmCharacter.role}
          </div>
        </div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--brand-yellow)',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
          }}
        >
          Day one
        </div>
      </div>

      {/* Messages thread */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px 0 8px',
        }}
      >
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <MessageBubble key={m.id} msg={m} />
            ))}
            {isTyping && <TypingIndicator key="typing" />}
          </AnimatePresence>
        </div>
      </div>

      {/* Reply slot */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.18)',
          padding: '16px 24px 22px',
          minHeight: 100,
        }}
      >
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          {showOptions && currentBeat?.type === 'question' && (
            <ReplyOptions
              options={currentBeat.question.options}
              onPick={(opt) => handleAnswer(currentBeat.question, opt)}
            />
          )}
          {done && (
            <DoneFooter
              correctCount={correctCount}
              total={results.length}
              onContinue={() => onComplete(results)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ───────────────────────── sub-components ─────────────────────────

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isGM = msg.from === 'gm';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        display: 'flex',
        flexDirection: isGM ? 'row' : 'row-reverse',
        alignItems: 'flex-end',
        gap: 10,
        marginBottom: 14,
      }}
    >
      {isGM && <Avatar initial={gmCharacter.avatarInitial} size={32} />}
      <div
        style={{
          maxWidth: '74%',
          padding: '11px 15px',
          borderRadius: 14,
          background: isGM ? 'rgba(255,255,255,0.07)' : 'var(--brand-yellow)',
          color: isGM ? 'rgba(255,255,255,0.92)' : 'var(--brand-navy)',
          fontSize: 14.5,
          lineHeight: 1.5,
          boxShadow: isGM ? 'none' : '0 4px 12px rgba(254, 186, 2, 0.18)',
          border: isGM ? '1px solid rgba(255,255,255,0.06)' : 'none',
          fontWeight: isGM ? 400 : 600,
          position: 'relative',
        }}
      >
        {msg.text}
        {isGM && msg.flavour === 'correct' && (
          <CorrectnessTag kind="correct" />
        )}
        {isGM && msg.flavour === 'incorrect' && (
          <CorrectnessTag kind="incorrect" />
        )}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 14,
      }}
    >
      <Avatar initial={gmCharacter.avatarInitial} size={32} />
      <div
        style={{
          padding: '11px 16px',
          borderRadius: 14,
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          gap: 4,
          alignItems: 'center',
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              delay: i * 0.18,
              ease: 'easeInOut',
            }}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.7)',
              display: 'inline-block',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function ReplyOptions({
  options,
  onPick,
}: {
  options: GMOption[];
  onPick: (opt: GMOption) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {options.map((opt, i) => (
        <button
          key={i}
          onClick={() => onPick(opt)}
          style={{
            textAlign: 'left',
            padding: '12px 16px',
            background: 'rgba(255,255,255,0.06)',
            color: 'var(--white)',
            border: '1.5px solid rgba(255,255,255,0.10)',
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background 0.15s ease, border-color 0.15s ease, transform 0.1s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.10)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)';
          }}
        >
          {opt.text}
        </button>
      ))}
    </motion.div>
  );
}

function DoneFooter({
  correctCount,
  total,
  onContinue,
}: {
  correctCount: number;
  total: number;
  onContinue: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}
    >
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
        {correctCount} of {total} correct
      </div>
      <button
        onClick={onContinue}
        style={{
          background: 'var(--brand-yellow)',
          color: 'var(--brand-navy)',
          padding: '12px 28px',
          borderRadius: 'var(--radius-sm)',
          fontSize: 15,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 6px 18px rgba(254, 186, 2, 0.25)',
          transition: 'background 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--brand-yellow-light)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--brand-yellow)';
        }}
      >
        Continue
        <ChevronRight size={17} />
      </button>
    </motion.div>
  );
}

function CorrectnessTag({ kind }: { kind: 'correct' | 'incorrect' }) {
  const isCorrect = kind === 'correct';
  return (
    <div
      style={{
        position: 'absolute',
        top: -10,
        right: -10,
        width: 22,
        height: 22,
        borderRadius: '50%',
        background: isCorrect ? 'var(--success)' : 'var(--danger)',
        color: 'var(--white)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
        border: '2px solid var(--brand-navy-dark)',
      }}
    >
      {isCorrect ? <Check size={12} strokeWidth={3.5} /> : <X size={12} strokeWidth={3.5} />}
    </div>
  );
}

function Avatar({ initial, size }: { initial: string; size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'var(--brand-yellow)',
        color: 'var(--brand-navy)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        fontSize: size * 0.42,
        flexShrink: 0,
        boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
      }}
    >
      {initial}
    </div>
  );
}

// ───────────────────────── helpers ─────────────────────────

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
