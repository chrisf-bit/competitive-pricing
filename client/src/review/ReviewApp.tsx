import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import {
  buildFlows,
  anchorFor,
  type Flow,
  type FlowOption,
} from './reviewData';
import {
  fetchComments,
  postComment,
  getReviewerName,
  setReviewerName,
  hasEndpoint,
  type ReviewComment,
} from './comments';

const C = {
  navy: '#003580',
  navyDark: '#001f4d',
  yellow: '#feba02',
  blue: '#009fe3',
  ink: '#1b2733',
  sub: '#5f6b7a',
  faint: '#8c96a3',
  line: '#e4e9ef',
  offwhite: '#f4f7fb',
  green: '#008a0e',
  amber: '#e8960c',
  red: '#cc0000',
};
const styleColor: Record<string, string> = {
  red: '#c0392b', yellow: '#f39c12', green: '#27ae60', blue: '#2980b9',
};
const complianceColor: Record<string, string> = {
  safe: C.green, borderline: C.amber, risky: C.red,
};

type Variant = 'partner' | 'learner' | 'plain';

export default function ReviewApp() {
  const flows = useMemo(() => buildFlows(), []);
  const [selectedKey, setSelectedKey] = useState<string>(flows[0]?.key ?? '');
  const [comments, setComments] = useState<ReviewComment[]>([]);
  const [reviewer, setReviewer] = useState(getReviewerName());
  const [nameDraft, setNameDraft] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchComments().then(setComments);
  }, []);

  const byAnchor = useMemo(() => {
    const m = new Map<string, ReviewComment[]>();
    for (const c of comments) {
      const list = m.get(c.anchor) ?? [];
      list.push(c);
      m.set(c.anchor, list);
    }
    return m;
  }, [comments]);

  const flow = flows.find((f) => f.key === selectedKey) ?? flows[0];

  const addComment = async (
    f: Flow, stepId: string, optionId: string, field: string,
    originalText: string, text: string,
  ) => {
    const anchor = anchorFor(f, stepId, optionId, field);
    const optimistic: ReviewComment = {
      timestamp: new Date().toISOString(), reviewer, journey: f.journeyLabel,
      partner: f.dossier.displayName, round: f.round, regimes: f.regimes.join('/'),
      stepId, optionId, field, originalText, comment: text, anchor,
    };
    setComments((cs) => [...cs, optimistic]);
    await postComment({
      reviewer, journey: f.journeyLabel, partner: f.dossier.displayName,
      round: f.round, regimes: f.regimes.join('/'), stepId, optionId, field,
      originalText, comment: text, anchor,
    });
  };

  if (!reviewer) {
    return (
      <div style={S.nameGate}>
        <div style={S.nameCard}>
          <h1 style={{ margin: 0, fontSize: 24, color: C.navy }}>Conversation Review</h1>
          <p style={{ color: C.sub, marginTop: 10, fontSize: 15, lineHeight: 1.5 }}>
            Enter your name so your comments are attributed. Stored in this browser only.
          </p>
          <input
            style={S.input}
            placeholder="Your name"
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && nameDraft.trim()) { setReviewerName(nameDraft.trim()); setReviewer(nameDraft.trim()); } }}
          />
          <button
            style={S.primaryBtn}
            disabled={!nameDraft.trim()}
            onClick={() => { setReviewerName(nameDraft.trim()); setReviewer(nameDraft.trim()); }}
          >Start reviewing</button>
        </div>
      </div>
    );
  }

  const filtered = flows.filter((f) =>
    !query || f.title.toLowerCase().includes(query.toLowerCase()) ||
    f.dossier.displayName.toLowerCase().includes(query.toLowerCase()));
  const groups: { label: string; items: Flow[] }[] = [
    { label: 'Standard - Level 1 (R1-10)', items: filtered.filter((f) => f.journey === 'standard' && f.level === 1) },
    { label: 'Standard - Level 2 / OPC (R11-20)', items: filtered.filter((f) => f.journey === 'standard' && f.level === 2) },
    { label: 'Cross-Regional / KAM - Level 1 (R1-10)', items: filtered.filter((f) => f.journey === 'kam' && f.level === 1) },
    { label: 'Cross-Regional / KAM - Level 2 (R11-20)', items: filtered.filter((f) => f.journey === 'kam' && f.level === 2) },
  ];

  const threadCount = (f: Flow) =>
    f.steps.reduce((acc, s) =>
      acc + (byAnchor.get(anchorFor(f, s.id, '', 'prompt'))?.length ?? 0) +
      s.options.reduce((a, o) =>
        a + (byAnchor.get(anchorFor(f, s.id, o.id, 'player'))?.length ?? 0) +
        (byAnchor.get(anchorFor(f, s.id, o.id, 'response'))?.length ?? 0), 0), 0);

  return (
    <div style={S.shell}>
      <aside style={S.nav}>
        <div style={S.navHead}>
          <div style={{ fontWeight: 800, color: '#fff', fontSize: 16 }}>Conversation Review</div>
          <div style={{ fontSize: 13, color: '#9fb3d0', marginTop: 2 }}>{reviewer}</div>
        </div>
        <input style={S.search} placeholder="Filter partners..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <div style={{ overflow: 'auto', flex: 1, paddingBottom: 16 }}>
          {groups.map((g) => g.items.length > 0 && (
            <div key={g.label}>
              <div style={S.navGroup}>{g.label}</div>
              {g.items.map((f) => {
                const n = threadCount(f);
                return (
                  <button key={f.key} onClick={() => setSelectedKey(f.key)}
                    style={{ ...S.navItem, ...(f.key === selectedKey ? S.navItemActive : {}) }}>
                    <span>{f.title}</span>
                    {n > 0 && <span style={S.navBadge}>{n}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </aside>

      <main style={S.main}>
        {!hasEndpoint() && (
          <div style={S.warnBar}>
            No comment endpoint configured - comments will not be saved. Append <code>?endpoint=&lt;Apps Script /exec URL&gt;</code> to the URL, or set REVIEW_ENDPOINT in config.
          </div>
        )}
        {flow && <FlowView flow={flow} byAnchor={byAnchor} onAdd={addComment} />}
      </main>
    </div>
  );
}

function FlowView({ flow, byAnchor, onAdd }: {
  flow: Flow;
  byAnchor: Map<string, ReviewComment[]>;
  onAdd: (f: Flow, stepId: string, optionId: string, field: string, orig: string, text: string) => void;
}) {
  const d = flow.dossier;
  return (
    <div style={S.contentWrap}>
      {/* Header */}
      <header style={S.flowHead}>
        <div>
          <div style={S.eyebrow}>{flow.journeyLabel} &nbsp;/&nbsp; Round {flow.round} &nbsp;/&nbsp; {flow.regimes.length === 3 ? 'All regimes' : flow.regimes.join(' / ')}</div>
          <h1 style={S.h1}>{d.displayName}</h1>
          <div style={S.subline}>{d.contact} &nbsp;&middot;&nbsp; {d.propertyType} &nbsp;&middot;&nbsp; {d.location} &nbsp;&middot;&nbsp; {d.roomOrProperties}</div>
        </div>
        <div style={{ display: 'flex', gap: 14, flexShrink: 0 }}>
          <StyleChip label="Primary" style={d.style} />
          <StyleChip label="Secondary" style={d.styleSecondary} />
        </div>
      </header>

      <div style={S.body}>
        {/* Conversation - the main reading column */}
        <section style={S.convo}>
          <h2 style={S.sectionTitle}>Conversation</h2>
          {flow.openingAm && (
            <Commentable flow={flow} stepId="opening" optionId="" field="opening-am"
              label="Learner opens" text={flow.openingAm} variant="learner"
              byAnchor={byAnchor} onAdd={onAdd} />
          )}
          {flow.steps.map((s, i) => (
            <div key={s.id} style={S.step}>
              <div style={S.stepBadge}>Step {i + 1}{s.label ? ` · ${s.label}` : ''}</div>
              <Commentable flow={flow} stepId={s.id} optionId="" field="prompt"
                label={`${flow.dossier.contact} says`} text={s.partnerPrompt} variant="partner"
                byAnchor={byAnchor} onAdd={onAdd} />
              <div style={S.optionList}>
                {s.options.map((o) => (
                  <OptionBlock key={o.id} flow={flow} stepId={s.id} option={o}
                    byAnchor={byAnchor} onAdd={onAdd} contact={flow.dossier.contact} />
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Partner data - sticky sidebar */}
        <aside style={S.sidebar}>
          <div style={S.sideCard}>
            <h2 style={S.sectionTitle}>Partner data</h2>
            <SectionComment flow={flow} field="partner-data" label="partner data"
              byAnchor={byAnchor} onAdd={onAdd} />
            {d.isKam && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                {d.kamPills.map((p) => <span key={p} style={S.pill}>{p}</span>)}
              </div>
            )}
            <div style={S.bucketLine}>{d.priceBucket} &nbsp;&middot;&nbsp; {d.regimeLabel}</div>
            <dl style={S.metricList}>
              {d.metrics.map((m) => (
                <div key={m.label} style={S.metricRow}>
                  <dt style={S.metricLabel}>{m.label}</dt>
                  <dd style={S.metricValue}>{m.value}</dd>
                </div>
              ))}
            </dl>

            <SideBlock title="Profile">
              <Commentable flow={flow} stepId="dossier" optionId="" field="profile"
                label="" text={d.description} variant="plain" byAnchor={byAnchor} onAdd={onAdd} compact />
            </SideBlock>
            <SideBlock title="Commercial goal">
              <Commentable flow={flow} stepId="dossier" optionId="" field="goal"
                label="" text={d.commercialGoal} variant="plain" byAnchor={byAnchor} onAdd={onAdd} compact />
            </SideBlock>

            {d.discounts.length > 0 && (
              <SideBlock title="Discount products">
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {d.discounts.map((dp) => (
                    <span key={dp.id} style={{ ...S.discChip, color: dp.status === 'active' ? C.green : dp.status === 'misconfigured' ? C.amber : C.faint }}>
                      {dp.label}: {dp.status}
                    </span>
                  ))}
                </div>
              </SideBlock>
            )}
            {d.personaHints.length > 0 && (
              <SideBlock title="Persona lens (per learner persona)">
                {d.personaHints.map((h) => (
                  <div key={h.label} style={S.hintRow}>
                    <span style={S.hintLabel}>{h.label}</span>
                    <span style={S.hintText}>{h.oneLiner}</span>
                  </div>
                ))}
              </SideBlock>
            )}
            {d.issueTreePath && (
              <SideBlock title="Pricing Pathway (prescribed diagnosis)">
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {Object.entries(d.issueTreePath).map(([k, v]) => (
                    <span key={k} style={S.pathChip}><strong>{k}:</strong> {v}</span>
                  ))}
                </div>
              </SideBlock>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function SideBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ marginTop: 18 }}>
      <div style={S.sideBlockTitle}>{title}</div>
      {children}
    </div>
  );
}

function OptionBlock({ flow, stepId, option, byAnchor, onAdd, contact }: {
  flow: Flow; stepId: string; option: FlowOption; contact: string;
  byAnchor: Map<string, ReviewComment[]>;
  onAdd: (f: Flow, stepId: string, optionId: string, field: string, orig: string, text: string) => void;
}) {
  return (
    <div style={{ ...S.option, ...(option.optimal ? S.optionOptimal : {}) }}>
      <div style={S.optionHead}>
        <span style={S.optionLabel}>{option.label}</span>
        {option.optimal && <span style={S.optimalBadge}>OPTIMAL</span>}
        <span style={{ ...S.complianceBadge, background: complianceColor[option.compliance] }}>{option.compliance}</span>
      </div>
      <Commentable flow={flow} stepId={stepId} optionId={option.id} field="player"
        label="Learner says" text={option.playerDialogue} variant="learner"
        byAnchor={byAnchor} onAdd={onAdd} />
      <Commentable flow={flow} stepId={stepId} optionId={option.id} field="response"
        label={`${contact} responds`} text={option.partnerResponse} variant="partner"
        byAnchor={byAnchor} onAdd={onAdd} />
    </div>
  );
}

function Commentable({ flow, stepId, optionId, field, label, text, variant, byAnchor, onAdd, compact }: {
  flow: Flow; stepId: string; optionId: string; field: string;
  label: string; text: string; variant: Variant;
  byAnchor: Map<string, ReviewComment[]>;
  onAdd: (f: Flow, stepId: string, optionId: string, field: string, orig: string, text: string) => void;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const anchor = anchorFor(flow, stepId, optionId, field);
  const thread = byAnchor.get(anchor) ?? [];
  const bodyStyle: CSSProperties =
    variant === 'partner' ? S.saidPartner : variant === 'learner' ? S.saidLearner : S.saidPlain;
  return (
    <div style={{ ...S.line, marginTop: compact ? 0 : 10 }}>
      <div style={S.lineHead}>
        {label ? <span style={S.speaker}>{label}</span> : <span />}
        <button style={{ ...S.commentBtn, ...(thread.length ? S.commentBtnActive : {}) }} onClick={() => setOpen((v) => !v)}>
          {thread.length ? `${thread.length} note${thread.length > 1 ? 's' : ''}` : '+ comment'}
        </button>
      </div>
      <div style={bodyStyle}>{text}</div>
      {open && (
        <CommentThread thread={thread} onSubmit={(t) => onAdd(flow, stepId, optionId, field, text, t)} />
      )}
    </div>
  );
}

// Shared comment thread (list of reviewer notes + an input to add one).
// Rendered on a distinct warm background so reviewer comments are clearly
// differentiated from the blue partner/learner dialogue content.
function CommentThread({ thread, onSubmit }: {
  thread: ReviewComment[];
  onSubmit: (text: string) => void;
}) {
  const [draft, setDraft] = useState('');
  const submit = () => { if (draft.trim()) { onSubmit(draft.trim()); setDraft(''); } };
  return (
    <div style={S.thread}>
      {thread.map((c, i) => (
        <div key={i} style={S.threadItem}>
          <div style={S.threadWho}>{c.reviewer}</div>
          <div style={S.threadText}>{c.comment}</div>
        </div>
      ))}
      <div style={{ display: 'flex', gap: 8, marginTop: thread.length ? 10 : 0 }}>
        <input style={{ ...S.input, margin: 0, flex: 1 }} placeholder="Suggest an amend..." value={draft}
          onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') submit(); }} autoFocus />
        <button style={S.primaryBtn} onClick={submit} disabled={!draft.trim()}>Add</button>
      </div>
    </div>
  );
}

// Section-level comment control (e.g. a note on the whole Partner data
// block), anchored to a single field so it threads like any line comment.
function SectionComment({ flow, field, label, byAnchor, onAdd }: {
  flow: Flow; field: string; label: string;
  byAnchor: Map<string, ReviewComment[]>;
  onAdd: (f: Flow, stepId: string, optionId: string, field: string, orig: string, text: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const anchor = anchorFor(flow, 'dossier', '', field);
  const thread = byAnchor.get(anchor) ?? [];
  return (
    <div style={{ marginBottom: 14 }}>
      <button
        style={{ ...S.commentBtn, ...(thread.length ? S.commentBtnActive : {}), width: '100%', display: 'flex', justifyContent: 'center' }}
        onClick={() => setOpen((v) => !v)}
      >
        {thread.length ? `${thread.length} note${thread.length > 1 ? 's' : ''} on ${label}` : `+ comment on ${label}`}
      </button>
      {open && (
        <CommentThread thread={thread} onSubmit={(t) => onAdd(flow, 'dossier', '', field, '', t)} />
      )}
    </div>
  );
}

function StyleChip({ label, style }: { label: string; style: string }) {
  return (
    <div style={{ fontSize: 12, color: C.sub }}>
      <div style={{ color: C.faint, marginBottom: 3 }}>{label}</div>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600, color: C.ink }}>
        <span style={{ width: 12, height: 12, borderRadius: 3, background: styleColor[style] }} />{style}
      </span>
    </div>
  );
}

const S: Record<string, CSSProperties> = {
  shell: { display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: "'Inter', system-ui, sans-serif", color: C.ink, fontSize: 15, lineHeight: 1.6 },

  nav: { width: 300, background: C.navyDark, display: 'flex', flexDirection: 'column', flexShrink: 0 },
  navHead: { padding: '16px 18px', borderBottom: '1px solid rgba(255,255,255,0.1)' },
  search: { margin: 12, padding: '10px 12px', borderRadius: 8, border: 'none', fontSize: 14, fontFamily: 'inherit' },
  navGroup: { padding: '14px 18px 6px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#7f95b5', fontWeight: 700 },
  navItem: { width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: '#d7e2f2', padding: '9px 18px', fontSize: 13.5, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center', lineHeight: 1.35, fontFamily: 'inherit' },
  navItemActive: { background: C.navy, color: '#fff', fontWeight: 600 },
  navBadge: { background: C.yellow, color: C.navyDark, borderRadius: 10, padding: '1px 8px', fontSize: 11, fontWeight: 700, flexShrink: 0 },

  main: { flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: C.offwhite, padding: '24px 28px' },
  contentWrap: { flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: 1240, margin: '0 auto' },
  warnBar: { width: '100%', maxWidth: 1240, margin: '0 auto 16px', flexShrink: 0, background: '#fff3cd', color: '#664d03', padding: '12px 16px', borderRadius: 10, fontSize: 14 },

  flowHead: { flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, marginBottom: 20, paddingBottom: 18, borderBottom: `1px solid ${C.line}` },
  eyebrow: { fontSize: 12.5, fontWeight: 700, color: C.blue, textTransform: 'uppercase', letterSpacing: '0.05em' },
  h1: { margin: '6px 0 0', fontSize: 28, color: C.navy, lineHeight: 1.15 },
  subline: { color: C.sub, marginTop: 6, fontSize: 15 },

  // The two panels each scroll their OWN content within the fixed body
  // height, so there is exactly one scrollbar per panel (each clearly
  // bound to its column) and no ambiguous outer page scrollbar.
  body: { flex: 1, minHeight: 0, display: 'flex', gap: 24, overflow: 'hidden' },
  convo: { flex: 1, minWidth: 0, overflowY: 'auto', background: '#fff', border: `1px solid ${C.line}`, borderRadius: 14, padding: 28 },
  sidebar: { width: 360, flexShrink: 0, overflowY: 'auto', background: '#fff', border: `1px solid ${C.line}`, borderRadius: 14, padding: 22 },
  sideCard: { border: 'none', padding: 0 },

  sectionTitle: { margin: '0 0 16px', fontSize: 13, color: C.faint, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 },

  step: { marginTop: 30 },
  stepBadge: { display: 'inline-block', background: C.navy, color: '#fff', borderRadius: 7, padding: '4px 12px', fontSize: 12.5, fontWeight: 700, marginBottom: 12, letterSpacing: '0.02em' },
  optionList: { marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 },
  option: { border: `1px solid ${C.line}`, borderRadius: 12, padding: 16, background: '#fbfcfe' },
  optionOptimal: { borderColor: '#f6d98a', background: '#fffdf6' },
  optionHead: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' },
  optionLabel: { fontSize: 14.5, fontWeight: 700, color: C.navy, marginRight: 'auto' },
  optimalBadge: { background: C.yellow, color: C.navyDark, borderRadius: 5, padding: '2px 7px', fontSize: 10.5, fontWeight: 800, letterSpacing: '0.03em' },
  complianceBadge: { color: '#fff', borderRadius: 5, padding: '2px 7px', fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em' },

  line: { marginTop: 10 },
  lineHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, minHeight: 20 },
  speaker: { fontSize: 11.5, color: C.faint, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' },
  saidPartner: { fontSize: 15.5, color: C.ink, marginTop: 4, background: '#eef4fc', borderRadius: 10, padding: '12px 14px', lineHeight: 1.6 },
  saidLearner: { fontSize: 15.5, color: C.ink, marginTop: 4, lineHeight: 1.6 },
  saidPlain: { fontSize: 14, color: C.ink, marginTop: 4, lineHeight: 1.55 },

  commentBtn: { background: '#fff', border: `1px solid ${C.line}`, borderRadius: 7, padding: '4px 10px', fontSize: 12, color: C.sub, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit', fontWeight: 600 },
  commentBtnActive: { background: C.yellow, borderColor: C.yellow, color: C.navyDark },
  thread: { marginTop: 10, background: '#fff6e0', border: '1px solid #f3e2ab', borderRadius: 10, padding: 14 },
  threadItem: { background: '#fff', border: '1px solid #f0e2b8', borderRadius: 8, padding: '8px 11px', marginBottom: 8 },
  threadWho: { fontSize: 11.5, color: '#b0740a', fontWeight: 700 },
  threadText: { fontSize: 14.5, color: C.ink, marginTop: 2 },

  // sidebar bits
  bucketLine: { fontSize: 13, color: C.ink, background: C.offwhite, borderRadius: 8, padding: '8px 12px', marginBottom: 14, fontWeight: 600 },
  metricList: { margin: 0 },
  metricRow: { display: 'flex', justifyContent: 'space-between', gap: 12, padding: '6px 0', borderBottom: `1px solid ${C.line}` },
  metricLabel: { fontSize: 13, color: C.sub, textTransform: 'uppercase', letterSpacing: '0.02em', fontWeight: 600, margin: 0 },
  metricValue: { fontSize: 14, fontWeight: 700, color: C.ink, margin: 0, textAlign: 'right', whiteSpace: 'nowrap' },
  sideBlockTitle: { fontSize: 11.5, color: C.faint, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: 8 },
  hintRow: { marginBottom: 8 },
  hintLabel: { display: 'block', fontSize: 12.5, fontWeight: 700, color: C.navy },
  hintText: { display: 'block', fontSize: 13.5, color: C.ink, lineHeight: 1.5 },
  pill: { background: C.offwhite, border: `1px solid ${C.line}`, borderRadius: 100, padding: '4px 12px', fontSize: 12.5, color: C.ink, fontWeight: 600 },
  discChip: { background: C.offwhite, borderRadius: 7, padding: '4px 9px', fontSize: 12.5, fontWeight: 600 },
  pathChip: { background: '#eef5ff', borderRadius: 7, padding: '4px 9px', fontSize: 12.5, color: C.navy },

  nameGate: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: C.offwhite, fontFamily: "'Inter', system-ui, sans-serif" },
  nameCard: { background: '#fff', borderRadius: 14, padding: 32, width: 420, boxShadow: '0 6px 24px rgba(0,20,60,0.14)' },
  input: { width: '100%', padding: '11px 13px', borderRadius: 9, border: `1px solid ${C.line}`, fontSize: 15, margin: '14px 0', fontFamily: 'inherit' },
  primaryBtn: { background: C.yellow, color: C.navyDark, border: 'none', borderRadius: 9, padding: '11px 18px', fontSize: 14.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' },
};
