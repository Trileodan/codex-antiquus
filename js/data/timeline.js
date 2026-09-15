/* =====================================================================
   TIMELINE STATEMENTS

   Every coin carries one sentence pinned to one year. It is what the
   timeline game plays with, and it is deliberately not the same thing as
   the coin's date range: "Hannibal Barca, 247 – c. 183 BC" cannot be put
   in order against anything, but "Hannibal crosses the Alps, 218 BC"
   can.

   Three rules were used picking these:

     · One year, not a span. Where a person's life is the subject, the
       year chosen is the single moment they are most placeable by —
       usually the thing they are known for rather than a birth.
     · The label must stand alone. A player holding this coin and nothing
       else should know what is being claimed.
     · Prefer the year a reader could actually reason toward. "Caesar is
       assassinated" is anchorable; "Caesar is elected aedile" is not.

   Kept in one file rather than scattered through the character files so
   the whole playable set can be read down in one column and checked for
   clashes and gaps. That is how the Zama duplication was found.

   FOURTH RULE, added after that: a person's statement is their ACT, not
   a battle's OUTCOME. The battle coin owns who won. So Scipio is pinned
   to taking New Carthage in a day rather than to winning Zama, and
   Themistokles to persuading Athens to build the fleet rather than to
   the victory that fleet went on to win. Both are better history anyway:
   they are decisions those men actually made, rather than results they
   are merely remembered by.

   Leonidas and Philip II keep their battles, because staying to die at
   Thermopylae and winning at Chaeronea ARE their acts, and no other coin
   states those outcomes.
   ===================================================================== */

