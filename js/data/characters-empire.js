/* =====================================================================
   Cards from the Roman Empire syllabus.

   Four of these twelve are not rulers, and that is deliberate. The
   emperors are known almost entirely through hostile senatorial
   historians; the people who let us check them are a Judaean general
   who changed sides, a governor who wrote his filing down, a young
   woman awaiting execution, and a serving officer who wrote the last
   great history in Latin. The Set is only as good as they are.

   No Augustus card here. He belongs to the Republic Set, where the
   settlement of 27 BC is the ending rather than the beginning, and a
   person gets one card in this app however many Sets they appear in.
   ===================================================================== */

Object.assign(CHARACTERS, {

"claudius": {
  id: "claudius", name: "Claudius", years: "10 BC – AD 54", sets: ["roman-empire"],
  requires: { bronze: ["emp-julio-claudians"], silver: ["emp-julio-claudians", "emp-cult"] },
  tiers: {
    bronze: { label: "Found Behind a Curtain", when: "AD 41",
      blurb: "Limped, stammered, drooled when excited, and was kept out of public life by a family that found him an embarrassment — which is very probably why he outlived all of them. The Praetorians found him hiding after Caligula's murder and made him emperor because he was there and he was a Julian, and he turned out to be the most productive administrator of the dynasty." },
    silver: { label: "The Man on the Bronze", when: "AD 48",
      blurb: "His speech admitting Gauls to the Senate survives twice: as Tacitus polished it, and as it was actually inscribed at Lyon. The real one wanders, digresses into institutional history, and pulls itself back with the equivalent of but I am getting ahead of myself. It is the only place in this app where an ancient historian's version of a speech can be checked against the speech." },
  },
  claims: [
    { text: "The Praetorian Guard proclaimed Claudius emperor after Caligula's murder.", classification: "Established", sources: ["suetonius", "dio"], date: "AD 41", at: "bronze" },
    { text: "He paid the Guard a donative of 15,000 sesterces a man on his accession.", classification: "Probable", sources: ["suetonius"], date: "AD 41", at: "bronze" },
    { text: "He ordered the invasion of Britain in AD 43 and took part in the campaign personally.", classification: "Established", sources: ["dio", "suetonius"], date: "AD 43", at: "bronze" },
    { text: "He built the harbour at Portus and drained the Fucine Lake.", classification: "Established", sources: ["suetonius", "arch"], date: "AD 42 – 52", at: "bronze" },
    { text: "His AD 48 speech on admitting Gauls to the Senate survives on a bronze tablet found at Lyon.", classification: "Established", sources: ["arch", "tacitus"], date: "AD 48", at: "silver" },
    { text: "Tacitus' version of that speech reproduces the occasion and argument but not the wording.", classification: "Established", sources: ["tacitus", "cah"], date: "AD 48", at: "silver" },
    { text: "That he was poisoned by his wife Agrippina is reported by hostile sources and cannot be confirmed.", classification: "Contested", sources: ["tacitus", "suetonius"], date: "AD 54", at: "silver" },
  ],
  connections: [ { charId: "caratacus", relation: "displayed him in a triumph, then spared him" }, { name: "Praetorian Guard", type: "org" }, { name: "Lyon tablet", type: "concept" }, { name: "Britain", type: "place" } ],
},

"vespasian": {
  id: "vespasian", name: "Vespasian", years: "AD 9 – 79", sets: ["roman-empire"],
  requires: { bronze: ["emp-69"], silver: ["emp-69", "emp-flavians"] },
  tiers: {
    bronze: { label: "The Fourth Man", when: "AD 69",
      blurb: "A tax farmer's son commanding in Judaea when three emperors killed each other in a year. His legions proclaimed him, his generals won the war for him, and he arrived in Rome after it was over — the clearest demonstration of Tacitus' secret of empire, that the throne could be won from a province by a man who was not there." },
    silver: { label: "Money Does Not Smell", when: "AD 69 – 79",
      blurb: "Inherited an empty treasury and refilled it by taxing everything, including the ammonia collected from public urinals — and when his son objected to the source, held a coin to his nose and asked whether it smelled. Built the Colosseum out of the sack of Jerusalem, on ground taken back from Nero's private garden. Both halves of that were the message." },
  },
  claims: [
    { text: "The eastern legions proclaimed Vespasian emperor in July AD 69.", classification: "Established", sources: ["tacitus", "josephus"], date: "AD 69", at: "bronze" },
    { text: "His forces won the second battle of Bedriacum and sacked Cremona.", classification: "Established", sources: ["tacitus"], date: "AD 69", at: "bronze" },
    { text: "He was the first emperor with no connection to the Republican nobility.", classification: "Established", sources: ["suetonius", "cah"], date: "AD 69", at: "bronze" },
    { text: "He imposed a tax on the contents of public urinals.", classification: "Probable", sources: ["suetonius", "dio"], date: "AD 70s", at: "silver" },
    { text: "The Colosseum was begun in his reign on the site of the lake of Nero's Domus Aurea.", classification: "Established", sources: ["arch", "suetonius"], date: "c. AD 72", at: "silver" },
    { text: "A reconstructed inscription indicates it was funded from the spoils of the Judaean war.", classification: "Probable", sources: ["arch"], date: "c. AD 80", at: "silver" },
    { text: "He joked on his deathbed that he thought he was becoming a god.", classification: "Traditional / Legendary", sources: ["suetonius"], date: "AD 79", at: "silver" },
  ],
  connections: [ { charId: "josephus", relation: "captor, then patron" }, { name: "Colosseum", type: "concept" }, { name: "Year of the Four Emperors", type: "event" }, { name: "Judaea", type: "place" } ],
},

"josephus": {
  id: "josephus", name: "Josephus", years: "AD 37 – c. 100", sets: ["roman-empire"],
  requires: { bronze: ["emp-flavians"] },
  tiers: {
    bronze: { label: "The Man Who Changed Sides", when: "AD 67 – 79",
      blurb: "Commanded Judaean forces in Galilee, was besieged, survived a suicide pact he may have rigged, surrendered, and told Vespasian he would become emperor. When the prophecy came true he was freed, took his captor's family name, and wrote the history of the war for the men who had won it. An eyewitness on the losing side, writing under the patronage of the winners, and open about it." },
  },
  claims: [
    { text: "Josephus commanded Judaean forces in Galilee and surrendered at Jotapata in AD 67.", classification: "Established", sources: ["josephus", "cah"], date: "AD 67", at: "bronze" },
    { text: "He predicted to Vespasian that he would become emperor.", classification: "Probable", sources: ["josephus", "suetonius"], date: "AD 67", at: "bronze" },
    { text: "He took the family name Flavius and wrote under Flavian patronage.", classification: "Established", sources: ["josephus"], date: "AD 71 – 79", at: "bronze" },
    { text: "His account of the survival lottery at Jotapata leaves his own conduct unexplained.", classification: "Contested", sources: ["josephus"], date: "AD 67", at: "bronze" },
    { text: "The Jewish War is the principal narrative source for the destruction of the Second Temple.", classification: "Established", sources: ["josephus", "cah"], date: "AD 70", at: "bronze" },
    { text: "He blames the war on Judaean factions and individual governors, never on Roman rule.", classification: "Interpretation", sources: ["josephus", "cah"], date: "AD 75", at: "bronze" },
  ],
  connections: [ { charId: "vespasian", relation: "captured by, then patronised by" }, { name: "Second Temple", type: "concept" }, { name: "Jerusalem", type: "place" } ],
},

"trajan": {
  id: "trajan", name: "Trajan", years: "AD 53 – 117", sets: ["roman-empire"],
  requires: { bronze: ["emp-trajan"], silver: ["emp-trajan", "emp-adoptive"] },
  tiers: {
    bronze: { label: "The Furthest Extent", when: "AD 101 – 117",
      blurb: "Took Dacia for its gold, then took Armenia, Mesopotamia and Ctesiphon, and reached the Persian Gulf — where Dio has him watching a ship leave for India and regretting his age. It is the largest the empire ever was. It lasted about three years, and his successor gave the east back within months of his death." },
    silver: { label: "Optimus Princeps", when: "AD 98 – 117",
      blurb: "Voted best of emperors by a Senate that had spent a century being careful, and the compliment seems to have been meant. His replies to Pliny in Bithynia are the best surviving picture of how the empire was actually governed: aqueducts, bathhouses, a refused fire brigade, and a written policy on Christians that forbids anonymous accusations as not in keeping with the spirit of our age." },
  },
  claims: [
    { text: "Trajan annexed Dacia after two wars ending in AD 106.", classification: "Established", sources: ["dio", "arch"], date: "AD 101 – 106", at: "bronze" },
    { text: "Trajan's Column narrates both Dacian wars in a helical frieze of over two thousand figures.", classification: "Established", sources: ["arch"], date: "AD 113", at: "bronze" },
    { text: "He reached the Persian Gulf in AD 116, the furthest east a Roman army went.", classification: "Established", sources: ["dio"], date: "AD 116", at: "bronze" },
    { text: "Reported figures for the Dacian gold are late and implausibly large.", classification: "Contested", sources: ["cah"], date: "AD 106", at: "bronze" },
    { text: "He was the first emperor born in a province, in Spain.", classification: "Established", sources: ["cah", "hist-aug"], date: "AD 53", at: "silver" },
    { text: "His correspondence with Pliny as governor of Bithynia survives with his replies attached.", classification: "Established", sources: ["pliny-y"], date: "c. AD 110", at: "silver" },
    { text: "He instructed Pliny that Christians were not to be sought out and anonymous accusations ignored.", classification: "Established", sources: ["pliny-y"], date: "c. AD 112", at: "silver" },
  ],
  connections: [ { charId: "pliny-younger", relation: "corresponded with him as governor" }, { charId: "hadrian", relation: "successor, who abandoned his conquests" }, { name: "Dacia", type: "place" }, { name: "Trajan's Column", type: "concept" } ],
},

"pliny-younger": {
  id: "pliny-younger", name: "Pliny the Younger", years: "AD 61 – c. 113", sets: ["roman-empire"],
  requires: { bronze: ["emp-adoptive"] },
  tiers: {
    bronze: { label: "The Governor's Filing", when: "c. AD 110 – 112",
      blurb: "Governed Bithynia and wrote to the emperor about everything: an aqueduct built twice and finished never, a bathhouse, a fire brigade that was refused because associations turn political. He also asked what to do about Christians, admitted he had never attended such a trial and did not know what the crime was, and got a reply. Nothing in Roman literature shows the machinery of empire so plainly." },
  },
  claims: [
    { text: "Pliny governed Bithynia-Pontus as an imperial legate around AD 110.", classification: "Established", sources: ["pliny-y", "cah"], date: "c. AD 110", at: "bronze" },
    { text: "Book 10 of his Letters preserves his correspondence with Trajan and Trajan's replies.", classification: "Established", sources: ["pliny-y"], date: "c. AD 110 – 112", at: "bronze" },
    { text: "He described his own procedure for trying Christians and asked whether it was correct.", classification: "Established", sources: ["pliny-y"], date: "c. AD 112", at: "bronze" },
    { text: "He wrote the only eyewitness account of the eruption of Vesuvius, in which his uncle died.", classification: "Established", sources: ["pliny-y"], date: "AD 79", at: "bronze" },
    { text: "Whether Book 10 was assembled by Pliny or after his death is not settled.", classification: "Unknown", sources: ["cah"], date: "c. AD 113", at: "bronze" },
  ],
  connections: [ { charId: "trajan", relation: "wrote to him for instructions" }, { name: "Vesuvius", type: "event" }, { name: "Bithynia", type: "place" } ],
},

"hadrian": {
  id: "hadrian", name: "Hadrian", years: "AD 76 – 138", sets: ["roman-empire", "ancient-britain"],
  requires: { bronze: ["emp-hadrian"], silver: ["emp-hadrian", "emp-life"] },
  tiers: {
    bronze: { label: "The Man Who Drew the Lines", when: "AD 117 – 138",
      blurb: "Gave back Trajan's eastern conquests within months, then spent half his reign travelling the empire deciding where it stopped: a palisade in Germany, a ditch system in Africa, a wall across Britain. They were too thin to stop an army. They were never meant to. What they marked was a change of mind about what an empire was." },
    silver: { label: "Graeculus", when: "AD 125 – 138",
      blurb: "Spanish-born, Greek by choice, the first emperor to wear a beard because philosophers did. Finished a temple at Athens that had stood unfinished for six centuries, built a villa that reproduced the places he had seen, and when Antinous drowned in the Nile made him a god and had him sculpted so often that his is one of the most recognisable faces of the ancient world." },
  },
  claims: [
    { text: "Hadrian abandoned Trajan's conquests in Mesopotamia and Armenia on his accession.", classification: "Established", sources: ["hist-aug", "dio"], date: "AD 117", at: "bronze" },
    { text: "Four senior consulars were executed early in his reign; he denied ordering it.", classification: "Contested", sources: ["hist-aug", "dio"], date: "AD 118", at: "bronze" },
    { text: "He spent over half his reign travelling the provinces in person.", classification: "Established", sources: ["hist-aug", "arch"], date: "AD 121 – 134", at: "bronze" },
    { text: "Construction of the wall across northern Britain began in AD 122.", classification: "Established", sources: ["arch", "hist-aug"], date: "AD 122", at: "bronze" },
    { text: "The Bar Kokhba revolt was suppressed with very heavy destruction; Dio's figures are not reliable.", classification: "Probable", sources: ["dio", "cah"], date: "AD 132 – 135", at: "bronze" },
    { text: "Jerusalem was refounded as Aelia Capitolina and Judaea renamed Syria Palaestina.", classification: "Established", sources: ["dio", "arch"], date: "AD 135", at: "silver" },
    { text: "Antinous drowned in the Nile in AD 130 and was deified on Hadrian's order.", classification: "Established", sources: ["dio", "arch"], date: "AD 130", at: "silver" },
    { text: "Whether the Bar Kokhba revolt was provoked by the colony, a ban on circumcision, or both is disputed.", classification: "Contested", sources: ["dio", "cah"], date: "AD 132", at: "silver" },
  ],
  connections: [ { charId: "trajan", relation: "predecessor, whose conquests he gave up" }, { charId: "agricola", relation: "the northern frontier his wall finally fixed" }, { name: "Hadrian's Wall", type: "concept" }, { name: "Bar Kokhba revolt", type: "event" } ],
},

"marcus-aurelius": {
  id: "marcus-aurelius", name: "Marcus Aurelius", years: "AD 121 – 180", sets: ["roman-empire"],
  requires: { bronze: ["emp-marcus"], silver: ["emp-marcus", "emp-adoptive"], gold: ["emp-marcus", "emp-life", "emp-crisis"] },
  tiers: {
    bronze: { label: "The Notebook", when: "AD 170s",
      blurb: "Twelve books of Greek jottings with no title, written on campaign and certainly not for us. Not serene: the notes of a man arguing himself into getting up, reminding himself that the people he meets today will be ungrateful and that this is no reason to hate them. The only private self-address by a head of state to survive from the ancient world." },
    silver: { label: "The Last of the Five", when: "AD 161 – 180",
      blurb: "The end of the adoptive succession, and the proof of what it had really been. The four emperors before him chose the best man available because none of them had a son who lived. He had one, made him co-emperor at sixteen, and the happiest period in human history ended the year he died." },
    gold: { label: "Eleven Years on the Danube", when: "AD 166 – 180",
      blurb: "Spent his reign on a frontier war that would not end, during a pandemic that emptied the tax rolls, enrolling gladiators and slaves because there were no recruits and selling the palace furniture to pay them. He died at Vindobona with the war unfinished. The philosophy was written in the gaps." },
  },
  claims: [
    { text: "The Meditations are private Stoic exercises, untitled in the manuscripts and not written for publication.", classification: "Established", sources: ["marcus", "cah"], date: "AD 170s", at: "bronze" },
    { text: "They mention no policy, battle or member of his own government.", classification: "Established", sources: ["marcus"], date: "AD 170s", at: "bronze" },
    { text: "He was the last of the five emperors from Nerva to himself, and the first with a surviving son.", classification: "Established", sources: ["cah"], date: "AD 180", at: "silver" },
    { text: "He made Commodus co-emperor in AD 177, at sixteen.", classification: "Established", sources: ["dio", "hist-aug"], date: "AD 177", at: "silver" },
    { text: "A pandemic, probably smallpox, entered the empire with returning troops from about AD 165.", classification: "Probable", sources: ["cah", "arch"], date: "AD 165", at: "gold" },
    { text: "Estimates of its mortality range from about 2% to a quarter of the population.", classification: "Unknown", sources: ["cah"], date: "AD 165 – 190", at: "gold" },
    { text: "He enrolled gladiators, brigands and slaves into the legions and sold palace property to pay them.", classification: "Probable", sources: ["hist-aug", "dio"], date: "AD 169", at: "gold" },
    { text: "Germanic forces crossed the Danube and besieged Aquileia in northern Italy.", classification: "Established", sources: ["dio", "cah"], date: "AD 170", at: "gold" },
  ],
  connections: [ { charId: "hadrian", relation: "chose the succession that reached him" }, { name: "Meditations", type: "concept" }, { name: "Antonine Plague", type: "event" }, { name: "Danube", type: "place" } ],
},

"perpetua": {
  id: "perpetua", name: "Vibia Perpetua", years: "c. AD 182 – 203", sets: ["roman-empire"],
  requires: { bronze: ["emp-cult"] },
  tiers: {
    bronze: { label: "The Prison Diary", when: "AD 203",
      blurb: "A young woman of good family at Carthage, arrested with her slave Felicity, executed in the arena at twenty-two. A long section of the account claims to be her own writing from prison — her father begging her to recant, her anxiety about her nursing son, her dreams. If it is what it says it is, it is the earliest surviving Latin written by a woman describing her own death sentence." },
  },
  claims: [
    { text: "Perpetua and Felicity were executed at Carthage in the arena in AD 203.", classification: "Probable", sources: ["perpetua", "cah"], date: "AD 203", at: "bronze" },
    { text: "A substantial section of the Passion presents itself as Perpetua's own prison writing.", classification: "Established", sources: ["perpetua"], date: "AD 203", at: "bronze" },
    { text: "Whether that section is genuinely hers or composed by the editor is disputed.", classification: "Contested", sources: ["perpetua", "cah"], date: "AD 203", at: "bronze" },
    { text: "The standard test put to accused Christians was sacrifice to the gods and the emperor's image.", classification: "Established", sources: ["pliny-y", "cah"], date: "AD 112 – 250", at: "bronze" },
    { text: "She records her father repeatedly urging her to recant, and her refusal.", classification: "Established", sources: ["perpetua"], date: "AD 203", at: "bronze" },
  ],
  connections: [ { name: "Imperial cult", type: "concept" }, { name: "Carthage", type: "place" }, { name: "Martyrdom", type: "concept" } ],
},

"septimius-severus": {
  id: "septimius-severus", name: "Septimius Severus", years: "AD 145 – 211", sets: ["roman-empire"],
  requires: { bronze: ["emp-severans"] },
  tiers: {
    bronze: { label: "Enrich the Soldiers", when: "AD 193 – 211",
      blurb: "Born at Lepcis Magna in Libya, won the empire in four years of civil war, and governed on one principle. Dio reports the advice he left his sons: enrich the soldiers, and scorn everyone else. He raised army pay for the first time in a century, let soldiers marry, opened the officer corps, and stationed a legion in Italy. Each measure was a rational answer to 193, and each made the next auction more likely." },
  },
  claims: [
    { text: "The Praetorian Guard auctioned the throne after killing Pertinax in AD 193.", classification: "Established", sources: ["dio", "hist-aug"], date: "AD 193", at: "bronze" },
    { text: "Severus was born at Lepcis Magna in Africa to a family of Punic descent.", classification: "Established", sources: ["dio", "cah"], date: "AD 145", at: "bronze" },
    { text: "He raised military pay for the first time in over a century and legalised soldiers' marriages.", classification: "Established", sources: ["dio", "cah"], date: "AD 197", at: "bronze" },
    { text: "Dio reports his deathbed advice to enrich the soldiers and scorn all others.", classification: "Probable", sources: ["dio"], date: "AD 211", at: "bronze" },
    { text: "He replaced the Italian Praetorian Guard with frontier legionaries and based a legion in Italy.", classification: "Established", sources: ["dio", "cah"], date: "AD 193", at: "bronze" },
    { text: "He died at York while campaigning in northern Britain.", classification: "Established", sources: ["dio", "hist-aug"], date: "AD 211", at: "bronze" },
  ],
  connections: [ { name: "Praetorian Guard", type: "org" }, { name: "Lepcis Magna", type: "place" }, { name: "Antonine Constitution", type: "concept" } ],
},

"zenobia": {
  id: "zenobia", name: "Zenobia", years: "c. AD 240 – after 274", sets: ["roman-empire"],
  requires: { bronze: ["emp-crisis"] },
  tiers: {
    bronze: { label: "Queen of the East", when: "AD 267 – 272",
      blurb: "Ruled Palmyra after her husband's murder and, while Rome was fighting on three frontiers at once, took Syria, Egypt and much of Asia Minor. She issued coinage in her son's name and then her own with the imperial title. Aurelian beat her in two battles and took her alive. What happened to her afterwards is genuinely unknown, and every version we have is a story someone wanted to tell." },
  },
  claims: [
    { text: "Zenobia governed Palmyra after the murder of her husband Odaenathus in AD 267.", classification: "Established", sources: ["cah", "arch"], date: "AD 267", at: "bronze" },
    { text: "Palmyrene forces took Egypt and much of Asia Minor by AD 270.", classification: "Established", sources: ["zosimus", "cah"], date: "AD 269 – 270", at: "bronze" },
    { text: "Coinage was issued in her name with imperial titles.", classification: "Established", sources: ["arch"], date: "AD 271 – 272", at: "bronze" },
    { text: "Aurelian defeated her at Immae and Emesa and captured her in AD 272.", classification: "Established", sources: ["zosimus", "cah"], date: "AD 272", at: "bronze" },
    { text: "Her fate after capture is not known; the sources give incompatible accounts.", classification: "Unknown", sources: ["zosimus", "hist-aug"], date: "after AD 274", at: "bronze" },
    { text: "The Historia Augusta's life of her contains invented documents and cannot be relied on.", classification: "Established", sources: ["hist-aug", "cah"], date: "late 4th c.", at: "bronze" },
  ],
  connections: [ { name: "Palmyra", type: "place" }, { name: "Crisis of the Third Century", type: "event" }, { name: "Sasanian Persia", type: "org" } ],
},

"diocletian": {
  id: "diocletian", name: "Diocletian", years: "c. AD 244 – 311", sets: ["roman-empire"],
  requires: { bronze: ["emp-diocletian"], silver: ["emp-diocletian", "emp-crisis"] },
  tiers: {
    bronze: { label: "Four Emperors on Purpose", when: "AD 293",
      blurb: "Worked out that every usurpation of the previous fifty years had begun on a frontier the emperor was not standing on, and divided the job four ways: two senior emperors, two juniors, four courts, four armies. Then in AD 305 he did the thing no Roman emperor had ever done and resigned. Asked to come back, he is said to have replied that if they could see the cabbages he had grown they would not ask." },
    silver: { label: "Dominus", when: "AD 284 – 305",
      blurb: "Ended the Augustan fiction three centuries after it was invented. The first citizen became lord, approached through curtains and prostration. He doubled the provinces, split civil from military command, grew the administration from hundreds to tens of thousands, and tried to legislate away inflation with a schedule of a thousand prices carved on stone. It failed, and it is the best economic document we have." },
  },
  claims: [
    { text: "Diocletian established the Tetrarchy of two Augusti and two Caesars by AD 293.", classification: "Established", sources: ["cah", "arch"], date: "AD 286 – 293", at: "bronze" },
    { text: "He abdicated in AD 305 and compelled his colleague Maximian to do the same.", classification: "Established", sources: ["lactantius", "cah"], date: "AD 305", at: "bronze" },
    { text: "The Tetrarchic succession worked once and collapsed after his retirement.", classification: "Established", sources: ["zosimus", "cah"], date: "AD 306", at: "bronze" },
    { text: "He separated civil from military command and roughly doubled the number of provinces.", classification: "Established", sources: ["notitia", "cah"], date: "AD 293 – 305", at: "silver" },
    { text: "The Edict on Maximum Prices of AD 301 fixed ceilings for over a thousand goods and services.", classification: "Established", sources: ["arch"], date: "AD 301", at: "silver" },
    { text: "The Edict failed and was abandoned; goods reportedly disappeared from the market.", classification: "Probable", sources: ["cah"], date: "AD 302", at: "silver" },
    { text: "The persecution from AD 303 was severe in the east and barely enforced in the west.", classification: "Established", sources: ["eusebius", "cah"], date: "AD 303 – 311", at: "silver" },
  ],
  connections: [ { charId: "constantine1", relation: "son of his western Caesar; undid his religious policy" }, { name: "Tetrarchy", type: "concept" }, { name: "Edict on Maximum Prices", type: "concept" }, { name: "Split", type: "place" } ],
},

"constantine1": {
  id: "constantine1", name: "Constantine the Great", years: "c. AD 272 – 337", sets: ["roman-empire", "ancient-britain"],
  requires: { bronze: ["emp-constantine"], silver: ["emp-constantine", "emp-church"], gold: ["emp-constantine", "emp-church", "emp-fall"] },
  tiers: {
    bronze: { label: "The Milvian Bridge", when: "AD 312",
      blurb: "Proclaimed by the army at York, won the empire in six years of civil war, and beat Maxentius outside Rome. What happened before the battle is the most examined religious claim in Roman history and the two accounts of it disagree on the sign, the timing and whether anything was seen at all. What followed is documented: in AD 313 religion became a free choice for everyone." },
    silver: { label: "Nicaea", when: "AD 325",
      blurb: "Summoned three hundred bishops, paid their travel out of the imperial post, chaired the proceedings, and pressed them into a creed that most of Christianity still recites. He held no clerical office of any kind. The precedent — the ruler as convener and guarantor of orthodoxy — became the expectation in the east and a thousand-year argument in the west." },
    gold: { label: "A New Rome", when: "AD 330",
      blurb: "Refounded Byzantium as his capital on a defensible promontory near both threatened frontiers, with a Senate, free grain and walls. The empire's centre moved east to the richer half — which is why, when the western provinces went, the eastern empire simply carried on calling itself Roman for another eleven hundred years." },
  },
  claims: [
    { text: "Constantine was proclaimed emperor by the army at York in AD 306.", classification: "Established", sources: ["eusebius", "cah"], date: "AD 306", at: "bronze" },
    { text: "He defeated Maxentius at the Milvian Bridge in October AD 312.", classification: "Established", sources: ["eusebius", "zosimus"], date: "AD 312", at: "bronze" },
    { text: "Lactantius and Eusebius give incompatible accounts of the vision before the battle.", classification: "Contested", sources: ["eusebius", "cah"], date: "AD 312", at: "bronze" },
    { text: "The agreement of AD 313 granted free choice of religion and restored confiscated church property.", classification: "Established", sources: ["eusebius", "cah"], date: "AD 313", at: "bronze" },
    { text: "He convened, funded and presided over the Council of Nicaea.", classification: "Established", sources: ["eusebius", "cah"], date: "AD 325", at: "silver" },
    { text: "The council adopted homoousios to exclude the Arian position; the dispute continued regardless.", classification: "Established", sources: ["eusebius", "cah"], date: "AD 325", at: "silver" },
    { text: "He was baptised only shortly before his death.", classification: "Established", sources: ["eusebius"], date: "AD 337", at: "silver" },
    { text: "Constantinople was dedicated in AD 330 and the eastern empire ruled from it until 1453.", classification: "Established", sources: ["cah", "arch"], date: "AD 330", at: "gold" },
    { text: "Whether his conversion was conviction, calculation or both cannot be settled from the evidence.", classification: "Interpretation", sources: ["cah"], date: "AD 312 – 337", at: "gold" },
  ],
  connections: [ { charId: "diocletian", relation: "served under his tetrarchy and reversed its religious policy" }, { charId: "carausius", relation: "the British usurpation his father ended" }, { name: "Nicaea", type: "event" }, { name: "Constantinople", type: "place" } ],
},

"ammianus": {
  id: "ammianus", name: "Ammianus Marcellinus", years: "c. AD 330 – 395", sets: ["roman-empire"],
  requires: { bronze: ["emp-barbarians"] },
  tiers: {
    bronze: { label: "The Last History in Latin", when: "c. AD 390",
      blurb: "A Greek from Antioch who served as a staff officer, survived a siege, and then wrote the last great history in Latin — the only major narrative for the fourth century. He is at Adrianople in a way no other late source manages, and he records that the Roman officers receiving the Gothic refugees extorted them and sold them dogs to eat at the price of a child apiece." },
  },
  claims: [
    { text: "Ammianus served as a staff officer in the eastern army before writing his history.", classification: "Established", sources: ["ammianus", "cah"], date: "AD 353 – 363", at: "bronze" },
    { text: "His Res Gestae is the principal narrative source for the fourth century; the first thirteen books are lost.", classification: "Established", sources: ["ammianus"], date: "c. AD 390", at: "bronze" },
    { text: "He reports that Roman officers extorted the Gothic refugees admitted in AD 376.", classification: "Probable", sources: ["ammianus"], date: "AD 376", at: "bronze" },
    { text: "He calls Adrianople the heaviest Roman defeat since Cannae and says barely a third escaped.", classification: "Established", sources: ["ammianus"], date: "AD 378", at: "bronze" },
    { text: "A Greek writing in Latin, he was a pagan who wrote about Christians without hostility.", classification: "Probable", sources: ["ammianus", "cah"], date: "c. AD 390", at: "bronze" },
  ],
  connections: [ { name: "Adrianople", type: "event" }, { name: "Goths", type: "org" }, { name: "Antioch", type: "place" } ],
},

});
