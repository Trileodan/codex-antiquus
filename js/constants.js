const { useState, useEffect, useMemo, useRef, useCallback } = React;

/* =====================================================================
   CODEX ANTIQUUS — data layer
   World -> Set -> Chapter -> (checkpoint) -> Character card unlocks
   All content is seed data. Claims carry a classification + source, as
   the Researcher/Sceptic/Adjudicator/Editor pipeline would produce.
   ===================================================================== */

const TIER_ORDER = ["bronze", "silver", "gold"];
const TIER_RANK = { bronze: 0, silver: 1, gold: 2 };
const TIER_LABEL = { bronze: "Bronze", silver: "Silver", gold: "Gold" };
const TIER_COLOR = { bronze: "var(--bronze)", silver: "var(--silver)", gold: "var(--gold)" };
const TIER_GLOW = { bronze: "var(--bronze-glow)", silver: "var(--silver-glow)", gold: "var(--gold-glow)" };
const STAT_KEYS = ["power", "intellect", "influence", "creativity", "wealth", "fame"];
const STAT_LABEL = { power: "Power", intellect: "Intellect", influence: "Influence", creativity: "Creativity", wealth: "Wealth", fame: "Fame" };
const CLASS_COLOR = {
  "Established": "var(--verdigris)", "Probable": "var(--bronze-glow)", "Contested": "var(--rust)",
  "Interpretation": "var(--silver-glow)", "Traditional / Legendary": "var(--gold-glow)", "Unknown": "var(--parchment-dim)",
};

const SOURCES = {
  livy: "Livy, Ab Urbe Condita",
  plutarch: "Plutarch, Parallel Lives",
  suetonius: "Suetonius, The Twelve Caesars",
  dio: "Cassius Dio, Roman History",
  appian: "Appian, The Civil Wars",
  polybius: "Polybius, The Histories",
  caesar: "Caesar, Commentarii de Bello Gallico",
  cicero: "Cicero, Letters and Orations",
  res: "Augustus, Res Gestae Divi Augusti",
  herodotus: "Herodotus, The Histories",
  thucydides: "Thucydides, History of the Peloponnesian War",
  xenophon: "Xenophon, Hellenica and Memorabilia",
  "aristotle-ath": "Aristotle (attrib.), The Constitution of the Athenians",
  plato: "Plato, Apology, Crito and Phaedo",
  demosthenes: "Demosthenes, The Philippics and On the Crown",
  diodorus: "Diodorus Siculus, Bibliotheca Historica",
  aeschylus: "Aeschylus, The Persians (staged 472 BC, by a veteran of the war)",
  ctesias: "Ctesias, Persica (surviving in summary and quotation)",
  arrian: "Arrian, Anabasis of Alexander",
  behistun: "The Behistun inscription of Darius I",
  "cyrus-cylinder": "The Cyrus Cylinder and the Nabonidus Chronicle",
  pft: "The Persepolis Fortification Tablets",
  "hebrew-bible": "The Hebrew Bible (Ezra, Isaiah, Chronicles)",
  tacitus: "Tacitus, Agricola, Annals and Histories",
  strabo: "Strabo, Geography",
  pliny: "Pliny the Elder, Natural History",
  gildas: "Gildas, On the Ruin of Britain (6th c., on events a century earlier)",
  ammianus: "Ammianus Marcellinus, Res Gestae",
  vindolanda: "The Vindolanda writing tablets (c. AD 90 – 120)",
  adna: "Ancient DNA studies of prehistoric British populations",
  josephus: "Josephus, The Jewish War (by a commander who changed sides)",
  "pliny-y": "Pliny the Younger, Letters",
  marcus: "Marcus Aurelius, Meditations (a private notebook, never meant to be read)",
  "hist-aug": "The Historia Augusta (late 4th c., partly forged, invents sources)",
  perpetua: "The Passion of Perpetua and Felicity (a section in her own voice)",
  lactantius: "Lactantius, On the Deaths of the Persecutors (Christian, contemporary, hostile)",
  eusebius: "Eusebius, Ecclesiastical History and Life of Constantine",
  augustine: "Augustine, The City of God",
  zosimus: "Zosimus, New History (6th c., pagan, blames Christianity)",
  jordanes: "Jordanes, Getica (6th c., abridging a lost Gothic history)",
  notitia: "The Notitia Dignitatum (a late Roman list of offices and units)",
  "theod-code": "The Theodosian Code (imperial law, collected AD 438)",
  papyri: "The Oxyrhynchus and Egyptian papyri (tax returns, letters, contracts)",
  ice: "Greenland ice cores, lead deposition as a proxy for metal production",
  cah: "Cambridge Ancient History (2nd edn)",
  arch: "Archaeological survey and material evidence",
};

const WORLDS = [
  { id: "ancient", name: "Ancient World", status: "active",
    blurb: "Rome, Carthage, Egypt and the empires that shaped the classical Mediterranean.",
    sets: ["roman-republic", "carthage", "ptolemaic-egypt", "ancient-greece", "ancient-britain", "roman-empire", "persia"] },
  { id: "discovery", name: "Age of Discovery", status: "future", blurb: "Exploration, contact and empire across the Atlantic world." },
  { id: "revolution", name: "Age of Revolution", status: "future", blurb: "Enlightenment ideas collide with old regimes." },
];

const SETS = {
  "roman-republic": { id: "roman-republic", world: "ancient", name: "Roman Republic", status: "open",
    foundation: true, patron: "romulus-remus",
    tagline: "753 – 27 BC. A constitution built for a city, breaking under the weight of an empire." },
  "carthage": { id: "carthage", world: "ancient", name: "Carthage", status: "open",
    foundation: true, patron: "dido",
    tagline: "814 – 146 BC. The merchant empire that came closest to destroying Rome, described almost entirely by Rome." },
  "ptolemaic-egypt": { id: "ptolemaic-egypt", world: "ancient", name: "Ptolemaic Egypt", status: "open",
    foundation: true, patron: "ptolemy1",
    tagline: "332 – 30 BC. Greek kings on an Egyptian throne, and the last of their line." },
  "ancient-greece": { id: "ancient-greece", world: "ancient", name: "Ancient Greece", status: "open",
    foundation: true, patron: "solon",
    tagline: "800 – 338 BC. A thousand small states that invented the citizen, and lost him to Macedon." },
  /* Not a foundation Set. It opens when you finish the Republic's last
     chapter, because the Augustan settlement is the Republic's ending
     and this Set's premise, and reading it in the other order spoils
     both. */
  "roman-empire": { id: "roman-empire", world: "ancient", name: "Roman Empire", status: "open",
    tagline: "27 BC – AD 476. A constitution nobody wrote, an army that chose the ruler, and a fall that took a century and did not happen in the east." },
  "ancient-britain": { id: "ancient-britain", world: "ancient", name: "Ancient Britain", status: "open",
    foundation: true, patron: "amesbury-archer",
    tagline: "c. 4000 BC – AD 410. An island with no voice of its own, described by the people who came to take it." },
  "persia": { id: "persia", world: "ancient", name: "Persia", status: "open",
    foundation: true, patron: "cyrus",
    tagline: "559 – 330 BC. The largest empire the world had yet seen, described almost entirely by its enemies." },
};

/* --------------------------------------------------------------------
   CHAPTERS — the spine of the experience.
   Each chapter is one 5-10 minute sitting: 4 beats + a checkpoint.
   Cards are NOT minted per beat. They are minted when a character's
   full chapter requirement set is complete (see CHARACTERS.requires).
   -------------------------------------------------------------------- */
