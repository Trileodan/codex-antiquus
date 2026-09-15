/* =====================================================================
   COINS THAT ARE NOT PEOPLE

   Battles, wars, places and inventions. A medal is for knowing a
   subject, and a subject need not have had a face.

   THE ONE-COIN-PER-SUBJECT RULE
   Every coin here declares a `subject`, and the validator refuses a
   second coin claiming the same one. The app had already broken the
   rule before it existed: Scipio's coin and Masinissa's coin both
   asserted the outcome of Zama, and both could be dealt into the same
   hand in the Timeline game.

   The line is between an OUTCOME and an ACT. This file owns the
   outcomes — who won, and what it decided. A person's coin may happen
   at the same battle, but it states what that person did. Leonidas
   staying to die and Persia forcing the pass are two things worth
   knowing. Scipio winning Zama and Masinissa winning Zama are one thing
   counted twice.

   `teaches` lists only chapters that genuinely cover the subject. That
   matters more than it looks: the promotion quiz draws its questions
   from these chapters, so a coin attached to a chapter that merely
   mentions it in passing would generate a quiz about something else.
   ===================================================================== */

Object.assign(CHARACTERS, {

/* ---- BATTLES ----------------------------------------------------- */

"bat-mylae": {
  id: "bat-mylae", name: "Mylae", kind: "battle", subject: "battle:mylae",
  years: "260 BC", sets: ["carthage", "roman-republic"],
  teaches: ["punic-1", "carth-after-first"],
  timeline: { year: -260, label: "Rome wins its first sea battle, at Mylae" },
  tiers: {
    bronze: { label: "Rome's First Fleet", when: "260 BC",
      blurb: "A land power that had barely operated overseas beat the best navy in the western Mediterranean, in its first serious engagement at sea. Off the north Sicilian coast, Duilius took around fifty Carthaginian ships." },
    silver: { label: "Refusing the Battle", when: "How it was won",
      blurb: "Roman crews had trained on scaffolding on dry land and could not ram or shear against generations of Carthaginian practice. So Rome declined to fight that battle at all, and used the corvus to turn a sea fight into an infantry fight on a wooden platform — the one contest it was certain to win." },
    gold: { label: "The Habit, Not the Trick", when: "What it really shows",
      blurb: "The corvus was abandoned within a decade; it made ships dangerously unstable in weather and Rome lost whole fleets to storms. The durable thing was not the device but the reflex behind it: identify the enemy's advantage, refuse to compete on it, and keep paying to try again. That reflex outlasts the war." },
  },
  claims: [
    { text: "Rome defeated a Carthaginian squadron off Mylae in 260 BC, its first major naval victory.", classification: "Established", sources: ["polybius", "cah"], date: "260 BC", at: "bronze" },
    { text: "Gaius Duilius was awarded Rome's first naval triumph for the victory.", classification: "Established", sources: ["polybius", "livy"], date: "260 BC", at: "bronze" },
    { text: "The corvus converted naval engagements into boarding actions.", classification: "Established", sources: ["polybius"], date: "260 BC", at: "silver" },
    { text: "The story that Rome copied a grounded Carthaginian quinquereme simplifies a more complicated process.", classification: "Interpretation", sources: ["polybius", "cah"], date: "264 BC", at: "gold" },
  ],
  connections: [{ name: "The corvus", type: "concept" }, { name: "Sicily", type: "place" }],
},

"bat-tunis": {
  id: "bat-tunis", name: "Tunis", kind: "battle", subject: "battle:tunis",
  years: "255 BC", sets: ["carthage", "roman-republic"],
  teaches: ["punic-1", "carth-after-first"],
  timeline: { year: -255, label: "A Roman army invading Africa is destroyed at Tunis" },
  tiers: {
    bronze: { label: "The Invasion That Failed", when: "255 BC",
      blurb: "Rome landed in Africa under Regulus, won early, demanded terms so harsh that Carthage preferred to fight, and then lost its army outright on the plain near Tunis." },
    silver: { label: "What Xanthippus Changed", when: "The mechanism",
      blurb: "A Spartan mercenary officer reorganised the Carthaginian army around what it actually had: elephants in front to break the Roman line, and cavalry on both wings where Carthage was overwhelmingly stronger. Nothing new was invented. The existing pieces were simply used properly." },
    gold: { label: "Carthage Could Not Follow It Up", when: "Why the war continued",
      blurb: "Tunis was a total tactical victory and changed the war very little. Carthage had no way to convert an African success into pressure on Italy, and Rome rebuilt. That asymmetry — Rome absorbing catastrophe and returning, Carthage winning and gaining nothing — is the whole shape of the First Punic War." },
  },
  claims: [
    { text: "A Roman expeditionary force under Regulus was destroyed near Tunis in 255 BC.", classification: "Established", sources: ["polybius", "cah"], date: "255 BC", at: "bronze" },
    { text: "Xanthippus, a Spartan officer, reorganised the Carthaginian army before the battle.", classification: "Probable", sources: ["polybius", "diodorus"], date: "255 BC", at: "silver" },
    { text: "The later Roman tradition of Regulus returning to captivity to keep his word is a moral exemplum.", classification: "Traditional / Legendary", sources: ["livy", "cah"], date: "3rd c. BC", at: "gold" },
  ],
  connections: [{ charId: "hamilcar", relation: "later commander of" }, { name: "War elephants", type: "concept" }],
},

"bat-drepana": {
  id: "bat-drepana", name: "Drepana", kind: "battle", subject: "battle:drepana",
  years: "249 BC", sets: ["carthage", "roman-republic"],
  teaches: ["punic-1"],
  timeline: { year: -249, label: "Rome loses a fleet at Drepana after ignoring the omens" },
  tiers: {
    bronze: { label: "The Sacred Chickens", when: "249 BC",
      blurb: "Rome's worst naval defeat of the war. Publius Claudius Pulcher attacked the Carthaginian fleet in Drepana harbour, was caught against a lee shore, and lost most of his ships." },
    silver: { label: "A Story About Piety", when: "What Rome made of it",
      blurb: "Told that the sacred chickens would not eat — a bad omen — Claudius is said to have thrown them into the sea, remarking that if they would not eat they could drink. He was tried and fined on his return. The anecdote is almost certainly shaped afterwards to explain the defeat as impiety rather than incompetence." },
    gold: { label: "Rome Kept Going Anyway", when: "The pattern underneath",
      blurb: "Drepana, plus storm losses, cost Rome so many ships that the state effectively stopped funding a navy — and private citizens were pressed to fund the fleet that finally won at the Aegates in 241. A defeat that would have ended most states' war produced, in Rome, a different method of paying for it." },
  },
  claims: [
    { text: "Rome lost most of a fleet at Drepana in 249 BC.", classification: "Established", sources: ["polybius", "cah"], date: "249 BC", at: "bronze" },
    { text: "The sacred chickens anecdote is a later moralising explanation of the defeat.", classification: "Interpretation", sources: ["livy", "cicero"], date: "249 BC", at: "silver" },
    { text: "The fleet that won the Aegates Islands in 241 BC was funded substantially by private wealth.", classification: "Probable", sources: ["polybius"], date: "242 BC", at: "gold" },
  ],
  connections: [{ name: "The Aegates Islands", type: "place" }],
},

"bat-trebia": {
  id: "bat-trebia", name: "The Trebia", kind: "battle", subject: "battle:trebia",
  years: "218 BC", sets: ["carthage", "roman-republic"],
  teaches: ["war-punic-2", "carth-italy"],
  timeline: { year: -218, label: "Hannibal destroys a Roman army at the Trebia" },
  tiers: {
    bronze: { label: "The First Victory in Italy", when: "218 BC",
      blurb: "Weeks after crossing the Alps, Hannibal destroyed a consular army on the Trebia in northern Italy — and proved the crossing had not spent his force." },
    silver: { label: "Cold, Bait and a Hidden Brother", when: "How it was done",
      blurb: "He provoked the eager Sempronius into attacking early, so Roman troops crossed an icy river unfed at dawn. His own men had eaten and oiled themselves by fires. Mago waited in a watercourse with two thousand men and struck the Roman rear once they were committed." },
    gold: { label: "Preparation, Not Inspiration", when: "The recurring method",
      blurb: "Trebia is the first statement of Hannibal's actual method, and it is not tactical genius in the moment. It is knowing the opposing commander's temperament, choosing the ground and the hour, and arranging the enemy's mistakes in advance. Trasimene and Cannae are the same method against different terrain." },
  },
  claims: [
    { text: "Hannibal defeated a Roman consular army at the Trebia in December 218 BC.", classification: "Established", sources: ["polybius", "livy"], date: "218 BC", at: "bronze" },
    { text: "A concealed force under Mago attacked the Roman rear during the battle.", classification: "Established", sources: ["polybius"], date: "218 BC", at: "silver" },
    { text: "Polybius's hostile portrait of Sempronius may be shaped by his Scipionic sources.", classification: "Interpretation", sources: ["polybius", "cah"], date: "2nd c. BC", at: "gold" },
  ],
  connections: [{ charId: "hannibal", relation: "won by" }, { name: "Cisalpine Gaul", type: "place" }],
},

"bat-trasimene": {
  id: "bat-trasimene", name: "Lake Trasimene", kind: "battle", subject: "battle:trasimene",
  years: "217 BC", sets: ["carthage", "roman-republic"],
  teaches: ["war-punic-2", "carth-italy"],
  timeline: { year: -217, label: "A Roman army is ambushed in the mist at Lake Trasimene" },
  tiers: {
    bronze: { label: "The Largest Ambush in History", when: "217 BC",
      blurb: "Hannibal caught a whole consular army strung out on a lakeside road in morning mist, with hills on one side and water on the other. Flaminius and most of his men were killed." },
    silver: { label: "A Road With No Exit", when: "The trap",
      blurb: "It is not a battle with an ambush in it; it is an ambush that never became a battle. The Romans were marching in column and were attacked along their whole length at once, so no line could form. Perhaps fifteen thousand died and a similar number were taken." },
    gold: { label: "Why Rome Appointed a Dictator", when: "The consequence",
      blurb: "Trasimene produced Fabius Maximus and the strategy of refusing battle — shadow him, harass his supplies, never give him the ground he wants. Romans mocked it as cowardice until Cannae demonstrated what the alternative cost. The unpopular answer was the right one, and it took a second catastrophe to prove it." },
  },
  claims: [
    { text: "A Roman army was destroyed in an ambush at Lake Trasimene in 217 BC and the consul Flaminius killed.", classification: "Established", sources: ["polybius", "livy"], date: "217 BC", at: "bronze" },
    { text: "Rome appointed Fabius Maximus dictator following the defeat.", classification: "Established", sources: ["livy", "polybius"], date: "217 BC", at: "gold" },
    { text: "Livy's account of earthquake tremors passing unnoticed during the fighting is a rhetorical flourish.", classification: "Interpretation", sources: ["livy"], date: "217 BC", at: "silver" },
  ],
  connections: [{ charId: "hannibal", relation: "won by" }, { name: "Fabian strategy", type: "concept" }],
},

"bat-cannae": {
  id: "bat-cannae", name: "Cannae", kind: "battle", subject: "battle:cannae",
  years: "216 BC", sets: ["carthage", "roman-republic"],
  teaches: ["war-punic-2", "carth-italy"],
  timeline: { year: -216, label: "Hannibal encircles and destroys a Roman army at Cannae" },
  tiers: {
    bronze: { label: "The Worst Day", when: "216 BC",
      blurb: "The largest army Rome had ever put in the field was surrounded and destroyed in a single afternoon in Apulia. Ancient figures vary and are unreliable, but the scale of the loss is not in doubt." },
    silver: { label: "The Centre That Bent", when: "The mechanism",
      blurb: "Hannibal pushed his weaker Gallic and Iberian infantry forward in a curve and let it be driven slowly back, drawing the Roman mass in. His African veterans stood on the wings; his cavalry beat the Roman horse, came round behind, and closed the bag. The Romans were packed too tightly to use their weapons." },
    gold: { label: "The Most Studied Battle Ever Fought", when: "And its limits",
      blurb: "Double envelopment became the ideal every staff college teaches, invoked from Schlieffen to the Gulf. But the lesson Cannae actually teaches is the opposite of the one it is used for: the most perfect battlefield victory in ancient history did not win the war. Rome refused to negotiate, raised more legions, and outlasted him." },
  },
  claims: [
    { text: "Hannibal encircled and destroyed a numerically superior Roman army at Cannae in 216 BC.", classification: "Established", sources: ["polybius", "livy"], date: "216 BC", at: "bronze" },
    { text: "Ancient casualty figures for Cannae range widely and cannot be reconciled.", classification: "Contested", sources: ["polybius", "livy", "cah"], date: "216 BC", at: "bronze" },
    { text: "The deliberately weakened, forward-curved centre was planned rather than improvised.", classification: "Probable", sources: ["polybius"], date: "216 BC", at: "silver" },
    { text: "Rome refused to ransom the survivors and raised fresh armies instead.", classification: "Established", sources: ["livy", "polybius"], date: "216 BC", at: "gold" },
  ],
  connections: [{ charId: "hannibal", relation: "won by" }, { name: "Double envelopment", type: "concept" }],
},

"bat-zama": {
  id: "bat-zama", name: "Zama", kind: "battle", subject: "battle:zama",
  years: "202 BC", sets: ["carthage", "roman-republic"],
  teaches: ["war-punic-2", "carth-zama"],
  timeline: { year: -202, label: "Carthage loses the Second Punic War at Zama" },
  tiers: {
    bronze: { label: "The Decision", when: "202 BC",
      blurb: "Scipio carried the war into Africa; Carthage recalled Hannibal from Italy; and the two met in the North African interior. Scipio won, and the war was effectively over." },
    silver: { label: "Lanes and Cavalry", when: "How it was won",
      blurb: "Scipio arranged his maniples in columns with lanes between them, so Hannibal's elephants could be channelled through the formation instead of smashing into it. The Roman and Numidian cavalry drove the Carthaginian horse off the field, then returned against Hannibal's rear — Cannae's own ending, used against its author." },
    gold: { label: "Cannae Played by a Man Who Studied Cannae", when: "The real lesson",
      blurb: "Scipio had been at Cannae as a young officer and survived it. He spent fifteen years learning from the man who did it to him, and at Zama he reproduced the decisive element — a returning cavalry envelopment — against the person who invented it. The interesting claim is not that Hannibal was beaten but that he was beaten by his own method." },
  },
  claims: [
    { text: "Scipio defeated Hannibal at Zama in 202 BC, effectively deciding the Second Punic War.", classification: "Established", sources: ["polybius", "livy"], date: "202 BC", at: "bronze" },
    { text: "Numidian cavalry under Masinissa fought for Rome and contributed decisively.", classification: "Established", sources: ["polybius", "livy"], date: "202 BC", at: "silver" },
    { text: "The lanes arrangement against elephants is described by Polybius and is broadly credited.", classification: "Probable", sources: ["polybius"], date: "202 BC", at: "silver" },
    { text: "The reported meeting and conversation between Scipio and Hannibal before the battle is a literary set piece.", classification: "Traditional / Legendary", sources: ["livy", "polybius"], date: "202 BC", at: "gold" },
  ],
  connections: [{ charId: "scipio", relation: "won by" }, { charId: "hannibal", relation: "lost by" }, { charId: "masinissa", relation: "cavalry of" }],
},

"bat-carthage-siege": {
  id: "bat-carthage-siege", name: "The Siege of Carthage", kind: "battle", subject: "battle:carthage-siege",
  years: "147 – 146 BC", sets: ["carthage", "roman-republic"],
  teaches: ["war-punic-3", "carth-end"],
  timeline: { year: -146, label: "Carthage falls after a three-year siege and is destroyed" },
  tiers: {
    bronze: { label: "The End", when: "146 BC",
      blurb: "A city that had surrendered its weapons held out for three years, and fell street by street over six days of fighting up the terraces to the citadel." },
    silver: { label: "An Arsenal Made From Temples", when: "How it held",
      blurb: "Having handed over a reported two hundred thousand sets of armour, Carthage stripped public buildings for metal and temples for timber, and the accounts describe a daily output of shields, swords, spears and catapult bolts — with women cutting their hair for torsion cordage." },
    gold: { label: "Polybius Was Standing There", when: "What the winner said",
      blurb: "Polybius watched the city burn beside Scipio Aemilianus, and records that Scipio wept and quoted Homer on the fall of Troy — not from pity for Carthage, but because he had just understood the same would one day be done to Rome. A century later Rome rebuilt on the site. It became one of the great cities of the empire." },
  },
  claims: [
    { text: "Carthage fell to Scipio Aemilianus in 146 BC after a siege of roughly three years.", classification: "Established", sources: ["appian", "polybius"], date: "146 BC", at: "bronze" },
    { text: "The city manufactured weapons from stripped public buildings during the siege.", classification: "Probable", sources: ["appian"], date: "147 BC", at: "silver" },
    { text: "The story that Rome sowed the ground with salt has no ancient source.", classification: "Traditional / Legendary", sources: ["cah"], date: "19th c.", at: "gold" },
  ],
  connections: [{ name: "Byrsa", type: "place" }, { name: "Corinth", type: "place" }],
},

"bat-actium": {
  id: "bat-actium", name: "Actium", kind: "battle", subject: "battle:actium",
  years: "31 BC", sets: ["roman-republic", "ptolemaic-egypt"],
  teaches: ["war-actium", "actium"],
  timeline: { year: -31, label: "Octavian's fleet defeats Antony and Cleopatra at Actium" },
  tiers: {
    bronze: { label: "The Last Battle of the Republic", when: "31 BC",
      blurb: "Off the west coast of Greece, Octavian's fleet under Agrippa defeated Antony and Cleopatra. Within a year both were dead and Egypt was a Roman province." },
    silver: { label: "Won Before the Ships Moved", when: "The mechanism",
      blurb: "Agrippa had spent months taking Antony's supply bases and bottling his fleet in the gulf. Disease, hunger and desertion did most of the work; the battle was an attempt to break out rather than a contest for the sea. Much of Antony's fleet never engaged." },
    gold: { label: "A Foreign War That Was a Civil War", when: "The presentation",
      blurb: "Octavian declared war on Cleopatra, not Antony — so that a Roman fighting Romans could be staged as Italy defending itself against an eastern queen. Almost everything written about Actium survives through the winner's framing, including the claim that Cleopatra fled first and Antony followed her out of infatuation." },
  },
  claims: [
    { text: "Octavian's fleet defeated Antony and Cleopatra off Actium on 2 September 31 BC.", classification: "Established", sources: ["dio", "plutarch"], date: "31 BC", at: "bronze" },
    { text: "Agrippa's blockade of Antony's supply lines preceded and shaped the battle.", classification: "Probable", sources: ["dio", "cah"], date: "31 BC", at: "silver" },
    { text: "War was formally declared on Cleopatra rather than on Antony.", classification: "Established", sources: ["dio", "res"], date: "32 BC", at: "gold" },
    { text: "The account of Cleopatra fleeing and Antony abandoning the battle to follow is the victor's version.", classification: "Interpretation", sources: ["plutarch", "dio"], date: "31 BC", at: "gold" },
  ],
  connections: [{ charId: "agrippa", relation: "commanded by" }, { charId: "cleopatra", relation: "lost by" }, { charId: "antony", relation: "lost by" }],
},

"bat-marathon": {
  id: "bat-marathon", name: "Marathon", kind: "battle", subject: "battle:marathon",
  years: "490 BC", sets: ["ancient-greece", "persia"],
  teaches: ["war-greco-persian", "grk-persia"],
  timeline: { year: -490, label: "Athens defeats a Persian landing at Marathon" },
  tiers: {
    bronze: { label: "The Landing That Failed", when: "490 BC",
      blurb: "A Persian punitive expedition landed in Attica and was beaten by an Athenian and Plataean force on the plain of Marathon." },
    silver: { label: "Why the Hoplites Ran", when: "The mechanism",
      blurb: "The Athenians thinned their centre, strengthened the wings, and are said to have closed the last stretch at a run to cross the archers' beaten ground quickly. The wings held, the centre gave, and the Persian force was driven back toward the ships." },
    gold: { label: "What It Was Not", when: "Scale and meaning",
      blurb: "Marathon was a raid repelled, not an empire stopped — Persia returned ten years later in far greater force. Its enormous later significance is Athenian: a citizen militia beating the great king's troops became the founding story of the democracy's self-image, and the marathon race is a nineteenth-century invention from a much later anecdote." },
  },
  claims: [
    { text: "An Athenian and Plataean force defeated a Persian expedition at Marathon in 490 BC.", classification: "Established", sources: ["herodotus", "cah"], date: "490 BC", at: "bronze" },
    { text: "The Athenians weakened their centre and strengthened their wings.", classification: "Probable", sources: ["herodotus"], date: "490 BC", at: "silver" },
    { text: "The run of Pheidippides from Marathon to Athens is a later conflation; Herodotus sends him to Sparta before the battle.", classification: "Traditional / Legendary", sources: ["herodotus", "plutarch"], date: "490 BC", at: "gold" },
  ],
  connections: [{ name: "Athens", type: "place" }, { charId: "darius1", relation: "expedition of" }],
},

"bat-thermopylae": {
  id: "bat-thermopylae", name: "Thermopylae", kind: "battle", subject: "battle:thermopylae",
  years: "480 BC", sets: ["ancient-greece", "persia"],
  teaches: ["war-greco-persian", "grk-persia"],
  timeline: { year: -480, label: "Persia forces the pass at Thermopylae" },
  tiers: {
    bronze: { label: "A Defeat", when: "480 BC",
      blurb: "A Greek force held the coastal pass for some days against Xerxes' army, was outflanked by a mountain path, and was destroyed. Persia continued south and burned Athens." },
    silver: { label: "What Holding It Was For", when: "The purpose",
      blurb: "The pass was narrow enough to cancel Persian numbers, and the position only worked while the fleet held the strait alongside it. It was a delaying action to buy time for the naval campaign and the evacuation of Attica — and as a delay it partly succeeded." },
    gold: { label: "The Most Successful Defeat in History", when: "The afterlife",
      blurb: "Thermopylae is a lost battle in a campaign the Greeks eventually won, and it has become the best-known engagement of the ancient world. The three hundred were not alone — Thespians and Thebans stayed, and thousands of helots and allies were present. Almost every retelling since, ancient and modern, has had a political use for the number." },
  },
  claims: [
    { text: "A Greek force under Leonidas held the pass at Thermopylae before being outflanked and destroyed in 480 BC.", classification: "Established", sources: ["herodotus", "cah"], date: "480 BC", at: "bronze" },
    { text: "Other Greek contingents, including Thespians, remained and died alongside the Spartans.", classification: "Established", sources: ["herodotus"], date: "480 BC", at: "silver" },
    { text: "The reported Persian army sizes in Herodotus are impossibly large.", classification: "Contested", sources: ["herodotus", "cah"], date: "480 BC", at: "silver" },
    { text: "The exchange about fighting in the shade is a collected saying, not a transcript.", classification: "Traditional / Legendary", sources: ["herodotus", "plutarch"], date: "480 BC", at: "gold" },
  ],
  connections: [{ charId: "leonidas", relation: "died at" }, { charId: "xerxes", relation: "won by" }],
},

"bat-salamis": {
  id: "bat-salamis", name: "Salamis", kind: "battle", subject: "battle:salamis",
  years: "480 BC", sets: ["ancient-greece", "persia"],
  teaches: ["war-greco-persian", "grk-persia"],
  timeline: { year: -480, label: "The Persian fleet is broken in the straits of Salamis" },
  tiers: {
    bronze: { label: "The Battle That Mattered", when: "480 BC",
      blurb: "In the narrow water between Salamis and the Attic coast, the Greek fleet destroyed much of Xerxes' navy — and with it his ability to supply an army in Greece." },
    silver: { label: "Choosing the Water", when: "The mechanism",
      blurb: "Persian numbers were useless in a strait where no line could extend and no ship could manoeuvre. The Greeks fought where their heavier, slower ships could close and ram. Getting the Persians to accept that ground was the whole battle, and Herodotus credits a deliberate deception." },
    gold: { label: "Logistics, Not Glory", when: "Why it decided the war",
      blurb: "An army that size could not be fed overland; it depended on the fleet. Break the fleet and the campaign ends whether or not a single soldier is beaten. Xerxes withdrew with much of the army, and what remained was defeated at Plataea the following year." },
  },
  claims: [
    { text: "The Greek fleet defeated the Persian fleet in the straits of Salamis in 480 BC.", classification: "Established", sources: ["herodotus", "aeschylus"], date: "480 BC", at: "bronze" },
    { text: "Aeschylus, who fought in the wars, described the battle in a play staged eight years later.", classification: "Established", sources: ["aeschylus"], date: "472 BC", at: "silver" },
    { text: "Themistokles sent a message inducing the Persians to enter the straits.", classification: "Probable", sources: ["herodotus"], date: "480 BC", at: "silver" },
    { text: "The tradition that Salamis and Himera were fought on the same day is a Greek construction.", classification: "Interpretation", sources: ["herodotus", "diodorus"], date: "480 BC", at: "gold" },
  ],
  connections: [{ charId: "themistokles", relation: "argued for by" }, { charId: "artemisia", relation: "fought at by" }],
},

"bat-plataea": {
  id: "bat-plataea", name: "Plataea", kind: "battle", subject: "battle:plataea",
  years: "479 BC", sets: ["ancient-greece", "persia"],
  teaches: ["war-greco-persian", "grk-persia"],
  timeline: { year: -479, label: "The Persian army in Greece is destroyed at Plataea" },
  tiers: {
    bronze: { label: "The Land Decision", when: "479 BC",
      blurb: "The largest hoplite army yet assembled destroyed the Persian force left in Greece under Mardonius, ending the invasion." },
    silver: { label: "Days of Not Fighting", when: "The mechanism",
      blurb: "Both armies spent over a week manoeuvring around water supply and ground rather than engaging, because each wanted terrain that cancelled the other's strength — Persian cavalry against Greek heavy infantry. The battle began out of a confused night withdrawal, not a plan." },
    gold: { label: "The Battle Salamis Is Remembered Instead Of", when: "The reputation",
      blurb: "Plataea ended the invasion and is far less famous than the defeat at Thermopylae or the naval victory at Salamis. Partly that is Athenian authorship: the fleet was Athens's achievement and the land victory was substantially Spartan. Which battles a culture remembers is a fact about the culture." },
  },
  claims: [
    { text: "A combined Greek army destroyed the Persian force under Mardonius at Plataea in 479 BC.", classification: "Established", sources: ["herodotus", "cah"], date: "479 BC", at: "bronze" },
    { text: "The engagement developed out of a disordered night-time repositioning.", classification: "Probable", sources: ["herodotus"], date: "479 BC", at: "silver" },
    { text: "Herodotus's Greek troop totals are more plausible than his Persian ones.", classification: "Interpretation", sources: ["herodotus", "cah"], date: "479 BC", at: "gold" },
  ],
  connections: [{ name: "Sparta", type: "place" }, { charId: "xerxes", relation: "invasion of" }],
},

"bat-medway": {
  id: "bat-medway", name: "The Medway", kind: "battle", subject: "battle:medway",
  years: "AD 43", sets: ["ancient-britain", "roman-empire"],
  teaches: ["war-britain", "brit-claudius"],
  timeline: { year: 43, label: "Rome forces the Medway and opens southern Britain" },
  tiers: {
    bronze: { label: "The Invasion Lands", when: "AD 43",
      blurb: "The decisive engagement of the Claudian invasion, fought over a river crossing in Kent against a British force under Cunobelinus's sons." },
    silver: { label: "Two Days and a River", when: "The mechanism",
      blurb: "Dio describes auxiliaries swimming the river in armour to attack the British chariot horses, followed by a contested crossing and a second day of fighting. The British had massed to hold a river line, which is precisely the kind of set-piece a Roman army was built to win." },
    gold: { label: "A Battle Without a Certain Location", when: "What is not known",
      blurb: "No Roman source names the river; the Medway identification is inference from the campaign's direction and Dio's description. There is no agreed site, no battlefield archaeology, and the whole engagement is known from one Greek historian writing over a century later." },
  },
  claims: [
    { text: "A major river battle took place during the Claudian invasion of Britain in AD 43.", classification: "Established", sources: ["dio", "arch"], date: "43", at: "bronze" },
    { text: "The river is not named in any ancient source; the Medway identification is modern inference.", classification: "Contested", sources: ["dio", "cah"], date: "43", at: "gold" },
    { text: "Auxiliaries crossed the river in armour to attack British chariot teams.", classification: "Probable", sources: ["dio"], date: "43", at: "silver" },
  ],
  connections: [{ charId: "claudius", relation: "invasion of" }, { charId: "caratacus", relation: "fought at by" }],
},

"bat-chaeronea": {
  id: "bat-chaeronea", name: "Chaeronea", kind: "battle", subject: "battle:chaeronea",
  years: "338 BC", sets: ["ancient-greece"],
  teaches: ["grk-philip"],
  timeline: { year: -338, label: "Macedon defeats the Greek cities at Chaeronea" },
  tiers: {
    bronze: { label: "The End of Greek Independence", when: "338 BC",
      blurb: "Philip II defeated a coalition led by Athens and Thebes in Boeotia, and afterwards organised most of the Greek states through the League of Corinth." },
    silver: { label: "Combined Arms", when: "The mechanism",
      blurb: "The Macedonian system did not win by the pike alone. The phalanx fixed an enemy in place while cavalry and flexible infantry exploited the opening it created — hold them here, break them somewhere else. The teenage Alexander held a command, though the accounts do not let us reconstruct his role precisely." },
    gold: { label: "What It Did Not Erase", when: "The settlement",
      blurb: "Sparta stayed conspicuously outside the settlement, and Macedon did not abolish Greek identity or self-government. It became the dominant power above a collection of fiercely independent states — which is why Greece revolted again the moment Philip died, and again the moment Alexander was rumoured dead." },
  },
  claims: [
    { text: "Philip II defeated an Athenian and Theban coalition at Chaeronea in 338 BC.", classification: "Established", sources: ["diodorus", "demosthenes"], date: "338 BC", at: "bronze" },
    { text: "Alexander held a command in the battle.", classification: "Probable", sources: ["diodorus", "plutarch"], date: "338 BC", at: "silver" },
    { text: "The detailed movements of the battle cannot be reconstructed with confidence from the surviving accounts.", classification: "Unknown", sources: ["diodorus", "cah"], date: "338 BC", at: "gold" },
  ],
  connections: [{ charId: "philip2", relation: "won by" }, { charId: "alexander", relation: "fought at by" }],
},

"bat-cynoscephalae": {
  id: "bat-cynoscephalae", name: "Cynoscephalae", kind: "battle", subject: "battle:cynoscephalae",
  years: "197 BC", sets: ["roman-republic", "ancient-greece"],
  teaches: ["greece"],
  timeline: { year: -197, label: "The legion beats the phalanx at Cynoscephalae" },
  tiers: {
    bronze: { label: "Rome Beats Macedon", when: "197 BC",
      blurb: "Flamininus defeated Philip V of Macedon in Thessaly, ending the Second Macedonian War and making Rome the arbiter of Greek affairs." },
    silver: { label: "Ground the Phalanx Cannot Keep", when: "The mechanism",
      blurb: "A phalanx is close to unbreakable from the front and depends entirely on staying unbroken. On the broken hills at Cynoscephalae it could not hold its line; gaps opened, Roman maniples got inside them, and once inside, the sarissa is useless and the short sword is not." },
    gold: { label: "A System, Not a Weapon", when: "What it settled",
      blurb: "Cynoscephalae, Magnesia and Pydna are usually told as the legion defeating the phalanx. More precisely, they are a flexible articulated formation defeating a rigid one on ground that punished rigidity — and Rome kept choosing that ground. A year later Flamininus proclaimed the freedom of the Greeks at the Isthmian Games, which was also a system rather than a sentiment." },
  },
  claims: [
    { text: "Flamininus defeated Philip V at Cynoscephalae in 197 BC.", classification: "Established", sources: ["polybius", "livy"], date: "197 BC", at: "bronze" },
    { text: "Broken terrain prevented the Macedonian phalanx from maintaining its formation.", classification: "Probable", sources: ["polybius"], date: "197 BC", at: "silver" },
    { text: "Flamininus proclaimed the freedom of the Greeks at the Isthmian Games in 196 BC.", classification: "Established", sources: ["polybius", "livy"], date: "196 BC", at: "gold" },
  ],
  connections: [{ name: "The phalanx", type: "concept" }, { name: "League of Corinth", type: "concept" }],
},

});

