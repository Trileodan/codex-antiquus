/* =========================== BITS =================================== */
function RichText({ text }) {
  const parts = text.split(/(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return <>{parts.map((p, i) => {
    if (p.startsWith("***") && p.endsWith("***")) return <b key={i} style={{ fontStyle: "italic" }}>{p.slice(3, -3)}</b>;
    if (p.startsWith("**") && p.endsWith("**")) return <b key={i}>{p.slice(2, -2)}</b>;
    if (p.length > 2 && p.startsWith("*") && p.endsWith("*")) return <i key={i} style={{ color: "var(--bronze-glow)" }}>{p.slice(1, -1)}</i>;
    return <span key={i}>{p}</span>;
  })}</>;
}

function Medallion({ tier, label, size = 56, mythic }) {
  const uid = useMemo(() => "m" + Math.random().toString(36).slice(2, 8), []);
  const col = tier ? TIER_COLOR[tier] : "var(--locked)";
  const glow = tier ? TIER_GLOW[tier] : "#5b5648";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ flexShrink: 0 }} aria-hidden="true">
      <defs><radialGradient id={uid} cx="34%" cy="28%" r="78%">
        <stop offset="0%" stopColor={glow} /><stop offset="100%" stopColor={col} /></radialGradient></defs>
      <circle cx="50" cy="50" r="46" fill={`url(#${uid})`} stroke={tier ? col : "#544D40"} strokeWidth="2" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(0,0,0,.32)" strokeWidth="1" />
      {tier && [...Array(12)].map((_, i) => {
        const a = (Math.PI / 6) * i;
        return <line key={i} x1={50 + 41 * Math.cos(a)} y1={50 + 41 * Math.sin(a)} x2={50 + 47 * Math.cos(a)} y2={50 + 47 * Math.sin(a)} stroke="rgba(0,0,0,.28)" strokeWidth="1.4" />;
      })}
      {tier ? (
        <text x="50" y={mythic ? 57 : 58} textAnchor="middle" fontFamily="Cinzel" fontWeight="700" fontSize={label.length > 2 ? 24 : 30} fill="#1B1710">{label}</text>
      ) : (
        <g transform="translate(50,52)" stroke="#7d7563" strokeWidth="3" fill="none">
          <rect x="-8" y="-2" width="16" height="13" rx="2" fill="#7d7563" stroke="none" />
          <path d="M -5 -2 L -5 -8 A 5 5 0 0 1 5 -8 L 5 -2" />
        </g>
      )}
    </svg>
  );
}

function TierBadge({ tier, small }) {
  const fs = small ? 9 : 10;
  if (!tier) return <span className="hcg-mono" style={{ fontSize: fs, color: "var(--parchment-dim)", border: "1px solid var(--hair)", borderRadius: 3, padding: "2px 6px" }}>LOCKED</span>;
  return <span className="hcg-mono" style={{ fontSize: fs, color: "#1B1710", background: TIER_GLOW[tier], borderRadius: 3, padding: "2px 6px", fontWeight: 700 }}>{TIER_LABEL[tier].toUpperCase()}</span>;
}

function ClassBadge({ c }) {
  return <span className="hcg-mono" style={{ fontSize: 9.5, color: CLASS_COLOR[c], border: `1px solid ${CLASS_COLOR[c]}`, borderRadius: 3, padding: "1px 5px", whiteSpace: "nowrap" }}>{c.toUpperCase()}</span>;
}

function Bar({ pct, tone = "gold", height = 8 }) {
  const g = tone === "gold" ? "linear-gradient(90deg, var(--bronze), var(--gold-glow))"
    : tone === "silver" ? "linear-gradient(90deg, #6C7883, var(--silver-glow))"
    : "linear-gradient(90deg, #7A5F35, var(--bronze-glow))";
  return <div className="hcg-bar-track rounded-full overflow-hidden" style={{ height }}>
    <div style={{ width: `${pct}%`, height: "100%", background: g, transition: "width .6s ease" }} /></div>;
}

function StatBars({ stats, tier }) {
  return <div className="flex flex-col gap-2">
    {STAT_KEYS.map((k) => (
      <div key={k} className="flex items-center gap-3">
        <div className="hcg-tab" style={{ width: 76, color: "var(--parchment-dim)" }}>{STAT_LABEL[k]}</div>
        <div className="hcg-bar-track flex-1 rounded-full overflow-hidden" style={{ height: 9 }}>
          <div style={{ width: `${stats[k]}%`, height: "100%", background: `linear-gradient(90deg, ${TIER_COLOR[tier]}, ${TIER_GLOW[tier]})`, transition: "width .7s ease" }} />
        </div>
        <div className="hcg-mono" style={{ width: 28, textAlign: "right", fontSize: 13, color: TIER_GLOW[tier] }}>{stats[k]}</div>
      </div>))}
  </div>;
}

