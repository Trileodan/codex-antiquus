/* Codex Antiquus V1 — shared knowledge and mastery engine.
   Standalone, deterministic and side-effect free: no save writes or UI changes.
   Browser: window.CodexKnowledgeV1; Node: require("./knowledge-v1.js").
*/
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.CodexKnowledgeV1 = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  const TIERS = ["bronze", "silver", "gold", "diamond"];
  const DAY_MS = 86400000;

  function validateCatalog(subjects, lessons) {
    const errors = [];
    const sections = new Set();
    const subjectIds = new Set();
    const lessonIds = new Set();
    for (const subject of subjects) {
      if (!subject.id || subjectIds.has(subject.id)) errors.push("Duplicate/missing subject ID: " + subject.id);
      subjectIds.add(subject.id);
      if (!["empire", "campaign", "person", "battle"].includes(subject.kind)) errors.push("Invalid subject kind: " + subject.id);
      if (!Array.isArray(subject.sections) || !subject.sections.length) errors.push("No sections: " + subject.id);
      for (const section of subject.sections || []) {
        if (!section.id || sections.has(section.id)) errors.push("Duplicate/missing section ID: " + section.id);
        sections.add(section.id);
        if (!TIERS.slice(0, 3).includes(section.level)) errors.push("Invalid section level: " + section.id);
      }
    }
    for (const lesson of lessons) {
      if (!lesson.id || lessonIds.has(lesson.id)) errors.push("Duplicate/missing lesson ID: " + lesson.id);
      lessonIds.add(lesson.id);
      if (!["empire", "campaign", "person"].includes(lesson.pathway)) errors.push("Invalid pathway: " + lesson.id);
      if (!Array.isArray(lesson.sections)) errors.push("Missing section references: " + lesson.id);
      for (const id of lesson.sections || []) if (!sections.has(id)) errors.push("Unknown section " + id + " in " + lesson.id);
    }
    return errors;
  }

  function blankProgress() {
    return { schemaVersion: 1, studiedSections: {}, assessments: {}, reviewHistory: {} };
  }

  function markStudied(progress, sectionIds) {
    const studiedSections = { ...(progress.studiedSections || {}) };
    for (const id of sectionIds) studiedSections[id] = true;
    return { ...progress, studiedSections };
  }

  // A section ID is counted once, even when multiple pathways cover it.
  function coverage(subject, progress) {
    const sections = subject.sections || [];
    const studied = progress.studiedSections || {};
    const covered = sections.filter(s => studied[s.id]);
    return { studied: covered.length, total: sections.length,
      fraction: sections.length ? covered.length / sections.length : 0,
      byLevel: Object.fromEntries(TIERS.slice(0, 3).map(level => {
        const relevant = sections.filter(s => TIERS.indexOf(s.level) <= TIERS.indexOf(level));
        return [level, { studied: relevant.filter(s => studied[s.id]).length, total: relevant.length }];
      })) };
  }

  // Assessments are subject-specific; passing Gold doesn't implicitly pass Bronze/Silver.
  // Content thresholds are curated via section levels, not arbitrary global percentages.
  function tierStatus(subject, progress, now) {
    const covered = coverage(subject, progress);
    const assessments = (progress.assessments || {})[subject.id] || {};
    const status = {};
    let previous = true;
    for (const tier of TIERS.slice(0, 3)) {
      const c = covered.byLevel[tier];
      const studied = c.total > 0 && c.studied === c.total;
      const passed = !!(assessments[tier] && assessments[tier].passed);
      status[tier] = { earned: previous && studied && passed, coverageMet: studied, assessmentPassed: passed };
      previous = status[tier].earned;
    }
    const goldAt = assessments.gold && assessments.gold.passedAt;
    const reviews = (progress.reviewHistory || {})[subject.id] || [];
    const eligibleReview = Number.isFinite(goldAt) && reviews.some(r =>
      r.passed === true && Number.isFinite(r.at) && r.at >= goldAt + 7 * DAY_MS && r.at <= now
    );
    status.diamond = { earned: status.gold.earned && eligibleReview,
      eligibleAt: Number.isFinite(goldAt) ? goldAt + 7 * DAY_MS : null,
      recallPassed: eligibleReview };
    return status;
  }

  function recordAssessment(progress, subjectId, tier, passed, at) {
    if (!TIERS.slice(0, 3).includes(tier)) throw new Error("Unknown assessment tier");
    if (!Number.isFinite(at)) throw new Error("Invalid assessment timestamp");
    const assessments = { ...(progress.assessments || {}) };
    assessments[subjectId] = { ...(assessments[subjectId] || {}),
      [tier]: { passed: !!passed, passedAt: passed ? at : null } };
    return { ...progress, assessments };
  }

  function recordReview(progress, subjectId, passed, at) {
    if (!Number.isFinite(at)) throw new Error("Invalid review timestamp");
    const reviewHistory = { ...(progress.reviewHistory || {}) };
    reviewHistory[subjectId] = [...(reviewHistory[subjectId] || []), { passed: !!passed, at }];
    return { ...progress, reviewHistory };
  }

  return { TIERS, DAY_MS, validateCatalog, blankProgress, markStudied,
    coverage, tierStatus, recordAssessment, recordReview };
});
