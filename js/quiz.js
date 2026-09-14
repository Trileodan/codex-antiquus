/* =====================================================================
   PROMOTION QUIZ — the screens

   The question-building logic lives in js/data/quizgen.js so the
   validator can load it and check that every coin in the app produces a
   usable quiz. This file is only what the reader sees.
   ===================================================================== */

function PromotePanel({ c, st, onTakeQuiz }) {
  const locked = st.lockedUntil;
  if (locked) {
    const hrs = Math.max(1, Math.ceil((locked - Date.now()) / 3600000));
    return <div className="hcg-panel-2 rounded p-4" style={{ borderColor: "var(--rust, var(--hair))" }}>
      <div className="hcg-tab mb-1" style={{ color: "var(--parchment-dim)" }}>PROMOTION LOCKED</div>
      <div style={{ fontSize: 14, lineHeight: 1.65, color: "#DFD3B9" }}>
        That attempt did not pass. The quiz reopens in about {hrs} hour{hrs === 1 ? "" : "s"}.
        Use them — reread the chapters rather than guessing again.
      </div>
    </div>;
  }
  return <div className="hcg-panel-2 rounded p-4" style={{ borderColor: "var(--gold-glow)" }}>
    <div className="hcg-tab mb-1" style={{ color: "var(--gold-glow)" }}>READY TO PROMOTE</div>
    <div style={{ fontSize: 14, lineHeight: 1.65, color: "#DFD3B9", marginBottom: 10 }}>
      You have studied everything the app holds on this — all {st.total} chapter{st.total === 1 ? "" : "s"}.
      Gold is not given for reading it; pass the quiz and claim it. Get one wrong and it locks for a day.
    </div>
    <button onClick={() => onTakeQuiz(c.id)} className="hcg-btn w-full px-4 py-3 rounded"
      style={{ background: "var(--gold, var(--bronze))", color: "#1B1710", fontSize: 14 }}>Take the quiz for Gold</button>
  </div>;
}

/* The quiz itself. One question at a time, no going back, and the
   explanation only after you have committed to an answer. */
function QuizModal({ coinId, save, onClose, onResult }) {
  const c = CHARACTERS[coinId];
  const attempt = ((save.quiz && save.quiz[coinId] && save.quiz[coinId].attempts) || 0);
  const qs = useMemo(() => buildQuiz(c, attempt), [coinId, attempt]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [right, setRight] = useState(0);
  const [done, setDone] = useState(false);

  if (!c || !qs.length) return null;
  const q = qs[i];

  function choose(n) {
    if (picked !== null) return;
    setPicked(n);
    if (n === q.correct) setRight(right + 1);
  }
  function next() {
    const scored = right;
    if (i + 1 >= qs.length) {
      const passed = scored / qs.length >= QUIZ_PASS;
      setDone(true);
      onResult(coinId, passed, scored, qs.length);
    } else { setI(i + 1); setPicked(null); }
  }

  return <div className="fixed inset-0 z-[70] flex items-center justify-center p-3" style={{ background: "rgba(9,7,5,.86)" }}>
    <div className="hcg-panel hcg-pop hcg-scroll rounded-lg w-full max-w-lg max-h-[88vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
      <div className="p-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--hair)" }}>
        <div>
          <div className="hcg-tab" style={{ color: "var(--gold-glow)" }}>PROMOTION QUIZ</div>
          <div className="hcg-display" style={{ fontSize: 17 }}>{c.name}</div>
        </div>
        <div className="hcg-mono" style={{ fontSize: 11, color: "var(--parchment-dim)" }}>{done ? "RESULT" : `${i + 1} / ${qs.length}`}</div>
      </div>

      {!done && <div className="p-5">
        <div style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 14 }}>{q.q}</div>
        <div className="flex flex-col gap-2">
          {q.options.map((o, n) => {
            const isRight = n === q.correct, chosen = picked === n;
            const show = picked !== null;
            return <button key={n} onClick={() => choose(n)} disabled={show}
              className="text-left rounded px-3 py-3"
              style={{ border: "1px solid " + (show && isRight ? "var(--verdigris)" : show && chosen ? "var(--rust, #8a3b2a)" : "var(--hair)"),
                       background: show && isRight ? "rgba(90,140,110,.14)" : "var(--panel-2)",
                       color: "var(--parchment)", fontSize: 14.5, lineHeight: 1.5 }}>{o}</button>;
          })}
        </div>
        {picked !== null && <div className="mt-3" style={{ fontSize: 13.5, lineHeight: 1.65, color: "var(--parchment-dim)" }}>{q.explain}</div>}
        {picked !== null && <button onClick={next} className="hcg-btn mt-4 w-full px-4 py-3 rounded"
          style={{ background: "var(--bronze)", color: "#1B1710", fontSize: 14 }}>
          {i + 1 >= qs.length ? "See result" : "Next"}</button>}
      </div>}

      {done && <div className="p-5">
        {right === qs.length ? <>
          <div className="hcg-display" style={{ fontSize: 22, color: "var(--gold-glow)", marginBottom: 6 }}>Gold.</div>
          <p style={{ lineHeight: 1.7, color: "#DFD3B9" }}>
            {right} of {qs.length}. You can recall this independently, reason about it and connect it to other history —
            which is what the top of the ladder was always supposed to mean.
          </p>
        </> : <>
          <div className="hcg-display" style={{ fontSize: 22, marginBottom: 6 }}>{right} of {qs.length}.</div>
          <p style={{ lineHeight: 1.7, color: "#DFD3B9" }}>
            Gold needs all of them. The quiz reopens in twenty-four hours — go back to the chapters in the meantime
            rather than waiting to guess again.
          </p>
        </>}
        <button onClick={onClose} className="hcg-btn mt-4 w-full px-4 py-3 rounded"
          style={{ background: "var(--bronze)", color: "#1B1710", fontSize: 14 }}>Close</button>
      </div>}
    </div>
  </div>;
}
