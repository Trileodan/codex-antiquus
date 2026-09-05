/* =====================================================================
   BATTLE CARDS
   Prototype content: enough to exercise every system, not a full roster.

   These are NOT the history app's character cards. Those carry six
   scholarly attributes on a 0-99 scale (power, intellect, influence,
   creativity, wealth, fame); a battle card needs Speed, Lives and
   directional Attack/Defence on a 0-5 scale. The two cannot be derived
   from one another, and the brief is explicit that military fame must
   not simply become higher statistics.

   The link between them is `charId`: the id of the history character
   this card represents. When a player has unlocked that character in
   the main app, this card becomes legal in their decks. Battle values
   stay hand-authored for game reasons.

     attack     one number: how hard this card hits, in any direction
                it can hit at all
     arcs       which edges it can attack THROUGH, relative to its facing.
                A legionary is ["front"]; a horse archer is all four; a
                warship would be ["left","right"] and a tank all four.
                Drawn as a red line along each of those edges.
     defence    still per-edge, because being flanked has to hurt
     charId     the person in the learning app this card represents. A
                person may appear in a deck only once, whichever tier.
     tier       which point in their life this card is
     unique     only one copy may appear in a deck (named individuals)
     maxCopies  for generic cards, how many copies are allowed
     token      summoned only; never appears in a deck
   ===================================================================== */

