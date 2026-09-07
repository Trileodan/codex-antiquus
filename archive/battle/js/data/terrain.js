/* =====================================================================
   TERRAIN
   Data only. The engine never names a terrain type — it reads these
   properties. Adding a terrain type means adding an entry here.

     move        movement points to ENTER this square (null = impassable)
     blocksLos   stops ranged line of sight
     defence     modifier applied to a unit standing here
     tags        free-form, for card abilities to key off
   ===================================================================== */

const TERRAIN = {
  plains:   { id: "plains",   name: "Plains",     move: 1,    blocksLos: false, defence: 0,  tags: ["open"] },
  desert:   { id: "desert",   name: "Desert",     move: 1,    blocksLos: false, defence: 0,  tags: ["open", "arid"] },
  forest:   { id: "forest",   name: "Forest",     move: 2,    blocksLos: true,  defence: 1,  tags: ["cover"] },
  swamp:    { id: "swamp",    name: "Swamp",      move: 2,    blocksLos: false, defence: -1, tags: ["wet"] },
  hills:    { id: "hills",    name: "Hills",      move: 2,    blocksLos: true,  defence: 1,  tags: ["high"] },
  mountain: { id: "mountain", name: "Mountain",   move: null, blocksLos: true,  defence: 0,  tags: ["high", "impassable"] },
  river:    { id: "river",    name: "River",      move: null, blocksLos: false, defence: 0,  tags: ["wet", "impassable"] },
  bridge:   { id: "bridge",   name: "Bridge",     move: 1,    blocksLos: false, defence: -1, tags: ["crossing"] },
};

const TERRAIN_ORDER = ["plains", "desert", "forest", "swamp", "hills", "mountain", "river", "bridge"];
