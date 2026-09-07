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
      blurb: "Buried three miles from Stonehenge with the richest grave goods of his age in Britain — and the isotopes in his teeth say he grew up somewhere with Alpine winters. He arrived on a badly damaged knee, having crossed a continent, and was buried with the earliest gold yet found in this country." },
    silver: { label: "The Turnover", when: "The Beaker centuries",
      blurb: "He stands for the moment the population of Britain was replaced. Within a few centuries of graves like his appearing, something like nine tenths of the island's ancestry had changed. Whether that was migration, disease, violence or collapse cannot currently be told from the evidence, and the confident versions all go beyond it." },
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
      blurb: "Sailed from Marseille past the Pillars of Heracles and around Britain, measured his latitudes with a shadow-stick, and wrote the first description of this island by anyone who had seen it. His book is lost. Every surviving word of it is a quotation by someone explaining why he was a liar." },
    silver: { label: "Right About Everything He Was Mocked For", when: "The verdict, eventually",
      blurb: "He reported the midnight sun, a sea near Thule that could be neither sailed nor walked on, and tides governed by the moon. Strabo called him an arch-falsifier. What his readers lacked was not evidence but a framework, and the lesson generalises: a source can be dismissed for being ahead of its audience rather than wrong." },
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
      blurb: "A well-fed man in his mid-twenties with trimmed nails and no calluses, struck twice on the head, garrotted and with his throat cut, laid face-down in a Cheshire bog. The triple death is read as ritual sacrifice, and it is read as an execution, and it is read as a murder. The body is superbly preserved and the reason for it is not recoverable." },
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
      blurb: "Given supreme command over the usual rivalries when Caesar came back in force, and fought the campaign correctly by refusing the one Caesar wanted — disbanding his infantry, keeping four thousand chariots, and bleeding the column from the flanks. His is the earliest name of an inhabitant of this island that anyone can read." },
    silver: { label: "Beaten by a Defection", when: "The Thames, 54 BC",
      blurb: "Not beaten in the field. The Trinovantes, whose king he had killed and whose heir was sitting in Caesar's camp, changed sides and told the Romans where his stronghold was; five other peoples followed. The alliance he had been given command of was the thing that failed, and it failed for reasons that predated the invasion." },
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
      blurb: "Ruled thirty years from Camulodunum over a territory that had swallowed its neighbours, with a mint, a treasury and coins carrying an ear of barley on one face and a vine leaf on the other — what the kingdom grew, and what it bought. Suetonius calls him king of the Britons, which flattens a paramount kingship into something simpler." },
    silver: { label: "Thirty Years of Not Being Invaded", when: "The policy",
      blurb: "Kept Rome at arm's length by being more useful trading than fighting: wine in, grain and slaves out, exiles tolerated, nobody's army required. It held for three decades and collapsed within three years of his death, when his sons pushed a Roman client too far and handed Claudius a pretext." },
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
      blurb: "Lost his kingdom in the first summer and kept fighting for nine years anyway, moving west and commanding other people's wars — the Silures first, then the Ordovices. Tacitus says the escapes made him the most famous man in Britain, which was itself the weapon: a leader who had survived Rome was worth following." },
    silver: { label: "The Speech He Did Not Write", when: "Rome, AD 51",
      blurb: "Paraded through Rome and pardoned, after a speech asking whether wanting to rule everyone means everyone must accept slavery. Tacitus composed it half a century later, as ancient historians composed all speeches. The most quoted British statement of the period is a Roman senator's argument against Rome — which is not a British voice surviving, but the absence of one, decorated." },
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
      blurb: "Ruled the largest territory in Britain for a quarter of a century by treaty with Rome, which is longer than any British ruler managed by fighting it. Handing Caratacus over was the treaty working: sheltering the empire's most wanted man would have brought four legions into her country." },
    silver: { label: "Written by a Man Who Disliked Her", when: "The record",
      blurb: "Everything known about her comes from Tacitus, who calls her treacherous and dwells on her leaving her husband for his armour-bearer — a charge he does not level at male client kings doing the same arithmetic. Strip the disapproval and what remains is a ruler who kept her kingdom out of a war for twenty-five years and lost it in a civil quarrel Rome could not spare troops to settle." },
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

