/* Review-only reversible prose archive view.
   Original chapters and war writing remain unchanged in js/data/ on main.
   The Cannae rewrite in review/wars.js is the only long-form prose shown. */
for (const chapter of CHAPTERS) {
  chapter.intro = chapter.kind === "war" && chapter.id === "war-punic-2"
    ? "Review edition: the Battle of Cannae has been rewritten. Other original prose is temporarily hidden."
    : "Original prose archived for editorial review. No original source text has been deleted.";
  for (const beat of chapter.beats || []) {
    const isCannae = beat.title === "Cannae" || beat.name === "Battle of Cannae";
    if (!isCannae) {
      beat.text = ["Original prose temporarily hidden in this review. It is preserved in the original source files for restoration or rewriting."];
      if (typeof beat.tactics === "string") beat.tactics = "";
      if (typeof beat.forces === "string") beat.forces = "";
      if (typeof beat.key === "string") beat.key = "";
    } else {
      // The revised narrative is in beat.text. Retain the interactive diagram,
      // but remove the original supplementary prose to make authorship clear.
      if (typeof beat.tactics === "string") beat.tactics = "";
      if (typeof beat.forces === "string") beat.forces = "";
      if (typeof beat.key === "string") beat.key = "";
      if (beat.diagram && Array.isArray(beat.diagram.phases)) {
        for (const phase of beat.diagram.phases) {
          phase.caption = "Original diagram caption archived for later editorial rewrite.";
        }
      }
    }
  }
}