function Crumbs({ items }) {
  return <div className="hcg-mono flex items-center gap-1.5 flex-wrap" style={{ fontSize: 11.5, color: "var(--parchment-dim)" }}>
    {items.map((it, i) => <span key={i} className="flex items-center gap-1.5">
      {i > 0 && <ChevRight size={11} />}
      {it.onClick ? <span className="hcg-link" onClick={it.onClick}>{it.label}</span> : <span style={{ color: "var(--gold-glow)" }}>{it.label}</span>}
    </span>)}
  </div>;
}

/* ====================== CHARACTER MODAL ============================= */
function CharacterModal({ charId, cards, chaptersDone, onClose, onOpenChar, onGoChapter }) {
  const c = CHARACTERS[charId];
  const tier = cards[charId] || null;
  const [tab, setTab] = useState("card");
  const [dev, setDev] = useState(false);
  useEffect(() => { setTab("card"); setDev(false); }, [charId]);

  const nt = nextTierInfo(c, cards, chaptersDone);
  const name = displayName(c, tier);
  const tiersBuilt = TIER_ORDER.filter((t) => c.tiers[t]);
  const visibleClaims = tier ? c.claims.filter((cl) => TIER_RANK[cl.at] <= TIER_RANK[tier]) : [];

  const TABS = [{ id: "card", label: "Card", icon: ScrollIcon }, { id: "claims", label: "Claims", icon: InfoIcon },
    { id: "links", label: "Connections", icon: LinkIcon }, { id: "life", label: "Life stages", icon: ClockIcon }];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6" style={{ background: "rgba(9,7,5,.76)" }} onClick={onClose}>
      <div className="hcg-panel hcg-pop hcg-scroll rounded-lg w-full max-w-2xl max-h-[88vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 flex items-start gap-4" style={{ borderBottom: "1px solid var(--hair)" }}>
          <Medallion tier={tier} label={initials(name)} size={64} mythic={c.mythic} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="hcg-display" style={{ fontSize: 21 }}>{tier ? name : "Undiscovered"}</h2>
              <TierBadge tier={tier} />
              {c.mythic && <span className="hcg-mono" style={{ fontSize: 9, color: "var(--gold-glow)", border: "1px solid var(--gold-glow)", borderRadius: 3, padding: "1px 5px" }}>MYTH</span>}
            </div>
            <div className="hcg-mono" style={{ fontSize: 11.5, color: "var(--parchment-dim)", marginTop: 2 }}>
              {tier ? `${c.years} · ${c.tiers[tier].label} (${c.tiers[tier].when})` : "Keep reading to earn this card"}
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-1 rounded hover:bg-white/5" style={{ color: "var(--parchment-dim)" }}><XIcon size={20} /></button>
        </div>

        {tier && <div className="flex gap-1 px-4 pt-3 flex-wrap" style={{ borderBottom: "1px solid var(--hair)" }}>
          {TABS.map((t) => <button key={t.id} onClick={() => setTab(t.id)}
            className={`hcg-tab flex items-center gap-1.5 px-3 py-2 border-b-2 ${tab === t.id ? "active" : ""}`}
            style={{ borderColor: tab === t.id ? undefined : "transparent", color: tab === t.id ? undefined : "var(--parchment-dim)" }}>
            <t.icon size={13} /> {t.label}</button>)}
          <button onClick={() => setDev(!dev)} className="hcg-tab flex items-center gap-1.5 px-3 py-2 ml-auto" style={{ color: dev ? "var(--verdigris)" : "var(--parchment-dim)" }}><CodeIcon size={13} /> Dev</button>
        </div>}

        <div className="p-5 hcg-fade" key={tab + String(dev)}>
          {dev && <pre className="hcg-mono hcg-panel-2 hcg-scroll rounded p-3 mb-4 overflow-auto" style={{ fontSize: 10.5, color: "var(--verdigris)", maxHeight: 240 }}>
{JSON.stringify({ id: c.id, tier, requires: c.requires, stats: tier ? c.tiers[tier].stats : null, claims: visibleClaims.length, connections: c.connections.length }, null, 2)}</pre>}

          {!tier && (
            <div>
              <p style={{ color: "var(--parchment-dim)", marginBottom: 14 }}>This card has not been earned yet. Cards are minted from chapters you have finished, not from names you have skimmed past.</p>
              {nt && <div className="hcg-panel-2 rounded p-4">
                <div className="hcg-tab mb-2" style={{ color: "var(--bronze-glow)" }}>REQUIRED FOR {TIER_LABEL[nt.tier].toUpperCase()}</div>
                <div className="flex flex-col gap-2">
                  {c.requires[nt.tier].map((chId) => {
                    const ch = CHAPTER_BY_ID[chId]; const done = !!chaptersDone[chId];
                    return <button key={chId} onClick={() => done ? null : onGoChapter(ch)} className="flex items-center gap-2 text-left" style={{ fontSize: 14, color: done ? "var(--verdigris)" : "var(--parchment)" }}>
                      {done ? <CheckIcon size={14} /> : <span style={{ width: 14, textAlign: "center", color: "var(--parchment-dim)" }}>○</span>}
                      <span className={done ? "" : "hcg-link"}>{ch.title}</span>
                      <span className="hcg-mono" style={{ fontSize: 10, color: "var(--parchment-dim)" }}>{SETS[ch.set].name}</span>
                    </button>;
                  })}
                </div>
              </div>}
            </div>
          )}

          {tier && tab === "card" && <div className="flex flex-col gap-5">
            <p style={{ lineHeight: 1.7, color: "#DFD3B9" }}>{c.tiers[tier].blurb}</p>
            {c.note && <div className="hcg-panel-2 rounded p-3" style={{ fontSize: 13, color: "var(--parchment-dim)" }}>{c.note}</div>}
            <div>
              <div className="hcg-tab mb-2" style={{ color: "var(--parchment-dim)" }}>SIX STATS · {c.tiers[tier].when}</div>
              <StatBars stats={c.tiers[tier].stats} tier={tier} />
              <div style={{ fontSize: 12.5, color: "var(--parchment-dim)", marginTop: 8, fontStyle: "italic" }}>Fame is recognition at this point in their life, not their modern reputation.</div>
            </div>
            {nt ? <div className="hcg-panel-2 rounded p-4">
              <div className="hcg-tab mb-2" style={{ color: "var(--gold-glow)" }}>PATH TO {TIER_LABEL[nt.tier].toUpperCase()}</div>
              <div className="flex flex-col gap-2">
                {c.requires[nt.tier].map((chId) => {
                  const ch = CHAPTER_BY_ID[chId]; const done = !!chaptersDone[chId];
                  return <button key={chId} onClick={() => done ? null : onGoChapter(ch)} className="flex items-center gap-2 text-left" style={{ fontSize: 14, color: done ? "var(--verdigris)" : "var(--parchment)" }}>
                    {done ? <CheckIcon size={14} /> : <span style={{ width: 14, textAlign: "center", color: "var(--parchment-dim)" }}>○</span>}
                    <span className={done ? "" : "hcg-link"}>{ch.title}</span>
                    <span className="hcg-mono" style={{ fontSize: 10, color: "var(--parchment-dim)" }}>{SETS[ch.set].name}</span>
                  </button>;
                })}
              </div>
            </div> : <div style={{ fontSize: 13, color: "var(--verdigris)" }}>Fully mastered — this is the highest tier built for this figure.</div>}
          </div>}

          {tier && tab === "claims" && <div className="flex flex-col gap-3">
            {visibleClaims.map((cl, i) => <div key={i} className="hcg-panel-2 rounded p-3">
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <div style={{ fontSize: 14.5, lineHeight: 1.55 }}>{cl.text}</div><ClassBadge c={cl.classification} />
              </div>
              <div className="hcg-mono" style={{ fontSize: 10.5, color: "var(--parchment-dim)" }}>{cl.date} · {cl.sources.map((s) => SOURCES[s]).join("; ")}</div>
            </div>)}
            <div style={{ fontSize: 12.5, color: "var(--parchment-dim)", fontStyle: "italic" }}>More claims unlock as this card rises in tier.</div>
          </div>}

          {tier && tab === "links" && <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {c.connections.map((cn, i) => {
              if (cn.charId) {
                const t2 = cards[cn.charId] || null; const c2 = CHARACTERS[cn.charId];
                return <button key={i} onClick={() => onOpenChar(cn.charId)} className="hcg-panel-2 rounded p-3 text-left flex items-center gap-3 hover:brightness-125">
                  <Medallion tier={t2} label={initials(displayName(c2, t2))} size={34} />
                  <div className="min-w-0"><div style={{ fontSize: 13.5 }}>{t2 ? displayName(c2, t2) : "Undiscovered"}</div>
                    <div style={{ fontSize: 11.5, color: "var(--parchment-dim)" }}>{cn.relation}</div></div>
                </button>;
              }
              return <div key={i} className="hcg-panel-2 rounded p-3 flex items-center gap-2.5">
                <span className="hcg-mono" style={{ fontSize: 9, color: "var(--verdigris)", border: "1px solid var(--verdigris)", borderRadius: 3, padding: "2px 5px" }}>{cn.type.toUpperCase()}</span>
                <span style={{ fontSize: 13.5 }}>{cn.name}</span></div>;
            })}
          </div>}

          {tier && tab === "life" && <div className="flex flex-col">
            {tiersBuilt.map((t, i) => {
              const reached = TIER_RANK[t] <= TIER_RANK[tier]; const info = c.tiers[t];
              return <div key={t} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div style={{ width: 12, height: 12, borderRadius: 999, background: reached ? TIER_GLOW[t] : "var(--locked)", marginTop: 5 }} />
                  {i < tiersBuilt.length - 1 && <div style={{ width: 2, flex: 1, background: "var(--hair)", minHeight: 34 }} />}
                </div>
                <div className="pb-6 flex-1">
                  <div className="hcg-mono" style={{ fontSize: 11, color: reached ? TIER_GLOW[t] : "var(--parchment-dim)" }}>{info.when} · {TIER_LABEL[t].toUpperCase()}</div>
                  <div style={{ fontSize: 14.5, fontWeight: 600 }}>{info.label}{t === "gold" && c.goldName ? ` — becomes ${c.goldName}` : ""}</div>
                  {reached ? <div style={{ fontSize: 13.5, color: "var(--parchment-dim)", marginTop: 3 }}>{info.blurb}</div>
                    : <div style={{ fontSize: 13, color: "var(--parchment-dim)", marginTop: 3, fontStyle: "italic" }}>Not yet reached.</div>}
                </div></div>;
            })}
          </div>}
        </div>
      </div>
    </div>
  );
}

