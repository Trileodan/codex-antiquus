/* =====================================================================
   Cards from the Ancient Britain syllabus.

   Two of these cards are people whose names nobody knows. That is not a
   gap to be apologised for — it is the condition of the whole Set. For
   four thousand years the inhabitants of this island left no name of
   their own in any surviving record, and the first Briton whose name we
   can read is one a Roman general wrote down while invading him.
   ===================================================================== */

Object.assign(CHARACTERS, {

"amesbury-archer": {
  id: "amesbury-archer", name: "The Amesbury Archer", years: "d. c. 2380 – 2290 BC",
  sets: ["ancient-britain"],
  requires: { bronze: ["brit-stones"], silver: ["brit-stones", "brit-metal"] },
  tiers: {
    bronze: { label: "The Man From the Alps", when: "c. 2300 BC",
      blurb: "Buried three miles from Stonehenge with the richest grave goods of his age in Britain — and the isotopes in his teeth say he grew up somewhere with Alpine winters. He arrived on a badly damaged knee, having crossed a continent, and was buried with the earliest gold yet found in this country.",
      stats: { power: 30, intellect: 55, influence: 62, creativity: 70, wealth: 78, fame: 44 } },
    silver: { label: "The Turnover", when: "The Beaker centuries",
      blurb: "He stands for the moment the population of Britain was replaced. Within a few centuries of graves like his appearing, something like nine tenths of the island's ancestry had changed. Whether that was migration, disease, violence or collapse cannot currently be told from the evidence, and the confident versions all go beyond it.",
      stats: { power: 42, intellect: 60, influence: 74, creativity: 72, wealth: 80, fame: 58 } },
  },
  claims: [
    { text: "He was buried near Amesbury, about three miles from Stonehenge, with five Beaker pots, copper knives and two gold hair ornaments.", classification: "Established", sources: ["arch"], date: "c. 2300 BC", at: "bronze" },
    { text: "Oxygen isotopes in his tooth enamel indicate a childhood in a colder climate, most likely the Alpine region.", classification: "Established", sources: ["arch"], date: "c. 2300 BC", at: "bronze" },
    { text: "His gold ornaments are the earliest gold objects yet found in Britain.", classification: "Probable", sources: ["arch"], date: "c. 2300 BC", at: "bronze" },
    { text: "Roughly 90% of Britain's gene pool was replaced in the centuries after Beaker burials appear.", classification: "Established", sources: ["adna"], date: "c. 2450 – 2000 BC", at: "silver" },
    { text: "The cause of that turnover — migration, disease, violence or population collapse — cannot be determined from current evidence.", classification: "Unknown", sources: ["adna", "arch"], date: "c. 2450 – 2000 BC", at: "silver" },
  ],
  connections: [ { charId: "pytheas", relation: "two thousand years before the island was first described" }, { name: "Stonehenge", type: "place" }, { name: "Beaker culture", type: "concept" } ],
},

"pytheas": {
  id: "pytheas", name: "Pytheas of Massalia", years: "fl. c. 325 BC", sets: ["ancient-britain"],
  requires: { bronze: ["brit-pytheas"], silver: ["brit-pytheas", "brit-hillforts"] },
  tiers: {
    bronze: { label: "The Man Who Went and Looked", when: "c. 325 BC",
      blurb: "Sailed from Marseille past the Pillars of Heracles and around Britain, measured his latitudes with a shadow-stick, and wrote the first description of this island by anyone who had seen it. His book is lost. Every surviving word of it is a quotation by someone explaining why he was a liar.",
      stats: { power: 20, intellect: 90, influence: 48, creativity: 88, wealth: 40, fame: 55 } },
    silver: { label: "Right About Everything He Was Mocked For", when: "The verdict, eventually",
      blurb: "He reported the midnight sun, a sea near Thule that could be neither sailed nor walked on, and tides governed by the moon. Strabo called him an arch-falsifier. What his readers lacked was not evidence but a framework, and the lesson generalises: a source can be dismissed for being ahead of its audience rather than wrong.",
      stats: { power: 20, intellect: 94, influence: 62, creativity: 90, wealth: 40, fame: 70 } },
  },
  claims: [
    { text: "Pytheas sailed from Massalia around Britain in about 325 BC and wrote an account called On the Ocean.", classification: "Probable", sources: ["strabo", "pliny", "cah"], date: "c. 325 BC", at: "bronze" },
    { text: "His work survives only in quotation, largely by writers disputing it.", classification: "Established", sources: ["strabo", "diodorus", "pliny"], date: "1st c. BC onwards", at: "bronze" },
    { text: "Strabo calls him a falsifier and Polybius doubts a man of his means could have made the voyage.", classification: "Established", sources: ["strabo", "polybius"], date: "2nd – 1st c. BC", at: "bronze" },
    { text: "He recorded a native name for the island, some form of Prettanike, which is the ancestor of Britain.", classification: "Probable", sources: ["strabo", "diodorus", "cah"], date: "c. 325 BC", at: "bronze" },
    { text: "He described the midnight sun, a congealed sea beyond Britain, and the moon's governance of the tides.", classification: "Probable", sources: ["strabo", "pliny"], date: "c. 325 BC", at: "silver" },
    { text: "The location of his Thule is not established; Iceland, Norway and Shetland have all been argued.", classification: "Unknown", sources: ["cah"], date: "c. 325 BC", at: "silver" },
  ],
  connections: [ { charId: "amesbury-archer", relation: "the island he described had already changed hands" }, { name: "Massalia", type: "place" }, { name: "Cornish tin trade", type: "concept" } ],
},

"lindow-man": {
  id: "lindow-man", name: "Lindow Man", years: "d. c. AD 1 – 100", sets: ["ancient-britain"],
  requires: { bronze: ["brit-hillforts", "brit-druids"] },
  tiers: {
    bronze: { label: "Three Ways to Die", when: "1st c. AD",
      blurb: "A well-fed man in his mid-twenties with trimmed nails and no calluses, struck twice on the head, garrotted and with his throat cut, laid face-down in a Cheshire bog. The triple death is read as ritual sacrifice, and it is read as an execution, and it is read as a murder. The body is superbly preserved and the reason for it is not recoverable.",
      stats: { power: 35, intellect: 40, influence: 58, creativity: 30, wealth: 55, fame: 66 } },
  },
  claims: [
    { text: "The body was found in Lindow Moss in 1984 and dates to roughly the first century AD.", classification: "Established", sources: ["arch"], date: "1984", at: "bronze" },
    { text: "He suffered blows to the head, ligature injury to the neck and a cut throat before being placed in the pool.", classification: "Established", sources: ["arch"], date: "1st c. AD", at: "bronze" },
    { text: "His hands show no heavy manual labour, suggesting he was not a farm worker.", classification: "Probable", sources: ["arch"], date: "1st c. AD", at: "bronze" },
    { text: "That his death was a druidic ritual sacrifice.", classification: "Contested", sources: ["arch", "tacitus"], date: "1st c. AD", at: "bronze" },
  ],
  connections: [ { name: "Lindow Moss", type: "place" }, { name: "Bog bodies", type: "concept" }, { name: "Druids", type: "concept" } ],
},

});
