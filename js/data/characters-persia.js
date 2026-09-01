/* =====================================================================
   Cards from the Persia syllabus.

   No Artemisia card. Her substance is Salamis, and battles belong to
   the Greco-Persian Wars entry — the same reason there is no Leonidas
   card in the Greece Set. Both arrive when that war entry opens.

   Every Greek-sourced claim here is marked as such. For most of these
   people the hostile Greek portrait IS the surviving record, and the
   honest move is to say so on the card rather than launder it.
   ===================================================================== */

Object.assign(CHARACTERS, {

"cyrus": {
  id: "cyrus", name: "Cyrus the Great", years: "c. 600 – 530 BC", sets: ["persia"],
  requires: { bronze: ["per-cyrus", "per-babylon"], silver: ["per-empire", "per-religion"], gold: ["per-fall", "grk-persia"] },
  tiers: {
    bronze: { label: "The Vassal Who Took the World", when: "539 BC",
      blurb: "Revolted against his Median overlords, and within twenty years held more of the earth than anyone before him — Anatolia to the Indus, the Nile eventually, Babylon without a fight. He arrived in conquered cities speaking their language and funding their gods, which was cheaper than garrisons and worked better.",
      stats: { power: 88, intellect: 86, influence: 90, creativity: 84, wealth: 88, fame: 84 } },
    silver: { label: "The Policy, Not the Virtue", when: "The empire he designed",
      blurb: "Left local law, language, religion and often rulers in place, and required only tribute, troops and quiet. It was unusually consistent tolerance and it was administration, not philosophy — an empire that size is cheaper to hold if you leave people's gods alone. The design outlasted his dynasty by centuries.",
      stats: { power: 88, intellect: 90, influence: 94, creativity: 88, wealth: 90, fame: 88 } },
    gold: { label: "Everyone's Cyrus", when: "The afterlife of a reputation",
      blurb: "The Hebrew Bible calls him God's anointed — the only foreigner it does. Xenophon made him a model prince for Greek readers who despised Persia. The last Shah made his cylinder a human rights charter. Alexander repaired his tomb. Almost nobody who has claimed him wanted the same thing, which is the surest sign the record is thin enough to fill in.",
      stats: { power: 88, intellect: 92, influence: 96, creativity: 90, wealth: 90, fame: 96 } },
  },
  claims: [
    { text: "Cyrus overthrew Median overlordship around 550 BC and took Ecbatana.", classification: "Established", sources: ["herodotus", "cah"], date: "c. 550 BC", at: "bronze" },
    { text: "He took Lydia around 546 BC, bringing the Ionian Greek cities under Persian rule.", classification: "Established", sources: ["herodotus", "cah"], date: "c. 546 BC", at: "bronze" },
    { text: "Babylon fell in 539 BC with little fighting, per the Nabonidus Chronicle.", classification: "Established", sources: ["cyrus-cylinder", "cah"], date: "539 BC", at: "bronze" },
    { text: "His childhood as told by Herodotus, Xenophon and Ctesias is three incompatible legends.", classification: "Traditional / Legendary", sources: ["herodotus", "xenophon", "ctesias"], date: "6th c. BC", at: "bronze" },
    { text: "The Cylinder records restoring sanctuaries and returning displaced peoples to their homes.", classification: "Established", sources: ["cyrus-cylinder"], date: "539 BC", at: "silver" },
    { text: "The Hebrew Bible credits him with permitting the Judaean return and the rebuilding of the Temple.", classification: "Probable", sources: ["hebrew-bible", "cah"], date: "c. 538 BC", at: "silver" },
    { text: "Reading the Cylinder as the first charter of human rights is a modern claim, promoted from 1971 and rejected by most Assyriologists.", classification: "Interpretation", sources: ["cah"], date: "1971 onwards", at: "gold" },
  ],
  connections: [ { charId: "cambyses", relation: "father of" }, { charId: "darius1", relation: "succeeded by" }, { name: "Babylon", type: "place" }, { name: "Pasargadae", type: "place" }, { name: "Cyrus Cylinder", type: "concept" } ],
},

"cambyses": {
  id: "cambyses", name: "Cambyses II", years: "d. 522 BC", sets: ["persia"],
  requires: { bronze: ["per-cambyses", "per-cyrus"] },
  tiers: { bronze: { label: "The Libelled King", when: "525 BC",
    blurb: "Conquered Egypt and completed his father's empire, then acquired a Greek reputation as a sacrilegious madman who stabbed the sacred Apis bull and laughed. The Apis burial from his reign sits at Saqqara, conducted with full honours, its stela showing Cambyses himself making the offering in proper pharaonic form. He is the app's clearest case of a hostile source caught by the evidence on the ground.",
    stats: { power: 78, intellect: 62, influence: 66, creativity: 48, wealth: 82, fame: 52 } } },
  claims: [
    { text: "Cambyses conquered Egypt in 525 BC, winning at Pelusium and taking Memphis.", classification: "Established", sources: ["herodotus", "cah"], date: "525 BC", at: "bronze" },
    { text: "Herodotus reports that he stabbed the Apis bull in contempt and was driven mad.", classification: "Contested", sources: ["herodotus"], date: "c. 524 BC", at: "bronze" },
    { text: "The Apis burial of his reign at the Saqqara Serapeum was conducted with full honours in his name.", classification: "Established", sources: ["arch"], date: "524 BC", at: "bronze" },
    { text: "He adopted pharaonic titles and consulted Egyptian advisers.", classification: "Established", sources: ["arch", "cah"], date: "525 – 522 BC", at: "bronze" },
    { text: "Cuts to Egyptian temple revenues under his rule are attested, and may lie behind the priestly hostility.", classification: "Probable", sources: ["arch", "cah"], date: "525 – 522 BC", at: "bronze" },
  ],
  connections: [ { charId: "cyrus", relation: "son of" }, { charId: "darius1", relation: "succeeded by" }, { name: "Saqqara Serapeum", type: "place" }, { name: "Conquest of Egypt", type: "event" } ],
},

"darius1": {
  id: "darius1", name: "Darius I", years: "c. 550 – 486 BC", sets: ["persia"],
  requires: { bronze: ["per-darius", "per-empire"], silver: ["per-persepolis", "per-religion"], gold: ["per-west", "grk-persia"] },
  tiers: {
    bronze: { label: "The Man Who Said He Was Not Lying", when: "522 BC",
      blurb: "Took the throne by killing the man sitting on it, then carved his justification a hundred metres up a cliff at Behistun in three languages, insisting nineteen times that he was telling the truth. Whether the man he killed was an impostor or the rightful king has been argued for over a century, and the convenience of his version is hard to miss.",
      stats: { power: 84, intellect: 90, influence: 86, creativity: 82, wealth: 88, fame: 76 } },
    silver: { label: "The Administrator", when: "The empire that worked",
      blurb: "Divided the empire into satrapies with assessed tribute, drove a 2,700 km road from Sardis to Susa with relay couriers who crossed it in a week, minted a gold coinage anyone would accept, and standardised weights and measures. None of it is glamorous and all of it is why an empire of that size held together for two centuries.",
      stats: { power: 84, intellect: 94, influence: 90, creativity: 88, wealth: 92, fame: 80 } },
    gold: { label: "Rosetta of the East", when: "Read in 1847",
      blurb: "Because he repeated himself in Old Persian, Elamite and Akkadian, the cliff he carved to defend a coup became the key that unlocked cuneiform — and with it two thousand years of Mesopotamian records that had been unreadable since antiquity. A usurper's defence statement is the reason we can read Babylon.",
      stats: { power: 84, intellect: 96, influence: 92, creativity: 90, wealth: 92, fame: 88 } },
  },
  claims: [
    { text: "Darius took the throne in 522 BC after killing the reigning claimant, then suppressed revolts across the empire for a year.", classification: "Established", sources: ["behistun", "herodotus"], date: "522 – 521 BC", at: "bronze" },
    { text: "Whether the man he killed was the impostor Gaumata or the true Bardiya has been disputed for over a century.", classification: "Contested", sources: ["behistun", "herodotus", "cah"], date: "522 BC", at: "bronze" },
    { text: "The Behistun inscription is trilingual and sits roughly 100 metres above the road, unreadable from the ground.", classification: "Established", sources: ["behistun", "arch"], date: "c. 520 BC", at: "bronze" },
    { text: "He organised roughly twenty satrapies with fixed assessed tribute.", classification: "Established", sources: ["herodotus", "cah"], date: "c. 518 BC", at: "silver" },
    { text: "He issued the daric and standardised weights and measures across the empire.", classification: "Established", sources: ["cah", "arch"], date: "c. 515 BC", at: "silver" },
    { text: "The trilingual text was the principal key to the decipherment of cuneiform in the 1840s.", classification: "Established", sources: ["cah"], date: "1835 – 1847", at: "gold" },
  ],
  connections: [ { charId: "cyrus", relation: "claimed descent from" }, { charId: "atossa", relation: "married" }, { charId: "xerxes", relation: "father of" }, { name: "Behistun", type: "place" }, { name: "Persepolis", type: "place" }, { name: "Royal Road", type: "concept" } ],
},

"atossa": {
  id: "atossa", name: "Atossa", years: "c. 550 – c. 475 BC", sets: ["persia"],
  requires: { bronze: ["per-darius", "per-empire"], silver: ["per-persepolis", "per-west"] },
  tiers: {
    bronze: { label: "Daughter, Wife, Mother of Kings", when: "c. 522 BC",
      blurb: "Daughter of Cyrus, married to Darius, mother of Xerxes — the join between the two Achaemenid lines, and the reason Darius's claim to the throne looked less like a coup. Herodotus gives her real influence at court, including over the succession. He is a Greek writing decades later about the private conversations of a Persian queen, which is worth remembering before quoting him.",
      stats: { power: 40, intellect: 82, influence: 86, creativity: 64, wealth: 88, fame: 58 } },
    silver: { label: "What the Tablets Show", when: "The Persepolis archive",
      blurb: "The administrative record does something the Greek gossip cannot: it shows royal women in the Achaemenid system holding estates, commanding workforces, travelling with retinues and issuing orders under their own seals. Women in the wider workforce appear as supervisors, sometimes paid more than the men beneath them, with rations issued for childbirth as routine. Not a queen's whispered influence — an institutional position.",
      stats: { power: 46, intellect: 84, influence: 88, creativity: 66, wealth: 90, fame: 62 } },
  },
  claims: [
    { text: "Atossa was a daughter of Cyrus, a wife of Darius I and the mother of Xerxes.", classification: "Established", sources: ["herodotus", "cah"], date: "c. 522 BC", at: "bronze" },
    { text: "Her marriage linked Darius to the line of Cyrus and strengthened his contested claim.", classification: "Probable", sources: ["herodotus", "cah"], date: "522 BC", at: "bronze" },
    { text: "Herodotus depicts her influencing Darius over the succession and over campaigning westward.", classification: "Contested", sources: ["herodotus"], date: "c. 500 BC", at: "bronze" },
    { text: "Persepolis tablets record royal women holding estates, commanding workers and sealing their own orders.", classification: "Established", sources: ["pft"], date: "509 – 493 BC", at: "silver" },
    { text: "The tablets record women supervising mixed workforces, at times paid above the men they supervised, and rations issued for childbirth.", classification: "Established", sources: ["pft"], date: "509 – 493 BC", at: "silver" },
    { text: "Aeschylus put her on the Athenian stage in The Persians in 472 BC, within living memory of the war.", classification: "Established", sources: ["cah"], date: "472 BC", at: "silver" },
  ],
  connections: [ { charId: "cyrus", relation: "daughter of" }, { charId: "darius1", relation: "married" }, { charId: "xerxes", relation: "mother of" }, { name: "Persepolis Fortification Tablets", type: "concept" } ],
},

"xerxes": {
  id: "xerxes", name: "Xerxes I", years: "c. 518 – 465 BC", sets: ["persia"],
  requires: { bronze: ["per-west", "per-darius"], silver: ["per-persepolis", "per-religion"] },
  tiers: {
    bronze: { label: "The Greek Villain", when: "480 BC",
      blurb: "In Greek writing he is the archetype of the eastern despot — whipping the sea for wrecking his bridge, throned above Salamis to watch his defeat, ruined by luxury and rage. Aeschylus put him on stage eight years after the invasion, in a play performed for the men who had beaten him. That is the portrait that survived, and it was made by the winners for an audience that wanted it.",
      stats: { power: 80, intellect: 62, influence: 78, creativity: 54, wealth: 92, fame: 88 } },
    silver: { label: "The Builder Who Reigned Fifteen More Years", when: "465 BC",
      blurb: "The Persian record shows something duller and more plausible: a king who finished the Gate of All Nations and the Hall of a Hundred Columns at Persepolis, held an empire that had lost a frontier campaign, and reigned another fifteen years before being murdered in a palace conspiracy. No royal inscription mentions Greece at all. Kings recorded victories, and the silence is its own kind of evidence.",
      stats: { power: 82, intellect: 72, influence: 82, creativity: 70, wealth: 94, fame: 90 } },
  },
  claims: [
    { text: "Xerxes led the invasion of Greece in 480 BC and withdrew after its failure.", classification: "Established", sources: ["herodotus", "cah"], date: "480 – 479 BC", at: "bronze" },
    { text: "Herodotus' figure of over a million men is impossible; modern estimates are a small fraction of it.", classification: "Contested", sources: ["herodotus", "cah"], date: "480 BC", at: "bronze" },
    { text: "The portrait of him as a despot ruined by rage and luxury comes from Greek writers and from Aeschylus, staged in 472 BC for Athenians who had fought him.", classification: "Established", sources: ["herodotus", "cah"], date: "472 BC onwards", at: "bronze" },
    { text: "He completed major works at Persepolis including the Gate of All Nations.", classification: "Established", sources: ["arch"], date: "c. 475 BC", at: "silver" },
    { text: "No Achaemenid royal inscription commemorates the Greek campaign.", classification: "Established", sources: ["behistun", "cah"], date: "480 BC onwards", at: "silver" },
    { text: "He was murdered in a court conspiracy in 465 BC.", classification: "Established", sources: ["ctesias", "cah"], date: "465 BC", at: "silver" },
  ],
  connections: [ { charId: "darius1", relation: "son of" }, { charId: "atossa", relation: "son of" }, { charId: "themistokles", relation: "defeated by, and later host to" }, { name: "Persepolis", type: "place" }, { name: "Greco-Persian Wars", type: "event" } ],
},

"artaxerxes2": {
  id: "artaxerxes2", name: "Artaxerxes II", years: "d. 358 BC", sets: ["persia"],
  requires: { bronze: ["per-after"], silver: ["per-after", "grk-pelop", "per-empire"] },
  tiers: {
    bronze: { label: "The King's Peace", when: "387 BC",
      blurb: "Stopped trying to conquer Greece and started arbitrating it. In 387 BC the exhausted Greek states accepted terms dictated from Susa: the cities of Asia were his, everyone else was autonomous, and he was the guarantor. They called it the King's Peace, which is an admission in the name.",
      stats: { power: 64, intellect: 84, influence: 92, creativity: 76, wealth: 90, fame: 54 } },
    silver: { label: "Gold Instead of Armies", when: "The long century",
      blurb: "Persian money funded whichever Greek side was losing, keeping the wars going and every participant weak. Athens fell in 404 BC to a fleet Persia had paid for, in exchange for the Ionian Greeks — everything the defence of 480 BC had been about, traded away by the state that had led it. Two invasions failed. Subsidy worked, and cost a fraction as much.",
      stats: { power: 66, intellect: 88, influence: 94, creativity: 82, wealth: 92, fame: 60 } },
  },
  claims: [
    { text: "The King's Peace of 387 BC awarded the Asian Greek cities to Persia and made the King guarantor of the other states' autonomy.", classification: "Established", sources: ["xenophon", "cah"], date: "387 BC", at: "bronze" },
    { text: "Greek states competed for Persian favour and subsidy for roughly fifty years afterwards.", classification: "Established", sources: ["xenophon", "cah"], date: "387 – 340 BC", at: "bronze" },
    { text: "Persian satraps funded both sides in the Peloponnesian War at different stages.", classification: "Established", sources: ["thucydides", "xenophon"], date: "412 – 404 BC", at: "silver" },
    { text: "Sparta obtained Persian naval funding by conceding the Ionian Greeks to Persia.", classification: "Established", sources: ["thucydides", "xenophon"], date: "412 BC", at: "silver" },
    { text: "Egypt revolted successfully around 404 BC and was not reconquered until the 340s BC.", classification: "Established", sources: ["diodorus", "cah"], date: "404 – 343 BC", at: "silver" },
  ],
  connections: [ { charId: "xerxes", relation: "descendant of" }, { charId: "darius3", relation: "dynasty of" }, { name: "The King's Peace", type: "event" }, { name: "Susa", type: "place" } ],
},

"darius3": {
  id: "darius3", name: "Darius III", years: "c. 380 – 330 BC", sets: ["persia"],
  requires: { bronze: ["per-fall"], silver: ["per-fall", "per-after", "grk-philip"] },
  tiers: {
    bronze: { label: "The King Who Lost", when: "330 BC",
      blurb: "Beaten at Issus and Gaugamela, fled east, and was murdered by his own satrap Bessus before Alexander could catch him. His reputation as a coward and an incompetent rests almost entirely on Greek and Roman writers, who had every reason for the man Alexander beat to look beatable.",
      stats: { power: 58, intellect: 56, influence: 62, creativity: 44, wealth: 86, fame: 62 } },
    silver: { label: "Not a Rotten Empire", when: "Read against the evidence",
      blurb: "The story of a decadent Persia collapsing under its own weight is read backwards from its defeat, by sources invested in that reading. The empire it describes had dictated peace terms to Greece in 387 BC and reconquered Egypt in the 340s. It did not rot. It lost to an exceptional general with an army built for exactly this, in four years — and its administration was good enough that the conqueror kept it.",
      stats: { power: 60, intellect: 62, influence: 66, creativity: 46, wealth: 86, fame: 66 } },
  },
  claims: [
    { text: "Darius III was defeated at Issus in 333 BC and Gaugamela in 331 BC.", classification: "Established", sources: ["arrian", "diodorus"], date: "333 – 331 BC", at: "bronze" },
    { text: "He was murdered in 330 BC by the satrap Bessus while fleeing east.", classification: "Established", sources: ["arrian"], date: "330 BC", at: "bronze" },
    { text: "His reputation for cowardice derives from Greek and Roman authors writing to magnify Alexander.", classification: "Interpretation", sources: ["arrian", "cah"], date: "4th c. BC onwards", at: "bronze" },
    { text: "Persepolis burned in 330 BC; the destruction layer is unambiguous and baked the archive hard enough to preserve it.", classification: "Established", sources: ["arch"], date: "330 BC", at: "silver" },
    { text: "Whether the burning was a drunken act or deliberate policy is disputed between ancient traditions and unresolvable from the archaeology.", classification: "Contested", sources: ["arrian", "diodorus"], date: "330 BC", at: "silver" },
    { text: "Alexander and then the Seleucids retained the satrapal system, tribute and road network largely intact.", classification: "Established", sources: ["arrian", "cah"], date: "330 BC onwards", at: "silver" },
  ],
  connections: [ { charId: "artaxerxes2", relation: "dynasty of" }, { charId: "alexander", relation: "defeated by" }, { charId: "philip2", relation: "target of" }, { name: "Gaugamela", type: "place" }, { name: "Persepolis", type: "place" } ],
},

});
