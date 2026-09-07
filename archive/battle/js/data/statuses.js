/* =====================================================================
   STATUS EFFECTS
   Data only. A status is a bundle of modifiers and restrictions with a
   duration. The engine applies whatever it finds here, so a new status
   needs no engine change.

     attack/defence   flat modifiers to every direction
     noMove/noAttack/noActions   action restrictions
     hidden           opponent cannot see the square
     blocksHidden     unit may not become hidden
     expires          "ownerTurnStart" | "roundEnd"
   ===================================================================== */

const STATUSES = {
  hidden: {
    id: "hidden", name: "Hidden", tone: "silver",
    text: "The opposing player cannot see this unit's square. Its owner sees and controls it normally.",
    hidden: true, expires: "ownerTurnStart",
  },
  mesmerised: {
    id: "mesmerised", name: "Mesmerised", tone: "gold",
    text: "Cannot take a Move action. May still attack and use abilities.",
    noMove: true, expires: "roundEnd",
  },
  stunned: {
    id: "stunned", name: "Stunned", tone: "rust",
    text: "Cannot take any action at all.",
    noActions: true, expires: "ownerTurnStart",
  },
  fortified: {
    id: "fortified", name: "Fortified", tone: "verdigris",
    text: "Defence increased in every direction.",
    defence: 1, expires: "roundEnd",
  },
  exposed: {
    id: "exposed", name: "Exposed", tone: "rust",
    text: "Defence reduced in every direction.",
    defence: -1, expires: "roundEnd",
  },
  revealed: {
    id: "revealed", name: "Revealed", tone: "parchment",
    text: "Cannot become Hidden while this lasts.",
    blocksHidden: true, expires: "roundEnd",
  },
};