/* ======================= MINT CEREMONY ============================== */
function MintModal({ mints, cards, onClose, onOpen }) {
  if (!mints.length) return null;
  return <div className="fixed inset-0 z-[55] flex items-center justify-center p-4" style={{ background: "rgba(9,7,5,.8)" }} onClick={onClose}>
    <div className="hcg-panel hcg-pop rounded-lg p-6 max-w-md w-full text-center" onClick={(e) => e.stopPropagation()}>
      <div className="hcg-tab mb-1" style={{ color: "var(--gold-glow)" }}>CHAPTER COMPLETE</div>
      <h3 className="hcg-display mb-5" style={{ fontSize: 20 }}>{mints.length === 1 ? "A card is struck" : `${mints.length} cards are struck`}</h3>
      <div className="flex flex-col gap-3">
        {mints.map((m, i) => {
          const c = CHARACTERS[m.id]; const nm = displayName(c, m.tier);
          return <button key={m.id} onClick={() => onOpen(m.id)} className="hcg-panel-2 hcg-mint rounded p-3 flex items-center gap-3 text-left hover:brightness-125" style={{ animationDelay: `${i * 120}ms` }}>
            <Medallion tier={m.tier} label={initials(nm)} size={46} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2"><span style={{ fontSize: 15 }}>{nm}</span><TierBadge tier={m.tier} small /></div>
              <div style={{ fontSize: 12, color: "var(--parchment-dim)" }}>{m.from ? `Raised from ${TIER_LABEL[m.from]} — ${c.tiers[m.tier].label}` : c.tiers[m.tier].label}</div>
            </div>
            <ChevRight size={16} color="var(--parchment-dim)" />
          </button>;
        })}
      </div>
      <button onClick={onClose} className="hcg-btn mt-5 text-xs px-4 py-2 rounded" style={{ background: "var(--gold)", color: "#1B1710" }}>Continue</button>
    </div>
  </div>;
}

