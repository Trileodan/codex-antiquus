/* =====================================================================
   THE REST OF THE WORLD

   What was happening elsewhere while the thing you just read about was
   happening. The point of this file is the reflex it builds: no society
   in this app was alone in its century, and the ones the app does not
   teach were not waiting quietly for it to get to them.

   Entries are deliberately outside the Sets. There is no use telling
   somebody reading about Hannibal that Rome also existed. What is worth
   knowing is that Qin Shi Huang had unified China the year before, and
   that nobody in either place had the faintest idea.

   `year` is the single year to sort and match on; `era` is what the
   entry is actually about, which is often a span. Regions are coarse on
   purpose — this is orientation, not a syllabus.
   ===================================================================== */

const WORLD_EVENTS = [
  /* ---- before 2000 BC ------------------------------------------- */
  { year: -9500, region: "West Asia", what: "Göbekli Tepe is built in south-eastern Turkey — carved stone enclosures raised by people who had not yet invented farming or pottery, and buried deliberately a thousand years later." },
  { year: -7000, region: "China", what: "Rice is being farmed along the Yangtze and millet along the Yellow River, independently of anything happening in the Near East." },
  { year: -6500, region: "Europe", what: "Farming reaches the Balkans from Anatolia and begins working west, arriving in Britain around 4000 BC." },
  { year: -5000, region: "Africa", what: "The Sahara is green. Cattle herders live around lakes where there is now sand, and leave rock paintings of swimmers in what is today the driest place on earth." },
  { year: -4500, region: "Europe", what: "Copper smelting is under way in the Balkans, and the Varna cemetery in Bulgaria holds the oldest worked gold yet found anywhere." },
  { year: -4000, region: "West Asia", what: "The first cities are forming in southern Mesopotamia. Eridu and Uruk are growing around temple platforms, and the plough and irrigation canal are in use." },
  { year: -3100, region: "Europe", what: "Skara Brae on Orkney is occupied — stone houses with built-in dressers and box beds, connected by covered passages, and the Ness of Brodgar temple complex is in use nearby." },
  { year: -3500, region: "Mesopotamia", what: "The wheel appears — first as a potter's wheel, then under carts. It was invented for making pots before anyone thought to put it under a load." },
  { year: -3300, region: "Mesopotamia", what: "Writing appears at Uruk as accounting marks on clay — probably a century or two before Egypt, and quite possibly the idea that gave Egypt the idea." },
  { year: -3200, region: "South Asia", what: "The Indus Valley cities are growing. Harappa and Mohenjo-daro will have grid streets, standardised bricks and covered drains, and a script nobody has read." },
  { year: -2900, region: "Mesopotamia", what: "The Sumerian city-states — Ur, Uruk, Lagash — are quarrelling over water rights, which is the oldest recorded reason for a war." },
  { year: -3000, region: "Europe", what: "Stonehenge begins as a circular ditch and a cremation cemetery. The great stones come later, hauled from West Woods and from Wales." },
  { year: -2700, region: "Mesopotamia", what: "The Epic of Gilgamesh has a real king behind it — Gilgamesh of Uruk, on the Sumerian king list, whose city walls are still traceable." },
  { year: -2600, region: "South Asia", what: "Mohenjo-daro is laid out with a grid of streets, standardised fired brick, wells in most houses and a covered drainage system no European city would match for four thousand years." },
  { year: -2500, region: "South America", what: "Caral in the Peruvian desert raises stepped platform mounds and sunken plazas — monumental building in the Americas at the same time as the Giza pyramids, by people with no pottery." },
  { year: -2334, region: "Mesopotamia", what: "Sargon of Akkad conquers Sumer and builds the first empire anyone would recognise as one." },
  { year: -2200, region: "Worldwide", what: "A sharp arid episode registers across the northern hemisphere. The Akkadian empire falls apart, the Indus cities begin to shift, and Egypt's Old Kingdom stops functioning." },

  /* ---- 2000 – 1000 BC -------------------------------------------- */
  { year: -2000, region: "Europe", what: "The Nebra sky disc is buried in Germany — a bronze plate inlaid with gold showing the sun, moon and the Pleiades, and the oldest concrete depiction of the sky known anywhere." },
  { year: -1900, region: "Mesopotamia", what: "Assyrian merchants at Kanesh in Anatolia leave thousands of clay letters about tin, textiles, debt and their wives' complaints about how long they have been away." },
  { year: -1754, region: "Mesopotamia", what: "Hammurabi of Babylon has his law code carved on a stone pillar — not the first law code, but the first anyone can read in full." },
  { year: -1600, region: "Aegean", what: "The volcano at Thera erupts, burying the Minoan town of Akrotiri and its wall paintings under ash." },
  { year: -1500, region: "Pacific", what: "The Lapita people begin the settlement of the remote Pacific, carrying pigs, taro and a distinctive stamped pottery east into islands nobody had ever reached." },
  { year: -1450, region: "Aegean", what: "Mycenaean Greeks take over the Cretan palaces and adapt the Minoan script into Linear B to write their own language." },
  { year: -1350, region: "West Asia", what: "The Hittite empire is at its height under Suppiluliuma I, corresponding with Egypt as an equal and receiving a letter from a widowed Egyptian queen asking for one of his sons as a husband." },
  { year: -1600, region: "China", what: "The Shang dynasty begins. Its kings ask questions of their ancestors by cracking ox bones and turtle shells with heat, and the answers are written on them — the earliest Chinese writing." },
  { year: -1200, region: "Mesoamerica", what: "The Olmec are building San Lorenzo, carving colossal basalt heads and moving twenty-tonne stones without wheels or draught animals." },
  { year: -1200, region: "Worldwide", what: "The Bronze Age system fails. Hatti, the Mycenaean palaces, Ugarit and the Levantine cities all fall inside about fifty years, and Egypt survives diminished." },
  { year: -1046, region: "China", what: "The Zhou overthrow the Shang and justify it with the Mandate of Heaven — the idea that a dynasty rules only while it deserves to, which is a licence for every rebellion afterwards." },

  /* ---- 1000 – 500 BC --------------------------------------------- */
  { year: -900, region: "Mesoamerica", what: "The Olmec centre shifts to La Venta. Maize agriculture is spreading, and with it the calendar and ballgame traditions later Mesoamerica inherits." },
  { year: -800, region: "South Asia", what: "The Vedic period is under way in northern India, its hymns composed and transmitted orally with a precision that kept them intact for centuries before anyone wrote them down." },
  { year: -776, region: "Greece", what: "The traditional date of the first Olympic Games, later used by Greek historians as a fixed point to count from." },
  { year: -753, region: "Italy", what: "The traditional date for the founding of Rome, arrived at by counting backwards and not to be trusted." },
  { year: -722, region: "West Asia", what: "Assyria destroys the kingdom of Israel and deports its population, an administrative technique it used across the Near East." },
  { year: -600, region: "Africa", what: "The kingdom of Kush moves its capital south to Meroë, where it will develop its own script and outlast Egypt's independence by a thousand years." },
  { year: -563, region: "South Asia", what: "The traditional birth of the Buddha in the foothills of the Himalayas. Within three centuries Ashoka will carve his teachings on pillars across India." },
  { year: -551, region: "China", what: "Confucius is born into a China of warring states, and spends his life failing to persuade any ruler to employ his ideas." },
  { year: -539, region: "Mesopotamia", what: "Cyrus takes Babylon and lets the deported peoples go home, which is why the Hebrew Bible calls a Persian king messiah." },

  /* ---- 500 – 1 BC ------------------------------------------------ */
  { year: -500, region: "South Asia", what: "Pāṇini writes a grammar of Sanskrit so complete and formally rigorous that modern linguists describe it as an algorithm." },
  { year: -400, region: "Mesoamerica", what: "Monte Albán dominates the Oaxaca valley, and Zapotec inscriptions carry what may be the earliest writing in the Americas." },
  { year: -350, region: "China", what: "The Warring States period. Iron ploughs, crossbows, mass conscript armies and Sun Tzu's Art of War, all in a China with no single ruler." },
  { year: -300, region: "South America", what: "The Nazca and Paracas cultures are producing textiles of a technical quality that would not be matched in Europe for two thousand years." },
  { year: -268, region: "South Asia", what: "Ashoka rules most of the subcontinent, converts to Buddhism after a war he says appalled him, and carves the admission on rocks across his empire." },
  { year: -221, region: "China", what: "Qin Shi Huang unifies China, standardises the script, the axle width and the weights, and begins a tomb guarded by an army of terracotta soldiers. Nobody in the Mediterranean has any idea." },
  { year: -206, region: "China", what: "The Han dynasty takes over from the Qin and will rule, with one interruption, for four hundred years — roughly the span of the Roman empire, at the other end of the same landmass." },
  { year: -130, region: "Central Asia", what: "The Silk Roads open as a continuous system. Chinese silk starts reaching Rome, where nobody knows where it comes from and Pliny complains about the money leaving." },
  { year: -100, region: "Africa", what: "The kingdom of Aksum is forming in the Ethiopian highlands, and will mint its own coinage and adopt Christianity in the fourth century." },

  /* ---- AD 1 – 500 ------------------------------------------------ */
  { year: 25, region: "China", what: "The Han are restored after a usurpation. Chinese population figures from a census in AD 2 give about 58 million people — comparable to the Roman empire." },
  { year: 100, region: "Mesoamerica", what: "Teotihuacan is becoming one of the largest cities in the world, laid out on a grid around the Pyramid of the Sun, and nobody knows what language its people spoke." },
  { year: 105, region: "China", what: "Paper manufacture is formally reported to the Han court. It reaches the Islamic world in the eighth century and Europe in the twelfth." },
  { year: 150, region: "South Asia", what: "The Kushan empire links India, Central Asia and China, and Buddhism travels the trade routes north and east with its merchants." },
  { year: 220, region: "China", what: "The Han collapse into the Three Kingdoms, at almost exactly the point Rome enters its third-century crisis. The two ends of Eurasia fail at the same time, and neither knows." },
  { year: 250, region: "Mesoamerica", what: "The Maya Classic period begins. Tikal, Palenque and Calakmul build stepped pyramids, track Venus, and keep dynastic histories in a script that can now be read." },
  { year: 320, region: "South Asia", what: "The Gupta empire begins in northern India — the period that produces the decimal place-value system and the symbol for zero." },
  { year: 400, region: "Polynesia", what: "Voyagers are settling the eastern Pacific islands by deliberate navigation, using stars, swells and birds, against the prevailing wind so a failed voyage could return." },
  { year: 476, region: "Europe", what: "The last western Roman emperor is deposed. The eastern empire, richer and intact, carries on from Constantinople for another 977 years." },
];

/* How wide a net to cast. Deep prehistory is dated in centuries at best,
   so demanding an event within eighty years of 5000 BC is asking for a
   precision nobody has — and produces an empty panel where the honest
   answer is "the same rough period". The window widens as you go back. */
function worldSpan(year) {
  if (year <= -3000) return 700;
  if (year <= -1500) return 250;
  if (year <= -500) return 120;
  return 80;
}

/* Everything within `span` years of a given year, nearest first. */
function worldAround(year, span, limit = 3) {
  if (span == null) span = worldSpan(year);
  return WORLD_EVENTS
    .map((e) => ({ ...e, gap: Math.abs(e.year - year) }))
    .filter((e) => e.gap <= span)
    .sort((a, b) => a.gap - b.gap)
    .slice(0, limit);
}