const BATTLE_CARDS = {

/* ============================ COMMANDERS ============================ */

"caesar-gold": {
  id: "caesar-gold", name: "Julius Caesar", type: "commander", charId: "caesar", tier: "gold",
  era: "100 – 44 BC", tags: ["rome", "general", "politician"], unique: true,
  cost: 0, speed: 2, lives: 2, range: 1,
  attack: 3, arcs: ["front"],
  defence: { front: 2, left: 2, right: 2, rear: 0 },
  abilities: ["celeritas"],
  description: "Fast, aggressive and dangerously exposed from behind. Caesar's real weapon was the speed at which he could put men where they were not expected.",
},

"hannibal-gold": {
  id: "hannibal-gold", name: "Hannibal Barca", type: "commander", charId: "hannibal", tier: "gold",
  era: "247 – 183 BC", tags: ["carthage", "general"], unique: true,
  cost: 0, speed: 2, lives: 2, range: 1,
  attack: 2, arcs: ["front", "left", "right"],
  defence: { front: 2, left: 2, right: 2, rear: 1 },
  abilities: ["alpine-crossing", "war-elephant"],
  description: "Terrain was never an obstacle to Hannibal so much as an argument. Marshland, mountains and rivers cost him nothing that they did not cost the enemy twice over.",
},

"alexander-bronze": {
  id: "alexander-bronze", name: "Alexander the Great", type: "commander", charId: "alexander", tier: "bronze",
  era: "356 – 323 BC", tags: ["macedon", "general"], unique: true,
  cost: 0, speed: 3, lives: 2, range: 1,
  attack: 3, arcs: ["front"],
  defence: { front: 2, left: 1, right: 1, rear: 0 },
  abilities: ["companion-cavalry"],
  description: "He commanded from the point of the wedge, which is why he kept winning and why he kept nearly dying. Enormous reach, almost no armour behind him.",
},

"leonidas-silver": {
  id: "leonidas-silver", name: "Leonidas", type: "commander", charId: "leonidas", tier: "silver",
  era: "d. 480 BC", tags: ["sparta", "general"], unique: true,
  cost: 0, speed: 1, lives: 2, range: 1,
  attack: 2, arcs: ["front"],
  defence: { front: 3, left: 2, right: 2, rear: 1 },
  abilities: ["phalanx"],
  description: "Slow, immovable, and worth far more with a line beside him than alone. A wall is only a wall while it is continuous.",
},

"cleopatra-silver": {
  id: "cleopatra-silver", name: "Cleopatra VII", type: "commander", charId: "cleopatra", tier: "silver",
  era: "69 – 30 BC", tags: ["egypt", "ruler"], unique: true,
  cost: 0, speed: 2, lives: 2, range: 1,
  attack: 1, arcs: ["front"],
  defence: { front: 2, left: 2, right: 2, rear: 1 },
  abilities: ["patron-of-egypt", "royal-summons"],
  description: "A poor duellist and the best economy in the game. Cleopatra fights by being able to afford more than the person opposite her.",
},

"genghis": {
  id: "genghis", name: "Genghis Khan", type: "commander", charId: null,
  era: "c. 1162 – 1227", tags: ["mongol", "general"], unique: true,
  cost: 0, speed: 3, lives: 2, range: 1,
  attack: 2, arcs: ["front", "left", "right", "rear"],
  defence: { front: 2, left: 1, right: 1, rear: 1 },
  abilities: ["steppe-riders", "feigned-retreat"],
  description: "The only Commander with no blind side, and the one that makes a whole cavalry deck move a square further than the enemy has planned for.",
},

"napoleon": {
  id: "napoleon", name: "Napoleon Bonaparte", type: "commander", charId: null,
  era: "1769 – 1821", tags: ["france", "general"], unique: true,
  cost: 0, speed: 2, lives: 2, range: 1,
  attack: 2, arcs: ["front"],
  defence: { front: 2, left: 2, right: 2, rear: 1 },
  abilities: ["grande-armee", "signal-flags"],
  description: "Wins by arithmetic. Every Troop costs less, so the board fills faster than the opponent can clear it.",
},

/* ============================== TROOPS ============================== */

"legionnaire": {
  id: "legionnaire", name: "Roman Legionnaire", type: "troop", charId: null,
  era: "Republic – Empire", tags: ["rome", "infantry", "generic"], unique: false, maxCopies: 3,
  cost: 2, speed: 1, lives: 1, range: 1,
  attack: 2, arcs: ["front"],
  defence: { front: 2, left: 1, right: 1, rear: 0 },
  abilities: [],
  description: "The baseline. Cheap, solid from the front, useless if you let something get behind it.",
},

"velite": {
  id: "velite", name: "Roman Velite", type: "troop", charId: null,
  era: "Republic", tags: ["rome", "skirmisher", "ranged", "generic"], unique: false, maxCopies: 3,
  cost: 2, speed: 2, lives: 1, range: 2,
  attack: 1, arcs: ["front"],
  defence: { front: 1, left: 1, right: 1, rear: 0 },
  abilities: [],
  description: "Throws javelins two squares and dies to anything that reaches it. Screening infantry, not a line of its own.",
},

"phalangite": {
  id: "phalangite", name: "Macedonian Phalangite", type: "troop", charId: null,
  era: "4th c. BC", tags: ["macedon", "infantry", "generic"], unique: false, maxCopies: 3,
  cost: 3, speed: 1, lives: 1, range: 1,
  attack: 3, arcs: ["front"],
  defence: { front: 3, left: 1, right: 1, rear: 0 },
  abilities: [],
  description: "A sarissa is five metres of advantage directly ahead and a liability in every other direction. Do not let it be turned.",
},

"spartan-hoplite": {
  id: "spartan-hoplite", name: "Spartan Hoplite", type: "troop", charId: null,
  era: "5th c. BC", tags: ["sparta", "infantry", "generic"], unique: false, maxCopies: 2,
  cost: 3, speed: 1, lives: 1, range: 1,
  attack: 2, arcs: ["front"],
  defence: { front: 3, left: 2, right: 2, rear: 1 },
  abilities: ["dig-in"],
  description: "The shield covers its own left and its neighbour's right, which is why it is worth more standing in a line than standing alone.",
},

"numidian-cavalry": {
  id: "numidian-cavalry", name: "Numidian Cavalry", type: "troop", charId: null,
  era: "3rd c. BC", tags: ["numidia", "cavalry", "generic"], unique: false, maxCopies: 3,
  cost: 3, speed: 3, lives: 1, range: 1,
  attack: 2, arcs: ["front", "left", "right"],
  defence: { front: 1, left: 1, right: 1, rear: 1 },
  abilities: [],
  description: "The arm that decided Cannae and then decided Zama against the people who taught it. Fast enough to reach a rear facing in one action.",
},

"cretan-archer": {
  id: "cretan-archer", name: "Cretan Archer", type: "troop", charId: null,
  era: "Hellenistic", tags: ["crete", "ranged", "generic"], unique: false, maxCopies: 2,
  cost: 3, speed: 1, lives: 1, range: 3,
  attack: 1, arcs: ["front"],
  defence: { front: 1, left: 0, right: 0, rear: 0 },
  abilities: [],
  description: "The longest reach in the prototype and the thinnest skin. Needs a line in front of it and a clear lane.",
},

"immortal": {
  id: "immortal", name: "Persian Immortal", type: "troop", charId: null,
  era: "6th – 4th c. BC", tags: ["persia", "infantry", "generic"], unique: false, maxCopies: 3,
  cost: 3, speed: 1, lives: 1, range: 1,
  attack: 2, arcs: ["front"],
  defence: { front: 2, left: 2, right: 1, rear: 1 },
  abilities: ["the-immortals"],
  description: "The corps was kept at exactly ten thousand: every casualty was replaced at once, so it never appeared to lose anyone. Losing one draws you another card.",
},

"scythian-archer": {
  id: "scythian-archer", name: "Scythian Horse Archer", type: "troop", charId: null,
  era: "5th c. BC", tags: ["scythia", "cavalry", "ranged", "generic"], unique: false, maxCopies: 2,
  cost: 4, speed: 3, lives: 1, range: 2,
  attack: 1, arcs: ["front", "left", "right", "rear"],
  defence: { front: 1, left: 1, right: 1, rear: 0 },
  abilities: [],
  description: "Shoots in every direction and outruns anything that wants a word about it. The unit that punishes a slow, heavy line.",
},

"sacred-band": {
  id: "sacred-band", name: "Theban Sacred Band", type: "troop", charId: null,
  era: "4th c. BC", tags: ["thebes", "infantry", "generic"], unique: false, maxCopies: 2,
  cost: 4, speed: 2, lives: 1, range: 1,
  attack: 3, arcs: ["front"],
  defence: { front: 2, left: 2, right: 2, rear: 0 },
  abilities: [],
  description: "Three hundred picked men who broke the Spartan line at Leuctra and died in their ranks at Chaeronea. Expensive, and it does not retreat well.",
},


"jack-ripper": {
  id: "jack-ripper", name: "Jack the Ripper", type: "troop", charId: null,
  era: "1888", tags: ["london", "assassin"], unique: true,
  cost: 4, speed: 2, lives: 1, range: 1,
  attack: 4, arcs: ["front"],
  defence: { front: 0, left: 0, right: 0, rear: 0 },
  abilities: ["whitechapel-killer"],
  description: "Hits harder than anything else in the prototype and cannot survive a single return blow. Kills, disappears, and is somewhere else by the time you look.",
},

"boudica-bronze": {
  id: "boudica-bronze", name: "Boudica", type: "troop", charId: "boudica", tier: "bronze",
  era: "d. c. AD 61", tags: ["britain", "rebel", "chariot"], unique: true,
  cost: 4, speed: 3, lives: 1, range: 1,
  attack: 3, arcs: ["front", "left", "right"],
  defence: { front: 1, left: 1, right: 1, rear: 0 },
  abilities: [],
  description: "A chariot line does its damage in the pass, not the melee. Wide attack across the front and the flanks, nothing at all behind.",
},

"war-elephant-token": {
  id: "war-elephant-token", name: "War Elephant", type: "troop", charId: null,
  era: "Summoned", tags: ["carthage", "beast", "token"], unique: false, token: true,
  cost: 0, speed: 1, lives: 1, range: 1,
  attack: 4, arcs: ["front"],
  defence: { front: 2, left: 2, right: 2, rear: 2 },
  abilities: [],
  description: "Summoned by Hannibal. Slow, armoured on every side, and devastating to anything directly in front of it.",
},

/* ============================= SPECIALS ============================= */

"nightingale": {
  id: "nightingale", name: "Florence Nightingale", type: "special", charId: null,
  era: "1820 – 1910", tags: ["britain", "medicine"], unique: true,
  cost: 2, abilities: ["field-hospital"],
  description: "She did not win battles; she stopped them costing what they usually cost. Restores a lost Life to a damaged Commander.",
},

"van-gogh": {
  id: "van-gogh", name: "Vincent van Gogh", type: "special", charId: null,
  era: "1853 – 1890", tags: ["netherlands", "art"], unique: true,
  cost: 2, abilities: ["mesmerise"],
  description: "A painter has no business on a battlefield, so he does not go on one. An enemy unit stops where it is for two rounds.",
},


"archimedes": {
  id: "archimedes", name: "Archimedes", type: "special", charId: null,
  era: "c. 287 – 212 BC", tags: ["syracuse", "engineer"], unique: true,
  cost: 4, abilities: ["the-claw"],
  description: "The siege engines at Syracuse held a Roman fleet off for two years. One damage to any unit on the board, and Defence does not enter into it.",
},

"sun-tzu": {
  id: "sun-tzu", name: "Sun Tzu", type: "special", charId: null,
  era: "c. 5th c. BC", tags: ["china", "strategy"], unique: true,
  cost: 3, abilities: ["know-your-enemy"],
  description: "Look at your opponent's hand and then draw. The whole card is a statement about what information is worth.",
},

"pheidippides": {
  id: "pheidippides", name: "Pheidippides", type: "special", charId: null,
  era: "490 BC", tags: ["athens", "runner"], unique: true,
  cost: 2, abilities: ["forced-march"],
  description: "The runner of Marathon, whose one recorded contribution was arriving. A friendly unit may Move a second time this turn.",
},

"agrippa": {
  id: "agrippa", name: "Marcus Agrippa", type: "special", charId: null,
  era: "63 – 12 BC", tags: ["rome", "admiral"], unique: true,
  cost: 3, abilities: ["reveal"],
  description: "The man who actually won Actium. Ends every Hidden status on the board and stops those units hiding again for two rounds.",
},

};

const BATTLE_CARD_IDS = Object.keys(BATTLE_CARDS);
