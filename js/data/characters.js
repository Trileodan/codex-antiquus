/* ---------------------------------------------------------------------
   CHARACTERS
   requires: which chapters must be COMPLETE (read + checkpoint passed)
   before a tier is minted. Cards are deliberately expensive: most need
   two or more chapters, and higher tiers often need another Set.
   --------------------------------------------------------------------- */

const CHARACTERS = {

"romulus-remus": {
  id: "romulus-remus", name: "Romulus & Remus", years: "Legendary · c. 771 – 717 BC", mythic: true,
  note: "A shared card. These are figures of tradition, not established history — the app flags them as such rather than quietly mixing myth into the record.",
  sets: ["roman-republic"],
  requires: { bronze: ["founding", "kings"] },
  tiers: { bronze: { label: "The Founding Twins", when: "Traditional, 753 BC",
    blurb: "Sons of Mars by tradition, raised by a she-wolf, and remembered for a founding act that was also a murder. Rome chose a war god for a father and a fratricide for a birth, and never seemed embarrassed by either.",
    stats: { power: 40, intellect: 25, influence: 62, creativity: 45, wealth: 10, fame: 30 } } },
  claims: [
    { text: "Romulus and Remus were suckled by a she-wolf after being exposed on the Tiber.", classification: "Traditional / Legendary", sources: ["livy"], date: "c. 771 BC", at: "bronze" },
    { text: "Romulus killed Remus in a dispute over the city's boundary.", classification: "Traditional / Legendary", sources: ["livy", "plutarch"], date: "c. 753 BC", at: "bronze" },
    { text: "The Palatine hill shows continuous settlement from around the 10th century BC, earlier than the traditional founding date.", classification: "Established", sources: ["arch", "cah"], date: "10th c. BC", at: "bronze" },
    { text: "The date of 753 BC was calculated by later Roman scholars, most influentially Varro.", classification: "Established", sources: ["cah"], date: "1st c. BC", at: "bronze" },
  ],
  connections: [ { charId: "tarquinius", relation: "first and last of the seven kings" }, { name: "Rome", type: "place" }, { name: "Founding of Rome", type: "event" }, { name: "Monarchy", type: "concept" } ],
},

"tarquinius": {
  id: "tarquinius", name: "Tarquin the Proud", years: "r. 535 – 509 BC", sets: ["roman-republic"],
  requires: { bronze: ["kings", "republic-born"] },
  tiers: { bronze: { label: "The Last King of Rome", when: "c. 510 BC",
    blurb: "Competent, ruthless and entirely uninterested in consultation. Tarquin built temples and expanded Rome's power while treating the throne as private property — and in doing so persuaded Rome that the office itself was the problem.",
    stats: { power: 78, intellect: 45, influence: 40, creativity: 38, wealth: 72, fame: 44 } } },
  claims: [
    { text: "Tarquinius Superbus was the seventh and last king of Rome, expelled in 509 BC.", classification: "Probable", sources: ["livy", "cah"], date: "509 BC", at: "bronze" },
    { text: "He seized the throne by arranging the murder of Servius Tullius.", classification: "Traditional / Legendary", sources: ["livy"], date: "c. 535 BC", at: "bronze" },
    { text: "The rape of Lucretia by his son Sextus triggered the revolt that ended the monarchy.", classification: "Traditional / Legendary", sources: ["livy"], date: "509 BC", at: "bronze" },
    { text: "The word rex remained politically toxic in Rome for the rest of the Republic.", classification: "Established", sources: ["cah"], date: "509 – 27 BC", at: "bronze" },
  ],
  connections: [ { charId: "l-brutus", relation: "overthrown by" }, { charId: "romulus-remus", relation: "last of the line they began" }, { name: "Expulsion of the Kings", type: "event" }, { name: "Roman Monarchy", type: "concept" } ],
},

"l-brutus": {
  id: "l-brutus", name: "Lucius Junius Brutus", years: "d. c. 509 BC", sets: ["roman-republic"],
  requires: { bronze: ["republic-born", "how-republic-worked"] },
  tiers: { bronze: { label: "Founder of the Republic", when: "509 BC",
    blurb: "Survived a tyrant by playing the fool, then led the revolt that ended the monarchy and served as one of Rome's first consuls. He condemned his own sons to death for plotting to restore the kings — the parable every later Roman reached for when loyalty to the state cost something.",
    stats: { power: 58, intellect: 60, influence: 70, creativity: 44, wealth: 40, fame: 46 } } },
  claims: [
    { text: "Brutus led the expulsion of the Tarquins and served as one of the first consuls in 509 BC.", classification: "Probable", sources: ["livy", "cah"], date: "509 BC", at: "bronze" },
    { text: "He feigned stupidity to survive Tarquin's reign — the origin of the name Brutus.", classification: "Traditional / Legendary", sources: ["livy"], date: "c. 510 BC", at: "bronze" },
    { text: "He condemned his own sons to death for conspiring to restore the monarchy.", classification: "Traditional / Legendary", sources: ["livy", "plutarch"], date: "509 BC", at: "bronze" },
  ],
  connections: [ { charId: "tarquinius", relation: "expelled" }, { charId: "m-brutus", relation: "claimed descendant, 465 years later" }, { name: "Consulship", type: "concept" }, { name: "Roman Senate", type: "org" } ],
},

"hamilcar": {
  id: "hamilcar", name: "Hamilcar Barca", years: "c. 275 – 228 BC", sets: ["roman-republic", "carthage"],
  requires: { bronze: ["punic-1", "punic-2"], silver: ["carth-truceless", "carth-spain"] },
  tiers: {
    bronze: { label: "Undefeated in Sicily", when: "241 BC",
      blurb: "Held out against Rome in Sicily for years without losing a battle, then watched his government surrender around him. The peace terms were, from where he stood, a political failure rather than a military one — and he never accepted them.",
      stats: { power: 55, intellect: 62, influence: 48, creativity: 66, wealth: 40, fame: 44 } },
    silver: { label: "Architect of the Barcid Empire", when: "c. 229 BC",
      blurb: "Crushed the mercenary revolt that nearly destroyed Carthage, then built a private empire in Spain out of silver mines and Iberian manpower — a war-making machine loyal to his family rather than to the council at home. He handed his son a strategy, not just a grudge.",
      stats: { power: 74, intellect: 68, influence: 60, creativity: 72, wealth: 78, fame: 55 } },
  },
  claims: [
    { text: "Hamilcar commanded Carthaginian forces in Sicily and was never defeated in a pitched battle there.", classification: "Probable", sources: ["polybius"], date: "247 – 241 BC", at: "bronze" },
    { text: "He suppressed the Mercenary War against Carthage's unpaid soldiers.", classification: "Established", sources: ["polybius"], date: "240 – 237 BC", at: "bronze" },
    { text: "He established Carthaginian territorial control in Iberia funded by silver mining.", classification: "Established", sources: ["polybius", "cah"], date: "237 – 228 BC", at: "silver" },
    { text: "He made the nine-year-old Hannibal swear at an altar never to be a friend to Rome.", classification: "Traditional / Legendary", sources: ["polybius"], date: "c. 237 BC", at: "silver" },
  ],
  connections: [ { charId: "hannibal", relation: "father of" }, { charId: "scipio", relation: "his son's eventual conqueror" }, { name: "Carthago Nova", type: "place" }, { name: "First Punic War", type: "event" }, { name: "Barcid family", type: "org" } ],
},

"hannibal": {
  id: "hannibal", name: "Hannibal Barca", years: "247 – c. 183 BC", sets: ["roman-republic", "carthage"],
  requires: { bronze: ["punic-2"], silver: ["war-punic-2"], gold: ["carth-spain", "carth-zama"] },
  tiers: {
    bronze: { label: "Across the Alps", when: "216 BC",
      blurb: "Took an army over the Alps in autumn, lost half of it, and then destroyed three Roman armies in under two years. Cannae is still taught as the perfect battle. He was about thirty, and Rome had no answer to him in the field for the next fifteen years.",
      stats: { power: 68, intellect: 92, influence: 62, creativity: 96, wealth: 45, fame: 82 } },
    silver: { label: "Fifteen Years in Italy", when: "202 BC",
      blurb: "Never beaten in Italy, and never able to win there either. Starved of reinforcement once Spain fell, recalled to defend a home he had not seen since childhood, he lost at Zama to a Roman who had studied him — the first and only defeat of his career.",
      stats: { power: 60, intellect: 94, influence: 58, creativity: 93, wealth: 38, fame: 88 } },
    gold: { label: "Suffete and Exile", when: "c. 183 BC",
      blurb: "The second act nobody expects: elected suffete, he reformed Carthage's corrupt finances so effectively that the city paid off its Roman indemnity early — and his domestic enemies reported him to Rome for it. He died by poison in exile in Bithynia rather than be handed over.",
      stats: { power: 34, intellect: 95, influence: 52, creativity: 90, wealth: 25, fame: 84 } },
  },
  claims: [
    { text: "Hannibal crossed the Alps with an army including war elephants in autumn 218 BC.", classification: "Established", sources: ["polybius", "livy"], date: "218 BC", at: "bronze" },
    { text: "At Cannae in 216 BC he destroyed a much larger Roman army by double envelopment.", classification: "Established", sources: ["polybius"], date: "216 BC", at: "bronze" },
    { text: "Ancient casualty figures for Cannae (50,000–70,000 Roman dead) are debated in detail but not in scale.", classification: "Contested", sources: ["polybius", "livy", "cah"], date: "216 BC", at: "bronze" },
    { text: "He was recalled to Africa in 203 BC and defeated by Scipio at Zama in 202 BC.", classification: "Established", sources: ["polybius"], date: "202 BC", at: "silver" },
    { text: "As suffete after the war he reformed Carthaginian public finances and broke the Council of 104's grip.", classification: "Established", sources: ["livy", "cah"], date: "196 BC", at: "gold" },
    { text: "He took poison at Libyssa in Bithynia rather than be surrendered to Rome.", classification: "Probable", sources: ["livy", "plutarch"], date: "c. 183 BC", at: "gold" },
  ],
  connections: [ { charId: "hamilcar", relation: "son of" }, { charId: "scipio", relation: "defeated by, at Zama" }, { name: "Cannae", type: "event" }, { name: "Zama", type: "event" }, { name: "Alps", type: "place" }, { name: "Carthage", type: "place" } ],
},

"scipio": {
  id: "scipio", name: "Scipio", goldName: "Scipio Africanus", years: "236 – 183 BC", sets: ["roman-republic", "carthage"],
  requires: { bronze: ["punic-2", "punic-3"], silver: ["carth-place", "carth-spain"], gold: ["carth-zama", "war-punic-2"] },
  tiers: {
    bronze: { label: "The Survivor of Cannae", when: "210 BC",
      blurb: "Survived Ticinus as a teenager and Cannae as a junior officer, lost his father and uncle to the Spanish front, and was handed the Spanish command at twenty-five largely because no senior man would take it.",
      stats: { power: 42, intellect: 74, influence: 45, creativity: 70, wealth: 40, fame: 30 } },
    silver: { label: "Victor of Zama", when: "202 BC",
      blurb: "Took Carthago Nova by wading a tidal lagoon, stripped Carthage of Spain, invaded Africa against Senate opposition, and turned Numidian cavalry against its former employer. At Zama he beat Hannibal using Hannibal's own logic — and ended the war.",
      stats: { power: 80, intellect: 84, influence: 76, creativity: 85, wealth: 66, fame: 84 } },
    gold: { label: "Africanus, and Ungrateful Rome", when: "c. 185 BC",
      blurb: "Rome's greatest living general, hounded through political trials over the accounts of a later war. He is said to have torn the ledgers up in front of the Senate and retired to Campania, asking that his bones not be buried in an ungrateful fatherland. He and Hannibal died within a couple of years of each other, both exiles from the cities they defined.",
      stats: { power: 46, intellect: 86, influence: 70, creativity: 82, wealth: 70, fame: 90 } },
  },
  claims: [
    { text: "Scipio captured Carthago Nova in 209 BC, seizing the Barcid treasury and hostages.", classification: "Established", sources: ["polybius", "livy"], date: "209 BC", at: "bronze" },
    { text: "He was given the Spanish command without having held a qualifying magistracy.", classification: "Established", sources: ["polybius", "cah"], date: "210 BC", at: "bronze" },
    { text: "At Zama he arranged his maniples in lanes so the elephant charge passed harmlessly through.", classification: "Established", sources: ["polybius"], date: "202 BC", at: "silver" },
    { text: "Masinissa's Numidian cavalry decided Zama by striking the Carthaginian rear.", classification: "Established", sources: ["polybius"], date: "202 BC", at: "silver" },
    { text: "He was prosecuted in Rome over the accounts of the Syrian war and retired to Liternum.", classification: "Established", sources: ["livy"], date: "c. 187 BC", at: "gold" },
    { text: "He asked that his body not be buried in Rome — 'ungrateful fatherland, you shall not have my bones'.", classification: "Traditional / Legendary", sources: ["livy"], date: "183 BC", at: "gold" },
  ],
  connections: [ { charId: "hannibal", relation: "defeated at Zama" }, { charId: "hamilcar", relation: "destroyed his family's Spanish empire" }, { name: "Zama", type: "event" }, { name: "Carthago Nova", type: "place" }, { name: "Numidia", type: "place" } ],
},

"tiberius-gracchus": {
  id: "tiberius-gracchus", name: "Tiberius Gracchus", years: "163 – 133 BC", sets: ["roman-republic"],
  requires: { bronze: ["gracchi"] },
  tiers: { bronze: { label: "The Tribune Who Was Killed", when: "133 BC",
    blurb: "Proposed a legal, moderate land redistribution and pushed it through by methods that terrified the Senate: deposing a vetoing tribune, bypassing senatorial control of foreign money, standing for immediate re-election. He was beaten to death in the Forum by senators — the first political killing in Rome for centuries, and the template for every one after it.",
    stats: { power: 40, intellect: 66, influence: 74, creativity: 58, wealth: 52, fame: 55 } } },
  claims: [
    { text: "Tiberius Gracchus proposed enforcing limits on public land holdings and redistributing the surplus.", classification: "Established", sources: ["appian", "plutarch"], date: "133 BC", at: "bronze" },
    { text: "He had a fellow tribune deposed by the assembly for vetoing his bill — an unprecedented act.", classification: "Established", sources: ["plutarch", "cah"], date: "133 BC", at: "bronze" },
    { text: "He was killed by a group of senators led by Scipio Nasica, along with around 300 supporters.", classification: "Established", sources: ["appian", "plutarch"], date: "133 BC", at: "bronze" },
    { text: "Whether he intended a genuine bid for permanent personal power is disputed.", classification: "Contested", sources: ["cah"], date: "133 BC", at: "bronze" },
  ],
  connections: [ { charId: "marius", relation: "inherited the land and recruitment crisis" }, { name: "Land reform", type: "concept" }, { name: "Tribune of the plebs", type: "concept" }, { name: "Roman Forum", type: "place" } ],
},

"marius": {
  id: "marius", name: "Gaius Marius", years: "157 – 86 BC", sets: ["roman-republic"],
  requires: { bronze: ["marius-sulla"] },
  tiers: { bronze: { label: "Seven Times Consul", when: "c. 100 BC",
    blurb: "A new man from Arpinum who saved Italy from the Cimbri and Teutones and held seven consulships in defiance of constitutional custom. His recruitment of landless citizens solved a manpower crisis and created a worse one: armies whose loyalty ran to their general. Everything that follows in this Set runs through that decision.",
    stats: { power: 76, intellect: 62, influence: 72, creativity: 74, wealth: 55, fame: 78 } } },
  claims: [
    { text: "Marius held seven consulships, including five consecutively, against constitutional custom.", classification: "Established", sources: ["plutarch", "cah"], date: "107 – 86 BC", at: "bronze" },
    { text: "He destroyed the Cimbri and Teutones at Aquae Sextiae and Vercellae.", classification: "Established", sources: ["plutarch"], date: "102 – 101 BC", at: "bronze" },
    { text: "He opened army recruitment to citizens without property, equipping them at state expense.", classification: "Established", sources: ["cah"], date: "107 BC", at: "bronze" },
    { text: "How far the reform was a single deliberate act rather than an acceleration of existing practice is debated.", classification: "Contested", sources: ["cah"], date: "107 BC", at: "bronze" },
  ],
  connections: [ { charId: "sulla", relation: "subordinate, then mortal enemy" }, { charId: "caesar", relation: "husband of Caesar's aunt Julia" }, { name: "Marian reforms", type: "concept" }, { name: "Jugurthine War", type: "event" } ],
},

"sulla": {
  id: "sulla", name: "Sulla", years: "138 – 78 BC", sets: ["roman-republic"],
  requires: { bronze: ["marius-sulla"], silver: ["caesar-rise"] },
  tiers: {
    bronze: { label: "The First March on Rome", when: "88 BC",
      blurb: "A patrician who rose under Marius and came to loathe him. When a popular vote transferred his eastern command, he did the unthinkable and led his legions into Rome itself. No Roman had ever done it. Everyone noticed it could be done.",
      stats: { power: 82, intellect: 70, influence: 60, creativity: 68, wealth: 58, fame: 72 } },
    silver: { label: "Dictator, and the Man Who Walked Away", when: "80 BC",
      blurb: "Took an open-ended dictatorship, published proscription lists that killed thousands and enriched his friends, rewrote the constitution to entrench the Senate — and then resigned and retired to private life. He proved Rome could be seized by force and that the man who did it need not be punished. Caesar, whom he nearly killed, drew a different lesson from the resignation.",
      stats: { power: 96, intellect: 74, influence: 70, creativity: 66, wealth: 84, fame: 86 } },
  },
  claims: [
    { text: "In 88 BC Sulla became the first Roman commander to march an army on Rome.", classification: "Established", sources: ["appian", "plutarch"], date: "88 BC", at: "bronze" },
    { text: "He was appointed dictator without the traditional six-month limit.", classification: "Established", sources: ["appian", "cah"], date: "82 BC", at: "silver" },
    { text: "His proscriptions published lists of citizens who could be killed for a bounty, with property confiscated.", classification: "Established", sources: ["appian", "plutarch"], date: "82 – 81 BC", at: "silver" },
    { text: "He resigned the dictatorship voluntarily and retired to private life.", classification: "Established", sources: ["appian", "plutarch"], date: "79 BC", at: "silver" },
    { text: "He spared the young Caesar reluctantly, reportedly warning of many Mariuses in him.", classification: "Traditional / Legendary", sources: ["suetonius", "plutarch"], date: "c. 81 BC", at: "silver" },
  ],
  connections: [ { charId: "marius", relation: "rival and enemy" }, { charId: "caesar", relation: "nearly had him killed" }, { charId: "pompey", relation: "his young lieutenant" }, { charId: "crassus", relation: "enriched by his proscriptions" }, { name: "Proscriptions", type: "concept" }, { name: "Dictatorship", type: "concept" } ],
},

"spartacus": {
  id: "spartacus", name: "Spartacus", years: "d. 71 BC", sets: ["roman-republic"],
  requires: { bronze: ["spartacus-pompey"] },
  tiers: { bronze: { label: "Leader of the Revolt", when: "73 – 71 BC",
    blurb: "A Thracian gladiator who broke out of a school at Capua with about seventy men and built an army that beat both consuls in a single year. He owned nothing, commanded no state and left no writing — and Rome still needed its richest man and eight legions to put him down.",
    stats: { power: 44, intellect: 55, influence: 68, creativity: 62, wealth: 3, fame: 52 } } },
  claims: [
    { text: "Spartacus led an escape from a gladiator school at Capua in 73 BC that grew into a major revolt.", classification: "Established", sources: ["appian", "plutarch"], date: "73 BC", at: "bronze" },
    { text: "The rebel army defeated several Roman forces, including both consuls in 72 BC.", classification: "Established", sources: ["appian"], date: "72 BC", at: "bronze" },
    { text: "Around 6,000 captured rebels were crucified along the Appian Way.", classification: "Established", sources: ["appian"], date: "71 BC", at: "bronze" },
    { text: "Spartacus's fate at the final battle is uncertain; his body was never identified.", classification: "Unknown", sources: ["appian", "plutarch"], date: "71 BC", at: "bronze" },
    { text: "His strategic aim — escape from Italy or confrontation with Rome — is disputed.", classification: "Contested", sources: ["cah"], date: "72 BC", at: "bronze" },
  ],
  connections: [ { charId: "crassus", relation: "defeated by" }, { charId: "pompey", relation: "credit claimed by" }, { name: "Capua", type: "place" }, { name: "Slavery in Rome", type: "concept" } ],
},

"pompey": {
  id: "pompey", name: "Pompey the Great", years: "106 – 48 BC", sets: ["roman-republic"],
  requires: { bronze: ["spartacus-pompey"], silver: ["rubicon"] },
  tiers: {
    bronze: { label: "Magnus", when: "62 BC",
      blurb: "Called 'the Great' before he had earned it, and then earned it anyway. He cleared the Mediterranean of pirates in about three months, finished Mithridates, annexed Syria and reorganised the entire East on his own authority — then came home, disbanded his army, and was refused land for his veterans.",
      stats: { power: 84, intellect: 62, influence: 78, creativity: 55, wealth: 88, fame: 90 } },
    silver: { label: "Defender of the Republic", when: "48 BC",
      blurb: "Ended up as the Senate's champion largely because Caesar was the alternative. He abandoned Italy to rebuild in the East — militarily sound, politically ruinous — beat Caesar at Dyrrhachium and let him escape, then lost everything at Pharsalus. He was murdered on an Egyptian beach by men hoping to please the winner.",
      stats: { power: 70, intellect: 58, influence: 62, creativity: 48, wealth: 80, fame: 92 } },
  },
  claims: [
    { text: "The lex Gabinia of 67 BC gave Pompey extraordinary command against the pirates across the Mediterranean.", classification: "Established", sources: ["plutarch", "dio"], date: "67 BC", at: "bronze" },
    { text: "He reorganised the eastern provinces and roughly doubled Rome's revenues.", classification: "Established", sources: ["plutarch", "cah"], date: "66 – 62 BC", at: "bronze" },
    { text: "He disbanded his army on returning to Italy in 62 BC.", classification: "Established", sources: ["plutarch"], date: "62 BC", at: "bronze" },
    { text: "He married Caesar's daughter Julia to seal the triumviral alliance.", classification: "Established", sources: ["plutarch", "suetonius"], date: "59 BC", at: "silver" },
    { text: "He was murdered on landing in Egypt on the orders of Ptolemy XIII's court.", classification: "Established", sources: ["plutarch", "appian"], date: "48 BC", at: "silver" },
  ],
  connections: [ { charId: "caesar", relation: "ally, son-in-law, then enemy" }, { charId: "crassus", relation: "rival, then co-triumvir" }, { charId: "sulla", relation: "served under" }, { charId: "cato", relation: "reluctant senatorial ally" }, { charId: "ptolemy13", relation: "murdered on his court's orders" }, { name: "Pharsalus", type: "event" }, { name: "Alexandria", type: "place" } ],
},

"crassus": {
  id: "crassus", name: "Crassus", years: "115 – 53 BC", sets: ["roman-republic"],
  requires: { bronze: ["spartacus-pompey", "triumvirate"], silver: ["gaul"] },
  tiers: {
    bronze: { label: "The Richest Man in Rome", when: "60 BC",
      blurb: "Made a fortune from Sulla's proscriptions and property speculation, including a private fire brigade that negotiated a sale price before extinguishing the blaze. He bought influence comprehensively — Caesar's debts among his assets — and never stopped resenting that money could not buy military reputation.",
      stats: { power: 66, intellect: 58, influence: 62, creativity: 30, wealth: 99, fame: 54 } },
    silver: { label: "Carrhae", when: "53 BC",
      blurb: "At sixty, with a fortune and no glory, he took Syria and invaded Parthia to match Pompey and Caesar. At Carrhae his legions were shot to pieces by horse archers they could not reach. Seven legions were wrecked, the eagles taken, and Crassus killed. His death removed the last counterweight between Caesar and Pompey.",
      stats: { power: 60, intellect: 50, influence: 50, creativity: 25, wealth: 97, fame: 62 } },
  },
  claims: [
    { text: "Crassus's fortune derived substantially from property bought cheaply during Sulla's proscriptions.", classification: "Established", sources: ["plutarch"], date: "82 – 80 BC", at: "bronze" },
    { text: "He ran a private fire brigade that purchased burning properties at reduced prices.", classification: "Probable", sources: ["plutarch"], date: "various", at: "bronze" },
    { text: "He defeated the main army of Spartacus's revolt in 71 BC.", classification: "Established", sources: ["appian", "plutarch"], date: "71 BC", at: "bronze" },
    { text: "He guaranteed Caesar's debts, enabling Caesar's political career.", classification: "Established", sources: ["plutarch", "suetonius"], date: "62 BC", at: "bronze" },
    { text: "He was killed after the destruction of his army at Carrhae by Parthian forces.", classification: "Established", sources: ["plutarch", "dio"], date: "53 BC", at: "silver" },
  ],
  connections: [ { charId: "caesar", relation: "creditor and co-triumvir" }, { charId: "pompey", relation: "rival and co-triumvir" }, { charId: "spartacus", relation: "defeated" }, { charId: "sulla", relation: "enriched by his proscriptions" }, { name: "Carrhae", type: "event" }, { name: "Parthia", type: "place" } ],
},

"cicero": {
  id: "cicero", name: "Cicero", years: "106 – 43 BC", sets: ["roman-republic"],
  requires: { bronze: ["caesar-rise"], silver: ["antony-octavian"] },
  tiers: {
    bronze: { label: "Consul and New Man", when: "63 BC",
      blurb: "A provincial with no consular ancestors who reached the consulship purely on the strength of his voice, and then exposed the Catiline conspiracy from it. He executed the conspirators without trial — a shortcut that made him briefly the saviour of the Republic and permanently vulnerable.",
      stats: { power: 52, intellect: 95, influence: 82, creativity: 78, wealth: 52, fame: 70 } },
    silver: { label: "The Last Republican", when: "43 BC",
      blurb: "Exiled, recalled, sidelined by the triumvirs, he returned after Caesar's murder to attack Antony in the Philippics — the finest and most reckless speeches of his life. He backed Octavian as a usable boy and was proscribed for it. His head and his writing hand were nailed to the Rostra where he had spoken.",
      stats: { power: 34, intellect: 96, influence: 76, creativity: 88, wealth: 46, fame: 84 } },
  },
  claims: [
    { text: "Cicero reached the consulship in 63 BC as a novus homo with no consular ancestors.", classification: "Established", sources: ["cicero", "cah"], date: "63 BC", at: "bronze" },
    { text: "He exposed the Catiline conspiracy and had the conspirators executed without trial.", classification: "Established", sources: ["cicero", "plutarch"], date: "63 BC", at: "bronze" },
    { text: "He was exiled in 58 BC over those executions and recalled the following year.", classification: "Established", sources: ["plutarch", "cicero"], date: "58 BC", at: "bronze" },
    { text: "He advised that the young Octavian be praised, honoured, and disposed of.", classification: "Probable", sources: ["cicero", "cah"], date: "43 BC", at: "silver" },
    { text: "He was proscribed by the Second Triumvirate, killed, and displayed on the Rostra.", classification: "Established", sources: ["appian", "plutarch"], date: "43 BC", at: "silver" },
  ],
  connections: [ { charId: "caesar", relation: "political opponent, personally respected" }, { charId: "cato", relation: "constitutional ally" }, { charId: "antony", relation: "attacked in the Philippics; proscribed by" }, { charId: "octavian", relation: "backed, then abandoned by" }, { name: "Catiline conspiracy", type: "event" }, { name: "Roman Senate", type: "org" } ],
},

"cato": {
  id: "cato", name: "Cato the Younger", years: "95 – 46 BC", sets: ["roman-republic"],
  requires: { bronze: ["caesar-rise"], silver: ["dictator"] },
  tiers: {
    bronze: { label: "The Immovable Stoic", when: "63 BC",
      blurb: "Famously incorruptible and famously impossible. He carried the Senate for executing the Catilinarians, filibustered anything he considered improper, and treated compromise as a form of corruption. His obstruction was principled — and helped drive Pompey, Crassus and Caesar into the alliance that destroyed the Senate's authority.",
      stats: { power: 44, intellect: 72, influence: 66, creativity: 22, wealth: 48, fame: 50 } },
    silver: { label: "Utica", when: "46 BC",
      blurb: "Fought Caesar to the last army in Africa. Besieged at Utica, he arranged his friends' escape, spent the night reading Plato on the immortality of the soul, and killed himself rather than accept a pardon. It was a precise attack on Caesar's most effective weapon: clemency needs someone willing to be forgiven.",
      stats: { power: 36, intellect: 76, influence: 78, creativity: 30, wealth: 44, fame: 74 } },
  },
  claims: [
    { text: "Cato argued successfully in the Senate for the execution of the Catilinarian conspirators.", classification: "Established", sources: ["plutarch", "cah"], date: "63 BC", at: "bronze" },
    { text: "He used procedural obstruction, including filibuster, against the triumvirs' measures.", classification: "Established", sources: ["plutarch", "dio"], date: "60 – 59 BC", at: "bronze" },
    { text: "He was sent to annex Cyprus in a commission designed to remove him from Rome.", classification: "Probable", sources: ["plutarch"], date: "58 BC", at: "bronze" },
    { text: "He killed himself at Utica rather than accept a pardon from Caesar.", classification: "Established", sources: ["plutarch", "appian"], date: "46 BC", at: "silver" },
  ],
  connections: [ { charId: "caesar", relation: "lifelong opponent" }, { charId: "cicero", relation: "constitutional ally" }, { charId: "pompey", relation: "reluctant ally against Caesar" }, { charId: "m-brutus", relation: "uncle and father-in-law of" }, { name: "Stoicism", type: "concept" }, { name: "Utica", type: "place" } ],
},

"caesar": {
  id: "caesar", name: "Julius Caesar", years: "100 – 44 BC", sets: ["roman-republic", "ptolemaic-egypt"],
  requires: { bronze: ["caesar-rise", "triumvirate"], silver: ["gaul"], gold: ["rubicon", "dictator"] },
  tiers: {
    bronze: { label: "Politician on Credit", when: "62 BC",
      blurb: "Patrician blood, no fortune, and debts large enough to be a matter of state. He refused Sulla's order to divorce his wife at eighteen and survived it, raised his own ransom from pirates and crucified them, and bought Rome's chief priesthood with borrowed money. Everything he had at this point was promise and nerve.",
      stats: { power: 34, intellect: 82, influence: 48, creativity: 70, wealth: 12, fame: 30 } },
    silver: { label: "Conqueror of Gaul", when: "50 BC",
      blurb: "Eight years turned a debt-ridden politician into the commander of ten veteran legions and one of the richest men alive. He crossed the Rhine, crossed to Britain, took Alesia against a relief army twice his size, and wrote it all up himself in prose so clear it is still how Rome remembers it.",
      stats: { power: 80, intellect: 90, influence: 78, creativity: 88, wealth: 82, fame: 84 } },
    gold: { label: "Dictator Perpetuo", when: "44 BC",
      blurb: "Won the civil war, pardoned his enemies, and held more personal power than any Roman before him: dictator for life, calendar-maker, Senate-filler, coin-portrait. He solved the Republic's practical problems and could not solve its constitutional one. Sixty senators killed him at the foot of Pompey's statue.",
      stats: { power: 99, intellect: 92, influence: 95, creativity: 86, wealth: 90, fame: 97 } },
  },
  claims: [
    { text: "Caesar refused Sulla's order to divorce Cornelia and went into hiding.", classification: "Probable", sources: ["suetonius", "plutarch"], date: "c. 81 BC", at: "bronze" },
    { text: "Captured by pirates, he raised his ransom, returned with a fleet and crucified them.", classification: "Probable", sources: ["plutarch", "suetonius"], date: "c. 75 BC", at: "bronze" },
    { text: "He was elected Pontifex Maximus in 63 BC, funded by extensive borrowing and bribery.", classification: "Established", sources: ["suetonius", "plutarch"], date: "63 BC", at: "bronze" },
    { text: "He conquered Gaul between 58 and 50 BC with very heavy Gallic loss of life and enslavement.", classification: "Established", sources: ["caesar", "cah"], date: "58 – 50 BC", at: "silver" },
    { text: "Ancient totals of a million Gallic dead and a million enslaved are inflated but indicate enormous scale.", classification: "Contested", sources: ["plutarch", "cah"], date: "58 – 50 BC", at: "silver" },
    { text: "He crossed the Rubicon under arms on 10 January 49 BC, beginning the civil war.", classification: "Established", sources: ["suetonius", "appian"], date: "49 BC", at: "gold" },
    { text: "The line 'the die is cast' is reported only by later biographers.", classification: "Traditional / Legendary", sources: ["suetonius", "plutarch"], date: "49 BC", at: "gold" },
    { text: "He introduced the Julian calendar of 365¼ days in 46 BC.", classification: "Established", sources: ["suetonius", "cah"], date: "46 BC", at: "gold" },
    { text: "Whether he intended to take the title of king is genuinely disputed.", classification: "Contested", sources: ["suetonius", "dio", "cah"], date: "44 BC", at: "gold" },
    { text: "He was assassinated on 15 March 44 BC by around 60 senators, dying at the foot of Pompey's statue.", classification: "Established", sources: ["suetonius", "appian", "plutarch"], date: "44 BC", at: "gold" },
  ],
  connections: [ { charId: "pompey", relation: "co-triumvir, son-in-law, enemy" }, { charId: "crassus", relation: "creditor and co-triumvir" }, { charId: "cato", relation: "lifelong opponent" }, { charId: "cicero", relation: "opponent, later reconciled" }, { charId: "cleopatra", relation: "restored her throne; father of Caesarion" }, { charId: "vercingetorix", relation: "defeated at Alesia" }, { charId: "m-brutus", relation: "pardoned by, then assassinated by" }, { charId: "antony", relation: "lieutenant and co-consul" }, { charId: "octavian", relation: "great-uncle and adoptive father" }, { charId: "marius", relation: "married to his aunt Julia" }, { name: "Rubicon", type: "event" }, { name: "Alesia", type: "event" }, { name: "Pharsalus", type: "event" }, { name: "Ides of March", type: "event" }, { name: "Gaul", type: "place" }, { name: "Dictatorship", type: "concept" } ],
},

"vercingetorix": {
  id: "vercingetorix", name: "Vercingetorix", years: "c. 82 – 46 BC", sets: ["roman-republic"],
  requires: { bronze: ["gaul"] },
  tiers: { bronze: { label: "The Gaul Who United Gaul", when: "52 BC",
    blurb: "The only man to unite the Gallic tribes against Rome, and the only one who correctly identified Caesar's weakness as supply rather than tactics. His scorched-earth campaign nearly worked. Cornered at Alesia, he surrendered to save his people, was held for six years, paraded in Caesar's triumph and executed.",
    stats: { power: 58, intellect: 72, influence: 76, creativity: 74, wealth: 30, fame: 48 } } },
  claims: [
    { text: "Vercingetorix united a broad coalition of Gallic tribes against Rome in 52 BC.", classification: "Established", sources: ["caesar"], date: "52 BC", at: "bronze" },
    { text: "He adopted a scorched-earth strategy to deny Caesar supply.", classification: "Established", sources: ["caesar"], date: "52 BC", at: "bronze" },
    { text: "He surrendered at Alesia after Caesar's double siege lines held against a relief army.", classification: "Established", sources: ["caesar", "dio"], date: "52 BC", at: "bronze" },
    { text: "Our knowledge of him comes almost entirely from Caesar, who had reasons to magnify him.", classification: "Interpretation", sources: ["cah"], date: "52 BC", at: "bronze" },
  ],
  connections: [ { charId: "caesar", relation: "defeated by" }, { name: "Alesia", type: "event" }, { name: "Gaul", type: "place" }, { name: "Arverni", type: "org" } ],
},

"cleopatra": {
  id: "cleopatra", name: "Cleopatra", years: "69 – 30 BC", sets: ["roman-republic", "ptolemaic-egypt"],
  requires: { bronze: ["egypt"], silver: ["egy-ptolemy1", "egy-cleopatra-caesar"], gold: ["egy-end", "war-actium"] },
  tiers: {
    bronze: { label: "A Throne in Dispute", when: "48 BC",
      blurb: "Twenty-one, co-ruler with a brother trying to kill her, and losing a civil war outside her own capital. She got herself smuggled past his guards to reach Caesar first, because she understood that Egypt's throne would be decided by one Roman and she needed to be in the room.",
      stats: { power: 42, intellect: 74, influence: 46, creativity: 62, wealth: 68, fame: 32 } },
    silver: { label: "Queen of Egypt", when: "34 BC",
      blurb: "Two decades of actual government: famine relief from royal stores, currency devaluation, tight control of the grain, oil and papyrus monopolies. Reportedly the first Ptolemy to learn Egyptian, and careful to present herself as Isis to her Egyptian subjects. The wealth she managed is why Roman warlords kept arriving.",
      stats: { power: 78, intellect: 84, influence: 76, creativity: 70, wealth: 95, fame: 68 } },
    gold: { label: "The Last Pharaoh", when: "30 BC",
      blurb: "Converted two Roman civil wars into Egyptian territory, and then lost everything at Actium. She died at 39 rather than be paraded through Rome — the asp is a story, poison equally likely. Her son Caesarion was hunted down and killed, ending three centuries of Ptolemies and, effectively, three thousand years of pharaohs.",
      stats: { power: 52, intellect: 86, influence: 82, creativity: 74, wealth: 70, fame: 88 } },
  },
  claims: [
    { text: "Cleopatra was co-ruler with Ptolemy XIII and in civil war with him when Caesar arrived in 48 BC.", classification: "Established", sources: ["dio", "cah"], date: "48 BC", at: "bronze" },
    { text: "She was smuggled into the palace to reach Caesar directly.", classification: "Probable", sources: ["plutarch"], date: "48 BC", at: "bronze" },
    { text: "The detail that she was carried in rolled bedding — and later, a carpet — is embellishment.", classification: "Traditional / Legendary", sources: ["plutarch"], date: "48 BC", at: "bronze" },
    { text: "She bore a son, Caesarion, whom she publicly claimed was Caesar's.", classification: "Probable", sources: ["plutarch", "dio"], date: "47 BC", at: "bronze" },
    { text: "Plutarch reports she learned Egyptian and spoke numerous languages without interpreters.", classification: "Probable", sources: ["plutarch"], date: "various", at: "silver" },
    { text: "Plutarch states her beauty was not in itself incomparable, emphasising her presence and intelligence.", classification: "Established", sources: ["plutarch"], date: "1st c. AD", at: "silver" },
    { text: "She devalued the bronze coinage and managed grain distribution during famine.", classification: "Established", sources: ["arch", "cah"], date: "40s BC", at: "silver" },
    { text: "The Donations of Alexandria granted Roman-claimed eastern territories to her children.", classification: "Established", sources: ["dio", "plutarch"], date: "34 BC", at: "gold" },
    { text: "She died by suicide in 30 BC; death by asp bite is the traditional account.", classification: "Traditional / Legendary", sources: ["plutarch", "dio"], date: "30 BC", at: "gold" },
    { text: "Her posthumous image as a seductress derives substantially from Octavian's wartime propaganda.", classification: "Interpretation", sources: ["cah"], date: "30s BC onward", at: "gold" },
  ],
  connections: [ { charId: "caesar", relation: "restored her throne; father of Caesarion" }, { charId: "antony", relation: "political and personal alliance" }, { charId: "ptolemy13", relation: "brother, co-ruler, rival" }, { charId: "octavian", relation: "defeated by, at Actium" }, { name: "Alexandria", type: "place" }, { name: "Actium", type: "event" }, { name: "Isis", type: "concept" }, { name: "Ptolemaic monarchy", type: "concept" } ],
},

"ptolemy13": {
  id: "ptolemy13", name: "Ptolemy XIII", years: "62 – 47 BC", sets: ["ptolemaic-egypt"],
  requires: { bronze: ["egy-cleopatra-caesar"] },
  tiers: { bronze: { label: "The Boy King", when: "48 BC",
    blurb: "Barely a teenager, ruling through advisors who made the single worst diplomatic decision of the century: murdering Pompey on a beach to please Caesar. Caesar was appalled, backed his sister instead, and Ptolemy drowned in the Nile fleeing the war that followed.",
    stats: { power: 44, intellect: 28, influence: 30, creativity: 12, wealth: 74, fame: 26 } } },
  claims: [
    { text: "Ptolemy XIII ruled jointly with his sister Cleopatra VII under the will of Ptolemy XII.", classification: "Established", sources: ["dio", "cah"], date: "51 BC", at: "bronze" },
    { text: "His court ordered the killing of Pompey to gain Caesar's favour.", classification: "Established", sources: ["plutarch", "dio"], date: "48 BC", at: "bronze" },
    { text: "He drowned in the Nile while fleeing defeat in the Alexandrian War.", classification: "Probable", sources: ["dio"], date: "47 BC", at: "bronze" },
  ],
  connections: [ { charId: "cleopatra", relation: "sister, co-ruler, rival" }, { charId: "pompey", relation: "ordered his murder" }, { charId: "caesar", relation: "opposed in the Alexandrian War" }, { name: "Alexandria", type: "place" }, { name: "Ptolemaic monarchy", type: "concept" } ],
},

"m-brutus": {
  id: "m-brutus", name: "Marcus Junius Brutus", years: "85 – 42 BC", sets: ["roman-republic"],
  requires: { bronze: ["dictator"], silver: ["antony-octavian"] },
  tiers: {
    bronze: { label: "The Reluctant Assassin", when: "44 BC",
      blurb: "Nephew and son-in-law of Cato, and a claimed descendant of the Brutus who expelled the kings — an ancestry his allies used relentlessly against him. Caesar had pardoned him after Pharsalus and promoted him since. He killed him anyway, believing tyrannicide was a family obligation.",
      stats: { power: 40, intellect: 74, influence: 52, creativity: 34, wealth: 58, fame: 40 } },
    silver: { label: "Philippi", when: "42 BC",
      blurb: "Discovered that killing a tyrant does not restore a republic. He raised armies in the East by methods — extortion, ruinous lending — that sat badly with his own philosophy, won his half of the field at Philippi, lost the second engagement three weeks later, and killed himself. The Republican cause died with him.",
      stats: { power: 56, intellect: 76, influence: 58, creativity: 38, wealth: 62, fame: 66 } },
  },
  claims: [
    { text: "Brutus was a principal leader of the conspiracy that assassinated Caesar.", classification: "Established", sources: ["appian", "suetonius", "plutarch"], date: "44 BC", at: "bronze" },
    { text: "Caesar had pardoned him after Pharsalus and advanced his career afterwards.", classification: "Established", sources: ["plutarch"], date: "48 – 44 BC", at: "bronze" },
    { text: "Caesar's reported last words to him, 'you too, child?', are recorded only as rumour by Suetonius.", classification: "Traditional / Legendary", sources: ["suetonius"], date: "44 BC", at: "bronze" },
    { text: "He and Cassius were defeated at Philippi in 42 BC, and both died by suicide.", classification: "Established", sources: ["appian", "plutarch"], date: "42 BC", at: "silver" },
  ],
  connections: [ { charId: "caesar", relation: "pardoned by, then assassinated" }, { charId: "cato", relation: "nephew and son-in-law of" }, { charId: "l-brutus", relation: "claimed descent from" }, { charId: "antony", relation: "defeated by at Philippi" }, { charId: "octavian", relation: "defeated by at Philippi" }, { name: "Ides of March", type: "event" }, { name: "Philippi", type: "event" }, { name: "Tyrannicide", type: "concept" } ],
},

"antony": {
  id: "antony", name: "Mark Antony", years: "83 – 30 BC", sets: ["roman-republic", "ptolemaic-egypt"],
  requires: { bronze: ["dictator", "antony-octavian"], silver: ["actium"] },
  tiers: {
    bronze: { label: "Caesar's Lieutenant", when: "44 BC",
      blurb: "A capable soldier, a heavy drinker and a natural performer. After the Ides of March he secured Caesar's papers and treasury, negotiated an amnesty, and then delivered a funeral oration with the will and the bloodied toga that turned the city into a mob. He took Rome without a battle.",
      stats: { power: 68, intellect: 56, influence: 80, creativity: 62, wealth: 60, fame: 66 } },
    silver: { label: "Antony and Cleopatra", when: "31 BC",
      blurb: "Master of the Roman East, undone by a decade of being out-manoeuvred at home. A failed Parthian campaign, an abandoned Roman wife, and the Donations of Alexandria gave Octavian everything he needed. At Actium he followed Cleopatra's squadron out of the battle and left his fleet behind.",
      stats: { power: 62, intellect: 52, influence: 58, creativity: 55, wealth: 72, fame: 82 } },
  },
  claims: [
    { text: "Antony delivered the funeral oration that turned Roman opinion against the conspirators.", classification: "Established", sources: ["appian", "plutarch"], date: "44 BC", at: "bronze" },
    { text: "He was a member of the legally constituted Second Triumvirate with Octavian and Lepidus.", classification: "Established", sources: ["appian", "dio"], date: "43 BC", at: "bronze" },
    { text: "Cicero was killed under proscriptions Antony demanded.", classification: "Established", sources: ["appian", "plutarch"], date: "43 BC", at: "bronze" },
    { text: "His Parthian campaign of 36 BC failed with very heavy losses.", classification: "Established", sources: ["plutarch", "dio"], date: "36 BC", at: "silver" },
    { text: "His will, read publicly by Octavian, may have been doctored or illegitimately obtained.", classification: "Contested", sources: ["dio", "cah"], date: "32 BC", at: "silver" },
    { text: "He killed himself at Alexandria in 30 BC on a false report of Cleopatra's death.", classification: "Probable", sources: ["plutarch", "dio"], date: "30 BC", at: "silver" },
  ],
  connections: [ { charId: "caesar", relation: "lieutenant and co-consul" }, { charId: "cleopatra", relation: "political and personal alliance" }, { charId: "octavian", relation: "co-triumvir, then enemy" }, { charId: "cicero", relation: "attacked by, then proscribed him" }, { charId: "m-brutus", relation: "defeated at Philippi" }, { name: "Actium", type: "event" }, { name: "Philippi", type: "event" }, { name: "Alexandria", type: "place" } ],
},

"octavian": {
  id: "octavian", name: "Octavian", goldName: "Augustus", years: "63 BC – AD 14", sets: ["roman-republic"],
  requires: { bronze: ["antony-octavian"], silver: ["actium"], gold: ["augustus"] },
  tiers: {
    bronze: { label: "The Heir", when: "43 BC",
      blurb: "Eighteen years old, no office, no army, and a name. He took Caesar's inheritance against all advice, paid the citizens' legacy out of his own pocket, raised veterans privately, and let Rome's entire political class underestimate him. Cicero thought he could be used and discarded. Cicero was proscribed within the year.",
      stats: { power: 44, intellect: 76, influence: 72, creativity: 60, wealth: 55, fame: 52 } },
    silver: { label: "Master of the Roman World", when: "30 BC",
      blurb: "Won by being patient and unglamorous: veterans settled, the grain supply secured by Agrippa, Lepidus sidelined, Antony's reputation dismantled in Rome while he was away. He declared war on a foreign queen rather than a Roman, won at Actium, and took Egypt as his own possession.",
      stats: { power: 90, intellect: 84, influence: 86, creativity: 68, wealth: 92, fame: 88 } },
    gold: { label: "Augustus, First Citizen", when: "27 BC",
      blurb: "Resigned every extraordinary power to the Senate and was immediately handed back the provinces with the armies in them, plus a new name. Every Republican form survived; every lever of real power ran through one household. He learned the exact lesson of the Ides of March — take the power, refuse the title — and died in his bed 41 years later.",
      stats: { power: 98, intellect: 88, influence: 96, creativity: 82, wealth: 99, fame: 94 } },
  },
  claims: [
    { text: "Octavian was named Caesar's heir and adopted son in his will.", classification: "Established", sources: ["suetonius", "appian"], date: "44 BC", at: "bronze" },
    { text: "He raised private troops from Caesar's veterans without holding public office.", classification: "Established", sources: ["appian", "res"], date: "44 BC", at: "bronze" },
    { text: "He agreed to Cicero's proscription despite Cicero's public support for him.", classification: "Established", sources: ["appian", "plutarch"], date: "43 BC", at: "bronze" },
    { text: "He publicly read a document presented as Antony's will to justify war.", classification: "Established", sources: ["dio", "plutarch"], date: "32 BC", at: "silver" },
    { text: "Rome declared war on Cleopatra rather than on Antony, framing it as a foreign war.", classification: "Established", sources: ["dio", "cah"], date: "32 BC", at: "silver" },
    { text: "Caesarion was killed on his orders after the fall of Alexandria.", classification: "Probable", sources: ["plutarch", "dio"], date: "30 BC", at: "silver" },
    { text: "In 27 BC he formally returned his powers to the Senate and received the name Augustus.", classification: "Established", sources: ["res", "dio"], date: "27 BC", at: "gold" },
    { text: "He held tribunician power and superior imperium without holding the offices themselves.", classification: "Established", sources: ["res", "cah"], date: "27 – 23 BC", at: "gold" },
    { text: "Whether 27 BC marks the end of the Republic depends on how the Republic is defined.", classification: "Interpretation", sources: ["cah"], date: "27 BC", at: "gold" },
  ],
  connections: [ { charId: "caesar", relation: "great-nephew and adopted son" }, { charId: "antony", relation: "co-triumvir, then enemy" }, { charId: "cleopatra", relation: "defeated at Actium" }, { charId: "cicero", relation: "backed by, then proscribed him" }, { charId: "m-brutus", relation: "defeated at Philippi" }, { name: "Actium", type: "event" }, { name: "Principate", type: "concept" }, { name: "Res Gestae", type: "concept" } ],
},

};
