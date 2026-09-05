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

"cassivellaunus": {
  id: "cassivellaunus", name: "Cassivellaunus", years: "fl. 54 BC", sets: ["ancient-britain"],
  requires: { bronze: ["brit-caesar"], silver: ["brit-caesar", "brit-tribes"] },
  tiers: {
    bronze: { label: "The First Briton With a Name", when: "54 BC",
      blurb: "Given supreme command over the usual rivalries when Caesar came back in force, and fought the campaign correctly by refusing the one Caesar wanted — disbanding his infantry, keeping four thousand chariots, and bleeding the column from the flanks. His is the earliest name of an inhabitant of this island that anyone can read.",
      stats: { power: 68, intellect: 74, influence: 70, creativity: 80, wealth: 52, fame: 62 } },
    silver: { label: "Beaten by a Defection", when: "The Thames, 54 BC",
      blurb: "Not beaten in the field. The Trinovantes, whose king he had killed and whose heir was sitting in Caesar's camp, changed sides and told the Romans where his stronghold was; five other peoples followed. The alliance he had been given command of was the thing that failed, and it failed for reasons that predated the invasion.",
      stats: { power: 70, intellect: 78, influence: 62, creativity: 82, wealth: 52, fame: 70 } },
  },
  claims: [
    { text: "Cassivellaunus was given overall command of the British resistance to Caesar's second expedition.", classification: "Probable", sources: ["caesar"], date: "54 BC", at: "bronze" },
    { text: "He disbanded most of his infantry and kept about four thousand chariots for a war of harassment.", classification: "Probable", sources: ["caesar"], date: "54 BC", at: "bronze" },
    { text: "Caesar is the only source for the campaign, and wrote it as a dispatch to a Roman electorate.", classification: "Established", sources: ["caesar", "cah"], date: "54 BC", at: "bronze" },
    { text: "The Trinovantes defected to Caesar and disclosed the location of his stronghold.", classification: "Probable", sources: ["caesar"], date: "54 BC", at: "silver" },
    { text: "The tribute agreed in the settlement is never mentioned again in any source.", classification: "Established", sources: ["cah"], date: "54 BC onwards", at: "silver" },
  ],
  connections: [ { charId: "caesar", relation: "invaded him twice and wrote the only account" }, { charId: "cunobelinus", relation: "a century before the kingdom Rome eventually annexed" }, { name: "River Thames", type: "place" } ],
},

"cunobelinus": {
  id: "cunobelinus", name: "Cunobelinus", years: "r. c. AD 9 – 40", sets: ["ancient-britain"],
  requires: { bronze: ["brit-oppida"], silver: ["brit-oppida", "brit-tribes"] },
  tiers: {
    bronze: { label: "King of the Britons", when: "c. AD 9 – 40",
      blurb: "Ruled thirty years from Camulodunum over a territory that had swallowed its neighbours, with a mint, a treasury and coins carrying an ear of barley on one face and a vine leaf on the other — what the kingdom grew, and what it bought. Suetonius calls him king of the Britons, which flattens a paramount kingship into something simpler.",
      stats: { power: 66, intellect: 72, influence: 84, creativity: 66, wealth: 82, fame: 60 } },
    silver: { label: "Thirty Years of Not Being Invaded", when: "The policy",
      blurb: "Kept Rome at arm's length by being more useful trading than fighting: wine in, grain and slaves out, exiles tolerated, nobody's army required. It held for three decades and collapsed within three years of his death, when his sons pushed a Roman client too far and handed Claudius a pretext.",
      stats: { power: 66, intellect: 80, influence: 88, creativity: 70, wealth: 86, fame: 68 } },
  },
  claims: [
    { text: "Cunobelinus ruled from Camulodunum for roughly thirty years and struck inscribed coinage there.", classification: "Established", sources: ["arch", "cah"], date: "c. AD 9 – 40", at: "bronze" },
    { text: "His coins name his father Tasciovanus and carry mint marks for Camulodunum.", classification: "Established", sources: ["arch"], date: "c. AD 10 – 40", at: "bronze" },
    { text: "Suetonius calls him Britannorum rex, king of the Britons.", classification: "Established", sources: ["suetonius"], date: "AD 40", at: "bronze" },
    { text: "Britain's south-east imported Italian wine, silver and bronze tableware at volume before the conquest.", classification: "Established", sources: ["arch", "strabo"], date: "1st c. BC – AD 43", at: "silver" },
    { text: "After his death his sons expelled Verica of the Atrebates, who appealed to Rome.", classification: "Probable", sources: ["dio", "cah"], date: "c. AD 40 – 42", at: "silver" },
  ],
  connections: [ { charId: "caratacus", relation: "father of" }, { charId: "cassivellaunus", relation: "ruled the country Caesar had failed to hold" }, { name: "Camulodunum", type: "place" } ],
},

