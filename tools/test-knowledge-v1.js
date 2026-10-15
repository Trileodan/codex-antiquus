const assert = require("node:assert/strict");
const K = require("../js/knowledge-v1.js");
const subjects = [
  { id: "battle-cannae", kind: "battle", sections: [
    { id: "cannae-context", level: "bronze" },
    { id: "cannae-deployment", level: "silver" },
    { id: "cannae-envelopment", level: "gold" }
  ] }
];
const lessons = [
  { id: "rome-cannae", pathway: "empire", sections: ["cannae-context"] },
  { id: "hannibal-cannae", pathway: "person", sections: ["cannae-context", "cannae-deployment"] },
  { id: "campaign-cannae", pathway: "campaign", sections: ["cannae-envelopment"] }
];
assert.deepEqual(K.validateCatalog(subjects, lessons), []);
assert.ok(K.validateCatalog(subjects, [{ id: "broken", pathway: "person", sections: ["missing"] }]).length);
let p = K.blankProgress();
p = K.markStudied(p, ["cannae-context", "cannae-context"]);
assert.equal(K.coverage(subjects[0], p).studied, 1, "shared knowledge cannot double-count");
assert.equal(K.tierStatus(subjects[0], p, 0).bronze.earned, false, "reading alone earns no medal");
p = K.recordAssessment(p, "battle-cannae", "bronze", true, 1000);
assert.equal(K.tierStatus(subjects[0], p, 1000).bronze.earned, true);
p = K.markStudied(p, ["cannae-deployment", "cannae-envelopment"]);
p = K.recordAssessment(p, "battle-cannae", "silver", true, 2000);
assert.equal(K.tierStatus(subjects[0], p, 2000).gold.earned, false);
p = K.recordAssessment(p, "battle-cannae", "gold", true, 3000);
assert.equal(K.tierStatus(subjects[0], p, 3000).gold.earned, true);
p = K.recordReview(p, "battle-cannae", true, 3000 + 6 * K.DAY_MS);
assert.equal(K.tierStatus(subjects[0], p, 3000 + 6 * K.DAY_MS).diamond.earned, false);
p = K.recordReview(p, "battle-cannae", true, 3000 + 7 * K.DAY_MS);
assert.equal(K.tierStatus(subjects[0], p, 3000 + 7 * K.DAY_MS).diamond.earned, true);
console.log("Knowledge V1 tests passed");
