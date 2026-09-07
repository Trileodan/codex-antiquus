/* =====================================================================
   CAMPAIGNS SCREEN

   The Sets answer "what does this app know about Carthage". A campaign
   answers "where should I go next, and why". Both are needed and they
   are not the same question — which is why this sits beside Study
   rather than replacing it.

   The reason for each hop is given as much room as the chapter title,
   because it is the part doing the work.
   ===================================================================== */

function CampaignsScreen({ save, onHome, onOpenCampaign }) {
  const done = save.chaptersDone || {};
  return <div className="max-w-3xl mx-auto px-4 py-8 hcg-fade">
    <Crumbs items={[{ label: "Home", onClick: onHome }, { label: "Campaigns" }]} />
    <h1 className="hcg-display mt-3 mb-1" style={{ fontSize: 26 }}>Campaigns</h1>
    <p style={{ color: "var(--parchment-dim)", marginBottom: 6, lineHeight: 1.7 }}>
      A Set is a place — everything the app knows about Carthage, in order. A campaign is a route through
      several of them, following one thread of cause and consequence, with a reason attached to every step.
    </p>
    <p style={{ color: "var(--parchment-dim)", fontSize: 14, marginBottom: 24, lineHeight: 1.7 }}>
      Nothing here is new material. The same chapter turns up in more than one campaign and means something
      different each time, which is rather the point.
    </p>

    <div className="flex flex-col gap-4">
      {CAMPAIGNS.map((c) => {
        const p = campaignProgress(c, done);
        return <button key={c.id} onClick={() => onOpenCampaign(c.id)}
          className="hcg-panel rounded-lg p-5 text-left hover:brightness-110">
          <div className="flex items-start justify-between gap-3">
            <div style={{ minWidth: 0 }}>
              <div className="hcg-display" style={{ fontSize: 19 }}>{c.name}</div>
              <div className="hcg-mono" style={{ fontSize: 10.5, color: "var(--parchment-dim)", marginTop: 3 }}>
                {c.era} · {c.stops.length} stops
              </div>
            </div>
            <div className="hcg-mono" style={{ fontSize: 11, color: p.done ? "var(--gold-glow)" : "var(--parchment-dim)", whiteSpace: "nowrap" }}>
              {p.done}/{p.total}
            </div>
          </div>
          <p style={{ color: "var(--parchment-dim)", fontSize: 14, lineHeight: 1.6, marginTop: 8 }}>{c.blurb}</p>
          <div style={{ marginTop: 12 }}><Bar pct={p.pct} /></div>
        </button>;
      })}
    </div>
  </div>;
}

function CampaignScreen({ campaignId, save, onHome, onBack, onOpenChapter }) {
  const c = CAMPAIGN_BY_ID[campaignId];
  const done = save.chaptersDone || {};
  if (!c) return null;
  const p = campaignProgress(c, done);

  return <div className="max-w-2xl mx-auto px-4 py-8 hcg-fade">
    <Crumbs items={[{ label: "Home", onClick: onHome }, { label: "Campaigns", onClick: onBack }, { label: c.name }]} />
    <h1 className="hcg-display mt-3 mb-1" style={{ fontSize: 25 }}>{c.name}</h1>
    <div className="hcg-mono mb-3" style={{ fontSize: 11, color: "var(--parchment-dim)" }}>{c.era} · {p.done} of {p.total} done</div>
    <p style={{ color: "#DFD3B9", lineHeight: 1.75, marginBottom: 6 }}>{c.blurb}</p>
    <p style={{ color: "var(--bronze-glow)", lineHeight: 1.7, fontStyle: "italic", marginBottom: 22 }}>{c.opening}</p>

    <div className="flex flex-col">
      {c.stops.map((s, i) => {
        const ch = CHAPTER_BY_ID[s.chapter];
        const isDone = !!done[s.chapter];
        const isNext = p.next && p.next.chapter === s.chapter;
        return <div key={s.chapter}>
          {/* The reason comes BEFORE the stop it justifies, because it is
              the thing that makes you want to read the next one. */}
          <div className="flex gap-3">
            <div className="flex flex-col items-center" style={{ width: 24, flexShrink: 0 }}>
              <div style={{ width: 1, flex: 1, background: i === 0 ? "transparent" : "var(--hair)", minHeight: 14 }} />
            </div>
            <p style={{ color: "var(--parchment-dim)", fontSize: 14.5, lineHeight: 1.7, padding: "10px 0 12px" }}>{s.why}</p>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col items-center" style={{ width: 24, flexShrink: 0 }}>
              <div style={{ width: 22, height: 22, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center",
                background: isDone ? "var(--verdigris)" : "transparent",
                border: isDone ? "none" : `1px solid ${isNext ? "var(--gold-glow)" : "var(--hair)"}` }}>
                {isDone ? <CheckIcon size={12} color="#1B1710" />
                        : <span className="hcg-mono" style={{ fontSize: 10, color: isNext ? "var(--gold-glow)" : "var(--parchment-dim)" }}>{i + 1}</span>}
              </div>
              {i < c.stops.length - 1 && <div style={{ width: 1, flex: 1, background: "var(--hair)", minHeight: 10 }} />}
            </div>
            <button onClick={() => onOpenChapter(ch)}
              className={`flex-1 rounded-lg p-4 text-left mb-1 ${isNext ? "hcg-panel" : "hcg-panel-2"} hover:brightness-125`}
              style={isNext ? { borderColor: "var(--gold-glow)" } : undefined}>
              <div className="hcg-mono" style={{ fontSize: 10, color: "var(--parchment-dim)" }}>
                {SETS[ch.set] ? SETS[ch.set].name : "Crossings"} · {ch.era}
              </div>
              <div className="hcg-display" style={{ fontSize: 16.5, marginTop: 2 }}>{ch.title}</div>
              {isNext && <div className="hcg-mono" style={{ fontSize: 10.5, color: "var(--gold-glow)", marginTop: 5 }}>YOU ARE HERE</div>}
            </button>
          </div>
        </div>;
      })}
    </div>

    {p.done === p.total && <div className="hcg-panel rounded-lg p-5 mt-6 text-center" style={{ borderColor: "var(--gold-glow)" }}>
      <div className="hcg-display" style={{ fontSize: 18, color: "var(--gold-glow)" }}>Campaign complete</div>
      <p style={{ color: "var(--parchment-dim)", fontSize: 14, marginTop: 6, lineHeight: 1.6 }}>
        Try a Year Drop from somewhere in this range and see whether the thread holds without the chapters in front of you.
      </p>
    </div>}
  </div>;
}