"boudica": {
  id: "boudica", name: "Boudica", years: "d. c. AD 61", sets: ["ancient-britain"],
  requires: { bronze: ["brit-boudica"], silver: ["brit-boudica", "brit-claudius"], gold: ["brit-boudica", "brit-life", "brit-agricola"] },
  tiers: {
    bronze: { label: "Queen of the Iceni", when: "AD 60",
      blurb: "Her husband left half his kingdom to Nero to protect the other half, and Rome took all of it. She was flogged and her daughters raped by the staff of a procurator collecting an inheritance. Everything that follows was a response to an administrative decision about property." },
    silver: { label: "Three Cities", when: "AD 60 – 61",
      blurb: "Camulodunum, Londinium and Verulamium burned, and the governor abandoned London rather than lose the province defending it. The red destruction layer under all three is one of the few places where a sentence of Tacitus can be picked up in a trench." },
    gold: { label: "Thirteen Centuries Missing", when: "The afterlife",
      blurb: "Gildas does not mention her. Bede does not. Nobody in Britain knew she had existed until Tacitus was rediscovered, and then every age remade her — Tudor patriot, noble savage, and finally a Victorian bronze in a scythed chariot beside Westminster Bridge, a woman who destroyed three Roman towns rather than be ruled from abroad, standing guard over the largest empire in history." },
  },
  claims: [
    { text: "Prasutagus left his kingdom jointly to Nero and his two daughters, and Rome annexed it entirely.", classification: "Probable", sources: ["tacitus"], date: "c. AD 60", at: "bronze" },
    { text: "Boudica was flogged and her daughters raped by Roman officials.", classification: "Probable", sources: ["tacitus"], date: "c. AD 60", at: "bronze" },
    { text: "Dio reports that loans forced on the British aristocracy, including forty million sesterces from Seneca, were suddenly called in.", classification: "Probable", sources: ["dio"], date: "c. AD 60", at: "bronze" },
    { text: "Camulodunum, Londinium and Verulamium were destroyed, and a burnt layer beneath all three confirms it.", classification: "Established", sources: ["tacitus", "arch"], date: "AD 60 – 61", at: "silver" },
    { text: "Suetonius Paulinus abandoned Londinium rather than defend it.", classification: "Probable", sources: ["tacitus"], date: "AD 61", at: "silver" },
    { text: "The site of the final battle has never been identified.", classification: "Unknown", sources: ["cah"], date: "AD 61", at: "silver" },
    { text: "How she died: Tacitus says poison, Dio says illness, and the accounts cannot be reconciled.", classification: "Unknown", sources: ["tacitus", "dio"], date: "AD 61", at: "silver" },
    { text: "She was unknown in Britain until Tacitus was rediscovered in the Renaissance.", classification: "Established", sources: ["cah"], date: "16th c.", at: "gold" },
    { text: "Boudica derives from a Brittonic word for victory and is probably a title rather than a personal name.", classification: "Probable", sources: ["cah"], date: "1st c. AD", at: "gold" },
  ],
  connections: [ { charId: "cartimandua", relation: "the other client ruler, who chose the opposite course" }, { charId: "agricola", relation: "served in Britain during the revolt" }, { name: "Iceni", type: "org" }, { name: "Camulodunum", type: "place" } ],
},

