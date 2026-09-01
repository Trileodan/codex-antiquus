/* =====================================================================
   ATLAS — geography and time
   The brief asks for a globe you spin to pick a region, plus a slider
   from 3000 BC to the present that shows whatever history covers the
   selected moment. This file supplies the data behind that.

   Years are signed integers: -753 is 753 BC, 476 is AD 476.
   ===================================================================== */

const REGIONS = [
  { id: "med-europe",  name: "Mediterranean Europe", blurb: "Italy, Greece, the Aegean and the northern shore." },
  { id: "north-africa", name: "North Africa",        blurb: "The Maghreb, Egypt and the Nile." },
  { id: "west-asia",   name: "West Asia",            blurb: "Mesopotamia, the Levant, Anatolia and Iran." },
  { id: "north-europe", name: "Northern Europe",     blurb: "Gaul, Germania, Britain and Scandinavia." },
  { id: "south-asia",  name: "South Asia",           blurb: "The Indus, the Ganges and the subcontinent." },
  { id: "east-asia",   name: "East Asia",            blurb: "China, Korea and Japan." },
  { id: "americas",    name: "The Americas",         blurb: "Mesoamerica and the Andes." },
];

/* Era bands used as snap points on the time slider. */
const ERAS = [
  { id: "bronze",     name: "Bronze Age",       from: -3000, to: -1200 },
  { id: "iron",       name: "Iron Age",         from: -1200, to: -800 },
  { id: "archaic",    name: "Archaic",          from: -800,  to: -500 },
  { id: "classical",  name: "Classical",        from: -500,  to: -323 },
  { id: "hellenistic", name: "Hellenistic",     from: -323,  to: -30 },
  { id: "imperial",   name: "Roman Imperial",   from: -30,   to: 476 },
  { id: "medieval",   name: "Middle Ages",      from: 476,   to: 1450 },
  { id: "early-mod",  name: "Early Modern",     from: 1450,  to: 1789 },
  { id: "modern",     name: "Modern",           from: 1789,  to: 1945 },
  { id: "contemp",    name: "Contemporary",     from: 1945,  to: 2026 },
];

/* Geography and period for every Set, built and planned alike, so the
   Atlas is honest about what exists and what is still to come. */
const SET_ATLAS = {
  "roman-republic":  { region: "med-europe",   from: -753, to: -27 },
  "carthage":        { region: "north-africa", from: -814, to: -146 },
  "ptolemaic-egypt": { region: "north-africa", from: -332, to: -30 },
  "ancient-greece":  { region: "med-europe",   from: -800, to: -338 },
  "roman-empire":    { region: "med-europe",   from: -27,  to: 476 },
  "persia":          { region: "west-asia",    from: -550, to: -330 },
  // Planned Sets from the brief — visible on the Atlas, not yet built.
  "ancient-egypt":   { region: "north-africa", from: -3100, to: -332 },
  "hellenistic":     { region: "west-asia",    from: -323, to: -30 },
  "ancient-britain": { region: "north-europe", from: -2500, to: 410 },
  "mesopotamia":     { region: "west-asia",    from: -3500, to: -539 },
  "indus-valley":    { region: "south-asia",   from: -3300, to: -1300 },
  "ancient-india":   { region: "south-asia",   from: -1500, to: 550 },
  "ancient-china":   { region: "east-asia",    from: -2070, to: 220 },
  "mesoamerica":     { region: "americas",     from: -1500, to: 1521 },
};

/* Planned Sets are added to SETS so the Atlas and World screens can
   show the full shape of the product without pretending they are ready. */
Object.assign(SETS, {
  "wars":            { id: "wars", world: null, name: "Wars", status: "system", tagline: "Shared conflicts, unlocked once both sides have been studied." },
  "ancient-egypt":   { id: "ancient-egypt", world: "ancient", name: "Ancient Egypt", status: "planned", tagline: "Three thousand years of pharaohs before the Greeks arrived." },
  "hellenistic":     { id: "hellenistic", world: "ancient", name: "The Hellenistic World", status: "planned", tagline: "Alexander's successors and the kingdoms they carved out." },
  "ancient-britain": { id: "ancient-britain", world: "ancient", name: "Ancient Britain", status: "planned", tagline: "From Stonehenge to the end of Roman Britain." },
  "mesopotamia":     { id: "mesopotamia", world: "ancient", name: "Mesopotamia", status: "planned", tagline: "Sumer, Akkad, Babylon, Assyria — where writing begins." },
  "indus-valley":    { id: "indus-valley", world: "ancient", name: "Indus Valley", status: "planned", tagline: "Harappa and Mohenjo-daro, and a script still unread." },
  "ancient-india":   { id: "ancient-india", world: "ancient", name: "Ancient India", status: "planned", tagline: "The Vedic period, the Mauryans and Ashoka." },
  "ancient-china":   { id: "ancient-china", world: "ancient", name: "Ancient China", status: "planned", tagline: "Shang, Zhou, the Warring States and the first emperor." },
  "mesoamerica":     { id: "mesoamerica", world: "ancient", name: "Mesoamerica", status: "planned", tagline: "Olmec, Maya, Zapotec and the cities of the valley." },
});

/* Extend the Ancient World's set list with the planned ones. */
WORLDS[0].sets = ["roman-republic", "carthage", "ptolemaic-egypt", "ancient-greece", "roman-empire", "persia",
  "ancient-egypt", "hellenistic", "ancient-britain",
  "mesopotamia", "indus-valley", "ancient-india", "ancient-china", "mesoamerica"];

function yearLabel(y) { return y < 0 ? `${Math.abs(y)} BC` : `AD ${y}`; }
function eraAt(year) { return ERAS.find((e) => year >= e.from && year < e.to) || ERAS[ERAS.length - 1]; }
function setsAt(year, regionId) {
  return Object.keys(SET_ATLAS).filter((sid) => {
    const a = SET_ATLAS[sid];
    if (regionId && a.region !== regionId) return false;
    return year >= a.from && year <= a.to;
  });
}
