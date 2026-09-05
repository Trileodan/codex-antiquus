/* =====================================================================
   COLLECTION CARDS
   Battle cards for the historical figures the learning app teaches.

   The id is `<charId>-<tier>`, because the same person at a different
   point in their life is a different card. Young Caesar is quick,
   clever and physically unimpressive; the dictator is the most
   dangerous thing on the board. Both are legal; only one of them can be
   in a deck, because a person can only be in a deck once.

   `charId` is the link back to the learning app. A card is legal in a
   deck when its person has been unlocked there at that tier or above.
   Nothing here is derived from the six scholarly attributes: a card is
   strong because of what the person DID, expressed as movement, arcs
   and abilities — not because they are famous.
   ===================================================================== */

Object.assign(BATTLE_CARDS, {

/* ---------------------------- COMMANDERS ---------------------------- */

"boudica-silver": {
  id: "boudica-silver", name: "Boudica", type: "commander", charId: "boudica", tier: "silver",
  era: "AD 60 – 61", tags: ["britain", "iceni", "rebel"], unique: true,
  cost: 0, speed: 2, lives: 2, range: 1, attack: 3, arcs: ["front", "left", "right"],
  defence: { front: 2, left: 1, right: 1, rear: 0 },
  abilities: ["the-rising"],
  description: "Burned three cities in a season and could not be stopped by anything except a professional army on ground of its own choosing. Hits hard on three edges, has almost nothing behind her, and makes every warband on the field angrier.",
},

"caratacus-bronze": {
  id: "caratacus-bronze", name: "Caratacus", type: "commander", charId: "caratacus", tier: "bronze",
  era: "AD 43 – 51", tags: ["britain", "catuvellauni", "rebel"], unique: true,
  cost: 0, speed: 2, lives: 2, range: 1, attack: 2, arcs: ["front"],
  defence: { front: 2, left: 2, right: 2, rear: 1 },
  abilities: ["melt-away"],
  description: "Lost his kingdom in the first summer and fought on for nine years by never being where the legions were. Not a card that wins fights. A card that refuses to be finished.",
},

"cassivellaunus-bronze": {
  id: "cassivellaunus-bronze", name: "Cassivellaunus", type: "commander", charId: "cassivellaunus", tier: "bronze",
  era: "54 BC", tags: ["britain", "chariot"], unique: true,
  cost: 0, speed: 3, lives: 2, range: 1, attack: 2, arcs: ["front"],
  defence: { front: 1, left: 1, right: 1, rear: 1 },
  abilities: ["chariot-country"],
  description: "Disbanded his infantry and kept four thousand chariots. Fast over anything, thin everywhere, and unbothered by ground that slows everyone else down.",
},

"cyrus-gold": {
  id: "cyrus-gold", name: "Cyrus the Great", type: "commander", charId: "cyrus", tier: "gold",
  era: "559 – 530 BC", tags: ["persia", "king"], unique: true,
  cost: 0, speed: 2, lives: 2, range: 1, attack: 2, arcs: ["front"],
  defence: { front: 2, left: 2, right: 2, rear: 1 },
  abilities: ["leave-their-gods"],
  description: "Held more of the earth than anyone before him by leaving conquered people their law, their language and their gods. An army that is not trying to erase anybody is an army that is harder to shift.",
},

"perikles-gold": {
  id: "perikles-gold", name: "Perikles", type: "commander", charId: "perikles", tier: "gold",
  era: "461 – 429 BC", tags: ["athens", "statesman"], unique: true,
  cost: 0, speed: 1, lives: 2, range: 1, attack: 1, arcs: ["front"],
  defence: { front: 3, left: 2, right: 2, rear: 1 },
  abilities: ["the-long-walls"],
  description: "His strategy was to give up the countryside, hold what could be held, and win by not losing. Terrible in the open field and extremely hard to remove from a fortress.",
},

"philip2-silver": {
  id: "philip2-silver", name: "Philip II of Macedon", type: "commander", charId: "philip2", tier: "silver",
  era: "359 – 336 BC", tags: ["macedon", "king"], unique: true,
  cost: 0, speed: 2, lives: 2, range: 1, attack: 3, arcs: ["front"],
  defence: { front: 3, left: 1, right: 1, rear: 0 },
  abilities: ["the-sarissa"],
  description: "Built the army his son used. Everything about the sarissa is an argument for standing in a line facing forward, and this card makes that argument to every Troop you own.",
},

"scipio-gold": {
  id: "scipio-gold", name: "Scipio Africanus", type: "commander", charId: "scipio", tier: "gold",
  era: "236 – 183 BC", tags: ["rome", "general"], unique: true,
  cost: 0, speed: 2, lives: 2, range: 1, attack: 2, arcs: ["front", "left", "right"],
  defence: { front: 2, left: 2, right: 2, rear: 1 },
  abilities: ["numidian-horse"],
  description: "Read the lesson of Cannae from the losing side and spent years acquiring the cavalry to repeat it. Win the horse battle first and the infantry battle becomes arithmetic.",
},

"vercingetorix-silver": {
  id: "vercingetorix-silver", name: "Vercingetorix", type: "commander", charId: "vercingetorix", tier: "silver",
  era: "52 BC", tags: ["gaul", "rebel"], unique: true,
  cost: 0, speed: 2, lives: 2, range: 1, attack: 3, arcs: ["front"],
  defence: { front: 2, left: 1, right: 1, rear: 0 },
  abilities: ["scorched-earth"],
  description: "Burned his own people's towns to starve an invader, which very nearly worked and cost him the only thing he was fighting for. Leaves an enemy exposed at a distance.",
},

"xerxes-bronze": {
  id: "xerxes-bronze", name: "Xerxes I", type: "commander", charId: "xerxes", tier: "bronze",
  era: "486 – 465 BC", tags: ["persia", "king"], unique: true,
  cost: 0, speed: 1, lives: 2, range: 1, attack: 2, arcs: ["front"],
  defence: { front: 2, left: 2, right: 2, rear: 2 },
  abilities: ["the-great-king"],
  description: "Slow, armoured on every side, and backed by the deepest treasury in the world. He does not need to be quick if he can afford to keep putting cards on the board.",
},

"carausius-silver": {
  id: "carausius-silver", name: "Carausius", type: "commander", charId: "carausius", tier: "silver",
  era: "AD 286 – 293", tags: ["britain", "usurper", "naval"], unique: true,
  cost: 0, speed: 2, lives: 2, range: 1, attack: 2, arcs: ["front", "left", "right"],
  defence: { front: 2, left: 1, right: 1, rear: 1 },
  abilities: ["the-channel-fleet"],
  description: "Took the fleet, took an island, and struck better silver than the empire he had left. Everything he commands moves a square further than the enemy has planned for.",
},

"agricola-silver": {
  id: "agricola-silver", name: "Agricola", type: "commander", charId: "agricola", tier: "silver",
  era: "AD 77 – 84", tags: ["rome", "governor"], unique: true,
  cost: 0, speed: 2, lives: 2, range: 1, attack: 2, arcs: ["front"],
  defence: { front: 2, left: 2, right: 2, rear: 1 },
  abilities: ["circumnavigation"],
  description: "Took the army further north than it ever went again and sent the fleet round the top of the island to prove it was one. Gives somebody else the extra move that finishes a manoeuvre.",
},

"cartimandua-silver": {
  id: "cartimandua-silver", name: "Cartimandua", type: "commander", charId: "cartimandua", tier: "silver",
  era: "AD 43 – 69", tags: ["britain", "brigantes", "client"], unique: true,
  cost: 0, speed: 1, lives: 2, range: 1, attack: 1, arcs: ["front"],
  defence: { front: 3, left: 2, right: 2, rear: 1 },
  abilities: ["terms-with-rome"],
  description: "Kept the largest kingdom in Britain out of a war for twenty-five years by knowing exactly what the other side was holding. Almost no offence and very hard to dislodge.",
},

/* ------------------------------ TROOPS ------------------------------ */

"artemisia-bronze": {
  id: "artemisia-bronze", name: "Artemisia I", type: "troop", charId: "artemisia", tier: "bronze",
  era: "480 BC", tags: ["halicarnassus", "naval"], unique: true,
  cost: 4, speed: 3, lives: 1, range: 1, attack: 3, arcs: ["left", "right"],
  defence: { front: 1, left: 2, right: 2, rear: 1 },
  abilities: [],
  description: "A ship fights with its sides. Fast, armoured on the beam, and completely harmless to anything directly ahead or astern — the first card built the way the naval game will be.",
},

"amesbury-archer-bronze": {
  id: "amesbury-archer-bronze", name: "The Amesbury Archer", type: "troop", charId: "amesbury-archer", tier: "bronze",
  era: "c. 2300 BC", tags: ["britain", "beaker", "ranged"], unique: true,
  cost: 3, speed: 1, lives: 1, range: 3, attack: 2, arcs: ["front"],
  defence: { front: 1, left: 1, right: 0, rear: 0 },
  abilities: [],
  description: "Sixteen flint arrowheads in a grave three miles from Stonehenge, and a man who had walked from the Alps on a ruined knee. Reaches a long way and cannot take a hit.",
},

"spartacus-silver": {
  id: "spartacus-silver", name: "Spartacus", type: "troop", charId: "spartacus", tier: "silver",
  era: "73 – 71 BC", tags: ["rome", "rebel"], unique: true,
  cost: 4, speed: 2, lives: 1, range: 1, attack: 3, arcs: ["front", "left", "right", "rear"],
  defence: { front: 1, left: 1, right: 1, rear: 1 },
  abilities: ["slave-revolt"],
  description: "Dangerous from any angle and almost unarmoured. Every enemy he puts down brings another card to your hand — the revolt grows by winning, which is also how it ended.",
},

"cambyses-silver": {
  id: "cambyses-silver", name: "Cambyses II", type: "troop", charId: "cambyses", tier: "silver",
  era: "530 – 522 BC", tags: ["persia", "king"], unique: true,
  cost: 4, speed: 2, lives: 1, range: 1, attack: 4, arcs: ["front"],
  defence: { front: 1, left: 1, right: 0, rear: 0 },
  abilities: [],
  description: "Took Egypt, overreached twice, and lost an army to a desert. The Greek portrait of a king destroyed by his own power, given the statistics that portrait implies: enormous forward violence, nothing holding him up.",
},

"darius3-bronze": {
  id: "darius3-bronze", name: "Darius III", type: "troop", charId: "darius3", tier: "bronze",
  era: "336 – 330 BC", tags: ["persia", "king"], unique: true,
  cost: 3, speed: 3, lives: 1, range: 1, attack: 1, arcs: ["front"],
  defence: { front: 2, left: 2, right: 2, rear: 1 },
  abilities: ["withdraw"],
  description: "Left the field at Issus and again at Gaugamela, which Greek writers call cowardice and which is also the only correct move when the death of the king ends the war. Fast, defensive, and able to get out.",
},

/* ----------------------------- SPECIALS ----------------------------- */

"sokrates-silver": {
  id: "sokrates-silver", name: "Socrates", type: "special", charId: "sokrates", tier: "silver",
  era: "469 – 399 BC", tags: ["athens", "philosophy"], unique: true,
  cost: 3, abilities: ["know-your-enemy"],
  description: "Spent his life asking people what they actually knew and being disliked for it. Look at your opponent's hand, then draw.",
},

"thucydides-bronze": {
  id: "thucydides-bronze", name: "Thucydides", type: "special", charId: "thucydides", tier: "bronze",
  era: "c. 460 – 400 BC", tags: ["athens", "history"], unique: true,
  cost: 2, abilities: ["read-the-ground"],
  description: "Lost a city, was exiled for it, and spent twenty years able to travel on both sides of a war he was writing about. See what your opponent is holding.",
},

"herodotos-bronze": {
  id: "herodotos-bronze", name: "Herodotus", type: "special", charId: "herodotos", tier: "bronze",
  era: "c. 484 – 425 BC", tags: ["greece", "history"], unique: true,
  cost: 2, abilities: ["know-your-enemy"],
  description: "He went and asked, and wrote down who told him. Look at your opponent's hand, then draw a card.",
},

"solon-silver": {
  id: "solon-silver", name: "Solon", type: "special", charId: "solon", tier: "silver",
  era: "594 BC", tags: ["athens", "law"], unique: true,
  cost: 2, abilities: ["shaking-off-burdens"],
  description: "Cancelled the debts, freed the people who had been sold for them, and satisfied nobody entirely. Restores a lost Life to a damaged friendly card.",
},

"cicero-bronze": {
  id: "cicero-bronze", name: "Cicero", type: "special", charId: "cicero", tier: "bronze",
  era: "106 – 43 BC", tags: ["rome", "orator"], unique: true,
  cost: 2, abilities: ["rhetoric"],
  description: "The most dangerous voice in the late Republic, and it never once held a line. Leaves an enemy card Exposed for two rounds.",
},

"pytheas-silver": {
  id: "pytheas-silver", name: "Pytheas of Massalia", type: "special", charId: "pytheas", tier: "silver",
  era: "c. 325 BC", tags: ["massalia", "exploration"], unique: true,
  cost: 3, abilities: ["reveal"],
  description: "Sailed out to look at what everyone else was guessing about, and was called a liar for reporting it accurately. Ends every Hidden status on the board and stops them coming back.",
},

"claudia-severa-bronze": {
  id: "claudia-severa-bronze", name: "Claudia Severa", type: "special", charId: "claudia-severa", tier: "bronze",
  era: "c. AD 100", tags: ["britain", "frontier"], unique: true,
  cost: 2, abilities: ["word-from-the-fort"],
  description: "A birthday invitation from one fort to another, with the closing line in her own hand — the earliest known writing in Latin by a woman. Word gets through: draw a card.",
},

"crassus-bronze": {
  id: "crassus-bronze", name: "Crassus", type: "special", charId: "crassus", tier: "bronze",
  era: "115 – 53 BC", tags: ["rome", "wealth"], unique: true,
  cost: 4, abilities: ["the-richest-man"],
  description: "Owned a private fire brigade that negotiated the price of the building while it burned. Money buys options: draw two cards.",
},

"cato-bronze": {
  id: "cato-bronze", name: "Cato the Younger", type: "special", charId: "cato", tier: "bronze",
  era: "95 – 46 BC", tags: ["rome", "senate"], unique: true,
  cost: 2, abilities: ["obstruction"],
  description: "Talked out the daylight to stop business he disliked, on principle, repeatedly, until there was no Republic left to obstruct. One enemy card cannot Move for two rounds.",
},

});
