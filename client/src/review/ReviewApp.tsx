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
  line: '#e4e9ef',
  offwhite: '#f0f4f8',
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
          <h1 style={{ margin: 0, fontSize: 22, color: C.navy }}>Conversation Review</h1>
          <p style={{ color: C.sub, marginTop: 8 }}>
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

  return (
    <div style={S.shell}>
      <aside style={S.nav}>
        <div style={S.navHead}>
          <div style={{ fontWeight: 800, color: '#fff' }}>Conversation Review</div>
          <div style={{ fontSize: 12, color: '#9fb3d0' }}>{reviewer}</div>
        </div>
        <input style={S.search} placeholder="Filter partners..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <div style={{ overflow: 'auto', flex: 1 }}>
          {groups.map((g) => g.items.length > 0 && (
            <div key={g.label}>
              <div style={S.navGroup}>{g.label}</div>
              {g.items.map((f) => {
                const n = f.steps.reduce((acc, s) =>
                  acc + (byAnchor.get(anchorFor(f, s.id, '', 'prompt'))?.length ?? 0) +
                  s.options.reduce((a, o) =>
                    a + (byAnchor.get(anchorFor(f, s.id, o.id, 'player'))?.length ?? 0) +
                    (byAnchor.get(anchorFor(f, s.id, o.id, 'response'))?.length ?? 0), 0), 0);
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
        {flow && (
          <FlowView flow={flow} byAnchor={byAnchor} onAdd={addComment} />
        )}
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
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div style={S.flowHead}>
        <div>
          <div style={S.eyebrow}>{flow.journeyLabel} - Round {flow.round} - {flow.regimes.length === 3 ? 'All regimes' : flow.regimes.map((r) => r).join(' / ')}</div>
          <h1 style={{ margin: '4px 0 0', fontSize: 24, color: C.navy }}>{d.displayName}</h1>
          <div style={{ color: C.sub, marginTop: 2 }}>
            {d.contact} - {d.propertyType} - {d.location} - {d.roomOrProperties}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <StyleChip label="Primary" style={d.style} />
          <StyleChip label="Secondary" style={d.styleSecondary} />
        </div>
      </div>

      {/* Partner dossier */}
      <section style={S.card}>
        <h2 style={S.cardTitle}>Partner data</h2>
        {d.isKam && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
            {d.kamPills.map((p) => <span key={p} style={S.pill}>{p}</span>)}
          </div>
        )}
        <div style={S.metricGrid}>
          {d.metrics.map((m) => (
            <div key={m.label} style={S.metricCell}>
              <div style={S.metricLabel}>{m.label}</div>
              <div style={S.metricValue}>{m.value}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, fontSize: 13, color: C.ink }}>
          <strong>Price bucket:</strong> {d.priceBucket} &nbsp;|&nbsp; <strong>Regime:</strong> {d.regimeLabel}
        </div>
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Commentable flow={flow} stepId="dossier" optionId="" field="profile" orig={d.description} byAnchor={byAnchor} onAdd={onAdd}>
            <div style={S.metricLabel}>Profile</div>
            <div style={{ fontSize: 13, color: C.ink }}>{d.description}</div>
          </Commentable>
          <Commentable flow={flow} stepId="dossier" optionId="" field="goal" orig={d.commercialGoal} byAnchor={byAnchor} onAdd={onAdd}>
            <div style={S.metricLabel}>Commercial goal</div>
            <div style={{ fontSize: 13, color: C.ink }}>{d.commercialGoal}</div>
          </Commentable>
        </div>
        {d.discounts.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <div style={S.metricLabel}>Discount products</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
              {d.discounts.map((dp) => (
                <span key={dp.id} style={{ ...S.discChip, color: dp.status === 'active' ? C.green : dp.status === 'misconfigured' ? C.amber : C.sub }}>
                  {dp.label}: {dp.status}
                </span>
              ))}
            </div>
          </div>
        )}
        {d.personaHints.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <div style={S.metricLabel}>Persona lens (one-liner shown per learner persona)</div>
            {d.personaHints.map((h) => (
              <div key={h.label} style={{ fontSize: 13, color: C.ink, marginTop: 3 }}>
                <strong>{h.label}:</strong> {h.oneLiner}
              </div>
            ))}
          </div>
        )}
        {d.issueTreePath && (
          <div style={{ marginTop: 12 }}>
            <div style={S.metricLabel}>Pricing Pathway (prescribed diagnosis)</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
              {Object.entries(d.issueTreePath).map(([k, v]) => (
                <span key={k} style={S.pathChip}><strong>{k}:</strong> {v}</span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Conversation script */}
      <section style={{ ...S.card, background: '#fff' }}>
        <h2 style={S.cardTitle}>Conversation</h2>
        {flow.openingAm && (
          <Commentable flow={flow} stepId="opening" optionId="" field="opening-am" orig={flow.openingAm} byAnchor={byAnchor} onAdd={onAdd}>
            <div style={S.speaker}>Learner opens</div>
            <div style={S.saidAm}>{flow.openingAm}</div>
          </Commentable>
        )}
        {flow.steps.map((s, i) => (
          <div key={s.id} style={{ marginTop: 18 }}>
            <div style={S.stepBadge}>Step {i + 1}{s.label ? ` - ${s.label}` : ''}</div>
            <Commentable flow={flow} stepId={s.id} optionId="" field="prompt" orig={s.partnerPrompt} byAnchor={byAnchor} onAdd={onAdd}>
              <div style={S.speaker}>{flow.dossier.contact} says</div>
              <div style={S.saidPartner}>{s.partnerPrompt}</div>
            </Commentable>
            <div style={{ marginTop: 8 }}>
              {s.options.map((o) => (
                <OptionBlock key={o.id} flow={flow} stepId={s.id} option={o} byAnchor={byAnchor} onAdd={onAdd} contact={flow.dossier.contact} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function OptionBlock({ flow, stepId, option, byAnchor, onAdd, contact }: {
  flow: Flow; stepId: string; option: FlowOption; contact: string;
  byAnchor: Map<string, ReviewComment[]>;
  onAdd: (f: Flow, stepId: string, optionId: string, field: string, orig: string, text: string) => void;
}) {
  return (
    <div style={S.option}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <span style={S.optionLabel}>{option.label}</span>
        {option.optimal && <span style={S.optimalBadge}>OPTIMAL</span>}
        <span style={{ ...S.complianceBadge, background: complianceColor[option.compliance] }}>{option.compliance}</span>
      </div>
      <Commentable flow={flow} stepId={stepId} optionId={option.id} field="player" orig={option.playerDialogue} byAnchor={byAnchor} onAdd={onAdd}>
        <div style={S.speaker}>Learner says</div>
        <div style={S.saidAm}>{option.playerDialogue}</div>
      </Commentable>
      <Commentable flow={flow} stepId={stepId} optionId={option.id} field="response" orig={option.partnerResponse} byAnchor={byAnchor} onAdd={onAdd}>
        <div style={{ ...S.speaker, marginTop: 6 }}>{contact} responds</div>
        <div style={S.saidPartner}>{option.partnerResponse}</div>
      </Commentable>
    </div>
  );
}

function Commentable({ flow, stepId, optionId, field, orig, byAnchor, onAdd, children }: {
  flow: Flow; stepId: string; optionId: string; field: string; orig: string;
  byAnchor: Map<string, ReviewComment[]>;
  onAdd: (f: Flow, stepId: string, optionId: string, field: string, orig: string, text: string) => void;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const anchor = anchorFor(flow, stepId, optionId, field);
  const thread = byAnchor.get(anchor) ?? [];
  const submit = () => { if (draft.trim()) { onAdd(flow, stepId, optionId, field, orig, draft.trim()); setDraft(''); setOpen(true); } };
  return (
    <div style={{ ...S.commentable, borderColor: thread.length ? C.yellow : 'transparent' }}>
      <div style={{ flex: 1 }}>{children}</div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
        <button style={S.commentBtn} onClick={() => setOpen((v) => !v)}>
          {thread.length ? `${thread.length} note${thread.length > 1 ? 's' : ''}` : 'Comment'}
        </button>
      </div>
      {open && (
        <div style={S.thread}>
          {thread.map((c, i) => (
            <div key={i} style={S.threadItem}>
              <div style={{ fontSize: 11, color: C.sub }}>{c.reviewer}</div>
              <div style={{ fontSize: 13, color: C.ink }}>{c.comment}</div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
            <input style={{ ...S.input, margin: 0, flex: 1 }} placeholder="Suggest an amend..." value={draft}
              onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') submit(); }} />
            <button style={S.primaryBtn} onClick={submit} disabled={!draft.trim()}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
}

function StyleChip({ label, style }: { label: string; style: string }) {
  return (
    <div style={{ fontSize: 11, color: C.sub, marginBottom: 2 }}>
      {label}: <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 3, background: styleColor[style], verticalAlign: 'middle', marginRight: 4 }} />{style}
    </div>
  );
}

const S: Record<string, CSSProperties> = {
  shell: { display: 'flex', height: '100vh', fontFamily: "'Inter', system-ui, sans-serif", color: C.ink },
  nav: { width: 320, background: C.navyDark, display: 'flex', flexDirection: 'column', flexShrink: 0 },
  navHead: { padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)' },
  search: { margin: 10, padding: '8px 10px', borderRadius: 6, border: 'none', fontSize: 13 },
  navGroup: { padding: '10px 16px 4px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#7f95b5', fontWeight: 700 },
  navItem: { width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: '#d7e2f2', padding: '8px 16px', fontSize: 13, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', gap: 8 },
  navItemActive: { background: C.navy, color: '#fff', fontWeight: 600 },
  navBadge: { background: C.yellow, color: C.navyDark, borderRadius: 10, padding: '0 7px', fontSize: 11, fontWeight: 700 },
  main: { flex: 1, overflow: 'auto', background: C.offwhite, padding: 24 },
  warnBar: { background: '#fff3cd', color: '#664d03', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: 13 },
  flowHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  eyebrow: { fontSize: 12, fontWeight: 700, color: C.blue, textTransform: 'uppercase', letterSpacing: '0.04em' },
  card: { background: '#fff', border: `1px solid ${C.line}`, borderRadius: 12, padding: 20, marginBottom: 16 },
  cardTitle: { margin: '0 0 12px', fontSize: 15, color: C.navy },
  metricGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 8 },
  metricCell: { background: C.offwhite, borderRadius: 8, padding: '8px 10px' },
  metricLabel: { fontSize: 11, color: C.sub, textTransform: 'uppercase', letterSpacing: '0.03em', fontWeight: 600 },
  metricValue: { fontSize: 15, fontWeight: 700, color: C.ink },
  pill: { background: C.offwhite, border: `1px solid ${C.line}`, borderRadius: 100, padding: '3px 10px', fontSize: 12, color: C.ink },
  discChip: { background: C.offwhite, borderRadius: 6, padding: '3px 8px', fontSize: 12, fontWeight: 600 },
  pathChip: { background: '#eef5ff', borderRadius: 6, padding: '3px 8px', fontSize: 12, color: C.navy },
  speaker: { fontSize: 11, color: C.sub, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' },
  saidPartner: { fontSize: 14, color: C.ink, marginTop: 2, background: '#eef5ff', borderRadius: 8, padding: '8px 10px' },
  saidAm: { fontSize: 14, color: C.ink, marginTop: 2 },
  stepBadge: { display: 'inline-block', background: C.navy, color: '#fff', borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 700, marginBottom: 6 },
  option: { border: `1px solid ${C.line}`, borderRadius: 10, padding: 12, marginBottom: 8, background: '#fafcff' },
  optionLabel: { fontSize: 13, fontWeight: 700, color: C.navy },
  optimalBadge: { background: C.yellow, color: C.navyDark, borderRadius: 4, padding: '1px 6px', fontSize: 10, fontWeight: 800 },
  complianceBadge: { color: '#fff', borderRadius: 4, padding: '1px 6px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase' },
  commentable: { display: 'flex', gap: 10, alignItems: 'flex-start', flexWrap: 'wrap', borderRadius: 8, border: '1px solid transparent', padding: 6, transition: 'border-color 0.15s' },
  commentBtn: { background: '#fff', border: `1px solid ${C.line}`, borderRadius: 6, padding: '3px 8px', fontSize: 11, color: C.navy, cursor: 'pointer', whiteSpace: 'nowrap' },
  thread: { width: '100%', marginTop: 8, background: C.offwhite, borderRadius: 8, padding: 10 },
  threadItem: { padding: '4px 0', borderBottom: `1px solid ${C.line}` },
  nameGate: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: C.offwhite, fontFamily: "'Inter', system-ui, sans-serif" },
  nameCard: { background: '#fff', borderRadius: 12, padding: 28, width: 380, boxShadow: '0 6px 24px rgba(0,20,60,0.14)' },
  input: { width: '100%', padding: '9px 11px', borderRadius: 8, border: `1px solid ${C.line}`, fontSize: 14, margin: '12px 0' },
  primaryBtn: { background: C.yellow, color: C.navyDark, border: 'none', borderRadius: 8, padding: '9px 16px', fontSize: 14, fontWeight: 700, cursor: 'pointer' },
};
