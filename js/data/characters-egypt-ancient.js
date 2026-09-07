/* =====================================================================
   Cards from the Ancient Egypt syllabus.

   The patron is Narmer, and he is the only patron in the app whose
   identity is genuinely uncertain. That is deliberate: the Set opens by
   telling you that the man who founded Egypt may not have been called
   what Egypt called him, and the card says so on its face.

   Merer is here for the same reason the Vindolanda tablets earn a card
   in Britain. A working inspector's logbook of stone deliveries tells
   you more about how a pyramid was built than every monument in Egypt,
   and it survives because nobody thought it mattered.
   ===================================================================== */

Object.assign(CHARACTERS, {

"narmer": {
  id: "narmer", name: "Narmer", years: "fl. c. 3100 BC", sets: ["ancient-egypt"],
  requires: { bronze: ["egy-menes"], silver: ["egy-menes", "egy-predynastic"] },
  tiers: {
    bronze: { label: "The Man on the Palette", when: "c. 3100 BC",
      blurb: "Shown on a ceremonial palette wearing the crown of Upper Egypt on one face and the crown of Lower Egypt on the other, mace raised over a kneeling captive. It is the founding image of Egyptian kingship and it is not a battle report — the same pose was still being carved for Roman emperors three thousand years later." },
    silver: { label: "Or Possibly Not Narmer", when: "The problem",
      blurb: "Egypt remembered its first king as Menes and no contemporary object carries that name. Narmer is one candidate and his successor Hor-Aha is the other, and the argument has run since the nineteenth century without resolution. What certainly happened is administrative: a capital at Memphis, sealings at both ends of the country, and the start of recorded time." },
  },
  claims: [
    { text: "The Narmer Palette shows one ruler wearing both the white and red crowns.", classification: "Established", sources: ["arch"], date: "c. 3100 BC", at: "bronze" },
    { text: "The smiting pose is a ceremonial formula, reused for three thousand years.", classification: "Established", sources: ["arch", "cah"], date: "3100 BC – AD 100", at: "bronze" },
    { text: "Egyptian tradition named the first king Menes.", classification: "Established", sources: ["manetho", "king-lists"], date: "later tradition", at: "bronze" },
    { text: "Whether Menes was Narmer, Hor-Aha, or a composite of both is unresolved.", classification: "Contested", sources: ["king-lists", "cah"], date: "c. 3100 BC", at: "silver" },
    { text: "Upper Egyptian material culture spread north through the Naqada III period.", classification: "Established", sources: ["arch"], date: "c. 3300 – 3100 BC", at: "silver" },
    { text: "Whether unification took a war, several, or none is not known.", classification: "Unknown", sources: ["arch", "cah"], date: "c. 3100 BC", at: "silver" },
  ],
  connections: [ { name: "Memphis", type: "place" }, { name: "The Two Lands", type: "concept" }, { name: "Narmer Palette", type: "concept" } ],
},

"imhotep": {
  id: "imhotep", name: "Imhotep", years: "fl. c. 2670 BC", sets: ["ancient-egypt"],
  requires: { bronze: ["egy-pyramids"] },
  tiers: {
    bronze: { label: "The First Architect With a Name", when: "c. 2670 BC",
      blurb: "Djoser's chief official, credited by Egyptian tradition with the Step Pyramid at Saqqara — the first monumental stone building anywhere. He is one of very few architects in history whose name outlived his building, and Egypt eventually worshipped him as a god of medicine two thousand years after his death." },
  },
  claims: [
    { text: "The Step Pyramid at Saqqara is the earliest monumental stone building known.", classification: "Established", sources: ["arch"], date: "c. 2670 BC", at: "bronze" },
    { text: "It was enlarged in stages from an original flat mastaba.", classification: "Established", sources: ["arch"], date: "c. 2670 BC", at: "bronze" },
    { text: "Imhotep's name appears on a statue base of Djoser, confirming he was a real official.", classification: "Established", sources: ["arch"], date: "c. 2670 BC", at: "bronze" },
    { text: "That he personally designed the pyramid is Egyptian tradition rather than contemporary record.", classification: "Traditional / Legendary", sources: ["manetho", "cah"], date: "later tradition", at: "bronze" },
    { text: "He was deified as a god of medicine in the Late Period.", classification: "Established", sources: ["arch", "herodotus"], date: "c. 600 BC", at: "bronze" },
  ],
  connections: [ { name: "Saqqara", type: "place" }, { name: "Step Pyramid", type: "concept" } ],
},

"khufu": {
  id: "khufu", name: "Khufu", years: "r. c. 2589 – 2566 BC", sets: ["ancient-egypt"],
  requires: { bronze: ["egy-pyramids"], silver: ["egy-pyramids", "egy-oldkingdom"] },
  tiers: {
    bronze: { label: "The Great Pyramid", when: "c. 2560 BC",
      blurb: "Built the largest building in the world and held the record for nearly four thousand years. Two and a half million blocks, sides level to a few centimetres, aligned to true north within a fraction of a degree — and the only certain likeness of him is an ivory figurine three inches high." },
    silver: { label: "The King in the Paperwork", when: "Year 27",
      blurb: "A logbook found at Wadi al-Jarf in 2013 records an inspector named Merer shipping limestone to his pyramid, week by week, naming the official in charge. It is the oldest inscribed papyrus known and it turns the Great Pyramid from a mystery into a delivery schedule." },
  },
  claims: [
    { text: "The Great Pyramid was the tallest structure built by humans until the 14th century AD.", classification: "Established", sources: ["arch"], date: "c. 2560 BC", at: "bronze" },
    { text: "Its sides are aligned to true north to within about a twentieth of a degree.", classification: "Established", sources: ["arch"], date: "c. 2560 BC", at: "bronze" },
    { text: "The only identified portrait of Khufu is a three-inch ivory statuette.", classification: "Established", sources: ["arch"], date: "c. 2560 BC", at: "bronze" },
    { text: "The Wadi al-Jarf papyri date to his 27th regnal year and record limestone deliveries to Giza.", classification: "Established", sources: ["wadi-jarf"], date: "c. 2562 BC", at: "silver" },
    { text: "Herodotus' account of Khufu as a tyrant who used slaves was written two thousand years later.", classification: "Contested", sources: ["herodotus", "cah"], date: "c. 440 BC", at: "silver" },
    { text: "The Giza workers' cemetery shows a fed workforce with medical treatment and their own tombs.", classification: "Established", sources: ["arch"], date: "c. 2560 BC", at: "silver" },
  ],
  connections: [ { charId: "merer", relation: "shipped the stone for his pyramid" }, { name: "Giza", type: "place" }, { name: "Great Pyramid", type: "concept" } ],
},

"merer": {
  id: "merer", name: "Merer", years: "fl. c. 2562 BC", sets: ["ancient-egypt"],
  requires: { bronze: ["egy-pyramids"] },
  tiers: {
    bronze: { label: "The Inspector's Logbook", when: "c. 2562 BC",
      blurb: "Commanded about forty men and kept a diary. Sail to Tura, load limestone, sail to Giza, unload, repeat — with rations issued and officials met. Found at Wadi al-Jarf in 2013, it is the oldest inscribed papyrus in existence and the only contemporary account of building the Great Pyramid, written by a middle manager who had no idea anyone would read it." },
  },
  claims: [
    { text: "The Wadi al-Jarf papyri are the oldest inscribed papyri yet found.", classification: "Established", sources: ["wadi-jarf", "arch"], date: "c. 2562 BC", at: "bronze" },
    { text: "Merer's logbook records round trips carrying Tura limestone to the Giza construction site.", classification: "Established", sources: ["wadi-jarf"], date: "c. 2562 BC", at: "bronze" },
    { text: "It names Ankhhaef, the king's half-brother, as the official in overall charge.", classification: "Established", sources: ["wadi-jarf"], date: "c. 2562 BC", at: "bronze" },
    { text: "The logbook implies a permanent organised workforce rather than mass forced labour.", classification: "Probable", sources: ["wadi-jarf", "arch"], date: "c. 2562 BC", at: "bronze" },
  ],
  connections: [ { charId: "khufu", relation: "delivered stone for his pyramid" }, { name: "Wadi al-Jarf", type: "place" }, { name: "Tura", type: "place" } ],
},

"senusret3": {
  id: "senusret3", name: "Senusret III", years: "r. c. 1878 – 1839 BC", sets: ["ancient-egypt"],
  requires: { bronze: ["egy-middle-kingdom"] },
  tiers: {
    bronze: { label: "The Face That Changed", when: "c. 1860 BC",
      blurb: "Pushed the border deep into Nubia, built fortresses with walls eight metres thick and paperwork logging everyone who crossed, and left a boundary stela telling his own successors that any son of his who let the line slip is no son of his. His portraits abandon the serene royal ideal for heavy lids and deep lines — the sharpest stylistic break in three thousand years of Egyptian art." },
  },
  claims: [
    { text: "Senusret III fortified the Second Cataract with a chain of mud-brick fortresses.", classification: "Established", sources: ["arch"], date: "c. 1860 BC", at: "bronze" },
    { text: "Semna texts record officials logging Nubians crossing north and sending them back.", classification: "Established", sources: ["arch"], date: "c. 1860 BC", at: "bronze" },
    { text: "His boundary stela instructs future kings to hold the frontier he set.", classification: "Established", sources: ["arch"], date: "c. 1860 BC", at: "bronze" },
    { text: "Whether his careworn portraits reflect the man or an ideological shift is disputed.", classification: "Interpretation", sources: ["cah"], date: "c. 1860 BC", at: "bronze" },
  ],
  connections: [ { name: "Nubia", type: "place" }, { name: "Buhen", type: "place" } ],
},

"hatshepsut": {
  id: "hatshepsut", name: "Hatshepsut", years: "r. c. 1479 – 1458 BC", sets: ["ancient-egypt"],
  requires: { bronze: ["egy-empire"], silver: ["egy-empire", "egy-akhenaten"] },
  tiers: {
    bronze: { label: "King, Not Queen", when: "c. 1473 BC",
      blurb: "Took the full royal titulary at a time when Egyptian had no word, image or ritual for a female king. Her monuments improvise: the kilt, the false beard and the male body of a pharaoh, with feminine grammar in the text beside them, so the same statue can be visually male and textually female. Two decades of prosperity, a trading fleet to Punt, and a temple that quotes the architecture of the king who last reunified Egypt." },
    silver: { label: "Chiselled Out", when: "c. 1440 BC",
      blurb: "Twenty years after her death her statues were smashed and buried, her cartouches cut from walls and her name left off the king lists. The delay is the clue: this was not Thutmose III's revenge but the removal of a precedent, at the point he needed the throne secured for his own son. On that reading the attack was on the idea that a woman could hold the office, which is worse." },
  },
  claims: [
    { text: "Hatshepsut ruled as king with the full five-part royal titulary.", classification: "Established", sources: ["arch"], date: "c. 1473 BC", at: "bronze" },
    { text: "Her monuments show her in male royal form, sometimes with feminine grammatical forms in the text.", classification: "Established", sources: ["arch"], date: "c. 1470 BC", at: "bronze" },
    { text: "Reliefs at Deir el-Bahari record a trading expedition to Punt in detail.", classification: "Established", sources: ["arch"], date: "c. 1470 BC", at: "bronze" },
    { text: "Her images and cartouches were systematically attacked about twenty years after her death.", classification: "Established", sources: ["arch"], date: "c. 1440 BC", at: "silver" },
    { text: "The delay argues against personal revenge and for securing Thutmose III's own succession.", classification: "Interpretation", sources: ["cah"], date: "c. 1440 BC", at: "silver" },
    { text: "She is absent from the Abydos and Turin king lists.", classification: "Established", sources: ["king-lists"], date: "c. 1290 BC", at: "silver" },
  ],
  connections: [ { charId: "thutmose3", relation: "stepson, regent for, later erased by" }, { name: "Deir el-Bahari", type: "place" }, { name: "Punt", type: "place" } ],
},

"thutmose3": {
  id: "thutmose3", name: "Thutmose III", years: "r. c. 1479 – 1425 BC", sets: ["ancient-egypt"],
  requires: { bronze: ["egy-empire"] },
  tiers: {
    bronze: { label: "Megiddo", when: "c. 1457 BC",
      blurb: "Campaigned in the Levant seventeen times in twenty years and built the largest empire Egypt ever held. His annals at Karnak, copied from an army scribe's day-book, are the earliest detailed battle account in human history — and they record his own army throwing away the pursuit by stopping to loot, which royal inscriptions do not normally do." },
  },
  claims: [
    { text: "The Karnak annals were copied from a leather-roll day-book kept on campaign.", classification: "Probable", sources: ["arch"], date: "c. 1450 BC", at: "bronze" },
    { text: "He took the narrow Aruna pass to Megiddo against his officers' advice.", classification: "Established", sources: ["arch"], date: "c. 1457 BC", at: "bronze" },
    { text: "The annals record the army looting the camp instead of pursuing, forcing a seven-month siege.", classification: "Established", sources: ["arch"], date: "c. 1457 BC", at: "bronze" },
    { text: "The empire was held through local rulers whose sons were educated at the Egyptian court.", classification: "Established", sources: ["arch", "amarna"], date: "c. 1450 – 1350 BC", at: "bronze" },
  ],
  connections: [ { charId: "hatshepsut", relation: "stepmother and predecessor, whose name he erased" }, { name: "Megiddo", type: "event" }, { name: "Karnak", type: "place" } ],
},

"akhenaten": {
  id: "akhenaten", name: "Akhenaten", years: "r. c. 1353 – 1336 BC", sets: ["ancient-egypt"],
  requires: { bronze: ["egy-akhenaten"], silver: ["egy-akhenaten", "egy-empire"] },
  tiers: {
    bronze: { label: "The Aten Alone", when: "c. 1348 BC",
      blurb: "Closed the temples, suppressed Amun — hacking the name out of his own father's cartouche — moved the capital to virgin desert and worshipped the visible disc of the sun. Whether it counts as monotheism is arguable, since access to the god ran through him: at Amarna, people are shown worshipping the royal family, who worship the Aten." },
    silver: { label: "The Letters in the Rubbish", when: "c. 1350 BC",
      blurb: "His reign is documented by 382 clay tablets found by a woman digging for fertiliser in 1887 — the Egyptian foreign office archive, in Akkadian, with great kings haggling over gold and Levantine vassals begging for archers. Whether Egypt's non-committal replies show a king neglecting his empire or an imperial power letting vassals exhaust each other is still argued." },
  },
  claims: [
    { text: "He changed his name from Amenhotep IV and founded a new capital at Akhetaten.", classification: "Established", sources: ["arch"], date: "c. 1348 BC", at: "bronze" },
    { text: "The names of Amun were hacked out of inscriptions across Egypt during his reign.", classification: "Established", sources: ["arch"], date: "c. 1345 BC", at: "bronze" },
    { text: "Amarna art applies its elongated style to courtiers as well as the royal family.", classification: "Established", sources: ["arch"], date: "c. 1345 BC", at: "bronze" },
    { text: "Medical explanations for the royal physique are proposed but none is established.", classification: "Contested", sources: ["cah"], date: "modern debate", at: "bronze" },
    { text: "The Amarna letters are 382 diplomatic tablets written in Akkadian.", classification: "Established", sources: ["amarna"], date: "c. 1360 – 1332 BC", at: "silver" },
    { text: "Abdi-Heba's letters are the earliest surviving reference to Jerusalem as a political centre.", classification: "Established", sources: ["amarna"], date: "c. 1350 BC", at: "silver" },
    { text: "Whether Egypt's replies show imperial neglect is disputed.", classification: "Contested", sources: ["amarna", "cah"], date: "c. 1350 BC", at: "silver" },
  ],
  connections: [ { name: "Amarna", type: "place" }, { name: "The Aten", type: "concept" }, { name: "Amarna letters", type: "concept" } ],
},

"ramesses2": {
  id: "ramesses2", name: "Ramesses II", years: "r. 1279 – 1213 BC", sets: ["ancient-egypt"],
  requires: { bronze: ["egy-kadesh"], silver: ["egy-kadesh", "egy-sea-peoples"] },
  tiers: {
    bronze: { label: "Kadesh, As He Told It", when: "1274 BC",
      blurb: "Walked into an ambush at Kadesh on the word of two planted scouts, nearly lost his army, and had the battle carved on five temples as a personal triumph. The account admits the ambush and the collapse, because the story needs them — the king alone against the odds. What it cannot admit is the draw, and the Hittite records and the map both say draw." },
    silver: { label: "The Treaty", when: "1258 BC",
      blurb: "Sixteen years later he signed a peace with Hatti that survives in both parties' texts — Egyptian on a temple wall, Akkadian on Hittite clay. Non-aggression, mutual defence, extradition with a clause protecting the returned from punishment. Each copy says the other side asked for peace. It held for decades, and about seventy years later one of the signatories no longer existed." },
  },
  claims: [
    { text: "Ramesses II was deceived by planted scouts before Kadesh in 1274 BC.", classification: "Probable", sources: ["kadesh"], date: "1274 BC", at: "bronze" },
    { text: "The battle is recorded in two Egyptian texts and reliefs on at least five temples.", classification: "Established", sources: ["kadesh", "arch"], date: "c. 1270 BC", at: "bronze" },
    { text: "Hittite records describe Kadesh as their success, and the city stayed Hittite.", classification: "Established", sources: ["cah", "arch"], date: "1274 BC", at: "bronze" },
    { text: "The 1258 BC treaty survives in Egyptian hieroglyphic and Akkadian cuneiform versions.", classification: "Established", sources: ["kadesh", "arch"], date: "1258 BC", at: "silver" },
    { text: "Each version states that the other party requested peace.", classification: "Established", sources: ["kadesh"], date: "1258 BC", at: "silver" },
    { text: "Egypt later shipped grain to Hatti during a famine.", classification: "Probable", sources: ["cah", "arch"], date: "c. 1240 BC", at: "silver" },
  ],
  connections: [ { name: "Kadesh", type: "event" }, { name: "Abu Simbel", type: "place" }, { name: "Hatti", type: "org" } ],
},

"ramesses3": {
  id: "ramesses3", name: "Ramesses III", years: "r. 1186 – 1155 BC", sets: ["ancient-egypt"],
  requires: { bronze: ["egy-sea-peoples"], silver: ["egy-sea-peoples", "egy-decline"] },
  tiers: {
    bronze: { label: "The Last Great Pharaoh", when: "c. 1177 BC",
      blurb: "Beat off a land and sea invasion in the Delta and carved it at Medinet Habu, listing the countries already destroyed — Hatti, Carchemish, Alashiya — in what turns out to be an accurate casualty list for the collapse of the Bronze Age, written while it was happening by the only major power that survived it." },
    silver: { label: "Cut to the Bone", when: "1155 BC",
      blurb: "In his 29th year the men building his tomb walked off the job over unpaid rations — the first recorded strike anywhere. He was then killed in a harem conspiracy documented in trial papyri, and a CT scan published in 2012 found his throat cut through to the vertebrae. The reign that saved Egypt also shows every symptom of a state running out of money." },
  },
  claims: [
    { text: "Medinet Habu records land and sea battles against a coalition around 1177 BC.", classification: "Established", sources: ["medinet-habu"], date: "c. 1177 BC", at: "bronze" },
    { text: "The inscription names Hatti, Carchemish, Arzawa and Alashiya as already destroyed.", classification: "Established", sources: ["medinet-habu"], date: "c. 1177 BC", at: "bronze" },
    { text: "Reliefs show ox-carts with women and children among the attackers.", classification: "Established", sources: ["medinet-habu"], date: "c. 1177 BC", at: "bronze" },
    { text: "The Deir el-Medina workmen struck over unpaid rations in his 29th year.", classification: "Established", sources: ["deir-el-medina"], date: "c. 1159 BC", at: "silver" },
    { text: "Trial papyri record a harem conspiracy against him.", classification: "Established", sources: ["arch"], date: "1155 BC", at: "silver" },
    { text: "A CT scan of his mummy found a deep throat wound.", classification: "Established", sources: ["arch"], date: "2012 study", at: "silver" },
  ],
  connections: [ { name: "Medinet Habu", type: "place" }, { name: "Sea Peoples", type: "org" }, { name: "Deir el-Medina", type: "place" } ],
},

"piye": {
  id: "piye", name: "Piye", years: "r. c. 744 – 714 BC", sets: ["ancient-egypt"],
  requires: { bronze: ["egy-kushites"] },
  tiers: {
    bronze: { label: "The King From Napata", when: "c. 727 BC",
      blurb: "Came north from Kush and took Egypt, and the stela describing it is one of the great Egyptian documents — he pauses for festivals, makes his troops purify themselves, and rebukes an officer for letting captured horses go hungry, saying it distresses him more than anything else the man did. His dynasty ruled sixty years and revived Old Kingdom art and language on purpose." },
  },
  claims: [
    { text: "Piye of Kush campaigned north and took control of Egypt around 727 BC.", classification: "Established", sources: ["arch", "cah"], date: "c. 727 BC", at: "bronze" },
    { text: "His victory stela records him rebuking an officer over the treatment of horses.", classification: "Established", sources: ["arch"], date: "c. 727 BC", at: "bronze" },
    { text: "The Twenty-fifth Dynasty deliberately revived Old and Middle Kingdom styles.", classification: "Established", sources: ["arch"], date: "c. 727 – 656 BC", at: "bronze" },
    { text: "Sudan contains more pyramids than Egypt.", classification: "Established", sources: ["arch"], date: "c. 700 BC – AD 350", at: "bronze" },
    { text: "Nineteenth-century scholarship treated the dynasty as a decline on racial grounds.", classification: "Established", sources: ["cah"], date: "19th century", at: "bronze" },
  ],
  connections: [ { name: "Kush", type: "place" }, { name: "Napata", type: "place" }, { name: "Amun", type: "concept" } ],
},

"udjahorresnet": {
  id: "udjahorresnet", name: "Udjahorresnet", years: "fl. 525 BC", sets: ["ancient-egypt"],
  requires: { bronze: ["egy-persia"] },
  tiers: {
    bronze: { label: "The Man Who Served Both", when: "525 BC",
      blurb: "An Egyptian naval commander who went over to the Persians and wrote his own account of it on a statue. He says he instructed Cambyses in the proper reverence for the goddess Neith and had foreigners cleared from her temple — and his testimony, with an Apis burial paid for by Cambyses, is what overturns Herodotus' story of a mad king desecrating Egypt." },
  },
  claims: [
    { text: "Udjahorresnet served as a naval officer under Egyptian kings and then under Cambyses.", classification: "Established", sources: ["arch"], date: "c. 526 – 519 BC", at: "bronze" },
    { text: "His statue inscription records Cambyses taking Egyptian royal titles.", classification: "Established", sources: ["arch"], date: "c. 522 BC", at: "bronze" },
    { text: "An inscription records an Apis bull buried with honours at Cambyses' expense.", classification: "Established", sources: ["arch"], date: "524 BC", at: "bronze" },
    { text: "Herodotus' account of Cambyses stabbing the Apis bull is contradicted by Egyptian evidence.", classification: "Contested", sources: ["herodotus", "arch"], date: "c. 440 BC", at: "bronze" },
    { text: "The priests who informed Herodotus had lost temple revenue under Persian rule.", classification: "Interpretation", sources: ["cah"], date: "5th century BC", at: "bronze" },
  ],
  connections: [ { charId: "cambyses", relation: "served him, and recorded his conduct in Egypt" }, { name: "Sais", type: "place" }, { name: "Neith", type: "concept" } ],
},

});
