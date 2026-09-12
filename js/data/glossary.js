/* =====================================================================
   GLOSSARY

   Words a reader can trip over: names that are not spelled the way they
   sound, places nobody has heard of, and terms of art the prose uses
   without stopping to define them.

   `say` is a plain-English pronunciation, not IPA. Capitals mark the
   stressed syllable. IPA is more precise and almost nobody can read it,
   and the point here is to let someone say the word out loud without
   feeling stupid, so the imprecise version wins.

   Terms are matched in the prose automatically, on word boundaries,
   longest first, once per part. Nothing has to be marked up by hand,
   which is what lets this apply to a hundred and nineteen chapters
   written before the glossary existed.
   ===================================================================== */

const GLOSSARY = {
  /* ---- Egypt ---------------------------------------------------- */
  "maat":            { say: "MAH-at", what: "Truth, justice, order and the correct running of the world, all in one word. The thing an Egyptian king existed to maintain against chaos." },
  "isfet":           { say: "IS-fet", what: "Chaos and disorder — the opposite of maat, and what every Egyptian monument claims the king has just defeated." },
  "pharaoh":         { say: "FAIR-oh", what: "The king of Egypt. From per-aa, 'great house' — the palace, used for the man in it the way 'the Crown' or 'the White House' is used now." },
  "hieroglyph":      { say: "HIGH-ro-gliff", what: "The monumental Egyptian script. Mostly phonetic signs rather than picture-writing, with unpronounced signs at the end of words marking what category they belong to." },
  "hieratic":        { say: "high-uh-RAT-ik", what: "The everyday cursive form of Egyptian writing, written with a reed on papyrus. Same language as hieroglyphs, faster handwriting." },
  "demotic":         { say: "dih-MOT-ik", what: "The latest and fastest Egyptian cursive script, used from about 650 BC. The middle band of text on the Rosetta Stone." },
  "cartouche":       { say: "car-TOOSH", what: "The oval loop drawn around a royal name in Egyptian writing. Champollion broke the script by guessing that the names inside them had to be spelled out phonetically." },
  "mastaba":         { say: "MASS-tuh-buh", what: "A flat-roofed rectangular tomb of mud brick or stone. The pyramid began as one of these and grew upward." },
  "nomarch":         { say: "NOME-ark", what: "The governor of an Egyptian province. When the job started passing from father to son, the Old Kingdom was in trouble." },
  "ostraca":         { say: "OSS-truh-kuh", what: "Flakes of limestone and broken pottery used as notepaper because papyrus was expensive. Tens of thousands survive from Deir el-Medina." },
  "ostracon":        { say: "OSS-truh-kon", what: "A flake of limestone or broken pot used as notepaper because papyrus was expensive. Plural ostraca. Tens of thousands survive from Deir el-Medina." },
  "Naqada":          { say: "nuh-KAH-duh", what: "The predynastic culture of Upper Egypt, c. 4000–3100 BC, in whose graves and pottery the Egyptian state can be watched assembling itself." },
  "Narmer":          { say: "NAR-mer", what: "The king on the famous ceremonial palette, and one of two candidates for the Menes whom Egyptian tradition remembered as its first king." },
  "Hatshepsut":      { say: "hat-SHEP-soot", what: "The woman who ruled Egypt as king for about twenty years, and whose name was chiselled out of the record two decades after her death." },
  "Akhenaten":       { say: "ah-keh-NAH-ten", what: "The king who abolished the other gods in favour of the sun disc, moved the capital, and was struck from the king lists within a generation." },
  "Nefertiti":       { say: "neff-er-TEE-tee", what: "Akhenaten's queen, shown beside him in Amarna art at unusual scale and prominence." },
  "Thutmose":        { say: "thoot-MOH-suh", what: "The name of four Eighteenth Dynasty kings. The third of them built Egypt's largest empire and left the earliest detailed battle account in history." },
  "Ramesses":        { say: "RAM-uh-seez", what: "The name of eleven kings. The second reigned 66 years and carved Kadesh on five temples; the third beat off the Sea Peoples and was murdered." },
  "Kadesh":          { say: "KAH-desh", what: "A city on the Orontes in Syria, and the battle fought for it in 1274 BC — the best-documented event of the Bronze Age, entirely from the losing side's perspective." },
  "Hyksos":          { say: "HIK-sos", what: "Greek mangling of an Egyptian phrase meaning 'rulers of foreign lands'. A Levantine dynasty that governed northern Egypt for about a century." },
  "Avaris":          { say: "uh-VAR-iss", what: "The Hyksos capital in the eastern Delta, where excavation found Canaanite houses and burials accumulating for generations before any Hyksos king." },
  "Apis":            { say: "AY-piss", what: "A living bull worshipped as a god at Memphis, mummified and buried with enormous ceremony when it died." },
  "Kush":            { say: "KUSH", what: "The Nubian kingdom up the Nile in what is now Sudan. Its kings ruled Egypt for about sixty years and built more pyramids than Egypt has." },
  "Piye":            { say: "PIE (rhymes with eye)", what: "The Kushite king who took Egypt around 727 BC, pausing on campaign to observe festivals and to complain about the treatment of horses." },
  "Udjahorresnet":   { say: "ooj-a-hor-RESS-net", what: "An Egyptian naval officer who served the Persians and wrote his own account of it on a statue — the evidence that overturns Herodotus on Cambyses." },
  "Saqqara":         { say: "suh-KAR-uh", what: "The cemetery of Memphis, where Djoser's Step Pyramid stands." },
  "Deir el-Medina":  { say: "dare el meh-DEE-nuh", what: "The walled village of the workmen who cut the royal tombs, whose desert rubbish preserved the best-documented ordinary community in the ancient world." },
  "Medinet Habu":    { say: "MED-in-et HAH-boo", what: "Ramesses III's mortuary temple at Thebes, whose walls carry the fullest account of the Sea Peoples and the collapse of the Bronze Age." },

  /* ---- Greece --------------------------------------------------- */
  "polis":           { say: "PO-liss", what: "A Greek city-state: one town, its farmland, and its citizens, governing itself. Plural poleis. Not a city and not a country." },
  "poleis":          { say: "PO-lays", what: "Plural of polis — the several hundred independent Greek city-states." },
  "hoplite":         { say: "HOP-light", what: "A Greek heavy infantryman who supplied his own armour and fought shoulder to shoulder in a phalanx." },
  "phalanx":         { say: "FAL-anks", what: "A close-packed block of spearmen, each man's shield partly covering the man to his left. Devastating from the front and helpless on the flank." },
  "Mycenae":         { say: "my-SEE-nee", what: "The greatest of the Bronze Age Greek palace centres, and the name given to that whole civilisation." },
  "Mycenaean":       { say: "my-suh-NEE-an", what: "The Bronze Age Greek civilisation of palace kingdoms, c. 1600–1200 BC — Greek-speaking, literate in Linear B, and entirely forgotten by the Greeks who came after." },
  "wanax":           { say: "WAN-ax", what: "The title of a Mycenaean ruler, known from the Linear B tablets. Nothing like it survived into classical Greece." },
  "Linear B":        { say: "LIN-ee-ar B", what: "The syllabic script of the Mycenaean palaces, deciphered in 1952 and found to be Greek. It records only inventories." },
  "Knossos":         { say: "NOSS-oss", what: "The largest Bronze Age palace complex on Crete, and one of the two places Linear B tablets were first found." },
  "Pytheas":         { say: "PITH-ee-us", what: "A Greek from Marseille who sailed to Britain around 325 BC and was disbelieved for centuries about almost everything he reported correctly." },
  "Herodotus":       { say: "heh-ROD-uh-tus", what: "The earliest surviving Greek historian, writing in the fifth century BC. Names his informants and distinguishes what he saw from what he was told, which was new." },
  "Thucydides":      { say: "thoo-SID-ih-deez", what: "Athenian general and historian of the Peloponnesian War, who wrote about causes rather than gods and did not forgive himself for losing a city." },
  "Peloponnesian":   { say: "pel-uh-puh-NEE-zhun", what: "Of the Peloponnese, the southern peninsula of Greece — and the name of the long war between Athens and Sparta, 431–404 BC." },
  "Achaemenid":      { say: "uh-KEE-men-id", what: "The Persian royal dynasty founded by Cyrus the Great, ruling the largest empire the world had yet seen until Alexander destroyed it." },

  /* ---- Rome ----------------------------------------------------- */
  "princeps":        { say: "PRIN-keps", what: "'First citizen' — the deliberately modest word Augustus used for a position with no Republican precedent whatsoever." },
  "imperium":        { say: "im-PEER-ee-um", what: "The legal power to command, held by a Roman magistrate. Holding it permanently, and outranking everyone else's, is what made an emperor." },
  "auctoritas":      { say: "owk-TOR-ih-tass", what: "Personal standing and moral weight, as distinct from formal power. Augustus said he had more of it than anyone and no more legal power than his colleagues." },
  "tribunicia potestas": { say: "trib-oo-NIK-ee-uh po-TES-tass", what: "The power of a tribune of the plebs — to propose laws, to veto anything, and to be legally untouchable — held without holding the office." },
  "pontifex maximus":{ say: "PON-tif-ex MAX-im-us", what: "Rome's chief priest. Augustus waited sixteen years for the previous holder to die rather than remove him." },
  "Praetorian":      { say: "pree-TOR-ee-an", what: "The emperor's guard, the only troops stationed in Italy. They made one emperor by finding him behind a curtain and auctioned the office in 193." },
  "donative":        { say: "DON-uh-tiv", what: "The cash gift an emperor paid the troops on his accession. Once it was expected, every succession had a price and the army knew it." },
  "legionary":       { say: "LEE-jun-air-ee", what: "A Roman citizen soldier of the legions, serving twenty-five years." },
  "auxilia":         { say: "owk-SILL-ee-uh", what: "Non-citizen units serving alongside the legions, who received Roman citizenship at discharge — recorded on a folding bronze certificate." },
  "Dominate":        { say: "DOM-in-ut", what: "The later Roman empire from Diocletian on, when the ruler stopped being 'first citizen' and became dominus, lord, approached by prostration." },
  "Tetrarchy":       { say: "TET-rark-ee", what: "Diocletian's division of the empire between four rulers with four courts and four armies, because every usurpation had begun on a frontier the emperor was not standing on." },
  "Diocletian":      { say: "dye-uh-KLEE-shun", what: "The emperor who reorganised the empire into four, built a real bureaucracy, and became the only Roman emperor to resign." },
  "Caracalla":       { say: "kar-uh-KAL-uh", what: "The emperor who in AD 212 made virtually every free inhabitant of the empire a Roman citizen." },
  "Ammianus":        { say: "am-ee-AH-nus", what: "Ammianus Marcellinus, a Greek staff officer from Antioch who wrote the last great history in Latin and the only substantial narrative of the fourth century." },
  "Adrianople":      { say: "ay-dree-uh-NO-pul", what: "The battle of AD 378 where Goths admitted and then mistreated by Rome destroyed the eastern field army and killed the emperor." },
  "foederati":       { say: "fed-uh-RAH-tee", what: "Barbarian groups settled inside the empire under their own leaders, serving as allied units. After 382 this was the model for everyone who came." },
  "Odoacer":         { say: "oh-doh-AY-ser", what: "The commander who deposed the last western emperor in 476 and, rather than appoint another, sent the imperial insignia to Constantinople." },
  "Boudica":         { say: "BOO-dih-kuh", what: "Queen of the Iceni, who burned three cities in AD 60–61 after Rome flogged her and assaulted her daughters." },
  "Caratacus":       { say: "kuh-RAT-uh-kus", what: "The British commander who fought Rome for eight years by refusing pitched battle, then lost one and was paraded in Rome." },
  "Cassivellaunus":  { say: "kass-iv-el-AWN-us", what: "The British leader who opposed Caesar in 54 BC — the first inhabitant of Britain whose name anybody wrote down." },
  "Cunobelinus":     { say: "kew-no-bell-EYE-nus", what: "The king who ruled much of south-east Britain from Camulodunum for about thirty years, with a mint and a treasury. Shakespeare knew him as Cymbeline." },
  "oppidum":         { say: "OP-id-um", what: "A large low-lying Iron Age settlement defined by miles of linear earthwork rather than a defensive circuit. Plural oppida." },
  "Camulodunum":     { say: "kam-yoo-lo-DOO-num", what: "Colchester. Cunobelinus' capital, then the first Roman colony in Britain, then the first city Boudica burned." },
  "Agricola":        { say: "uh-GRIK-uh-luh", what: "The governor who took Roman armies further north in Britain than they ever went again, and whose son-in-law Tacitus wrote his life." },
  "Tacitus":         { say: "TASS-it-us", what: "Roman senator and historian, writing around AD 100–120. The best narrative source for the early empire, and the most hostile." },
  "Suetonius":       { say: "swee-TOH-nee-us", what: "Imperial secretary and biographer of the first twelve Caesars, organised by theme rather than chronology, with a section on each man's vices." },
  "Josephus":        { say: "joh-SEE-fus", what: "A Judaean commander who surrendered to the Romans, took his captor's family name, and wrote the history of the war for the men who won it." },

  /* ---- Carthage and the wider world ------------------------------ */
  "Punic":           { say: "PEW-nik", what: "Roman word for Carthaginian, from the same root as Phoenician. The Punic Wars are named by the side that won them." },
  "Phoenician":      { say: "fuh-NEE-shun", what: "The Levantine trading cities — Tyre, Sidon, Byblos — whose alphabet the Greeks borrowed and whose colonists founded Carthage." },
  "Hannibal":        { say: "HAN-ih-bul", what: "The Carthaginian general who crossed the Alps with an army and elephants and spent fifteen years undefeated in Italy without taking Rome." },
  "Hamilcar":        { say: "huh-MIL-car", what: "Hannibal's father, who built a Carthaginian empire in Spain after losing Sicily to a war he had not lost in the field." },
  "Vercingetorix":   { say: "ver-sin-JET-or-ix", what: "The Gaulish leader who united the tribes against Caesar and surrendered at Alesia." },
  "satrapy":         { say: "SAT-ruh-pee", what: "A province of the Persian empire, run by a satrap — a governor with wide local authority and a royal inspector watching him." },
  "Zoroastrian":     { say: "zor-oh-ASS-tree-un", what: "The Persian religion of Ahura Mazda, built on a moral struggle between truth and the lie." },
  "Seleucid":        { say: "sel-OO-sid", what: "The dynasty founded by one of Alexander's generals, ruling from Anatolia to Afghanistan. The largest of the successor kingdoms." },
  "Ptolemaic":       { say: "tol-uh-MAY-ik", what: "Of the Ptolemies, the Macedonian dynasty that ruled Egypt from 305 to 30 BC. The P is silent." },
  "Ugarit":          { say: "OO-guh-rit", what: "A rich Syrian port destroyed around 1190 BC and never reoccupied. Its last letters survive because the fire baked the clay." },
  "Hattusa":         { say: "hat-TOO-suh", what: "The Hittite capital in central Anatolia, burned and abandoned around 1200 BC." },
  "Hittite":         { say: "HIT-tite", what: "The Anatolian empire that was one of the great powers of the Bronze Age, signed the first surviving peace treaty with Egypt, and vanished in the collapse." },
  "Assyria":         { say: "uh-SEER-ee-uh", what: "The most effective military state of the early Iron Age Near East, which sacked Thebes in 663 BC." },
  "Alashiya":        { say: "uh-LASH-ee-uh", what: "The Bronze Age name for Cyprus, or a kingdom on it — the source of most of the eastern Mediterranean's copper." },
  "Uluburun":        { say: "OO-loo-boo-roon", what: "A ship that sank off southern Turkey around 1300 BC carrying cargo from at least seven cultures. The Bronze Age system in one hull." },

  /* ---- terms of art ---------------------------------------------- */
  "stela":           { say: "STEE-luh", what: "An upright stone slab carrying an inscription or relief. Plural stelae." },
  "papyrus":         { say: "puh-PIE-rus", what: "Writing material made from a Nile reed, and by extension a document written on it. Plural papyri." },
  "cuneiform":       { say: "kew-NAY-ih-form", what: "Wedge-shaped writing pressed into wet clay, used across the Near East for three thousand years." },
  "Akkadian":        { say: "uh-KAY-dee-un", what: "The Semitic language of Mesopotamia, and the diplomatic language of the whole Bronze Age Near East — including between Egypt and everyone else." },
  "mummification":   { say: "mum-if-ih-KAY-shun", what: "Preserving a body by drying it with natron salt and wrapping it. Royal at first, then elite, then available at several price points." },
  "heliacal":        { say: "hee-LIE-uh-kul", what: "Of a star's first reappearance at dawn after weeks lost in the sun's glare. The heliacal rising of Sirius anchored the Egyptian year." },
  "archaism":        { say: "AR-kay-izm", what: "Deliberately imitating a much older style. Saite Egypt copied Old Kingdom art so closely that modern scholars have misdated pieces by two thousand years." },
  "stelae":          { say: "STEE-lee", what: "Plural of stela — upright inscribed stone slabs." },
  "papyri":          { say: "puh-PIE-rye", what: "Plural of papyrus — documents written on Nile reed." },
  "syncretism":      { say: "SIN-kret-izm", what: "Merging gods or practices from different traditions into one, which the ancient Mediterranean did constantly and without embarrassment." },
  /* ---- Carthage --------------------------------------------------- */
  "cothon":          { say: "KOH-thon", what: "An artificial harbour basin, dug rather than found. Carthage's was two of them — a rectangular commercial dock in front of a circular naval one you could not see into." },
  "suffete":         { say: "SUFF-eet", what: "One of the two chief magistrates of Carthage, elected annually. Roughly what a Roman consul was, minus the army." },
  "suffetes":        { say: "SUFF-eets", what: "Plural of suffete — Carthage's two annually elected chief magistrates." },
  "Tophet":          { say: "TOH-fet", what: "The walled precinct at Carthage holding thousands of urns of cremated infants and animals. Whether it is evidence of child sacrifice or an infant cemetery is genuinely unresolved." },
  "Melqart":         { say: "MEL-kart", what: "The chief god of Tyre and its colonies, a patron of kings and voyages. Greeks identified him with Herakles, which is why the Straits of Gibraltar became the Pillars of Hercules." },
  "Barcid":          { say: "BAR-sid", what: "Of the family of Hamilcar Barca — Hannibal's clan, and effectively the private government of Carthaginian Spain." },
  "Numidian":        { say: "new-MID-ee-un", what: "Of Numidia, the kingdoms west and south of Carthage. Their light cavalry was the best in the western Mediterranean, and both sides wanted it." },
  "Masinissa":       { say: "mass-in-ISS-uh", what: "The Numidian king Rome installed on Carthage's border in 202 BC. He then spent fifty years taking Carthaginian land, with Rome arbitrating every dispute in his favour." },
  "indemnity":       { say: "in-DEM-nit-ee", what: "A cash penalty imposed on a defeated state, paid in instalments. Also, usefully for the winner, a leash — which is why Rome refused to let Carthage pay hers off early." },
  "talent":          { say: "TAL-ent", what: "A unit of weight in silver, roughly 26 kilograms. Carthage's second indemnity was ten thousand of them, spread over fifty years." },
  "Gades":           { say: "GAD-eez", what: "The old Phoenician colony on the Atlantic coast of Spain, founded before Carthage itself. Modern Cadiz, and one of the oldest continuously inhabited cities in western Europe." },
  "Byrsa":           { say: "BUR-sa", what: "The citadel hill at the centre of Carthage, and the last place to fall in 146 BC. The name is a Greek pun on the ox-hide in the foundation legend." },
  "periplus":        { say: "PERR-ip-luss", what: "A coasting voyage, or the written account of one — a sailor's list of what you pass and in what order. Hanno's is very nearly the only Carthaginian text we have." },
  "Polybius":        { say: "pol-IB-ee-us", what: "Greek hostage turned historian, writing inside the household of the Roman general who destroyed Carthage. Careful, well-informed, pro-Roman — which makes the moments he criticises Rome unusually valuable." },
  "Diodorus":        { say: "die-oh-DOR-us", what: "Diodorus Siculus, a first-century BC Greek who compiled a world history out of earlier writers. Uneven, but for some periods he is all there is." },
  "Appian":          { say: "APP-ee-un", what: "Second-century AD Greek historian of Rome's wars, organised by enemy rather than by date. Our fullest account of the destruction of Carthage." },
  "corvus":          { say: "COR-vuss", what: "Latin for 'crow' — the hinged boarding bridge with a spike that Rome bolted to its warships, to turn a sea battle into an infantry fight it could win." },

  /* ---- Method ----------------------------------------------------- */
  "chronology":      { say: "kron-OL-uh-jee", what: "The framework of dates. Egyptian chronology before 664 BC is a chain of reign lengths tied to a few astronomical sightings, and it floats by decades." },
  "radiocarbon":     { say: "ray-dee-oh-CAR-bon", what: "Dating organic material by the decay of carbon-14. Independent of any king list, which is why it matters here." },
};
