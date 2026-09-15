/* =====================================================================
   COINS FOR THE MASTER BRIEF v3 SETS

   Ancient China and Mesoamerica arrived as Sets in v3 and needed patrons
   — the one coin a Set grants when you choose to begin there.

   Tier text is written from the brief's own slides for those Sets and
   nothing else, so the coin cannot claim more than the app teaches.
   ===================================================================== */

Object.assign(CHARACTERS, {

"qin-shi-huang": {
  id: "qin-shi-huang", name: "Qin Shi Huang", years: "259 – 210 BC", sets: ["ancient-china"],
  teaches: ["chn-qin-becomes-war-machine", "chn-221-bc-first-emperor",
            "chn-terracotta-army-immortality", "chn-qin-collapses"],
  timeline: { year: -221, label: "Qin unifies China and Zheng becomes First Emperor" },
  tiers: {
    bronze: { label: "King Zheng of Qin", when: "259 – 221 BC",
      blurb: "King of the westernmost of the seven warring states, which had spent a century rebuilding itself around agriculture and war until it could field and feed armies nobody else could match." },
    silver: { label: "The First Emperor", when: "221 BC",
      blurb: "Having taken the last of the six rival states, he invented a title to match — huangdi, August Emperor — and standardised the script, the weights, the coinage and the width of cart axles across everything he had conquered." },
    gold: { label: "Fifteen Years", when: "221 – 206 BC",
      blurb: "The machine that unified China could not hold it. Enormous conscript projects, a succession crisis and a system with no legitimating idea beyond success brought the dynasty down within fifteen years — and the Han then kept almost every institution while denouncing the dynasty that built them." },
  },
  claims: [
    { text: "Qin completed the conquest of the six rival states in 221 BC.", classification: "Established", sources: ["cah"], date: "221 BC", at: "bronze" },
    { text: "He adopted the new title huangdi, conventionally translated as emperor.", classification: "Established", sources: ["cah"], date: "221 BC", at: "silver" },
    { text: "Script, weights, measures and axle gauge were standardised under Qin.", classification: "Established", sources: ["cah", "arch"], date: "221 BC", at: "silver" },
    { text: "The Qin dynasty fell within about fifteen years of unification.", classification: "Established", sources: ["cah"], date: "206 BC", at: "gold" },
    { text: "Much of the monstrous-tyrant portrait comes through Han writers whose dynasty's legitimacy depended on it.", classification: "Interpretation", sources: ["cah"], date: "2nd c. BC", at: "gold" },
  ],
  connections: [{ name: "Terracotta Army", type: "concept" }, { name: "Warring States", type: "concept" }],
},

"pakal": {
  id: "pakal", name: "Pakal the Great", years: "AD 603 – 683", sets: ["mesoamerica"],
  teaches: ["mes-maya-city-states", "mes-classic-maya-transformation"],
  timeline: { year: 615, label: "Pakal accedes at Palenque, aged twelve" },
  tiers: {
    bronze: { label: "A King of Palenque", when: "AD 615",
      blurb: "One of the best-known rulers of the Classic Maya world, on the throne of a single city-state — because the Maya were never an empire, but dozens of competing dynasties." },
    silver: { label: "A Reign of Sixty-Eight Years", when: "AD 615 – 683",
      blurb: "Long enough to rebuild a city. His monuments and inscriptions record accession, family, ritual and dynastic claim in a script that can now be read — which is why we know his name at all, and not those of Teotihuacan's rulers." },
    gold: { label: "Why We Can Read Him", when: "The decipherment",
      blurb: "For most of the twentieth century Maya glyphs were thought to be calendrical and mystical rather than historical. Once Proskouriakoff showed the dated monuments clustered into human lifespans, the inscriptions turned out to be dynastic history — and Pakal stopped being an anonymous figure on a carved lid and became a king with dates." },
  },
  claims: [
    { text: "Pakal ruled Palenque from AD 615 until his death in 683.", classification: "Established", sources: ["arch"], date: "615–683", at: "bronze" },
    { text: "Classic Maya polities were independent city-states rather than a single empire.", classification: "Established", sources: ["arch", "cah"], date: "250–900", at: "silver" },
    { text: "Maya inscriptions were shown to record dynastic history rather than only calendrics.", classification: "Established", sources: ["arch"], date: "1960", at: "gold" },
  ],
  connections: [{ name: "Palenque", type: "place" }, { name: "Maya script", type: "concept" }],
},

});