"caratacus": {
  id: "caratacus", name: "Caratacus", years: "fl. AD 40 – 51", sets: ["ancient-britain"],
  requires: { bronze: ["brit-claudius", "brit-caratacus"], silver: ["brit-caratacus", "brit-oppida"] },
  tiers: {
    bronze: { label: "Nine Years", when: "AD 43 – 51",
      blurb: "Lost his kingdom in the first summer and kept fighting for nine years anyway, moving west and commanding other people's wars — the Silures first, then the Ordovices. Tacitus says the escapes made him the most famous man in Britain, which was itself the weapon: a leader who had survived Rome was worth following.",
      stats: { power: 74, intellect: 76, influence: 80, creativity: 78, wealth: 34, fame: 82 } },
    silver: { label: "The Speech He Did Not Write", when: "Rome, AD 51",
      blurb: "Paraded through Rome and pardoned, after a speech asking whether wanting to rule everyone means everyone must accept slavery. Tacitus composed it half a century later, as ancient historians composed all speeches. The most quoted British statement of the period is a Roman senator's argument against Rome — which is not a British voice surviving, but the absence of one, decorated.",
      stats: { power: 74, intellect: 82, influence: 86, creativity: 78, wealth: 34, fame: 90 } },
  },
  claims: [
    { text: "Caratacus led resistance among the Silures and Ordovices for around nine years after AD 43.", classification: "Probable", sources: ["tacitus"], date: "AD 43 – 51", at: "bronze" },
    { text: "He was defeated in AD 51 at a prepared hillside position in Ordovician territory.", classification: "Probable", sources: ["tacitus"], date: "AD 51", at: "bronze" },
    { text: "The site of that battle is not identified; Caer Caradoc and other hills carry the tradition without evidence.", classification: "Unknown", sources: ["cah"], date: "AD 51", at: "bronze" },
    { text: "He fled to Cartimandua of the Brigantes, who handed him to the Romans in chains.", classification: "Probable", sources: ["tacitus"], date: "AD 51", at: "silver" },
    { text: "Claudius pardoned him and his family, who lived out their lives in Italy.", classification: "Probable", sources: ["tacitus"], date: "AD 51", at: "silver" },
    { text: "The speech attributed to him was composed by Tacitus, in the normal manner of ancient historiography.", classification: "Established", sources: ["tacitus", "cah"], date: "c. AD 110", at: "silver" },
  ],
  connections: [ { charId: "cunobelinus", relation: "son of" }, { charId: "cartimandua", relation: "surrendered by" }, { name: "Silures", type: "org" }, { name: "Wales", type: "place" } ],
},

"cartimandua": {
  id: "cartimandua", name: "Cartimandua", years: "r. c. AD 43 – 69", sets: ["ancient-britain"],
  requires: { bronze: ["brit-caratacus"], silver: ["brit-caratacus", "brit-claudius"] },
  tiers: {
    bronze: { label: "Queen of the Brigantes", when: "c. AD 43 – 69",
      blurb: "Ruled the largest territory in Britain for a quarter of a century by treaty with Rome, which is longer than any British ruler managed by fighting it. Handing Caratacus over was the treaty working: sheltering the empire's most wanted man would have brought four legions into her country.",
      stats: { power: 60, intellect: 80, influence: 86, creativity: 62, wealth: 74, fame: 64 } },
    silver: { label: "Written by a Man Who Disliked Her", when: "The record",
      blurb: "Everything known about her comes from Tacitus, who calls her treacherous and dwells on her leaving her husband for his armour-bearer — a charge he does not level at male client kings doing the same arithmetic. Strip the disapproval and what remains is a ruler who kept her kingdom out of a war for twenty-five years and lost it in a civil quarrel Rome could not spare troops to settle.",
      stats: { power: 62, intellect: 84, influence: 82, creativity: 66, wealth: 74, fame: 70 } },
  },
  claims: [
    { text: "Cartimandua ruled the Brigantes as a Roman client from around AD 43.", classification: "Probable", sources: ["tacitus"], date: "c. AD 43", at: "bronze" },
    { text: "She surrendered Caratacus to Rome in AD 51.", classification: "Probable", sources: ["tacitus"], date: "AD 51", at: "bronze" },
    { text: "The Brigantes held the largest territory of any British people.", classification: "Probable", sources: ["tacitus", "cah"], date: "1st c. AD", at: "bronze" },
    { text: "She set aside her husband Venutius for his armour-bearer Vellocatus, and civil war followed.", classification: "Probable", sources: ["tacitus"], date: "c. AD 57 – 69", at: "silver" },
    { text: "Rome extracted her in AD 69 and Venutius took the kingdom.", classification: "Probable", sources: ["tacitus"], date: "AD 69", at: "silver" },
    { text: "Tacitus is the only source for her reign, and is hostile.", classification: "Established", sources: ["tacitus", "cah"], date: "c. AD 110", at: "silver" },
  ],
  connections: [ { charId: "caratacus", relation: "handed him to Rome" }, { name: "Brigantes", type: "org" }, { name: "Stanwick", type: "place" } ],
},

});
