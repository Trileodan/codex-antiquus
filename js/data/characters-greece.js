/* =====================================================================
   Cards from the Ancient Greece syllabus.

   No Leonidas card. Thermopylae is a battle, battles live in war
   entries, and the Greco-Persian Wars entry is sealed until Persia has
   a Set. A card whose whole substance is a battle the app has not yet
   told properly would be a name with nothing behind it.
   ===================================================================== */

Object.assign(CHARACTERS, {

"solon": {
  id: "solon", name: "Solon", years: "c. 630 – c. 560 BC", sets: ["ancient-greece"],
  requires: { bronze: ["grk-athens-reform", "grk-polis"] },
  tiers: { bronze: { label: "The Arbitrator", when: "594 BC",
    blurb: "Given power by both sides of a class war to rewrite Athens' laws, cancelled the debts that were turning citizens into slaves, graded political rights by income instead of birth — then left the city for ten years so nobody could make him amend it. He wrote poetry defending the settlement, some of which survives, and it is mostly a complaint that neither side thanked him.",
    stats: { power: 22, intellect: 84, influence: 74, creativity: 70, wealth: 48, fame: 62 } } },
  claims: [
    { text: "Solon cancelled existing debts and outlawed loans secured on the borrower's person.", classification: "Established", sources: ["aristotle-ath", "plutarch"], date: "594 BC", at: "bronze" },
    { text: "He replaced birth with measured agricultural income as the basis for political rights.", classification: "Established", sources: ["aristotle-ath"], date: "594 BC", at: "bronze" },
    { text: "Fragments of his own verse defending the reforms survive by quotation in later authors.", classification: "Established", sources: ["aristotle-ath", "plutarch"], date: "6th c. BC", at: "bronze" },
    { text: "Later Athenians attributed to him laws that plainly postdate him, as a way of giving them authority.", classification: "Probable", sources: ["cah"], date: "5th – 4th c. BC", at: "bronze" },
  ],
  connections: [ { charId: "kleisthenes", relation: "completed by" }, { name: "Athens", type: "place" }, { name: "Seisachtheia", type: "event" }, { name: "Citizenship", type: "concept" } ],
},

"kleisthenes": {
  id: "kleisthenes", name: "Kleisthenes", years: "c. 570 – c. 508 BC", sets: ["ancient-greece"],
  requires: { bronze: ["grk-athens-reform", "grk-polis"], silver: ["grk-pericles", "grk-empire"] },
  tiers: {
    bronze: { label: "The Rewirer", when: "508 BC",
      blurb: "Rebuilt Athens from the village up. Registered citizens where they lived rather than by ancestry, then assembled ten new tribes each deliberately stitched from coast, city and inland — so that no tribe was any family's territory. A council of 500 chosen by lot prepared business for an assembly of everyone. He engineered a constitution the way one designs a machine.",
      stats: { power: 20, intellect: 88, influence: 78, creativity: 92, wealth: 52, fame: 48 } },
    silver: { label: "Architect of the Democracy", when: "Seen from 431 BC",
      blurb: "What he built held for nearly two centuries and grew more radical, not less. Pay for office, allotted juries and an assembly that could vote itself into a war all descend from the structure he laid down — and so does the empire that funded it. He is the rarest thing in political history: a designer whose design ran.",
      stats: { power: 24, intellect: 90, influence: 86, creativity: 94, wealth: 52, fame: 64 } },
  },
  claims: [
    { text: "Kleisthenes reorganised Attica into demes grouped in ten tribes drawn from three separate districts each.", classification: "Established", sources: ["herodotus", "aristotle-ath"], date: "508 BC", at: "bronze" },
    { text: "Citizenship was registered by deme of residence rather than by descent group.", classification: "Established", sources: ["aristotle-ath"], date: "508 BC", at: "bronze" },
    { text: "The reforms were called isonomia — equality before the law; 'democracy' is a later word.", classification: "Probable", sources: ["herodotus", "cah"], date: "508 BC", at: "bronze" },
    { text: "Whether he introduced ostracism, or it was added later, is disputed.", classification: "Contested", sources: ["aristotle-ath", "cah"], date: "508 – 487 BC", at: "silver" },
  ],
  connections: [ { charId: "solon", relation: "built on" }, { charId: "perikles", relation: "inherited by" }, { name: "Athens", type: "place" }, { name: "Isonomia", type: "concept" }, { name: "Ostracism", type: "concept" } ],
},

"herodotos": {
  id: "herodotos", name: "Herodotus", years: "c. 484 – c. 425 BC", sets: ["ancient-greece"],
  requires: { bronze: ["grk-persia"], silver: ["grk-persia", "grk-empire", "grk-colonies"] },
  tiers: {
    bronze: { label: "The Enquirer", when: "c. 440 BC",
      blurb: "Set out to record what happened in the Persian wars before it faded, and invented a method doing it: naming his informants, giving rival versions, and marking where he is reporting rather than believing. His word for the enquiry was historia. He is also credulous, fond of a good story, and wrong about numbers by an order of magnitude.",
      stats: { power: 8, intellect: 86, influence: 44, creativity: 88, wealth: 40, fame: 70 } },
    silver: { label: "Father of History, Father of Lies", when: "The verdict since antiquity",
      blurb: "Both titles are ancient. He travelled, asked Egyptians and Persians and Scythians for their own accounts, and gave space to versions that made Greeks look bad — which is why he was accused of being too fond of foreigners. Archaeology has vindicated him on details his ancient critics rejected, and buried him on others. He is the reason this app cites its sources.",
      stats: { power: 8, intellect: 90, influence: 58, creativity: 90, wealth: 40, fame: 82 } },
  },
  claims: [
    { text: "Herodotus systematically named his informants and gave competing versions of disputed events.", classification: "Established", sources: ["herodotus"], date: "c. 440 BC", at: "bronze" },
    { text: "His figures for Persian army strength — over a million — are impossible; modern estimates are far lower.", classification: "Contested", sources: ["herodotus", "cah"], date: "480 BC", at: "bronze" },
    { text: "He was called both 'father of history' and 'father of lies' in antiquity.", classification: "Established", sources: ["cah"], date: "1st c. BC", at: "silver" },
    { text: "Excavation has confirmed some details ancient critics dismissed, and refuted others.", classification: "Established", sources: ["arch"], date: "19th – 21st c.", at: "silver" },
  ],
  connections: [ { charId: "thucydides", relation: "answered by" }, { name: "Halicarnassus", type: "place" }, { name: "Greco-Persian Wars", type: "event" }, { name: "Historia", type: "concept" } ],
},

"themistokles": {
  id: "themistokles", name: "Themistokles", years: "c. 524 – c. 459 BC", sets: ["ancient-greece"],
  requires: { bronze: ["grk-persia", "grk-athens-reform"], silver: ["grk-empire"] },
  tiers: {
    bronze: { label: "The Man Who Built the Fleet", when: "483 BC",
      blurb: "Persuaded Athens to spend a windfall from a new silver strike at Laurion on 200 warships instead of distributing it to citizens as cash. It was an unpopular argument for a fleet against an enemy that had already been beaten once. Three years later that fleet was the only thing standing between Greece and Xerxes.",
      stats: { power: 62, intellect: 90, influence: 76, creativity: 88, wealth: 54, fame: 66 } },
    silver: { label: "Exiled by the City He Saved", when: "c. 471 BC",
      blurb: "Rebuilt Athens' walls against Spartan objection by stalling in person at Sparta while the work went on behind him, and fortified the Piraeus, committing Athens to the sea. Then he was ostracised, condemned in absence, and ended his life as a governor in the service of the Persian king he had defeated.",
      stats: { power: 64, intellect: 92, influence: 62, creativity: 90, wealth: 66, fame: 74 } },
  },
  claims: [
    { text: "He persuaded Athens to spend the Laurion silver windfall on a war fleet rather than distributing it.", classification: "Established", sources: ["herodotus", "aristotle-ath"], date: "483 BC", at: "bronze" },
    { text: "He directed the rebuilding of Athens' walls while personally delaying negotiations at Sparta.", classification: "Probable", sources: ["thucydides"], date: "479 – 478 BC", at: "silver" },
    { text: "He was ostracised, later condemned in absence, and died in Persian service.", classification: "Established", sources: ["thucydides", "plutarch"], date: "c. 471 – 459 BC", at: "silver" },
    { text: "The story that he sent a false message to Xerxes before Salamis comes from sources hostile and friendly alike, and is hard to test.", classification: "Contested", sources: ["herodotus", "plutarch"], date: "480 BC", at: "silver" },
  ],
  connections: [ { charId: "herodotos", relation: "chronicled by" }, { name: "Piraeus", type: "place" }, { name: "Laurion silver", type: "concept" }, { name: "Greco-Persian Wars", type: "event" } ],
},

"perikles": {
  id: "perikles", name: "Perikles", years: "c. 495 – 429 BC", sets: ["ancient-greece"],
  requires: { bronze: ["grk-pericles", "grk-empire"], silver: ["grk-pelop"], gold: ["grk-socrates", "grk-philip"] },
  tiers: {
    bronze: { label: "First Citizen", when: "The 440s BC",
      blurb: "Held no special power. He was one of ten generals, elected annually, and led by winning the argument in front of several thousand people over and over for thirty years. Introduced pay for public office, which is what turned a democracy of the leisured into a democracy of the poor, and rebuilt the Acropolis with money his allies had paid for defence.",
      stats: { power: 48, intellect: 88, influence: 94, creativity: 82, wealth: 70, fame: 86 } },
    silver: { label: "The Strategy and the Plague", when: "431 – 429 BC",
      blurb: "His war plan was to abandon the countryside, shelter behind the walls and let the fleet win slowly. It was correct and it was hated by the farmers watching their land burn. Then plague swept the crowded city, killed perhaps a third of it, and killed him — leaving Athens with his war and without his judgement.",
      stats: { power: 52, intellect: 88, influence: 88, creativity: 82, wealth: 70, fame: 90 } },
    gold: { label: "The Verdict", when: "Seen from 338 BC",
      blurb: "Thucydides called it democracy in name and rule by the first man in fact. What he built produced the Parthenon, the drama festivals and pay for the poor — and an empire that could not let anyone leave, a war it could not end, a democracy that executed Socrates, and a Greece so exhausted that Macedon walked into it. The app does not resolve that for you.",
      stats: { power: 52, intellect: 92, influence: 96, creativity: 86, wealth: 72, fame: 96 } },
  },
  claims: [
    { text: "Perikles introduced pay for jury service, enabling poor citizens to take part.", classification: "Established", sources: ["aristotle-ath", "plutarch"], date: "c. 450s BC", at: "bronze" },
    { text: "He carried the 451 BC law restricting citizenship to those with two Athenian parents.", classification: "Established", sources: ["aristotle-ath", "plutarch"], date: "451 BC", at: "bronze" },
    { text: "The Acropolis rebuilding was funded substantially from allied tribute, and was attacked politically at the time.", classification: "Probable", sources: ["plutarch", "cah"], date: "447 BC", at: "bronze" },
    { text: "He held the elected office of strategos, re-elected repeatedly; he held no extraordinary constitutional power.", classification: "Established", sources: ["thucydides"], date: "443 – 429 BC", at: "bronze" },
    { text: "He died in the epidemic of 429 BC.", classification: "Established", sources: ["thucydides"], date: "429 BC", at: "silver" },
    { text: "Thucydides' judgement — 'in name a democracy, in fact rule by the first man' — is an assessment, not a report.", classification: "Interpretation", sources: ["thucydides"], date: "c. 400 BC", at: "gold" },
  ],
  connections: [ { charId: "kleisthenes", relation: "inherited the constitution of" }, { charId: "thucydides", relation: "assessed by" }, { charId: "sokrates", relation: "contemporary" }, { name: "Parthenon", type: "place" }, { name: "Delian League", type: "concept" } ],
},

"thucydides": {
  id: "thucydides", name: "Thucydides", years: "c. 460 – c. 400 BC", sets: ["ancient-greece"],
  requires: { bronze: ["grk-pelop"], silver: ["grk-pelop", "grk-pericles", "grk-empire"] },
  tiers: {
    bronze: { label: "The Failed General", when: "424 BC",
      blurb: "Commanded an Athenian squadron, arrived too late to save Amphipolis, and was exiled for it. The exile gave him twenty years and access to both sides, and he spent them writing the war down. He caught the plague and survived, and described its symptoms so precisely that it could be recognised if it came again.",
      stats: { power: 40, intellect: 92, influence: 36, creativity: 80, wealth: 62, fame: 58 } },
    silver: { label: "A Possession for All Time", when: "c. 400 BC",
      blurb: "Stripped out the gods, the oracles and the marvels that fill Herodotus, and explained events by power, fear and interest instead. He said plainly that his speeches are reconstructions of what the occasion demanded — an admission no earlier writer made, and the reason he is trusted more and quoted more carefully. He left the history unfinished, mid-sentence, in 411 BC.",
      stats: { power: 40, intellect: 96, influence: 58, creativity: 84, wealth: 62, fame: 80 } },
  },
  claims: [
    { text: "Thucydides was exiled after failing to relieve Amphipolis in 424 BC.", classification: "Established", sources: ["thucydides"], date: "424 BC", at: "bronze" },
    { text: "He contracted the Athenian plague, recovered, and recorded its symptoms in clinical detail.", classification: "Established", sources: ["thucydides"], date: "430 BC", at: "bronze" },
    { text: "He stated that the speeches in his history render what the situation required, not verbatim record.", classification: "Established", sources: ["thucydides"], date: "c. 400 BC", at: "silver" },
    { text: "His 'truest cause' — Athenian growth and Spartan fear — is a structural argument, not a documented fact.", classification: "Interpretation", sources: ["thucydides"], date: "c. 400 BC", at: "silver" },
    { text: "The history breaks off mid-sentence in 411 BC; why is unresolved.", classification: "Unknown", sources: ["thucydides", "cah"], date: "c. 400 BC", at: "silver" },
  ],
  connections: [ { charId: "herodotos", relation: "answered" }, { charId: "perikles", relation: "recorded and judged" }, { name: "Amphipolis", type: "place" }, { name: "Peloponnesian War", type: "event" } ],
},

"sokrates": {
  id: "sokrates", name: "Socrates", years: "c. 470 – 399 BC", sets: ["ancient-greece"],
  requires: { bronze: ["grk-socrates"], silver: ["grk-socrates", "grk-pelop", "grk-pericles"] },
  tiers: {
    bronze: { label: "The Man Who Wrote Nothing", when: "399 BC",
      blurb: "Left not one written word. Everything about him arrives through pupils defending his memory and a comedian mocking him twenty-four years before the trial. Convicted of impiety and corrupting the young by a jury of 500, he proposed free meals at public expense as his sentence, declined an arranged escape, and drank the hemlock.",
      stats: { power: 34, intellect: 96, influence: 62, creativity: 90, wealth: 12, fame: 74 } },
    silver: { label: "The Uncomfortable Case", when: "Read against the war",
      blurb: "The charge was impiety; the timing was five years after defeat and a junta that killed 1,500 people, two of whose leading figures had been his associates. An amnesty barred prosecuting anyone for what they did under the Thirty, so impiety was what remained. A democracy killed a man for arguing — and gave him a public trial and a vote, which the junta had given nobody.",
      stats: { power: 34, intellect: 98, influence: 76, creativity: 92, wealth: 12, fame: 92 } },
  },
  claims: [
    { text: "Socrates wrote nothing; all accounts of him are by others.", classification: "Established", sources: ["plato", "xenophon"], date: "5th – 4th c. BC", at: "bronze" },
    { text: "He was tried in 399 BC for impiety and corrupting the young, convicted, and executed by hemlock.", classification: "Established", sources: ["plato", "xenophon"], date: "399 BC", at: "bronze" },
    { text: "Separating the historical Socrates from Plato's and Xenophon's portraits is unresolved — the 'Socratic problem'.", classification: "Contested", sources: ["plato", "xenophon", "cah"], date: "4th c. BC", at: "bronze" },
    { text: "Alcibiades and Critias, both associates, had respectively defected to Sparta and led the Thirty.", classification: "Established", sources: ["xenophon", "thucydides"], date: "415 – 404 BC", at: "silver" },
    { text: "That the trial was substantially political, with impiety the available charge under the amnesty, is a reading of the evidence.", classification: "Interpretation", sources: ["cah"], date: "399 BC", at: "silver" },
  ],
  connections: [ { charId: "perikles", relation: "contemporary" }, { charId: "thucydides", relation: "contemporary" }, { name: "Athens", type: "place" }, { name: "The Thirty Tyrants", type: "event" }, { name: "The Socratic problem", type: "concept" } ],
},

"leonidas": {
  id: "leonidas", name: "Leonidas", years: "d. 480 BC", sets: ["ancient-greece"],
  note: "Deliberately withheld from the Greece Set until the Greco-Persian Wars entry existed. His substance is a battle, and battles live in war entries — a card for him before that would have been a famous name with nothing behind it.",
  requires: { bronze: ["war-greco-persian", "grk-sparta"], silver: ["war-greco-persian", "grk-sparta", "per-west"] },
  tiers: {
    bronze: { label: "The Rearguard", when: "480 BC",
      blurb: "Held a defile between mountain and sea for two days against an army of a size nobody can agree on, then — once a mountain path had been betrayed and the position was lost — sent most of the allied army away and stayed with a rearguard to cover its withdrawal. The Thespians stayed too, in comparable numbers, and are almost never mentioned.",
      stats: { power: 82, intellect: 68, influence: 62, creativity: 58, wealth: 44, fame: 92 } },
    silver: { label: "What the Story Is For", when: "The afterlife",
      blurb: "No stand has been retold more or more usefully. The epitaph at the pass is real and restrained. Almost everything built on it since has not been: Göring invoked the three hundred by name to recast an army destroyed by its own command at Stalingrad as noble sacrifice. The battle was a defeat that bought a fleet time to fight at Salamis. That is a smaller and better claim than the one usually made for it.",
      stats: { power: 82, intellect: 70, influence: 74, creativity: 58, wealth: 44, fame: 98 } },
  },
  claims: [
    { text: "Leonidas commanded the Greek force holding the pass at Thermopylae in 480 BC and died there.", classification: "Established", sources: ["herodotus"], date: "480 BC", at: "bronze" },
    { text: "The position was turned by a mountain path shown to the Persians by a local man, Ephialtes.", classification: "Probable", sources: ["herodotus"], date: "480 BC", at: "bronze" },
    { text: "Roughly 700 Thespians and 400 Thebans remained with the Spartan rearguard.", classification: "Established", sources: ["herodotus"], date: "480 BC", at: "bronze" },
    { text: "Herodotus' figure of over a million Persians is impossible; modern estimates are a fraction of it.", classification: "Contested", sources: ["herodotus", "cah"], date: "480 BC", at: "bronze" },
    { text: "Göring publicly compared the encircled 6th Army at Stalingrad to Leonidas' three hundred.", classification: "Established", sources: ["cah"], date: "1943", at: "silver" },
  ],
  connections: [ { charId: "themistokles", relation: "fought the same war" }, { charId: "xerxes", relation: "opposed" }, { name: "Thermopylae", type: "place" }, { name: "Sparta", type: "place" } ],
},

"philip2": {
  id: "philip2", name: "Philip II of Macedon", years: "382 – 336 BC", sets: ["ancient-greece"],
  requires: { bronze: ["grk-philip"], silver: ["grk-philip", "grk-sparta", "grk-pelop"] },
  tiers: {
    bronze: { label: "The Hostage Who Watched", when: "359 BC",
      blurb: "Spent his youth as a hostage in Thebes learning how Epaminondas had beaten Sparta, then went home and built the army that answer implied: a longer pike, a deeper formation, and heavy cavalry to break what the infantry had pinned. He paid it all year, so it trained all year, while Greek citizen soldiers went home for the harvest.",
      stats: { power: 86, intellect: 88, influence: 82, creativity: 86, wealth: 78, fame: 70 } },
    silver: { label: "The End of the Free Polis", when: "338 BC",
      blurb: "Won more by marriage, money and patience than by battle, and when he finally fought at Chaeronea in 338 BC he ended Greek independence in an afternoon — his eighteen-year-old son commanding the wing that broke Thebes. The League of Corinth left the cities their laws and took their foreign policy. He was murdered two years later, with the Persian invasion still ahead of him.",
      stats: { power: 90, intellect: 90, influence: 90, creativity: 88, wealth: 82, fame: 84 } },
  },
  claims: [
    { text: "Philip spent years as a hostage in Thebes during its period of military dominance.", classification: "Established", sources: ["diodorus", "plutarch"], date: "368 – 365 BC", at: "bronze" },
    { text: "He rebuilt the Macedonian army around the sarissa phalanx and Companion cavalry, paid year-round.", classification: "Established", sources: ["diodorus", "cah"], date: "359 BC onwards", at: "bronze" },
    { text: "Demosthenes, our fullest source on Philip's methods, was an advocate arguing a case against him.", classification: "Established", sources: ["demosthenes"], date: "351 – 341 BC", at: "bronze" },
    { text: "At Chaeronea in 338 BC he destroyed a combined Athenian and Theban army; the Sacred Band died in place.", classification: "Established", sources: ["diodorus", "plutarch"], date: "338 BC", at: "silver" },
    { text: "Excavation at the Chaeronea lion monument uncovered 254 skeletons laid out in rows.", classification: "Established", sources: ["arch"], date: "1880", at: "silver" },
    { text: "Whether anyone stood behind Philip's assassin has been argued since antiquity.", classification: "Contested", sources: ["diodorus", "cah"], date: "336 BC", at: "silver" },
  ],
  connections: [ { charId: "alexander", relation: "father of" }, { charId: "sokrates", relation: "a generation after" }, { name: "Chaeronea", type: "place" }, { name: "League of Corinth", type: "event" }, { name: "Sarissa phalanx", type: "concept" } ],
},

});