/* ====================== BATTLE DIAGRAM ============================== */
/* An animated schematic of a battle's tactic. Declarative: a battle beat
   adds an optional `diagram` and this renders it. Units carry a base
   position; each phase supplies deltas that persist forward, so a phase
   only states what changes. Movement is a CSS transform transition, and
   the whole thing is inline SVG — no dependency, no images, works offline.

   These are schematics, not maps. They show the shape of an idea, and the
   caption says so. Real battles were messier than any diagram. */

const DIAG_TONE = {
  gold: "var(--gold-glow)", silver: "var(--silver-glow)", rust: "var(--rust)",
  verdigris: "var(--verdigris)", bronze: "var(--bronze-glow)", dim: "var(--locked)",
};
const DIAG_TERRAIN = {
  sea: { fill: "rgba(124,154,133,.10)", stroke: "rgba(124,154,133,.35)" },
  high: { fill: "rgba(58,50,38,.75)", stroke: "var(--hair)" },
  ground: { fill: "rgba(43,36,27,.55)", stroke: "var(--hair)" },
};

function unitStateAt(diagram, unit, upto) {
  const st = { x: unit.x, y: unit.y, w: unit.w, h: unit.h, rot: unit.rot || 0, o: 1 };
  for (let i = 0; i <= upto; i++) {
    const d = (diagram.phases[i] && diagram.phases[i].at && diagram.phases[i].at[unit.id]) || null;
    if (d) Object.assign(st, d);
  }
  return st;
}

