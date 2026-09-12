/* =====================================================================
   COMMAND DECISIONS

   Brief section 5. Before the chapter tells you what happened, it puts
   you where the decision was made and asks what you would do.

   The rule that makes this work is that the historical answer is not
   on the screen until you have committed to one. Everything else — the
   analysis of each option, the reveal, the reason it worked — comes
   after, and the analysis is honest: several of these options are
   genuinely good ideas that history did not take, and one or two of the
   historical decisions were bad ones that happened to succeed.

   No option is marked right or wrong. Each carries a `verdict` that
   says what would actually have happened if you had done it, which is
   the only useful feedback and is the whole point of the exercise.
   ===================================================================== */

function CommandDecision({ decision, reveal }) {
  const [chosen, setChosen] = useState(null);
  const d = decision;

  return <div className="hcg-panel rounded-lg" style={{ borderColor: "var(--rust)", padding: 18, margin: "20px 0" }}>
    <div className="hcg-tab" style={{ color: "var(--rust)" }}>COMMAND DECISION</div>
    <div className="hcg-display" style={{ fontSize: 19, marginTop: 4 }}>{d.title}</div>
    <div className="hcg-mono" style={{ fontSize: 11, color: "var(--parchment-dim)", marginTop: 3 }}>
      {d.you} · {d.when}
    </div>

    <div style={{ marginTop: 14 }}>
      {d.situation.map((p, i) => <p key={i} className="hcg-prose" style={{ marginBottom: 10, fontSize: 15.5 }}><RichText text={p} /></p>)}
    </div>

    {d.known && <div className="hcg-panel-2 rounded p-3" style={{ marginTop: 4 }}>
      <div className="hcg-tab mb-2" style={{ color: "var(--parchment-dim)" }}>WHAT YOU KNOW</div>
      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.75, color: "#DFD3B9" }}>
        {d.known.map((k, i) => <li key={i}>{k}</li>)}
      </ul>
      {d.unknown && <>
        <div className="hcg-tab mb-2" style={{ color: "var(--rust)", marginTop: 12 }}>WHAT YOU DO NOT KNOW</div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.75, color: "var(--parchment-dim)" }}>
          {d.unknown.map((k, i) => <li key={i}>{k}</li>)}
        </ul>
      </>}
    </div>}

    {d.map && <ChapterMap map={d.map} />}

    <div className="hcg-display" style={{ fontSize: 17, color: "var(--gold-glow)", margin: "18px 0 10px" }}>
      What would you do?
    </div>

    <div className="flex flex-col gap-2">
      {d.options.map((o, i) => {
        const picked = chosen === i;
        const revealed = chosen !== null;
        return <button key={i} disabled={revealed} onClick={() => setChosen(i)}
          className="rounded p-3 text-left"
          style={{ background: picked ? "var(--panel-2)" : "transparent",
                   border: `1px solid ${picked ? "var(--gold-glow)" : "var(--hair)"}`,
                   opacity: revealed && !picked ? 0.55 : 1, cursor: revealed ? "default" : "pointer" }}>
          <div style={{ fontSize: 15, lineHeight: 1.55 }}>{o.text}</div>
          {revealed && <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--hair)" }}>
            <div className="hcg-mono" style={{ fontSize: 10, color: o.historical ? "var(--gold-glow)" : "var(--parchment-dim)" }}>
              {o.historical ? "THIS IS WHAT WAS DONE" : "WHAT WOULD HAVE HAPPENED"}
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.65, color: "#DFD3B9", marginTop: 4 }}>{o.verdict}</div>
          </div>}
        </button>;
      })}
    </div>

    {chosen !== null && <div className="hcg-fade" style={{ marginTop: 16 }}>
      <div className="hcg-tab mb-2" style={{ color: "var(--gold-glow)" }}>WHAT ACTUALLY HAPPENED</div>
      {d.outcome.map((p, i) => <p key={i} className="hcg-prose" style={{ marginBottom: 10, fontSize: 15.5 }}><RichText text={p} /></p>)}
      {/* The chapter's own passage, held back until now because it narrates
          the answer. Folded in here rather than shown separately, so the
          reader is not made to scroll past a gap they cannot read yet. */}
      {reveal && <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--hair)" }}>{reveal}</div>}
      {d.lesson && <div className="hcg-panel-2 rounded p-3" style={{ marginTop: 6 }}>
        <div className="hcg-tab mb-1" style={{ color: "var(--verdigris)" }}>THE LESSON</div>
        <div style={{ fontSize: 14.5, lineHeight: 1.7 }}>{d.lesson}</div>
      </div>}
    </div>}

    {chosen === null && <div className="hcg-mono" style={{ fontSize: 11, color: "var(--parchment-dim)", marginTop: 12, lineHeight: 1.6 }}>
      Nothing is revealed until you pick one — including the rest of this passage. Guessing is fine;
      committing to a wrong answer teaches you more than reading the right one.
    </div>}
  </div>;
}
