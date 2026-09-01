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
  ctesias: "Ctesias, Persica (surviving in summary and quotation)",
  arrian: "Arrian, Anabasis of Alexander",
  behistun: "The Behistun inscription of Darius I",
  "cyrus-cylinder": "The Cyrus Cylinder and the Nabonidus Chronicle",
  pft: "The Persepolis Fortification Tablets",
  "hebrew-bible": "The Hebrew Bible (Ezra, Isaiah, Chronicles)",
  cah: "Cambridge Ancient History (2nd edn)",
  arch: "Archaeological survey and material evidence",
};

const WORLDS = [
  { id: "ancient", name: "Ancient World", status: "active",
    blurb: "Rome, Carthage, Egypt and the empires that shaped the classical Mediterranean.",
    sets: ["roman-republic", "carthage", "ptolemaic-egypt", "ancient-greece", "roman-empire", "persia"] },
  { id: "discovery", name: "Age of Discovery", status: "future", blurb: "Exploration, contact and empire across the Atlantic world." },
  { id: "revolution", name: "Age of Revolution", status: "future", blurb: "Enlightenment ideas collide with old regimes." },
];

const SETS = {
  "roman-republic": { id: "roman-republic", world: "ancient", name: "Roman Republic", status: "open",
    tagline: "753 – 27 BC. A constitution built for a city, breaking under the weight of an empire." },
  "carthage": { id: "carthage", world: "ancient", name: "Carthage", status: "sealed",
    tagline: "The merchant empire that came closest to destroying Rome.",
    sealedHint: "Opens when you reach the Punic Wars." },
  "ptolemaic-egypt": { id: "ptolemaic-egypt", world: "ancient", name: "Ptolemaic Egypt", status: "sealed",
    tagline: "Greek kings on an Egyptian throne, and the last of their line.",
    sealedHint: "Opens when Rome reaches Alexandria." },
  "ancient-greece": { id: "ancient-greece", world: "ancient", name: "Ancient Greece", status: "sealed",
    tagline: "800 – 338 BC. A thousand small states that invented the citizen, and lost him to Macedon.",
    sealedHint: "Opens when Rome turns east." },
  "roman-empire": { id: "roman-empire", world: "ancient", name: "Roman Empire", status: "locked",
    tagline: "From Princeps to Dominate." },
  "persia": { id: "persia", world: "ancient", name: "Persia", status: "sealed",
    tagline: "559 – 330 BC. The largest empire the world had yet seen, described almost entirely by its enemies.",
    sealedHint: "Opens when Greece meets Persia." },
};

/* --------------------------------------------------------------------
   CHAPTERS — the spine of the experience.
   Each chapter is one 5-10 minute sitting: 4 beats + a checkpoint.
   Cards are NOT minted per beat. They are minted when a character's
   full chapter requirement set is complete (see CHARACTERS.requires).
   -------------------------------------------------------------------- */
