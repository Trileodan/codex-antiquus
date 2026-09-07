/* =====================================================================
   BATTLEFIELDS
   A battlefield is pure data. `rows` is drawn top (y=0) to bottom, one
   character per square, decoded through KEY. Player 0 deploys on the top
   row, player 1 on the bottom row, unless the definition overrides it.

   Nothing here is hardcoded into the engine: width and height come from
   the grid itself, so a 10x12 map needs no code change.
   ===================================================================== */

const TERRAIN_KEY = {
  ".": "plains", "d": "desert", "f": "forest", "s": "swamp",
  "h": "hills",  "M": "mountain", "~": "river", "=": "bridge",
};

const BATTLEFIELDS = {
  "open-country": {
    id: "open-country", name: "Open Country",
    blurb: "Level ground and widely separated fortresses. Nothing to hide behind and nowhere that funnels an advance — the map that rewards manoeuvre and punishes a slow deck.",
    rows: [
      "........",
      "..f..f..",
      "........",
      ".h....h.",
      ".h....h.",
      "........",
      "..f..f..",
      "........",
    ],
    fortresses: [{ x: 1, y: 2 }, { x: 6, y: 2 }, { x: 1, y: 5 }, { x: 6, y: 5 }],
    tags: ["open"],
  },

  "river-crossing": {
    id: "river-crossing", name: "River Crossing",
    blurb: "A river splits the map and only two crossings carry an army. Both bridges are fortresses, so every fight happens at the two squares everyone needs.",
    rows: [
      "........",
      "..f..f..",
      "........",
      "~~=~~=~~",
      "........",
      "..f..f..",
      "........",
      "........",
    ],
    fortresses: [{ x: 2, y: 3 }, { x: 5, y: 3 }, { x: 0, y: 1 }, { x: 7, y: 6 }],
    tags: ["chokepoint"],
  },

  "mountain-pass": {
    id: "mountain-pass", name: "Mountain Pass",
    blurb: "Impassable rock leaves two narrow lanes. A defensive line here is very hard to shift, which makes ranged units and anything that ignores terrain unusually valuable.",
    rows: [
      "........",
      ".hMMMMh.",
      ".h....h.",
      "..M..M..",
      "..M..M..",
      ".h....h.",
      ".hMMMMh.",
      "........",
    ],
    fortresses: [{ x: 3, y: 2 }, { x: 4, y: 5 }, { x: 0, y: 3 }, { x: 7, y: 4 }],
    tags: ["chokepoint", "high"],
  },

  "marshlands": {
    id: "marshlands", name: "Marshlands",
    blurb: "Wide bands of swamp make every advance expensive and leave units standing in the open a square short of where they wanted to be. Speed matters more than armour.",
    rows: [
      "........",
      ".ssssss.",
      "..s..s..",
      "........",
      "........",
      "..s..s..",
      ".ssssss.",
      "........",
    ],
    fortresses: [{ x: 2, y: 3 }, { x: 5, y: 3 }, { x: 2, y: 4 }, { x: 5, y: 4 }],
    tags: ["wet"],
  },
};

/* Expand the compact rows into a terrain grid and derive dimensions. */
function decodeBattlefield(def) {
  const height = def.rows.length;
  const width = def.rows[0].length;
  const terrain = def.rows.map((row) => row.split("").map((ch) => TERRAIN_KEY[ch] || "plains"));
  return {
    id: def.id, name: def.name, blurb: def.blurb, width, height, terrain,
    fortresses: def.fortresses.map((f) => ({ x: f.x, y: f.y })),
    deployRows: def.deployRows || [0, height - 1],
    deployFrom: def.deployFrom || null,
    tags: def.tags || [],
  };
}