/* ---- WARS -------------------------------------------------------- */
/* A war coin is not a longer battle coin. Battles own outcomes; a war
   owns the shape of the whole thing — why it started, what it cost, and
   what it changed. */

Object.assign(CHARACTERS, {

"w-punic-1": {
  id: "w-punic-1", name: "The First Punic War", kind: "war", subject: "war:punic-1",
  years: "264 – 241 BC", sets: ["carthage", "roman-republic"],
  teaches: ["punic-1", "carth-after-first"],
  timeline: { year: -241, label: "The First Punic War ends and Rome takes Sicily" },
  tiers: {
    bronze: { label: "Twenty-Three Years", when: "264 – 241 BC",
      blurb: "The longest continuous war in ancient history, begun over a garrison in one Sicilian town and fought largely at sea by a power that had no navy when it started." },
    silver: { label: "An Endurance Contest", when: "How it was decided",
      blurb: "Rome lost fleet after fleet, to Carthage and to storms, and rebuilt every time. Carthage kept the better sailors and the deeper tradition. What decided it was a political system unusually able to absorb catastrophic losses and come back with another fleet." },
    gold: { label: "The Bill Causes the Next War", when: "The consequence",
      blurb: "Carthage lost Sicily and took on a huge indemnity in the same document, then nearly fell to its own unpaid army, and Rome used that moment to take Sardinia too. Polybius — writing inside the household of the man who destroyed Carthage — calls that seizure contrary to all justice and names it a cause of the war that followed." },
  },
  claims: [
    { text: "The First Punic War ran from 264 to 241 BC and ended with Roman victory near the Aegates Islands.", classification: "Established", sources: ["polybius", "cah"], date: "241 BC", at: "bronze" },
    { text: "Western Sicily became Rome's first overseas province.", classification: "Established", sources: ["polybius", "livy"], date: "241 BC", at: "silver" },
    { text: "Polybius judges Rome's seizure of Sardinia unjust and a principal cause of the Second Punic War.", classification: "Established", sources: ["polybius"], date: "238 BC", at: "gold" },
  ],
  connections: [{ charId: "hamilcar", relation: "fought in" }, { name: "Sicily", type: "place" }],
},

"w-punic-2": {
  id: "w-punic-2", name: "The Second Punic War", kind: "war", subject: "war:punic-2",
  years: "218 – 201 BC", sets: ["carthage", "roman-republic"],
  teaches: ["war-punic-2", "carth-italy", "carth-spain"],
  timeline: { year: -218, label: "The Second Punic War begins" },
  tiers: {
    bronze: { label: "Hannibal's War", when: "218 – 201 BC",
      blurb: "Hannibal brought an army over the Alps into Italy, destroyed three Roman armies in three years, and spent sixteen years there without being able to finish the war." },
    silver: { label: "Tactical and Strategic Are Different", when: "The central lesson",
      blurb: "He won the battles and could not break the system behind them. Rome's alliance network mostly held, its manpower was deeper than any single defeat, it refused to negotiate, and it declined to give him another Cannae. Meanwhile Scipio took Spain, and the Metaurus killed the reinforcements." },
    gold: { label: "Where the War Was Actually Lost", when: "The strategic answer",
      blurb: "Not at Zama. Carthage lost when Rome stopped reacting to Hannibal in Italy and began dismantling the foundations of Carthaginian power elsewhere — Iberia stripped away, Numidia changing sides, Africa invaded. Hannibal was recalled to defend a position that had already been decided somewhere he was not." },
  },
  claims: [
    { text: "The Second Punic War ran from 218 to 201 BC.", classification: "Established", sources: ["polybius", "livy"], date: "201 BC", at: "bronze" },
    { text: "Rome refused to negotiate after Cannae and continued raising armies.", classification: "Established", sources: ["livy", "polybius"], date: "216 BC", at: "silver" },
    { text: "Responsibility for the outbreak was disputed in antiquity and remains contested.", classification: "Contested", sources: ["polybius", "livy", "cah"], date: "219 BC", at: "gold" },
  ],
  connections: [{ charId: "hannibal", relation: "fought by" }, { charId: "scipio", relation: "won by" }],
},

"w-punic-3": {
  id: "w-punic-3", name: "The Third Punic War", kind: "war", subject: "war:punic-3",
  years: "149 – 146 BC", sets: ["carthage", "roman-republic"],
  teaches: ["war-punic-3", "carth-end"],
  timeline: { year: -149, label: "Rome declares the war that will destroy Carthage" },
  tiers: {
    bronze: { label: "A War Against a Disarmed City", when: "149 – 146 BC",
      blurb: "Carthage had no empire, no navy and no capacity to threaten anyone. Rome destroyed it anyway, and the war ended with the city erased and its population enslaved." },
    silver: { label: "The Order of the Demands", when: "How it was engineered",
      blurb: "Rome asked for hostages, and got them. Then for all weapons, and got them. Only then, with the arsenals empty, did it demand that the Carthaginians abandon their city and move ten miles inland. That is the sequence you use when you want the refusal rather than the surrender." },
    gold: { label: "The Trap Was Fifty Years Old", when: "The mechanism",
      blurb: "The 202 BC treaty forbade Carthage to make war without Roman permission, while Rome's Numidian ally took its land under Roman arbitration. Carthage could not fight, could not win an arbitration, and could not appeal past Rome. When it finally defended itself, Rome had the treaty violation it had been waiting for." },
  },
  claims: [
    { text: "Rome declared war on Carthage in 149 BC and destroyed the city in 146 BC.", classification: "Established", sources: ["appian", "polybius"], date: "146 BC", at: "bronze" },
    { text: "Carthage surrendered hostages and weapons before the demand to abandon the city.", classification: "Established", sources: ["appian"], date: "149 BC", at: "silver" },
    { text: "Cato's repeated demand for Carthage's destruction is real; the phrase 'Carthago delenda est' is a later conventional wording.", classification: "Traditional / Legendary", sources: ["plutarch", "cah"], date: "150s BC", at: "gold" },
  ],
  connections: [{ charId: "masinissa", relation: "provoked by" }, { name: "Corinth", type: "place" }],
},

"w-greco-persian": {
  id: "w-greco-persian", name: "The Greco-Persian Wars", kind: "war", subject: "war:greco-persian",
  years: "499 – 449 BC", sets: ["ancient-greece", "persia"],
  teaches: ["war-greco-persian", "grk-persia", "per-west"],
  timeline: { year: -480, label: "Xerxes invades Greece and is turned back" },
  tiers: {
    bronze: { label: "Two Invasions", when: "490 and 480 BC",
      blurb: "Persia came twice: a punitive expedition beaten at Marathon in 490, and a full invasion in 480 that burned Athens and was then broken at Salamis and Plataea." },
    silver: { label: "A Frontier War, From the Other Side", when: "Proportion",
      blurb: "For Greece this was survival and the defining event of its history. For the Achaemenid empire it was a failed campaign on a poor north-western frontier, and Persian records do not treat it as a catastrophe. Both perspectives are true, and only one of them wrote the surviving account." },
    gold: { label: "Everything We Know Comes From the Winners", when: "The source problem",
      blurb: "Herodotus is our main narrative, written decades later by a Greek from a Persian-ruled city, and his Persian numbers are impossible. There is no Persian account. So the war that founded the western idea of Europe against Asia is known almost entirely from one side of it — which is worth remembering every time it is invoked." },
  },
  claims: [
    { text: "Persia invaded Greece in 490 and again in 480 BC, and both invasions failed.", classification: "Established", sources: ["herodotus", "cah"], date: "479 BC", at: "bronze" },
    { text: "Herodotus's figures for Persian army and fleet strength are not credible.", classification: "Contested", sources: ["herodotus", "cah"], date: "480 BC", at: "silver" },
    { text: "No Persian narrative of the wars survives.", classification: "Established", sources: ["cah", "pft"], date: "5th c. BC", at: "gold" },
  ],
  connections: [{ charId: "xerxes", relation: "led by" }, { charId: "darius1", relation: "began by" }],
},

"w-actium": {
  id: "w-actium", name: "The War of Actium", kind: "war", subject: "war:actium",
  years: "32 – 30 BC", sets: ["roman-republic", "ptolemaic-egypt"],
  teaches: ["war-actium", "actium", "egy-end"],
  timeline: { year: -30, label: "Egypt falls and the Roman civil wars end" },
  tiers: {
    bronze: { label: "The Last Civil War", when: "32 – 30 BC",
      blurb: "The final round of a century of Roman civil conflict, fought between Octavian and Antony, and ending with the deaths of Antony and Cleopatra and the annexation of Egypt." },
    silver: { label: "Declared on a Queen", when: "The framing",
      blurb: "Octavian had war declared on Cleopatra rather than on Antony, so that Romans fighting Romans could be presented as Italy defending itself against a foreign monarch. It is one of the most successful pieces of political staging in ancient history, and it is still how the war is usually told." },
    gold: { label: "What It Bought", when: "The consequence",
      blurb: "Egypt's treasury paid off the armies and funded the settlement that became the Principate. The Republic never formally ended; Octavian handed everything back, was handed more of it, and took a name rather than a title. The civil wars stopped because one man now held what everyone had been fighting over." },
  },
  claims: [
    { text: "Octavian defeated Antony and Cleopatra, who died in 30 BC, and Egypt became a Roman province.", classification: "Established", sources: ["dio", "plutarch", "res"], date: "30 BC", at: "bronze" },
    { text: "Rome formally declared war on Cleopatra rather than on Antony.", classification: "Established", sources: ["dio"], date: "32 BC", at: "silver" },
    { text: "Egyptian revenue underwrote the Augustan settlement.", classification: "Probable", sources: ["res", "cah"], date: "30 BC", at: "gold" },
  ],
  connections: [{ charId: "octavian", relation: "won by" }, { charId: "cleopatra", relation: "ended by" }],
},

"w-britain": {
  id: "w-britain", name: "The Conquest of Britain", kind: "war", subject: "war:britain",
  years: "AD 43 – 84", sets: ["ancient-britain", "roman-empire"],
  teaches: ["war-britain", "brit-claudius", "brit-agricola"],
  timeline: { year: 43, label: "Claudius invades Britain" },
  tiers: {
    bronze: { label: "Forty Years", when: "AD 43 – 84",
      blurb: "Rome landed in AD 43, took the south-east in about four years, and was still fighting in the north four decades later." },
    silver: { label: "An Emperor Who Needed a Triumph", when: "Why it happened",
      blurb: "Claudius was put on the throne by the Praetorians after they murdered his nephew, had never commanded anything, and needed a military success that was his. Britain was across the Ocean, unfinished business left by Julius Caesar, and not very dangerous. An exiled British king supplied the legal pretext." },
    gold: { label: "Strabo Was Right About the Economics", when: "The judgement",
      blurb: "Writing under Augustus, Strabo argued Britain's customs revenue was already worth more than a province would be once you deducted the garrison. He appears to have been correct: Britain needed a disproportionate military commitment for centuries. The invasion solved a political problem in Rome, not an economic one." },
  },
  claims: [
    { text: "Rome invaded Britain in AD 43 under Claudius and campaigned into the 80s.", classification: "Established", sources: ["dio", "tacitus"], date: "43", at: "bronze" },
    { text: "Verica's appeal supplied the legal pretext for intervention.", classification: "Probable", sources: ["dio", "cah"], date: "42", at: "silver" },
    { text: "Strabo argued before the conquest that a province would cost more than the existing customs revenue.", classification: "Established", sources: ["strabo"], date: "c. 20", at: "gold" },
  ],
  connections: [{ charId: "claudius", relation: "ordered by" }, { charId: "caratacus", relation: "resisted by" }, { charId: "boudica", relation: "revolted against" }],
},

"w-bronze-collapse": {
  id: "w-bronze-collapse", name: "The Bronze Age Collapse", kind: "event", subject: "event:bronze-age-collapse",
  years: "c. 1200 – 1150 BC", sets: ["ancient-egypt", "ancient-greece"],
  teaches: ["crisis-bronze-age", "egy-sea-peoples", "grk-mycenae"],
  timeline: { year: -1177, label: "The Bronze Age palace world collapses across the eastern Mediterranean" },
  tiers: {
    bronze: { label: "Everything at Once", when: "c. 1200 – 1150 BC",
      blurb: "Within about fifty years the Hittite empire, the Mycenaean palaces, Ugarit and most of the Levantine cities ceased to exist. Egypt survived, diminished." },
    silver: { label: "A System, Not a Set of States", when: "Why it spread",
      blurb: "These were not independent kingdoms that happened to fall together. They were an interlocking network of palace economies, trading tin and copper and grain and diplomatic marriages. Interdependence is efficient and it transmits failure. Remove enough nodes and the ones left cannot function on the assumptions they were built on." },
    gold: { label: "Nobody Knows Why", when: "The honest answer",
      blurb: "Drought, earthquake, migration, the Sea Peoples, systems failure and internal revolt are all proposed and all partial. The current consensus is that there is no single cause and the search for one is the mistake. What is clear is the shape: writing stops, long-distance trade stops, monumental building stops, and populations carry on underneath." },
  },
  claims: [
    { text: "The Hittite empire, the Mycenaean palaces and most Levantine cities ended within roughly fifty years around 1200 BC.", classification: "Established", sources: ["ugarit", "arch", "cah"], date: "c. 1180 BC", at: "bronze" },
    { text: "Linear B writing ceases with the palaces and Greece has no script for some four centuries.", classification: "Established", sources: ["linear-b", "arch"], date: "c. 1180 BC", at: "silver" },
    { text: "No single cause of the collapse is established; multi-causal explanations now dominate.", classification: "Contested", sources: ["cah", "arch"], date: "c. 1200 BC", at: "gold" },
  ],
  connections: [{ charId: "ramesses3", relation: "resisted by" }, { name: "The Sea Peoples", type: "concept" }],
},

});