"agricola": {
  id: "agricola", name: "Gnaeus Julius Agricola", years: "AD 40 – 93", sets: ["ancient-britain"],
  requires: { bronze: ["brit-agricola"], silver: ["brit-agricola", "brit-walls"] },
  tiers: {
    bronze: { label: "Seven Years and a Biographer", when: "AD 77 – 84",
      blurb: "Governed longer than anyone and is documented better than anyone, because his daughter married Tacitus. Took the army further north than it ever went again, won at a place nobody can find, and sent the fleet round the top of Britain to establish by observation that it was an island — which Pytheas had reported four centuries earlier and been disbelieved for." },
    silver: { label: "They Called It Civilisation", when: "The policy",
      blurb: "Built the fora and baths, educated the chiefs' sons, made the toga fashionable — and his own son-in-law wrote that the inexperienced called this civilisation when it was part of their enslavement. An ancient description of soft power, set down by the man defending the governor who used it." },
  },
  claims: [
    { text: "Agricola governed Britain for around seven years from AD 77.", classification: "Established", sources: ["tacitus", "cah"], date: "AD 77 – 84", at: "bronze" },
    { text: "Tacitus, his son-in-law, wrote his biography in AD 98 as a defence of men who served under tyrants.", classification: "Established", sources: ["tacitus"], date: "AD 98", at: "bronze" },
    { text: "He defeated a Caledonian confederation at Mons Graupius.", classification: "Probable", sources: ["tacitus"], date: "AD 83 or 84", at: "bronze" },
    { text: "The site of Mons Graupius is not identified.", classification: "Unknown", sources: ["cah"], date: "AD 83 or 84", at: "bronze" },
    { text: "The speech given to the Caledonian leader Calgacus was composed by Tacitus.", classification: "Established", sources: ["tacitus", "cah"], date: "AD 98", at: "bronze" },
    { text: "His fleet circumnavigated Britain, establishing by observation that it is an island.", classification: "Probable", sources: ["tacitus"], date: "AD 84", at: "silver" },
    { text: "The northern forts were dismantled within a few years; at Inchtuthil the garrison buried around a million unused nails.", classification: "Established", sources: ["arch"], date: "c. AD 87", at: "silver" },
  ],
  connections: [ { charId: "boudica", relation: "was in Britain during her revolt" }, { charId: "claudia-severa", relation: "the frontier his campaigns eventually settled on" }, { name: "Mons Graupius", type: "event" }, { name: "Caledonia", type: "place" } ],
},

"claudia-severa": {
  id: "claudia-severa", name: "Claudia Severa", years: "fl. c. AD 100", sets: ["ancient-britain"],
  requires: { bronze: ["brit-walls"] },
  tiers: {
    bronze: { label: "The Birthday Invitation", when: "c. AD 100",
      blurb: "The wife of a fort commander near Hadrian's Wall, inviting a friend to her birthday and promising the day will be more enjoyable if she comes. A scribe wrote most of it; the closing line — sister, dearest soul, farewell — is in her own less practised hand. It is the earliest known writing in Latin by a woman anywhere in the Roman world, and it is about a party." },
  },
  claims: [
    { text: "A wooden tablet from Vindolanda records Claudia Severa inviting Sulpicia Lepidina to a birthday celebration.", classification: "Established", sources: ["vindolanda"], date: "c. AD 100", at: "bronze" },
    { text: "The closing greeting is in a second, less practised hand, taken to be her own.", classification: "Probable", sources: ["vindolanda"], date: "c. AD 100", at: "bronze" },
    { text: "It is the earliest known example of writing in Latin by a woman.", classification: "Probable", sources: ["vindolanda", "cah"], date: "c. AD 100", at: "bronze" },
    { text: "Another Vindolanda tablet uses the otherwise unattested word Brittunculi, wretched little Britons.", classification: "Established", sources: ["vindolanda"], date: "c. AD 100", at: "bronze" },
  ],
  connections: [ { charId: "agricola", relation: "wrote from the frontier his campaigns settled on" }, { name: "Vindolanda", type: "place" }, { name: "Hadrian's Wall", type: "place" } ],
},

