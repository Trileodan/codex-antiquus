/* =====================================================================
   ABILITIES
   Cards reference abilities by id. An ability is a trigger plus one or
   more effects drawn from a fixed vocabulary the engine understands.

   This is the rule the brief is strictest about: no engine code may
   branch on a character's name. If a card needs behaviour that does not
   exist yet, add an EFFECT TYPE here and teach the engine that type
   once — every future card can then reuse it.

   TRIGGERS
     passive     always on while its conditions hold
     triggered   the player spends one of the card's Actions to use it
     onDeploy    fires as the card enters the battlefield
     onDefeat    fires as the card is removed
     onKill      fires when this card defeats another
     special     a Special card's effect, resolved on play

   EFFECT TYPES the engine implements (see engine/effects.js)
     summon, heal, status, draw, aura, ignoreTerrain, noDeploySickness,
     commandCap, damage, pull, extraAction, peek
   ===================================================================== */

const ABILITIES = {
  /* ---- passives ------------------------------------------------- */
  "alpine-crossing": {
    id: "alpine-crossing", name: "Alpine Crossing", trigger: "passive",
    text: "Ignores terrain movement penalties. Every passable square costs 1.",
    effects: [{ type: "ignoreTerrain" }],
  },
  "phalanx": {
    id: "phalanx", name: "Phalanx", trigger: "passive",
    text: "+2 Front Defence while at least one allied unit is orthogonally adjacent.",
    effects: [{ type: "aura", scope: "self", requires: "adjacentAlly", defence: { front: 2 } }],
  },
  "steppe-riders": {
    id: "steppe-riders", name: "Steppe Riders", trigger: "passive",
    text: "Friendly Troops with Speed 2 or more gain +1 Speed.",
    effects: [{ type: "aura", scope: "friendly", filter: { type: "troop", minSpeed: 2 }, speed: 1 }],
  },
  "celeritas": {
    id: "celeritas", name: "Celeritas", trigger: "passive",
    text: "Friendly cards deployed orthogonally adjacent to this Commander ignore Deployment Sickness.",
    effects: [{ type: "noDeploySickness", radius: 1 }],
  },
  "patron-of-egypt": {
    id: "patron-of-egypt", name: "Patron of Egypt", trigger: "passive",
    text: "Your maximum stored Command is increased by 2.",
    effects: [{ type: "commandCap", amount: 2 }],
  },
  "grande-armee": {
    id: "grande-armee", name: "Grande Armée", trigger: "passive",
    text: "Friendly Troops cost 1 less Command to deploy, to a minimum of 1.",
    effects: [{ type: "deployDiscount", amount: 1, filter: { type: "troop" } }],
  },
  "sacred-ground": {
    id: "sacred-ground", name: "Sacred Ground", trigger: "passive",
    text: "+1 Defence in every direction while standing on a Fortress you control.",
    effects: [{ type: "aura", scope: "self", requires: "ownFortress", defence: { all: 1 } }],
  },

  /* ---- triggered ------------------------------------------------ */
  "war-elephant": {
    id: "war-elephant", name: "War Elephant", trigger: "triggered", costsAction: true, cooldown: 5,
    text: "Summon a War Elephant onto an eligible adjacent square.",
    effects: [{ type: "summon", cardId: "war-elephant-token" }],
  },
  "companion-cavalry": {
    id: "companion-cavalry", name: "Companion Cavalry", trigger: "triggered", costsAction: true, cooldown: 4,
    text: "This Commander immediately gains one extra Action this turn, and may Move again even if it has already moved.",
    effects: [{ type: "extraAction", allowSecondMove: true }],
  },
  "royal-summons": {
    id: "royal-summons", name: "Royal Summons", trigger: "triggered", costsAction: true, cooldown: 3,
    text: "Draw a card.",
    effects: [{ type: "draw", count: 1 }],
  },
  "feigned-retreat": {
    id: "feigned-retreat", name: "Feigned Retreat", trigger: "triggered", costsAction: true, cooldown: 3,
    text: "Pull one enemy unit within 3 squares one square directly toward this Commander.",
    effects: [{ type: "pull", distance: 1, range: 3 }],
  },
  "signal-flags": {
    id: "signal-flags", name: "Signal Flags", trigger: "triggered", costsAction: true, cooldown: 2,
    text: "One friendly unit within 3 squares becomes Fortified.",
    effects: [{ type: "status", status: "fortified", rounds: 1, target: "friendlyInRange", range: 3 }],
  },

  /* ---- on kill / on defeat / on deploy -------------------------- */
  "whitechapel-killer": {
    id: "whitechapel-killer", name: "Whitechapel Killer", trigger: "onKill",
    text: "After defeating an enemy, this unit becomes Hidden for 2 turns.",
    effects: [{ type: "status", status: "hidden", rounds: 2, target: "self" }],
  },
  "slave-revolt": {
    id: "slave-revolt", name: "Slave Revolt", trigger: "onKill",
    text: "After defeating an enemy, draw a card.",
    effects: [{ type: "draw", count: 1 }],
  },
  "the-immortals": {
    id: "the-immortals", name: "The Immortals", trigger: "onDefeat",
    text: "When this unit is defeated, its owner draws a card. The unit is replaced as fast as it falls.",
    effects: [{ type: "draw", count: 1 }],
  },
  "dig-in": {
    id: "dig-in", name: "Dig In", trigger: "onDeploy",
    text: "This unit enters the battlefield Fortified.",
    effects: [{ type: "status", status: "fortified", rounds: 1, target: "self" }],
  },

  /* ---- specials -------------------------------------------------- */
  "field-hospital": {
    id: "field-hospital", name: "Field Hospital", trigger: "special",
    text: "Restore 1 lost Life to a damaged friendly Commander.",
    effects: [{ type: "heal", amount: 1, target: "friendlyDamaged" }],
  },
  "mesmerise": {
    id: "mesmerise", name: "Mesmerise", trigger: "special",
    text: "One enemy battlefield card becomes Mesmerised for 2 rounds and cannot Move.",
    effects: [{ type: "status", status: "mesmerised", rounds: 2, target: "enemyUnit" }],
  },
  "rhetoric": {
    id: "rhetoric", name: "Rhetoric", trigger: "special",
    text: "One enemy battlefield card becomes Exposed for 2 rounds.",
    effects: [{ type: "status", status: "exposed", rounds: 2, target: "enemyUnit" }],
  },
  "the-claw": {
    id: "the-claw", name: "The Claw of Archimedes", trigger: "special",
    text: "Deal 1 damage to an enemy unit anywhere on the battlefield, ignoring Defence.",
    effects: [{ type: "damage", amount: 1, target: "enemyUnit", ignoreDefence: true }],
  },
  "know-your-enemy": {
    id: "know-your-enemy", name: "Know Your Enemy", trigger: "special",
    text: "Look at your opponent's hand, then draw a card.",
    effects: [{ type: "peek" }, { type: "draw", count: 1 }],
  },
  "forced-march": {
    id: "forced-march", name: "Forced March", trigger: "special",
    text: "One friendly unit may take an additional Move action this turn.",
    effects: [{ type: "extraAction", target: "friendlyUnit", allowSecondMove: true }],
  },
  "reveal": {
    id: "reveal", name: "Reveal", trigger: "special",
    text: "End all Hidden statuses on enemy units, and Reveal them for 2 rounds.",
    effects: [{ type: "status", status: "revealed", rounds: 2, target: "allEnemies", clears: "hidden" }],
  },

  /* ---- collection-card abilities ---------------------------------- */
  /* ---- Roman Empire ---------------------------------------------- */
  "testudo": {
    id: "testudo", name: "Testudo", trigger: "triggered", costsAction: true, cooldown: 2,
    text: "This card becomes Fortified: +1 Defence on every edge until the end of the round.",
    effects: [{ type: "status", status: "fortified", target: "self", rounds: 2 }],
  },
  "frontier-works": {
    id: "frontier-works", name: "Frontier Works", trigger: "passive",
    text: "Friendly cards within one square gain +1 Defence on every edge.",
    effects: [{ type: "aura", scope: "friendly", range: 1, defence: { all: 1 } }],
  },
  "the-donative": {
    id: "the-donative", name: "The Donative", trigger: "onDeploy",
    text: "Draw a card as this Commander takes the field.",
    effects: [{ type: "draw", count: 1 }],
  },
  "best-of-emperors": {
    id: "best-of-emperors", name: "Optimus Princeps", trigger: "triggered", costsAction: true, cooldown: 3,
    text: "Give a friendly card an extra Action this turn, and let it move again.",
    effects: [{ type: "extraAction", target: "friendlyUnit", allowSecondMove: true }],
  },
  "the-tetrarchy": {
    id: "the-tetrarchy", name: "The Tetrarchy", trigger: "passive",
    text: "Raises your Command cap by 2.",
    effects: [{ type: "commandCap", amount: 2 }],
  },
  "in-hoc-signo": {
    id: "in-hoc-signo", name: "In Hoc Signo", trigger: "triggered", costsAction: true, cooldown: 4,
    text: "All enemy cards become Revealed for 2 rounds, ending any Hidden status.",
    effects: [{ type: "status", status: "revealed", target: "allEnemies", rounds: 2, clears: "hidden" }],
  },
  "changed-sides": {
    id: "changed-sides", name: "Changed Sides", trigger: "special",
    text: "Look at your opponent's hand, then draw two cards.",
    effects: [{ type: "peek" }, { type: "draw", count: 2 }],
  },
  "res-gestae": {
    id: "res-gestae", name: "The Record", trigger: "special",
    text: "One enemy card becomes Exposed for 3 rounds.",
    effects: [{ type: "status", status: "exposed", rounds: 3, target: "enemyUnit" }],
  },
  "the-rising": {
    id: "the-rising", name: "The Rising", trigger: "passive",
    text: "Friendly Troops gain +1 Attack.",
    effects: [{ type: "aura", scope: "friendly", filter: { type: "troop" }, attack: 1 }],
  },
  "melt-away": {
    id: "melt-away", name: "Melt Away", trigger: "triggered", costsAction: true, cooldown: 3,
    text: "This card becomes Hidden for 2 turns.",
    effects: [{ type: "status", status: "hidden", rounds: 2, target: "self" }],
  },
  "chariot-country": {
    id: "chariot-country", name: "Chariot Country", trigger: "passive",
    text: "Ignores terrain movement penalties.",
    effects: [{ type: "ignoreTerrain" }],
  },
  "leave-their-gods": {
    id: "leave-their-gods", name: "Leave Their Gods Alone", trigger: "passive",
    text: "Friendly cards gain +1 Defence in every direction.",
    effects: [{ type: "aura", scope: "friendly", defence: { all: 1 } }],
  },
  "the-long-walls": {
    id: "the-long-walls", name: "The Long Walls", trigger: "passive",
    text: "Friendly cards standing on a Fortress you control gain +2 Defence in every direction.",
    effects: [{ type: "aura", scope: "friendly", requires: "ownFortress", defence: { all: 2 } }],
  },
  "the-sarissa": {
    id: "the-sarissa", name: "The Sarissa", trigger: "passive",
    text: "Friendly Troops gain +1 Front Defence.",
    effects: [{ type: "aura", scope: "friendly", filter: { type: "troop" }, defence: { front: 1 } }],
  },
  "numidian-horse": {
    id: "numidian-horse", name: "Numidian Horse", trigger: "passive",
    text: "Friendly cavalry gain +1 Speed.",
    effects: [{ type: "aura", scope: "friendly", filter: { tag: "cavalry" }, speed: 1 }],
  },
  "scorched-earth": {
    id: "scorched-earth", name: "Scorched Earth", trigger: "triggered", costsAction: true, cooldown: 3,
    text: "One enemy card within 3 squares becomes Exposed for 2 rounds.",
    effects: [{ type: "status", status: "exposed", rounds: 2, target: "enemyUnit", range: 3 }],
  },
  "the-great-king": {
    id: "the-great-king", name: "The Great King", trigger: "passive",
    text: "Your maximum stored Command is increased by 2.",
    effects: [{ type: "commandCap", amount: 2 }],
  },
  "the-channel-fleet": {
    id: "the-channel-fleet", name: "The Channel Fleet", trigger: "passive",
    text: "Friendly cards gain +1 Speed.",
    effects: [{ type: "aura", scope: "friendly", speed: 1 }],
  },
  "circumnavigation": {
    id: "circumnavigation", name: "Circumnavigation", trigger: "triggered", costsAction: true, cooldown: 3,
    text: "One friendly card gains an extra Action this turn and may Move again.",
    effects: [{ type: "extraAction", target: "friendlyUnit", allowSecondMove: true }],
  },
  "terms-with-rome": {
    id: "terms-with-rome", name: "Terms with Rome", trigger: "triggered", costsAction: true, cooldown: 4,
    text: "Look at your opponent's hand, then draw a card.",
    effects: [{ type: "peek" }, { type: "draw", count: 1 }],
  },
  "withdraw": {
    id: "withdraw", name: "Withdraw", trigger: "triggered", costsAction: true, cooldown: 2,
    text: "This card gains an extra Action this turn and may Move again.",
    effects: [{ type: "extraAction", allowSecondMove: true }],
  },
  "read-the-ground": {
    id: "read-the-ground", name: "Read the Ground", trigger: "special",
    text: "Look at your opponent's hand.",
    effects: [{ type: "peek" }],
  },
  "shaking-off-burdens": {
    id: "shaking-off-burdens", name: "The Shaking Off of Burdens", trigger: "special",
    text: "Restore 1 lost Life to a damaged friendly card.",
    effects: [{ type: "heal", amount: 1, target: "friendlyDamaged" }],
  },
  "word-from-the-fort": {
    id: "word-from-the-fort", name: "Word from the Fort", trigger: "special",
    text: "Draw a card.",
    effects: [{ type: "draw", count: 1 }],
  },
  "the-richest-man": {
    id: "the-richest-man", name: "The Richest Man in Rome", trigger: "special",
    text: "Draw two cards.",
    effects: [{ type: "draw", count: 2 }],
  },
  "obstruction": {
    id: "obstruction", name: "Obstruction", trigger: "special",
    text: "One enemy card becomes Mesmerised for 2 rounds and cannot Move.",
    effects: [{ type: "status", status: "mesmerised", rounds: 2, target: "enemyUnit" }],
  },
};