const COIN_TIMELINE = {
  /* ---- Rome: the Republic ---------------------------------------- */
  "romulus-remus":   { year: -753, label: "The traditional founding of Rome" },
  tarquinius:        { year: -509, label: "Tarquin the Proud is expelled and the monarchy ends" },
  "l-brutus":        { year: -509, label: "Brutus becomes one of Rome's first consuls" },
  "tiberius-gracchus": { year: -133, label: "Tiberius Gracchus is beaten to death in Rome" },
  marius:            { year: -107, label: "Marius opens the legions to the landless poor" },
  sulla:             { year: -82, label: "Sulla makes himself dictator of Rome" },
  spartacus:         { year: -71, label: "Spartacus is defeated and his revolt crushed" },
  crassus:           { year: -53, label: "Crassus is killed at Carrhae" },
  pompey:            { year: -48, label: "Pompey is murdered on a beach in Egypt" },
  cicero:            { year: -43, label: "Cicero is proscribed and killed" },
  cato:              { year: -46, label: "Cato kills himself at Utica rather than be pardoned" },
  caesar:            { year: -44, label: "Julius Caesar is assassinated" },
  vercingetorix:     { year: -52, label: "Vercingetorix surrenders at Alesia" },
  "m-brutus":        { year: -42, label: "Brutus dies after defeat at Philippi" },
  antony:            { year: -30, label: "Mark Antony kills himself in Alexandria" },
  octavian:          { year: -27, label: "Octavian takes the name Augustus" },
  agrippa:           { year: -37, label: "Agrippa digs a harbour through a lake to train Octavian's fleet" },

  /* ---- Carthage --------------------------------------------------- */
  dido:              { year: -814, label: "The traditional founding of Carthage" },
  hanno:             { year: -500, label: "Hanno sails down the Atlantic coast of Africa" },
  hamilcar:          { year: -237, label: "Hamilcar Barca takes his army to Spain" },
  hannibal:          { year: -218, label: "Hannibal crosses the Alps into Italy" },
  scipio:            { year: -209, label: "Scipio takes New Carthage in a single day" },
  masinissa:         { year: -206, label: "Masinissa changes sides and brings his cavalry to Rome" },

  /* ---- Egypt: Ptolemaic ------------------------------------------- */
  alexander:         { year: -323, label: "Alexander the Great dies at Babylon" },
  ptolemy1:          { year: -305, label: "Ptolemy declares himself king of Egypt" },
  ptolemy2:          { year: -246, label: "Ptolemy II dies, having built the Library of Alexandria" },
  ptolemy13:         { year: -47, label: "Ptolemy XIII drowns in the Nile after losing to Caesar" },
  cleopatra:         { year: -30, label: "Cleopatra dies and Egypt becomes a Roman province" },

  /* ---- Greece ----------------------------------------------------- */
  solon:             { year: -594, label: "Solon cancels the debts of Athens" },
  kleisthenes:       { year: -508, label: "Kleisthenes reorganises Athens into demes" },
  themistokles:      { year: -483, label: "Themistokles persuades Athens to spend its silver on a fleet" },
  leonidas:          { year: -480, label: "Leonidas dies holding the pass at Thermopylae" },
  herodotos:         { year: -440, label: "Herodotus writes the first work of history" },
  perikles:          { year: -429, label: "Perikles dies of plague in Athens" },
  thucydides:        { year: -424, label: "Thucydides is exiled and begins writing his war" },
  sokrates:          { year: -399, label: "Socrates is condemned and drinks hemlock" },
  philip2:           { year: -338, label: "Philip II defeats the Greek cities at Chaeronea" },

  /* ---- Persia ----------------------------------------------------- */
  cyrus:             { year: -539, label: "Cyrus the Great takes Babylon" },
  cambyses:          { year: -525, label: "Cambyses conquers Egypt" },
  darius1:           { year: -518, label: "Darius I begins building Persepolis" },
  atossa:            { year: -486, label: "Atossa's son Xerxes takes the Persian throne" },
  xerxes:            { year: -480, label: "Xerxes invades Greece" },
  artemisia:         { year: -480, label: "Artemisia advises Xerxes against fighting at sea, and is overruled" },
  artaxerxes2:       { year: -401, label: "Artaxerxes II defeats his brother's Greek mercenaries" },
  darius3:           { year: -330, label: "Darius III is killed and the Persian Empire ends" },

  /* ---- Britain ---------------------------------------------------- */
  "amesbury-archer": { year: -2300, label: "The Amesbury Archer is buried near Stonehenge" },
  pytheas:           { year: -325, label: "Pytheas sails round Britain and describes it" },
  cassivellaunus:    { year: -54, label: "Cassivellaunus resists Caesar's second landing" },
  "lindow-man":      { year: 50, label: "Lindow Man is killed and laid in a bog" },
  cunobelinus:       { year: 40, label: "Cunobelinus dies, having ruled much of south-east Britain" },
  caratacus:         { year: 51, label: "Caratacus is captured and sent to Rome" },
  cartimandua:       { year: 51, label: "Cartimandua hands Caratacus over to the Romans" },
  boudica:           { year: 61, label: "Boudica burns Colchester, London and St Albans" },
  agricola:          { year: 83, label: "Agricola defeats the Caledonians at Mons Graupius" },
  "claudia-severa":  { year: 100, label: "Claudia Severa writes a birthday invitation at Vindolanda" },
  carausius:         { year: 286, label: "Carausius declares himself emperor in Britain" },
  patrick:           { year: 432, label: "Patrick begins his mission in Ireland" },

  /* ---- Rome: the Empire ------------------------------------------- */
  claudius:          { year: 43, label: "Claudius invades Britain" },
  josephus:          { year: 70, label: "Josephus watches Rome destroy the Temple in Jerusalem" },
  vespasian:         { year: 69, label: "Vespasian wins the Year of the Four Emperors" },
  "pliny-younger":   { year: 79, label: "Pliny the Younger watches Vesuvius bury Pompeii" },
  trajan:            { year: 117, label: "Trajan dies with the empire at its greatest extent" },
  hadrian:           { year: 122, label: "Hadrian orders a wall built across northern Britain" },
  "marcus-aurelius": { year: 180, label: "Marcus Aurelius dies and leaves the empire to his son" },
  perpetua:          { year: 203, label: "Perpetua is executed at Carthage, leaving her own account" },
  "septimius-severus": { year: 193, label: "Septimius Severus seizes the empire with his legions" },
  zenobia:           { year: 272, label: "Zenobia's breakaway empire is defeated at Palmyra" },
  diocletian:        { year: 284, label: "Diocletian takes power and splits the empire in four" },
  constantine1:      { year: 312, label: "Constantine wins at the Milvian Bridge" },
  ammianus:          { year: 378, label: "Ammianus records the Roman disaster at Adrianople" },

  /* ---- Egypt: ancient --------------------------------------------- */
  narmer:            { year: -3100, label: "Narmer unites Upper and Lower Egypt" },
  imhotep:           { year: -2670, label: "Imhotep builds the first pyramid, at Saqqara" },
  khufu:             { year: -2560, label: "Khufu's Great Pyramid is completed at Giza" },
  merer:             { year: -2562, label: "Merer records hauling stone to Giza in his logbook" },
  senusret3:         { year: -1850, label: "Senusret III fortifies Egypt's Nubian frontier" },
  hatshepsut:        { year: -1473, label: "Hatshepsut has herself crowned as king of Egypt" },
  thutmose3:         { year: -1457, label: "Thutmose III wins at Megiddo, the first battle described in detail" },
  akhenaten:         { year: -1348, label: "Akhenaten abolishes Egypt's gods for one" },
  ramesses2:         { year: -1274, label: "Ramesses II fights the Hittites at Kadesh" },
  ramesses3:         { year: -1177, label: "Ramesses III turns back the Sea Peoples" },
  piye:              { year: -727, label: "Piye conquers Egypt from Kush" },
  udjahorresnet:     { year: -525, label: "Udjahorresnet changes sides and serves the Persian conqueror" },
};

/* Attached rather than written into each character file: one place to
   read, one place to check, and no risk of a mismatched edit across
   seven files. */
for (const id of Object.keys(COIN_TIMELINE)) {
  if (CHARACTERS[id]) CHARACTERS[id].timeline = COIN_TIMELINE[id];
}
