/* =====================================================================
   Additional cards introduced by the Carthage, Egypt and Wars syllabi.
   ===================================================================== */

Object.assign(CHARACTERS, {

"dido": {
  id: "dido", name: "Queen Elissa", years: "Traditional · 9th c. BC", mythic: true,
  note: "A card for a figure of tradition. Nothing about Elissa can be established, and the romance with Aeneas is Roman fiction written after Carthage was destroyed. Flagged rather than blended into the record.",
  sets: ["carthage"],
  requires: { bronze: ["carth-dido", "carth-place"] },
  tiers: { bronze: { label: "Founder of Carthage", when: "Traditional, 814 BC",
    blurb: "Fled Tyre after her brother murdered her husband for his treasure, and won a hilltop by cutting an oxhide into a single thread. Rome later rewrote her as a queen destroyed by love for Aeneas — a story that makes Carthage's founder into a warning about women and turns the Punic Wars into destiny.",
    stats: { power: 44, intellect: 68, influence: 58, creativity: 72, wealth: 60, fame: 34 } } },
  claims: [
    { text: "Elissa fled Tyre after her brother Pygmalion murdered her husband.", classification: "Traditional / Legendary", sources: ["cah"], date: "9th c. BC", at: "bronze" },
    { text: "She obtained the Byrsa hill by cutting an oxhide into a continuous thread.", classification: "Traditional / Legendary", sources: ["cah"], date: "814 BC", at: "bronze" },
    { text: "The romance with Aeneas is a Roman literary invention given its lasting form by Virgil.", classification: "Established", sources: ["cah"], date: "c. 19 BC", at: "bronze" },
    { text: "Archaeology places Carthage's founding in roughly the late 9th to early 8th century BC.", classification: "Established", sources: ["arch"], date: "c. 800 BC", at: "bronze" },
  ],
  connections: [ { charId: "hanno", relation: "later suffete of her city" }, { name: "Tyre", type: "place" }, { name: "Byrsa", type: "place" }, { name: "Founding of Carthage", type: "event" }, { name: "Phoenician colonisation", type: "concept" } ],
},

"hanno": {
  id: "hanno", name: "Hanno the Navigator", years: "fl. c. 500 BC", sets: ["carthage"],
  requires: { bronze: ["carth-hanno"] },
  tiers: { bronze: { label: "Beyond the Pillars", when: "c. 500 BC",
    blurb: "Took a Carthaginian fleet out through the Pillars of Hercules and down the Atlantic coast of Africa, founding colonies and filing a report that survives in Greek translation. It describes volcanoes, drums heard in the dark and hairy people his interpreters called gorillai — a word borrowed 2,300 years later to name the ape.",
    stats: { power: 52, intellect: 74, influence: 44, creativity: 80, wealth: 58, fame: 36 } } },
  claims: [
    { text: "Hanno led a Carthaginian colonising expedition down the Atlantic coast of Africa.", classification: "Probable", sources: ["cah"], date: "c. 500 BC", at: "bronze" },
    { text: "The Periplus of Hanno survives as a Greek translation of a Punic temple inscription.", classification: "Established", sources: ["cah"], date: "c. 500 BC", at: "bronze" },
    { text: "How far south the voyage reached — southern Morocco, Sierra Leone or Gabon — is disputed.", classification: "Contested", sources: ["cah"], date: "c. 500 BC", at: "bronze" },
    { text: "Carthage also sent Himilco north along Europe's Atlantic coast in search of tin.", classification: "Probable", sources: ["cah"], date: "c. 500 BC", at: "bronze" },
  ],
  connections: [ { charId: "dido", relation: "founder of his city" }, { name: "Pillars of Hercules", type: "place" }, { name: "Punic colonisation", type: "concept" }, { name: "Periplus of Hanno", type: "concept" } ],
},

"masinissa": {
  id: "masinissa", name: "Masinissa", years: "c. 238 – 148 BC", sets: ["carthage", "roman-republic"],
  requires: { bronze: ["war-punic-2"], silver: ["carth-zama", "carth-end"] },
  tiers: {
    bronze: { label: "The Cavalry That Changed Sides", when: "202 BC",
      blurb: "A Numidian prince who fought for Carthage in Spain, lost his kingdom to a rival, and was won over by Scipio. His cavalry decided Zama by returning from the pursuit to strike Hannibal's rear — the exact manoeuvre that had destroyed Rome at Cannae, now working for Rome.",
      stats: { power: 58, intellect: 70, influence: 55, creativity: 62, wealth: 40, fame: 46 } },
    silver: { label: "King of Numidia", when: "c. 150 BC",
      blurb: "Rewarded with a united Numidia and a Roman guarantee, he spent fifty years annexing Carthaginian territory piece by piece, knowing every appeal to Rome would be decided in his favour. He lived to about ninety, fathered children into his eighties, and did more than anyone except Rome to destroy Carthage — by exploiting a treaty rather than breaking one.",
      stats: { power: 76, intellect: 78, influence: 66, creativity: 60, wealth: 70, fame: 54 } },
  },
  claims: [
    { text: "Masinissa fought for Carthage in Spain before changing sides to Rome.", classification: "Established", sources: ["polybius", "livy"], date: "c. 206 BC", at: "bronze" },
    { text: "His cavalry struck the Carthaginian rear at Zama, deciding the battle.", classification: "Established", sources: ["polybius"], date: "202 BC", at: "bronze" },
    { text: "Rome installed him as king of a united Numidia and guaranteed his position.", classification: "Established", sources: ["polybius", "cah"], date: "201 BC", at: "silver" },
    { text: "His raids on Carthaginian territory, repeatedly upheld by Roman arbitration, provoked the treaty breach of 149 BC.", classification: "Established", sources: ["appian", "cah"], date: "200 – 150 BC", at: "silver" },
  ],
  connections: [ { charId: "scipio", relation: "won over by, at Zama" }, { charId: "hannibal", relation: "opposed at Zama" }, { charId: "hamilcar", relation: "fought for his family in Spain" }, { name: "Numidia", type: "place" }, { name: "Zama", type: "event" } ],
},

"alexander": {
  id: "alexander", name: "Alexander the Great", years: "356 – 323 BC", sets: ["ptolemaic-egypt"],
  note: "Encountered here through Egypt only. A fuller card, covering the Macedonian and Persian campaigns, arrives with the Macedon and Persia Sets.",
  requires: { bronze: ["egy-alexander"] },
  tiers: { bronze: { label: "Pharaoh of Egypt", when: "332 BC",
    blurb: "Took Egypt from Persia without a battle at twenty-four, sacrificed to Apis, was accepted as pharaoh, and marked out a Greek city on the coast before marching east. He never saw Alexandria built. It outlasted his empire by three hundred years and his dynasty by two thousand.",
    stats: { power: 92, intellect: 84, influence: 90, creativity: 88, wealth: 86, fame: 94 } } },
  claims: [
    { text: "The Persian satrap Mazaces surrendered Egypt to Alexander without a battle in 332 BC.", classification: "Established", sources: ["cah"], date: "332 BC", at: "bronze" },
    { text: "Alexander was recognised as pharaoh and sacrificed to the Apis bull.", classification: "Established", sources: ["cah"], date: "332 BC", at: "bronze" },
    { text: "What the oracle of Amun at Siwa told him was never disclosed.", classification: "Unknown", sources: ["plutarch"], date: "331 BC", at: "bronze" },
    { text: "He founded Alexandria in 331 BC and died in Babylon in 323 BC without seeing it completed.", classification: "Established", sources: ["plutarch", "cah"], date: "331 – 323 BC", at: "bronze" },
  ],
  connections: [ { charId: "ptolemy1", relation: "his bodyguard, who took Egypt and his body" }, { name: "Alexandria", type: "place" }, { name: "Siwa", type: "place" }, { name: "Wars of the Diadochi", type: "event" }, { name: "Hellenistic world", type: "concept" } ],
},

"ptolemy1": {
  id: "ptolemy1", name: "Ptolemy I Soter", years: "c. 367 – 282 BC", sets: ["ptolemaic-egypt"],
  requires: { bronze: ["egy-ptolemy1"] },
  tiers: { bronze: { label: "The Successor Who Chose Well", when: "305 BC",
    blurb: "Alexander's bodyguard and, later, his historian. While the other Successors bled each other trying to hold the whole empire, he asked for the one province that could feed and defend itself — then hijacked Alexander's funeral cortege to give his regime a legitimacy no rival could buy. He died in bed, which almost none of them managed.",
    stats: { power: 80, intellect: 84, influence: 74, creativity: 76, wealth: 86, fame: 62 } } },
  claims: [
    { text: "Ptolemy took Egypt in the division of Alexander's empire and declared himself king in 305 BC.", classification: "Established", sources: ["cah"], date: "323 – 305 BC", at: "bronze" },
    { text: "He diverted Alexander's funeral cortege to Egypt and entombed the body there.", classification: "Established", sources: ["cah"], date: "321 BC", at: "bronze" },
    { text: "Perdiccas invaded Egypt to recover the body, failed at a Nile crossing, and was killed by his own officers.", classification: "Established", sources: ["cah"], date: "320 BC", at: "bronze" },
    { text: "Whether Serapis was invented by his court or an existing Memphite cult he promoted is disputed.", classification: "Contested", sources: ["cah"], date: "c. 300 BC", at: "bronze" },
    { text: "He wrote a history of Alexander's campaigns, now lost but used by later authors.", classification: "Established", sources: ["cah"], date: "c. 290 BC", at: "bronze" },
  ],
  connections: [ { charId: "alexander", relation: "his bodyguard and historian" }, { charId: "ptolemy2", relation: "father of" }, { charId: "cleopatra", relation: "founder of her dynasty" }, { name: "Serapis", type: "concept" }, { name: "Alexandria", type: "place" }, { name: "Wars of the Diadochi", type: "event" } ],
},

"ptolemy2": {
  id: "ptolemy2", name: "Ptolemy II Philadelphus", years: "308 – 246 BC", sets: ["ptolemaic-egypt"],
  requires: { bronze: ["egy-ptolemy2"] },
  tiers: { bronze: { label: "Library and Lighthouse", when: "c. 270 BC",
    blurb: "Spent Egypt's grain surplus on making Alexandria the intellectual capital of the world, and got value for money: Euclid, Eratosthenes, Aristarchus, the Septuagint, and a lighthouse that stood fifteen centuries. He also married his own sister, which scandalised Greeks, reassured Egyptians, and set a dynastic pattern that ended with Cleopatra.",
    stats: { power: 74, intellect: 80, influence: 72, creativity: 90, wealth: 94, fame: 66 } } },
  claims: [
    { text: "Ptolemy II married his full sister Arsinoe II, establishing sibling marriage as dynastic practice.", classification: "Established", sources: ["cah"], date: "c. 273 BC", at: "bronze" },
    { text: "The Museum and Great Library were developed under his patronage.", classification: "Established", sources: ["cah"], date: "3rd c. BC", at: "bronze" },
    { text: "The Pharos lighthouse was completed during his reign.", classification: "Established", sources: ["cah", "arch"], date: "c. 280 BC", at: "bronze" },
    { text: "Ancient figures for the Library's holdings vary widely and cannot be reconciled.", classification: "Contested", sources: ["cah"], date: "3rd c. BC", at: "bronze" },
  ],
  connections: [ { charId: "ptolemy1", relation: "son of" }, { charId: "cleopatra", relation: "ancestor of" }, { name: "Great Library", type: "concept" }, { name: "Pharos", type: "place" }, { name: "Arsinoe II", type: "concept" } ],
},

"agrippa": {
  id: "agrippa", name: "Marcus Agrippa", years: "63 – 12 BC", sets: ["roman-republic"],
  requires: { bronze: ["war-actium"] },
  tiers: { bronze: { label: "The Man Who Won Actium", when: "31 BC",
    blurb: "Octavian's schoolfriend, admiral and the actual military mind of his rise. He cleared Sextus Pompey from the sea, invented the harpax, and beat Antony by taking his supply ports and starving his fleet before a shot was fired. He never once tried to take the credit, which is probably why he kept his head.",
    stats: { power: 72, intellect: 86, influence: 58, creativity: 84, wealth: 76, fame: 60 } } },
  claims: [
    { text: "Agrippa defeated Sextus Pompey at Naulochus in 36 BC, securing Rome's grain supply.", classification: "Established", sources: ["dio", "appian"], date: "36 BC", at: "bronze" },
    { text: "He developed the harpax, a catapult-launched grapnel used to board enemy ships.", classification: "Established", sources: ["appian", "dio"], date: "36 BC", at: "bronze" },
    { text: "He seized Antony's supply ports and blockaded his fleet before the battle of Actium.", classification: "Established", sources: ["dio", "cah"], date: "31 BC", at: "bronze" },
    { text: "He commanded the fleet at Actium under Octavian's nominal authority.", classification: "Established", sources: ["dio"], date: "31 BC", at: "bronze" },
  ],
  connections: [ { charId: "octavian", relation: "lifelong lieutenant and son-in-law" }, { charId: "antony", relation: "defeated at Actium" }, { charId: "cleopatra", relation: "defeated at Actium" }, { name: "Actium", type: "event" }, { name: "Naulochus", type: "event" }, { name: "Harpax", type: "concept" } ],
},

});