/* ---- PLACES ------------------------------------------------------ */
/* A place coin asks a different question from a person or a battle:
   not what happened, but why here. Geography first, then what the
   geography made possible. */

Object.assign(CHARACTERS, {

"plc-rome": {
  id: "plc-rome", name: "Rome", kind: "place", subject: "place:rome",
  years: "from c. 753 BC", sets: ["roman-republic", "roman-empire"],
  teaches: ["founding", "kings", "how-republic-worked"],
  timeline: { year: -753, label: "The traditional founding date of the city of Rome" },
  tiers: {
    bronze: { label: "Hills Above a Ford", when: "The site",
      blurb: "Rome sits where the Tiber could be crossed, on defensible hills, at the boundary between Latium and Etruria, with salt flats downstream. A crossing point is a place traffic has to come to." },
    silver: { label: "A City That Absorbed People", when: "The mechanism",
      blurb: "Rome's founding legends are about taking in outsiders — an asylum for the landless, wives seized from neighbours, a Sabine co-king. Whether or not any of that happened, it reflects something real: Rome extended citizenship to defeated enemies on a scale no Greek city would consider, and that is the engine of its expansion." },
    gold: { label: "The Wall Came Before the City", when: "What Romans believed",
      blurb: "In the foundation story Romulus kills Remus for stepping over the ploughed boundary line — not from temper but because the line was sacred before it was defensive. Rome was content to begin with a murder provided it was committed in defence of the wall. That tells you what the city thought it was for." },
  },
  claims: [
    { text: "Settlement on the Palatine is archaeologically attested from at least the tenth century BC.", classification: "Established", sources: ["arch", "cah"], date: "10th c. BC", at: "bronze" },
    { text: "The 753 BC founding date was calculated backwards by later Roman scholars.", classification: "Traditional / Legendary", sources: ["livy", "cah"], date: "1st c. BC", at: "bronze" },
    { text: "Rome extended citizenship to defeated communities far more readily than Greek city-states did.", classification: "Established", sources: ["livy", "cah"], date: "4th c. BC", at: "silver" },
  ],
  connections: [{ charId: "romulus-remus", relation: "founded by" }, { name: "The Tiber", type: "place" }],
},

"plc-carthage": {
  id: "plc-carthage", name: "Carthage", kind: "place", subject: "place:carthage",
  years: "c. 814 – 146 BC", sets: ["carthage"],
  teaches: ["carth-place", "carth-dido"],
  timeline: { year: -814, label: "The traditional founding of Carthage" },
  tiers: {
    bronze: { label: "The Waist of the Sea", when: "The site",
      blurb: "Between Cape Bon and western Sicily the Mediterranean narrows to about ninety miles. Carthage sat on the southern side of that gap, on a promontory with sheltered water on two sides. Everything sailing between the two halves of the sea had to pass it." },
    silver: { label: "The Harbour You Could Not Count", when: "The cothon",
      blurb: "Two artificial basins: a rectangular commercial dock in front, and behind it, through a channel that could be closed, a circular naval harbour with around two hundred and twenty covered ship-sheds. A screen wall meant no visitor could see how many warships were inside, or how ready. Both basins are still traceable from the air." },
    gold: { label: "Described Entirely by Its Enemies", when: "The record",
      blurb: "Punic literature is gone — Carthage had libraries, and after 146 BC Rome handed them to its Numidian allies and they vanished. What survives was written by Greeks and Romans who fought the city, after a century of arguing that its people were monsters. Every claim about Carthage carries a discount, and the ones that flatter Rome carry the largest." },
  },
  claims: [
    { text: "Archaeology places the earliest settlement at Carthage in the eighth century BC.", classification: "Established", sources: ["arch", "cah"], date: "8th c. BC", at: "bronze" },
    { text: "The cothon comprised a rectangular commercial basin and a circular naval basin with covered ship-sheds.", classification: "Established", sources: ["appian", "arch"], date: "3rd c. BC", at: "silver" },
    { text: "Carthaginian libraries were dispersed to Numidian rulers after 146 BC and are lost.", classification: "Probable", sources: ["pliny", "cah"], date: "146 BC", at: "gold" },
  ],
  connections: [{ charId: "dido", relation: "founded by" }, { name: "Byrsa", type: "place" }],
},

"plc-sparta": {
  id: "plc-sparta", name: "Sparta", kind: "place", subject: "place:sparta",
  years: "c. 700 – 371 BC", sets: ["ancient-greece"],
  teaches: ["grk-sparta"],
  timeline: { year: -700, label: "Sparta reorganises itself around holding down Messenia" },
  tiers: {
    bronze: { label: "A State Built on One Problem", when: "c. 700 BC",
      blurb: "Sparta conquered neighbouring Messenia and enslaved its population as helots. Everything distinctive about Spartan society follows from needing to hold down far more people than it had citizens." },
    silver: { label: "The System, Not the Courage", when: "The mechanism",
      blurb: "Full-time military training, communal messes, the removal of boys from families, the suppression of trade and coinage, and the annual ritual declaration of war on the helots are not a philosophy of toughness. They are the answer to a security problem — a permanently mobilised garrison state sitting on its own labour force." },
    gold: { label: "The Spartan Mirage", when: "The source problem",
      blurb: "Almost everything we know was written by admiring outsiders, mostly Athenians, about a state that deliberately revealed nothing — Sparta left almost no writing of its own. What survives is other people's idealisation, and much of the modern image comes through that filter and then through a further one: what later Europeans wanted Sparta to have been." },
  },
  claims: [
    { text: "Sparta conquered Messenia and held its population as helots.", classification: "Established", sources: ["thucydides", "cah"], date: "7th c. BC", at: "bronze" },
    { text: "Sparta produced almost no literature of its own; the record is largely non-Spartan.", classification: "Established", sources: ["thucydides", "xenophon", "cah"], date: "5th c. BC", at: "gold" },
    { text: "The ephors are reported to have declared war on the helots annually.", classification: "Probable", sources: ["aristotle-ath", "plutarch"], date: "5th c. BC", at: "silver" },
  ],
  connections: [{ charId: "leonidas", relation: "king of" }, { name: "Helots", type: "concept" }],
},

"plc-persepolis": {
  id: "plc-persepolis", name: "Persepolis", kind: "place", subject: "place:persepolis",
  years: "518 – 330 BC", sets: ["persia"],
  teaches: ["per-persepolis", "per-darius"],
  timeline: { year: -518, label: "Darius begins building Persepolis" },
  tiers: {
    bronze: { label: "A Capital for Show", when: "518 BC",
      blurb: "Darius I began a monumental complex of terraces, staircases and audience halls in the Persian heartland — not an administrative capital so much as a stage for the empire to be displayed to itself." },
    silver: { label: "The Staircase Argument", when: "What the reliefs say",
      blurb: "The great reliefs show delegations from across the empire bringing gifts: Ionians, Bactrians, Nubians, Indians, each in their own dress, each led by a Persian usher holding their hand. Nobody is bound, nobody kneels, nobody is being dragged. Compare an Assyrian relief of prisoners on hooks. It is a deliberate statement about what kind of empire this is." },
    gold: { label: "The Paperwork Behind the Propaganda", when: "The tablets",
      blurb: "Tens of thousands of administrative tablets were found at the site, recording rations issued to workers — including women, and women receiving extra rations for childbirth. The reliefs are the empire's image of itself; the tablets are its accounts. Where they can be compared, the tablets support a picture of paid organised labour rather than mass slavery." },
  },
  claims: [
    { text: "Darius I began construction at Persepolis around 518 BC.", classification: "Established", sources: ["arch", "pft"], date: "518 BC", at: "bronze" },
    { text: "The Apadana reliefs depict tribute delegations in their own dress, unbound.", classification: "Established", sources: ["arch"], date: "5th c. BC", at: "silver" },
    { text: "The Persepolis Fortification tablets record rations to workers including women.", classification: "Established", sources: ["pft"], date: "509–494 BC", at: "gold" },
    { text: "Alexander burned Persepolis in 330 BC; whether it was deliberate policy or a drunken act is disputed in the sources.", classification: "Contested", sources: ["arrian", "diodorus"], date: "330 BC", at: "gold" },
  ],
  connections: [{ charId: "darius1", relation: "built by" }, { charId: "alexander", relation: "burned by" }],
},

"plc-alexandria": {
  id: "plc-alexandria", name: "Alexandria", kind: "place", subject: "place:alexandria",
  years: "331 – 30 BC", sets: ["ptolemaic-egypt"],
  teaches: ["egy-ptolemy1", "egy-ptolemy2"],
  timeline: { year: -331, label: "Alexander founds Alexandria on the Egyptian coast" },
  tiers: {
    bronze: { label: "A Greek City in Egypt", when: "331 BC",
      blurb: "Founded by Alexander on the Mediterranean coast and made the Ptolemaic capital — deliberately not on the Nile, and administratively 'Alexandria by Egypt' rather than in it." },
    silver: { label: "The Library as State Policy", when: "The mechanism",
      blurb: "The Museum and Library were funded by the crown to collect every book in the world, and the collection methods were aggressive: ships searched in harbour, originals kept and copies returned. It bought the Ptolemies something no army could — the claim to be the centre of Greek intellectual life, in Egypt." },
    gold: { label: "It Did Not Burn Down Once", when: "Correcting the story",
      blurb: "There is no single catastrophic fire. Caesar's campaign in 48 BC damaged part of the holdings, and the institution declined over centuries through lost funding, expulsions of scholars and changing priorities. The dramatic version is much more satisfying than the truth, which is that libraries usually die of neglect." },
  },
  claims: [
    { text: "Alexandria was founded by Alexander in 331 BC and became the Ptolemaic capital.", classification: "Established", sources: ["arrian", "diodorus"], date: "331 BC", at: "bronze" },
    { text: "The Library was a royally funded institution attached to the Museum.", classification: "Established", sources: ["strabo", "cah"], date: "3rd c. BC", at: "silver" },
    { text: "The Library's loss was gradual rather than a single destruction event.", classification: "Probable", sources: ["cah", "plutarch"], date: "1st c. BC onward", at: "gold" },
  ],
  connections: [{ charId: "ptolemy1", relation: "capital of" }, { charId: "ptolemy2", relation: "expanded by" }],
},

});