function BattleDiagram({ diagram }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const last = diagram.phases.length - 1;
  const reduce = typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;

  useEffect(() => {
    if (!playing) return;
    if (i >= last) { setPlaying(false); return; }
    const t = setTimeout(() => setI((n) => n + 1), 2100);
    return () => clearTimeout(t);
  }, [playing, i, last]);

  const [vw, vh] = diagram.view || [100, 62];
  const phase = diagram.phases[i];

  return (
    <div className="hcg-panel-2 rounded p-4 mb-4" style={{ borderColor: "var(--bronze)" }}>
      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <div className="hcg-tab" style={{ color: "var(--bronze-glow)" }}>HOW IT WORKED</div>
        <div className="hcg-mono" style={{ fontSize: 10, color: "var(--parchment-dim)" }}>SCHEMATIC · NOT TO SCALE</div>
      </div>

      <svg viewBox={`0 0 ${vw} ${vh}`} className="hcg-diagram" role="img"
           aria-label={`Diagram: ${phase.caption}`} style={{ width: "100%", display: "block" }}>
        {(diagram.terrain || []).map((t, n) => {
          const tone = DIAG_TERRAIN[t.tone] || DIAG_TERRAIN.ground;
          return <path key={n} d={t.d} fill={tone.fill} stroke={tone.stroke} strokeWidth=".3" />;
        })}
        {(diagram.terrain || []).filter((t) => t.label).map((t, n) => (
          <text key={`tl${n}`} x={t.lx} y={t.ly} className="hcg-diagram-terrain-label"
                textAnchor="middle">{t.label}</text>
        ))}

        {(phase.arrows || []).map((a, n) => (
          <g key={`${i}-a${n}`} className="hcg-diagram-arrow">
            <defs>
              <marker id={`ah-${i}-${n}`} markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0 0 L4 2 L0 4 z" fill={DIAG_TONE[a.tone] || "var(--parchment-dim)"} />
              </marker>
            </defs>
            <path d={a.d} fill="none" strokeWidth={a.w || .9} strokeDasharray="2 1.6"
                  stroke={DIAG_TONE[a.tone] || "var(--parchment-dim)"}
                  markerEnd={`url(#ah-${i}-${n})`} />
          </g>
        ))}

        {diagram.units.map((u) => {
          const st = unitStateAt(diagram, u, i);
          const tone = DIAG_TONE[u.tone] || "var(--parchment-dim)";
          return (
            <g key={u.id} className={reduce ? "" : "hcg-diagram-unit"}
               style={{ transform: `translate(${st.x}px, ${st.y}px) rotate(${st.rot}deg)`,
                        /* local space: the rect is drawn at 0,0 and translated,
                           so the pivot is its own centre, not its page position */
                        transformOrigin: `${st.w / 2}px ${st.h / 2}px`,
                        opacity: st.o }}>
              <rect width={st.w} height={st.h} rx=".8"
                    fill={tone} fillOpacity={u.hollow ? .12 : .34}
                    stroke={tone} strokeWidth=".45" />
              {u.label && (st.h > st.w * 1.6
                ? /* a tall narrow block: run the label along it rather than
                     letting it spill sideways over whatever is next to it */
                  <text x={st.w / 2} y={st.h / 2} textAnchor="middle" dominantBaseline="middle"
                        transform={`rotate(-90 ${st.w / 2} ${st.h / 2})`}
                        className="hcg-diagram-label">{u.label}</text>
                : <text x={st.w / 2} y={st.h / 2 + 1.1} textAnchor="middle"
                        className="hcg-diagram-label">{u.label}</text>)}
            </g>
          );
        })}
      </svg>

      <div style={{ minHeight: 42, marginTop: 10, fontSize: 14.5, color: "var(--parchment)" }}>
        <span className="hcg-mono" style={{ fontSize: 10, color: "var(--bronze-glow)", marginRight: 8 }}>
          {i + 1}/{diagram.phases.length}
        </span>
        <RichText text={phase.caption} />
      </div>

      <div className="flex items-center gap-2 mt-3 flex-wrap">
        <button onClick={() => { setPlaying(false); setI(Math.max(0, i - 1)); }} disabled={i === 0}
                className="hcg-btn text-xs px-3 py-1.5 rounded hcg-panel" aria-label="Previous step">
          <ChevLeft size={13} />
        </button>
        <button onClick={() => { if (i >= last) setI(0); setPlaying(!playing); }}
                className="hcg-btn text-xs px-3 py-1.5 rounded"
                style={{ background: "var(--bronze)", color: "#1B1710", minWidth: 74 }}>
          {playing ? "Pause" : i >= last ? "Replay" : "Play"}
        </button>
        <button onClick={() => { setPlaying(false); setI(Math.min(last, i + 1)); }} disabled={i === last}
                className="hcg-btn text-xs px-3 py-1.5 rounded hcg-panel" aria-label="Next step">
          <ChevRight size={13} />
        </button>
        <div className="flex gap-1.5 items-center" style={{ marginLeft: 6 }}>
          {diagram.phases.map((_, n) => (
            <button key={n} onClick={() => { setPlaying(false); setI(n); }}
                    aria-label={`Step ${n + 1}`} className="hcg-diagram-dot"
                    style={{ background: n === i ? "var(--gold-glow)" : "var(--hair)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========================= CHAPTER READER =========================== */
function Reader({ chapter, save, startBeat, onExit, onBookmark, onBeat, onComplete }) {
  const total = chapter.beats.length;
  const [i, setI] = useState(startBeat || 0);
  const [phase, setPhase] = useState("read"); // read | check | done
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState({});
  const topRef = useRef(null);
  const already = !!save.chaptersDone[chapter.id];

  useEffect(() => { if (topRef.current) topRef.current.scrollIntoView({ block: "start", behavior: "smooth" }); }, [i, phase, qi]);
  useEffect(() => { onBeat(chapter.id, i, chapter.beats[i]); }, [i]);

  const beat = chapter.beats[i];
  const correctCount = chapter.check.reduce((a, q, n) => a + (answers[n] === q.correct ? 1 : 0), 0);
  const passed = correctCount >= Math.ceil(chapter.check.length * 0.67);

  function advance() { if (i + 1 < total) setI(i + 1); else setPhase("check"); }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 hcg-fade">
      <div ref={topRef} />
      <div className="flex items-center justify-between gap-3 mb-4">
        <button onClick={onExit} className="hcg-mono hcg-link flex items-center gap-1" style={{ fontSize: 11.5, color: "var(--parchment-dim)" }}><ChevLeft size={12} /> {SETS[chapter.set].name}</button>
        {phase === "read" && <button onClick={() => onBookmark(chapter.id, i)} className="hcg-mono flex items-center gap-1.5 px-3 py-1.5 rounded"
          style={{ fontSize: 11, color: "var(--gold-glow)", border: "1px solid var(--hair)" }}><BookmarkIcon size={13} /> Bookmark &amp; stop</button>}
      </div>

      <div className="hcg-mono mb-1" style={{ fontSize: 11, color: chapter.kind === "war" ? "var(--rust)" : "var(--bronze-glow)" }}>
        {chapter.kind === "war" ? "WAR · " : ""}{chapter.era} · {chapter.minutes} min read</div>
      <h1 className="hcg-display" style={{ fontSize: 25, marginBottom: 6 }}>{chapter.title}</h1>
      {chapter.sides && <div className="hcg-mono mb-2" style={{ fontSize: 11.5, color: "var(--parchment-dim)" }}>
        {chapter.sides.map((s) => s.label).join("  vs  ")}</div>}
      <p style={{ color: "var(--parchment-dim)", fontSize: 15, marginBottom: 16 }}>{chapter.intro}</p>

      <div className="flex gap-1.5 mb-6">
        {chapter.beats.map((_, n) => <div key={n} style={{ flex: 1, height: 4, borderRadius: 2, background: n < i ? "var(--bronze)" : n === i && phase === "read" ? "var(--gold-glow)" : "#2B241B" }} />)}
        <div style={{ flex: 1, height: 4, borderRadius: 2, background: phase !== "read" ? "var(--gold-glow)" : "#2B241B" }} />
      </div>

      {phase === "read" && <div className="hcg-fade" key={i}>
        <div className="hcg-tab mb-2" style={{ color: beat.name ? "var(--rust)" : "var(--parchment-dim)" }}>
          {beat.name ? `BATTLE · PART ${i + 1} OF ${total}` : `PART ${i + 1} OF ${total}`}
        </div>
        <h2 className="hcg-display" style={{ fontSize: 18, color: "var(--gold-glow)", marginBottom: 12 }}>{beat.title}</h2>
        {beat.name && <div className="hcg-panel-2 rounded p-3 mb-4" style={{ borderColor: "var(--rust)" }}>
          <div className="hcg-mono" style={{ fontSize: 10.5, color: "var(--rust)", marginBottom: 4 }}>{beat.year} · {beat.place}</div>
          <div style={{ fontSize: 13.5, color: "var(--parchment-dim)", lineHeight: 1.5 }}>{beat.forces}</div>
        </div>}
        {beat.text.map((p, n) => <p key={n} className="hcg-prose" style={{ marginBottom: 14 }}><RichText text={p} /></p>)}
        {beat.tactics && <div className="hcg-panel-2 rounded p-4 mb-4" style={{ borderColor: "var(--verdigris)" }}>
          <div className="hcg-tab mb-2" style={{ color: "var(--verdigris)" }}>THE TACTIC</div>
          <p className="hcg-prose" style={{ fontSize: 16 }}><RichText text={beat.tactics} /></p>
        </div>}
        {beat.diagram && <BattleDiagram key={`${chapter.id}-${i}`} diagram={beat.diagram} />}
        {beat.lineage && <div className="mb-4">
          <div className="hcg-tab mb-2" style={{ color: "var(--bronze-glow)" }}>ECHOES — WHO USED THIS AGAIN</div>
          <div className="flex flex-col gap-2">
            {beat.lineage.map((l, n) => <div key={n} className="hcg-panel-2 rounded p-3">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span style={{ fontSize: 14.5, color: "var(--parchment)" }}>{l.who}</span>
                <span className="hcg-mono" style={{ fontSize: 10, color: "var(--parchment-dim)" }}>{l.when}</span>
                <span className="hcg-mono" style={{ fontSize: 9, padding: "1px 5px", borderRadius: 3,
                  color: l.cited ? "#1B1710" : "var(--parchment-dim)",
                  background: l.cited ? "var(--gold-glow)" : "transparent",
                  border: l.cited ? "none" : "1px solid var(--hair)" }}>
                  {l.cited ? "CITED IT HIMSELF" : "NO CITATION"}
                </span>
              </div>
              <div style={{ fontSize: 14, marginBottom: 4 }}>{l.what}</div>
              <div style={{ fontSize: 13, color: "var(--parchment-dim)", lineHeight: 1.55 }}>{l.note}</div>
            </div>)}
          </div>
        </div>}
        <div className="hcg-panel-2 rounded p-3 mt-5 flex gap-2.5 items-start">
          <Star size={13} color="var(--gold-glow)" style={{ marginTop: 3 }} />
          <div><div className="hcg-tab" style={{ color: "var(--gold-glow)", marginBottom: 2 }}>KEY POINT</div>
            <div style={{ fontSize: 14, color: "var(--parchment-dim)" }}>{beat.key}</div></div>
        </div>
        <button onClick={advance} className="hcg-btn mt-6 w-full text-sm px-4 py-3 rounded" style={{ background: "var(--bronze)", color: "#1B1710" }}>
          {i + 1 < total ? "Continue" : "Go to checkpoint"} <ChevRight size={14} style={{ marginLeft: 4 }} />
        </button>
      </div>}

      {phase === "check" && <div className="hcg-fade">
        <div className="hcg-tab mb-3" style={{ color: "var(--parchment-dim)" }}>CHECKPOINT · QUESTION {qi + 1} OF {chapter.check.length}</div>
        <div style={{ fontSize: 17, marginBottom: 14 }}>{chapter.check[qi].q}</div>
        <div className="flex flex-col gap-2">
          {chapter.check[qi].options.map((opt, oi) => {
            const answered = answers[qi] !== undefined;
            const isC = oi === chapter.check[qi].correct, isP = answers[qi] === oi;
            let bg = "var(--panel-2)", bd = "var(--hair)";
            if (answered && isC) { bg = "rgba(124,154,133,.18)"; bd = "var(--verdigris)"; }
            else if (answered && isP) { bg = "rgba(166,84,58,.18)"; bd = "var(--rust)"; }
            return <button key={oi} disabled={answered} onClick={() => setAnswers({ ...answers, [qi]: oi })}
              className="rounded p-3 text-left flex items-center justify-between gap-2" style={{ background: bg, border: `1px solid ${bd}` }}>
              <span style={{ fontSize: 14.5 }}>{opt}</span>
              {answered && isC && <CheckIcon size={16} color="var(--verdigris)" />}
              {answered && isP && !isC && <XIcon size={16} color="var(--rust)" />}
            </button>;
          })}
        </div>
        {answers[qi] !== undefined && <div className="hcg-fade mt-4">
          <div className="hcg-panel-2 rounded p-3" style={{ fontSize: 13.5, color: "var(--parchment-dim)" }}>{chapter.check[qi].explain}</div>
          <button onClick={() => qi + 1 < chapter.check.length ? setQi(qi + 1) : setPhase("done")} className="hcg-btn mt-3 text-xs px-4 py-2.5 rounded" style={{ background: "var(--bronze)", color: "#1B1710" }}>
            {qi + 1 < chapter.check.length ? "Next question" : "See result"}</button>
        </div>}
      </div>}

      {phase === "done" && <div className="hcg-fade text-center py-6">
        <div className="hcg-display" style={{ fontSize: 22, color: passed ? "var(--gold-glow)" : "var(--rust)" }}>{passed ? "Checkpoint passed" : "Not quite"}</div>
        <div style={{ color: "var(--parchment-dim)", marginTop: 6 }}>{correctCount} of {chapter.check.length} correct</div>
        {passed ? <>
          <p style={{ color: "var(--parchment-dim)", marginTop: 12, fontSize: 14 }}>{already ? "Already completed — no new cards from a re-read." : "Chapter marked complete. Any cards this unlocks will be struck now."}</p>
          <button onClick={() => onComplete(chapter.id)} className="hcg-btn mt-5 text-sm px-5 py-2.5 rounded" style={{ background: "var(--gold)", color: "#1B1710" }}>Finish chapter</button>
        </> : <>
          <p style={{ color: "var(--parchment-dim)", marginTop: 12, fontSize: 14 }}>You need two thirds to pass. Re-read the chapter — the key points are the fastest route.</p>
          <button onClick={() => { setPhase("read"); setI(0); setQi(0); setAnswers({}); }} className="hcg-btn mt-5 text-sm px-5 py-2.5 rounded" style={{ background: "var(--bronze)", color: "#1B1710" }}>Read it again</button>
        </>}
      </div>}
    </div>
  );
}

/* ======================== RESUME (bookmark) ========================= */
function ResumeScreen({ save, onContinue, onDiscard }) {
  const bm = save.bookmark; const ch = CHAPTER_BY_ID[bm.chapterId];
  const last3 = save.recentKeys.slice(-3);
  const when = bm.at ? new Date(bm.at) : null;
  return <div className="max-w-xl mx-auto px-4 py-12 hcg-fade">
    <div className="hcg-panel rounded-lg p-6">
      <div className="flex items-center gap-2 mb-1"><BookmarkIcon size={15} filled color="var(--gold-glow)" />
        <span className="hcg-tab" style={{ color: "var(--gold-glow)" }}>BOOKMARK LIFTED</span></div>
      <h2 className="hcg-display" style={{ fontSize: 22, marginBottom: 4 }}>{ch.title}</h2>
      <div className="hcg-mono" style={{ fontSize: 11.5, color: "var(--parchment-dim)", marginBottom: 20 }}>
        {SETS[ch.set].name} · part {bm.beatIndex + 1} of {ch.beats.length}{when ? ` · saved ${when.toLocaleDateString()}` : ""}
      </div>
      <div className="hcg-tab mb-3" style={{ color: "var(--parchment-dim)" }}>WHERE YOU GOT TO — THE LAST THREE THINGS YOU LEARNED</div>
      <div className="flex flex-col gap-3 mb-6">
        {last3.length ? last3.map((k, i) => <div key={i} className="hcg-panel-2 rounded p-3 flex gap-3">
          <span className="hcg-mono" style={{ fontSize: 11, color: "var(--bronze-glow)", marginTop: 2 }}>{String(last3.length - i).padStart(2, "0")}</span>
          <div><div style={{ fontSize: 14.5, lineHeight: 1.5 }}>{k.key}</div>
            <div className="hcg-mono" style={{ fontSize: 10, color: "var(--parchment-dim)", marginTop: 3 }}>{k.chapter} · {k.beat}</div></div>
        </div>) : <div style={{ color: "var(--parchment-dim)", fontSize: 14 }}>Nothing recorded yet — you bookmarked before reading anything.</div>}
      </div>
      <div className="flex gap-2 flex-wrap">
        <button onClick={onContinue} className="hcg-btn text-sm px-4 py-2.5 rounded flex-1" style={{ background: "var(--gold)", color: "#1B1710", minWidth: 180 }}>
          Continue from part {bm.beatIndex + 1} <ArrowRight size={13} style={{ marginLeft: 4 }} /></button>
        <button onClick={onDiscard} className="hcg-btn text-sm px-4 py-2.5 rounded" style={{ background: "transparent", color: "var(--parchment-dim)", border: "1px solid var(--hair)" }}>Start the chapter over</button>
      </div>
    </div>
  </div>;
}