"carausius": {
  id: "carausius", name: "Carausius", years: "r. AD 286 – 293", sets: ["ancient-britain"],
  requires: { bronze: ["brit-breakaway"], silver: ["brit-breakaway", "brit-civil"] },
  tiers: {
    bronze: { label: "Emperor of Britain", when: "AD 286 – 293",
      blurb: "Commanded the Channel fleet, was accused of letting raiders through and pocketing the loot afterwards, and on being sentenced to death took the fleet to Britain and declared himself emperor. He held the island and a strip of Gaul for seven years, and struck better silver than the empire he had left." },
    silver: { label: "Quoting Virgil at the End of the World", when: "The coinage",
      blurb: "Some of his coins read CARAVSIVS ET FRATRES SVI — Carausius and his brothers — putting himself beside Diocletian and Maximian as a colleague rather than a rebel. Others carry RSR and INPCDA, unexplained for centuries until someone matched them to Virgil's Fourth Eclogue: the reign of Saturn returns. A usurper on a wet island was advertising a golden age in verse, and expected to be understood." },
  },
  claims: [
    { text: "Carausius commanded the Channel fleet and was accused of intercepting raiders only after they had taken plunder.", classification: "Probable", sources: ["cah"], date: "AD 286", at: "bronze" },
    { text: "He ruled Britain and part of northern Gaul as emperor from 286 until his murder in 293.", classification: "Established", sources: ["arch", "cah"], date: "AD 286 – 293", at: "bronze" },
    { text: "His silver coinage was of markedly higher quality than contemporary imperial issues.", classification: "Established", sources: ["arch"], date: "AD 286 – 293", at: "bronze" },
    { text: "Coins reading CARAVSIVS ET FRATRES SVI present him as a colleague of Diocletian and Maximian.", classification: "Established", sources: ["arch"], date: "c. AD 290", at: "silver" },
    { text: "The legends RSR and INPCDA expand to a line of Virgil's Fourth Eclogue about a returning golden age.", classification: "Probable", sources: ["arch"], date: "c. AD 290", at: "silver" },
    { text: "He was murdered by his finance minister Allectus, who ruled until 296.", classification: "Probable", sources: ["cah"], date: "AD 293", at: "silver" },
  ],
  connections: [ { name: "Saxon Shore", type: "concept" }, { name: "Londinium", type: "place" }, { name: "Gallic Empire", type: "org" } ],
},

"patrick": {
  id: "patrick", name: "Patrick", years: "5th c. AD", sets: ["ancient-britain"],
  requires: { bronze: ["brit-end"], silver: ["brit-end", "brit-constantine"] },
  tiers: {
    bronze: { label: "Taken at Sixteen", when: "5th c. AD",
      blurb: "Born into a Romanised, Christian, tax-paying British family with a deacon father and a decurion grandfather. Irish raiders took him at sixteen and he spent six years herding animals before escaping. He went back voluntarily, to the people who had enslaved him." },
    silver: { label: "The First Voice", when: "The Confessio",
      blurb: "His Confessio is a defence of his ministry against British churchmen attacking him, written in Latin he twice apologises for. It is the first autobiography produced in these islands, and after four thousand years of this Set being narrated by visitors, traders, generals and their sons-in-law, the first inhabitant of Britain to speak to us directly and at length is a runaway slave who is embarrassed about his grammar." },
  },
  claims: [
    { text: "Patrick was born in Roman Britain to a Christian family; his father was a deacon and decurion.", classification: "Probable", sources: ["cah"], date: "5th c. AD", at: "bronze" },
    { text: "He was captured by Irish raiders around the age of sixteen and enslaved for six years.", classification: "Probable", sources: ["cah"], date: "5th c. AD", at: "bronze" },
    { text: "His birthplace, Bannavem Taburniae, cannot be located.", classification: "Unknown", sources: ["cah"], date: "5th c. AD", at: "bronze" },
    { text: "The Confessio is a defence of his mission written against critics in the British church.", classification: "Established", sources: ["cah"], date: "5th c. AD", at: "silver" },
    { text: "It is the earliest surviving autobiographical text written in the British Isles.", classification: "Probable", sources: ["cah"], date: "5th c. AD", at: "silver" },
    { text: "The snakes, the shamrock and the date of 432 are all later tradition, not in his own writing.", classification: "Traditional / Legendary", sources: ["cah"], date: "7th c. onwards", at: "silver" },
  ],
  connections: [ { charId: "claudia-severa", relation: "four centuries after the frontier letters" }, { name: "Ireland", type: "place" }, { name: "Confessio", type: "concept" } ],
},

});