/* ---- INVENTIONS -------------------------------------------------- */
/* Only inventions the app actually teaches. An invention coin attached
   to chapters that merely mention it would generate a promotion quiz
   about something else entirely. */

Object.assign(CHARACTERS, {

"inv-coinage": {
  id: "inv-coinage", name: "Coined Money", kind: "invention", subject: "invention:coinage",
  years: "from c. 600 BC", sets: ["ancient-greece", "persia"],
  teaches: ["grk-polis", "grk-athens-reform", "per-empire"],
  timeline: { year: -600, label: "Coined money appears in Lydia and western Anatolia" },
  tiers: {
    bronze: { label: "A Lump of Metal With a Stamp", when: "c. 600 BC",
      blurb: "Coinage begins in Lydia and the Greek cities of Anatolia: precious metal in standard weights, stamped by an authority that guarantees them. Money as a concept is far older; money you do not have to weigh is the innovation." },
    silver: { label: "What the Stamp Actually Does", when: "The mechanism",
      blurb: "It removes the need to assay and weigh metal at every transaction, which collapses the cost of small exchanges and lets strangers trade without trusting each other — they need only trust the issuer. It also lets a state pay soldiers and collect taxes in a unit it defines, which is the part rulers noticed." },
    gold: { label: "Why Sparta Refused It", when: "The politics of money",
      blurb: "Sparta is said to have kept deliberately unwieldy iron currency to prevent accumulation and foreign trade. Whether or not the detail is exact, it identifies something real: coinage is not politically neutral. It makes wealth portable, concealable and detachable from land — and any state built on land-holding aristocracy has a reason to be suspicious of it." },
  },
  claims: [
    { text: "The earliest coinage appears in Lydia and Ionia around the late seventh and early sixth centuries BC.", classification: "Established", sources: ["herodotus", "arch"], date: "c. 600 BC", at: "bronze" },
    { text: "Darius I issued the gold daric as an imperial coinage.", classification: "Established", sources: ["herodotus", "arch"], date: "late 6th c. BC", at: "silver" },
    { text: "Sparta's resistance to coined money is reported by later sources with a moralising purpose.", classification: "Interpretation", sources: ["plutarch", "xenophon"], date: "5th c. BC", at: "gold" },
  ],
  connections: [{ charId: "solon", relation: "reformed weights under" }, { charId: "darius1", relation: "issued by" }],
},

"inv-alphabet": {
  id: "inv-alphabet", name: "The Alphabet", kind: "invention", subject: "invention:alphabet",
  years: "from c. 800 BC in Greece", sets: ["ancient-greece"],
  teaches: ["grk-colonies", "grk-mycenae"],
  timeline: { year: -800, label: "Greeks adapt the Phoenician script and add vowels" },
  tiers: {
    bronze: { label: "Borrowed and Altered", when: "c. 800 BC",
      blurb: "Greeks took the Phoenician consonantal script and repurposed signs they did not need as vowels — producing a writing system that records sound rather than meaning, and that can be learned in days rather than years." },
    silver: { label: "Who Gets to Write", when: "Why it matters",
      blurb: "Linear B, the Mycenaean script, was used by palace scribes for inventories and vanished with the palaces. An alphabet is cheap enough that ordinary people can own it. Some of the earliest Greek inscriptions are jokes scratched on cups — which is exactly what you would expect when writing escapes the accountants." },
    gold: { label: "Four Centuries of Silence First", when: "The gap",
      blurb: "Greece could write, lost the ability entirely when the Bronze Age palaces fell around 1200 BC, and did not write again for roughly four hundred years. The Homeric poems were composed and transmitted orally across that gap. Literacy is not a ratchet: it can be lost, and it was." },
  },
  claims: [
    { text: "The Greek alphabet derives from a Phoenician consonantal script with vowels added.", classification: "Established", sources: ["herodotus", "arch"], date: "c. 800 BC", at: "bronze" },
    { text: "Linear B was a syllabic administrative script used by palace scribes.", classification: "Established", sources: ["linear-b"], date: "c. 1400 BC", at: "silver" },
    { text: "Greece was without writing for roughly four centuries between Linear B and the alphabet.", classification: "Established", sources: ["arch", "cah"], date: "c. 1180–800 BC", at: "gold" },
  ],
  connections: [{ name: "Linear B", type: "concept" }, { name: "Phoenicia", type: "place" }],
},

"inv-corvus": {
  id: "inv-corvus", name: "The Corvus", kind: "invention", subject: "invention:corvus",
  years: "260 – c. 250 BC", sets: ["roman-republic", "carthage"],
  teaches: ["punic-1", "carth-after-first"],
  timeline: { year: -260, label: "Rome bolts a boarding bridge to its warships" },
  tiers: {
    bronze: { label: "A Plank With a Spike", when: "260 BC",
      blurb: "A hinged boarding bridge about eleven metres long, mounted on a pivot in the bow with a heavy iron spike underneath. Dropped onto an enemy deck, the spike bit in and locked the two ships together." },
    silver: { label: "Refusing to Compete", when: "What it was for",
      blurb: "Ancient sea battles were won by ramming and shearing, which need crews with years of practice. Rome had neither. The corvus converted a naval engagement into an infantry fight on a wooden platform — the one form of combat Rome was confident of winning. It is not a naval invention; it is a way of not having a naval battle." },
    gold: { label: "Abandoned, and the Lesson Kept", when: "The trade-off",
      blurb: "The weight high in the bow made ships unstable, and Rome lost entire fleets to storms in the 250s. The device was quietly dropped within about a decade. But the reflex behind it — find the enemy's advantage, refuse to fight on it, pay to try again — is the thing that actually won the war, and it long outlived the plank." },
  },
  claims: [
    { text: "Roman warships in the First Punic War carried a hinged boarding bridge called the corvus.", classification: "Established", sources: ["polybius"], date: "260 BC", at: "bronze" },
    { text: "Rome lost large fleets to storms during the 250s BC.", classification: "Established", sources: ["polybius"], date: "255 BC", at: "silver" },
    { text: "The corvus is generally thought to have destabilised ships and been abandoned within a decade.", classification: "Probable", sources: ["polybius", "cah"], date: "c. 250 BC", at: "gold" },
  ],
  connections: [{ name: "Mylae", type: "concept" }, { name: "Quinquereme", type: "concept" }],
},

});
