/* =====================================================================
   CAMPAIGNS

   A Set is a place: everything the app knows about Carthage, in order.
   A campaign is a route — it crosses Sets, following a thread of cause
   and consequence, and every hop has a reason attached.

   This does not replace the Sets and could not. The Sets are the
   library; a campaign is somebody walking you through it saying "now,
   given that, look at this next". The same chapter can appear in three
   campaigns and be a different thing each time, which is the point.

   `why` is the sentence shown between one stop and the next, and it is
   the whole value of the structure. A list of chapters is a syllabus.
   A list of chapters with the reason for each hop is an argument.
   ===================================================================== */

const CAMPAIGNS = [
  {
    id: "camp-greatest-enemy",
    name: "Rome's Greatest Enemy",
    era: "264 – 146 BC",
    blurb: "A merchant city, a general who did everything right and lost anyway, and the war that turned a city-state into an empire. Told from both ends, because Carthage left no historians and Rome left all of them.",
    opening: "Start here if you want to see how a war is actually won — not on the day of the battle, but in the twenty years before it.",
    stops: [
      { chapter: "carth-place", why: "Begin with the enemy, not with Rome. Carthage was older, richer and better at sailing, and almost everything you have ever read about it was written by the people who destroyed it." },
      { chapter: "punic-1", why: "Two powers who had no particular quarrel end up in a twenty-three-year war over a Sicilian town. Watch how Rome loses at sea repeatedly and keeps building fleets anyway." },
      { chapter: "carth-spain", why: "Carthage lost Sicily but not its army. Hamilcar takes his son to Spain and builds a second empire out of silver — and the boy is Hannibal." },
      { chapter: "war-punic-2", why: "Now the war itself. He crosses the Alps, wins three times in three years, destroys the largest army Rome ever put in the field — and still cannot take Rome." },
      { chapter: "carth-zama", why: "Scipio has been watching Hannibal for fifteen years and has learned from him. Zama is Cannae played by a man who studied Cannae." },
      { chapter: "punic-3", why: "Fifty years later Carthage is no threat to anyone and Rome destroys it anyway. That is the part worth explaining." },
    ],
  },
  {
    id: "camp-one-mans-idea",
    name: "One Man's Idea of Himself",
    era: "356 – 30 BC",
    blurb: "Alexander convinces himself he is more than a king, dies at thirty-two, and the argument over his inheritance runs for three hundred years and ends with a queen and an asp.",
    opening: "The clearest thread in ancient history: one person's self-belief, and every consequence it had for the next three centuries.",
    stops: [
      { chapter: "grk-philip", why: "Before Alexander there is his father, who built the army, the money and the method. Alexander inherited a machine and gets the credit for it." },
      { chapter: "per-fall", why: "Cross the line and look from the other side. The empire he destroyed was not decadent or doomed — it was the largest and best-run state in the world." },
      { chapter: "egy-persia", why: "Egypt does not fight him. He sacrifices to the Apis bull, is crowned pharaoh, visits an oracle in the desert and comes back declining to say what he was told." },
      { chapter: "egy-ptolemy1", why: "He dies at thirty-two with no plan. One of his generals steals the body, takes Egypt, and founds a dynasty on an act of theatre." },
      { chapter: "egy-cleopatra-caesar", why: "Three hundred years later the last of that line is a Macedonian queen speaking Egyptian, and she needs a Roman." },
      { chapter: "war-actium", why: "And this is where the two threads meet. Rome's civil war is settled in a sea battle off Greece, and the prize is Egypt's treasury." },
    ],
  },
  {
    id: "camp-how-republics-die",
    name: "How Republics Die",
    era: "133 – 27 BC",
    blurb: "Not a coup. A hundred years of people solving real problems with methods that each made the next crisis worse, until the man who ended it could claim he was restoring it.",
    opening: "Nobody in this story is trying to destroy the Republic. That is what makes it worth studying.",
    stops: [
      { chapter: "gracchi", why: "It starts with a land reform that was probably necessary and definitely legal, and ends with a mob beating a tribune to death in the street." },
      { chapter: "marius-sulla", why: "The army stops belonging to Rome and starts belonging to whoever pays it. Once that is true, everything else follows." },
      { chapter: "spartacus-pompey", why: "A slave revolt takes two years and six legions to put down, and the men who put it down become the reason the Republic cannot govern itself." },
      { chapter: "triumvirate", why: "Three men agree privately to run the state between them. It is not illegal, because there is no law imagining it." },
      { chapter: "rubicon", why: "One general refuses to disband his army. He is not the first to march on Rome — Sulla did it forty years earlier — which is precisely the problem." },
      { chapter: "augustus", why: "And the settlement. He hands everything back, is handed more of it, and takes a name rather than a title. The Republic never formally ends." },
      { chapter: "emp-principate", why: "Then look at what that actually created, and at the one thing it had no answer for: what happens when he dies." },
    ],
  },
  {
    id: "camp-island-at-the-edge",
    name: "The Island at the Edge",
    era: "c. 4000 BC – AD 450",
    blurb: "Four thousand years of Britain described entirely by outsiders, and what the ground says when you check them.",
    opening: "A test of how much you can know about people who left no written word about themselves.",
    stops: [
      { chapter: "brit-stones", why: "Start with the largest structures in prehistoric Europe, built by people whose language, names and beliefs are entirely lost." },
      { chapter: "brit-pytheas", why: "The first person to write anything about Britain sailed there around 325 BC and was called a liar for six hundred years — about things he got right." },
      { chapter: "brit-oppida", why: "By the time Rome arrives the south-east has kings, mints, treasuries and Latin lettering. The wilderness in the Roman account is a literary device." },
      { chapter: "war-britain", why: "Now the conquest, gated on both sides, because the Roman version and the British version are not two halves of one story but two different claims about it." },
      { chapter: "brit-boudica", why: "The most famous Briton in history is known entirely from two Roman accounts written by men who thought her cause was just and her methods barbaric." },
      { chapter: "brit-end", why: "And the ending, which was not an event. Nobody in Britain woke up one morning in a post-Roman world." },
    ],
  },
  {
    id: "camp-everything-falls",
    name: "When Everything Falls At Once",
    era: "c. 1250 – 1150 BC",
    blurb: "Every major state in the eastern Mediterranean collapses inside fifty years. One survives. Working out why is the closest ancient history gets to a detective problem.",
    opening: "The hardest kind of history: an enormous event, no narrative from most of the people it happened to, and four explanations that are each insufficient alone.",
    stops: [
      { chapter: "grk-mycenae", why: "First, what was actually there — palaces, kings, tax records and writing, five hundred years before anything you think of as Greek." },
      { chapter: "egy-kadesh", why: "And the world it belonged to: two superpowers signing a peace treaty that survives in both their languages, seventy years before one of them ceased to exist." },
      { chapter: "egy-sea-peoples", why: "Then it goes. Egypt is the only major power that both survived and left an account, and its account is carved on a temple wall." },
      { chapter: "crisis-bronze-age", why: "Now put the two sides together — the survivor with records and the civilisation that vanished and forgot how to write." },
      { chapter: "grk-polis", why: "Four centuries later something completely different grows in the space: several hundred small states of citizens, with no palace and no king." },
    ],
  },
];

const CAMPAIGN_BY_ID = Object.fromEntries(CAMPAIGNS.map((c) => [c.id, c]));

/* How far through a campaign the reader is. */
function campaignProgress(camp, chaptersDone) {
  const done = camp.stops.filter((s) => chaptersDone[s.chapter]).length;
  const next = camp.stops.find((s) => !chaptersDone[s.chapter]) || null;
  return { done, total: camp.stops.length, pct: Math.round((done / camp.stops.length) * 100), next };
}
