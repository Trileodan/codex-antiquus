/* New editorial prose for the First Punic War. Review only; original is archived in ../js/data/wars.js. */
const FIRST_PUNIC = CHAPTERS.find(c => c.id === "war-punic-1");
if (FIRST_PUNIC) {
 FIRST_PUNIC.minutes = 24;
 FIRST_PUNIC.intro = "For twenty-three years, Rome and Carthage fought over Sicily, across the sea and eventually on African soil. Neither power expected how expensive the quarrel would become.";
 const chapters = [
 {title:"A City Between Two Powers",text:[
 "In 264 BC Rome and Carthage were not yet destined enemies. Rome dominated much of mainland Italy. Carthage, a wealthy trading power on the North African coast, held important positions in western Sicily. Between them lay the narrow Strait of Messina, where a local crisis threatened to drag both into war.",
 "The crisis began with the **Mamertines**, former mercenaries who had seized Messana and made themselves a power through raiding. When Hiero of Syracuse threatened them, they sought help from Carthage and Rome. Carthage established a presence in the city, but a Mamertine faction then appealed to Rome instead.",
 "For Rome this was an awkward decision. The Mamertines had taken a city by force, and Rome had punished similar behavior by its own soldiers at Rhegium. Yet leaving Messana in Carthaginian hands might give a powerful rival control of both sides of the strait. Roman leaders chose intervention, and an expedition crossed to Sicily.",
 "That choice did not make a twenty-three-year war inevitable. It did, however, put Roman soldiers and Carthaginian interests in direct conflict. Hiero soon made peace with Rome and became an important Roman ally. What had begun as a dispute over one city widened into a struggle for Sicily."
 ]},
 {title:"The War That Would Not End on Land",text:[
 "Roman armies were formidable on land, but Sicily was not a single battlefield that could be won in an afternoon. Its fortified cities needed sieges, its hills complicated movement, and Carthage could move supplies and reinforcements by sea.",
 "In 262 BC Rome besieged **Agrigentum**, an important Carthaginian-held city. The operation dragged on for months. A Carthaginian relief army threatened the Roman besiegers, who themselves began to suffer shortages. The Romans eventually won the fighting outside the city and took Agrigentum, but the victory did not end the war.",
 "Carthage still held strong positions in western Sicily, particularly around Lilybaeum and Drepana. Its fleet could protect coastal bases and raid Roman territory. Roman commanders discovered that taking inland ground was not enough if their enemy could sail around them.",
 "Rome faced a decision that would transform its military history: remain a land power and accept a stalemate, or build a fleet capable of challenging a maritime rival. The Romans chose the second option, committing enormous resources to a kind of warfare in which Carthage had far more experience."
 ]},
 {title:"Mylae: Rome Learns to Fight at Sea",text:[
 "Rome's rapid naval expansion was an extraordinary gamble. A warship was not simply a floating platform for infantry. It required trained rowers, officers who understood formation sailing and crews who could maneuver at speed without fouling neighboring vessels.",
 "Early efforts went badly. Near Lipara, the Roman consul Gnaeus Cornelius Scipio was trapped and captured with a small squadron. His colleague **Gaius Duilius** took over the fleet and confronted Carthaginian ships near Mylae in 260 BC.",
 "The Romans used a boarding device remembered as the **corvus**, a hinged bridge with a spike that could grip an enemy deck. Ancient sources credit it with helping Roman infantry turn ship-to-ship fighting into something closer to the land combat they knew. Historians debate its exact design and how widely it was used.",
 "At Mylae, Rome won a significant naval victory. The result did not suddenly make Roman sailors more experienced than Carthaginian ones, but it proved that Carthage's advantage at sea could be challenged. Rome had bought itself a new way to fight, and would now have to pay to maintain it."
 ]},
 {title:"The Invasion of Africa",text:[
 "Winning at sea encouraged a larger ambition. If Rome could carry an army to North Africa, it might threaten Carthage's homeland and force a settlement. In 256 BC a huge Roman fleet fought through Carthaginian opposition near Cape Ecnomus and delivered an expeditionary army to Africa.",
 "The Roman commander **Marcus Atilius Regulus** initially enjoyed success. Carthaginian leaders considered peace, but the terms attributed to Regulus were so severe that they chose to continue the war. Our accounts were written later and from a largely Roman perspective, so the precise negotiations are uncertain.",
 "Carthage reorganized its forces. A Spartan officer named **Xanthippus** advised using open ground where Carthaginian cavalry and war elephants could operate effectively. At the battle near Tunis in 255 BC, Roman infantry was overwhelmed and Regulus was captured.",
 "Then disaster followed disaster. A Roman fleet sent to evacuate survivors was wrecked in a storm on its return journey. Ancient casualty figures may be exaggerated, but the loss of ships and lives was catastrophic. Rome had learned that even winning battles did not guarantee control over the sea, the weather or the enemy's will to fight."
 ]},
 {title:"Drepana: The Cost of Impatience",text:[
 "The war returned to Sicily, where the remaining Carthaginian strongholds resisted Roman pressure. Lilybaeum was particularly difficult to capture because supplies could still arrive by sea. A blockade was only as effective as the fleet enforcing it.",
 "In 249 BC the consul **Publius Claudius Pulcher** tried a surprise attack on the Carthaginian fleet at Drepana. The plan depended on reaching the enemy before its ships could deploy. Instead, the Roman approach became disordered and the Carthaginian commander Adherbal got his vessels out into open water.",
 "The Carthaginians won decisively. Roman ships were driven towards the coast and many were captured. Drepana demonstrated that courage and numbers could not compensate for a fleet caught in a poor position against an alert opponent.",
 "Later Roman tradition supplied a memorable story: the sacred chickens used for omens refused to eat, so Pulcher supposedly threw them into the sea, declaring that if they would not eat, they could drink. It is a wonderful anecdote, but it is best treated as a moralizing tradition rather than a reliable explanation of the defeat. The naval mistakes matter more than the chickens."
 ]},
 {title:"The Last Fleet and the Price of Victory",text:[
 "By the late 240s BC both sides were exhausted. Rome had lost fleets in battle and storms; Carthage struggled to finance its armies and hold its remaining Sicilian positions. Yet neither government had secured terms it could accept.",
 "Rome raised money for another fleet, with wealthy citizens helping finance the ships. The new commander, **Gaius Lutatius Catulus**, worked to train his crews and restore Roman control of the approaches to western Sicily.",
 "In 241 BC a Carthaginian relief fleet approached the **Aegates Islands**. The Roman fleet intercepted it and won. With the sea route to its remaining forces in Sicily cut, Carthage could no longer sustain the campaign and sought peace.",
 "Carthage agreed to leave Sicily and pay a heavy indemnity. Rome gained its first overseas province. The war had lasted twenty-three years, consumed extraordinary resources and changed Rome from an Italian land power into a major Mediterranean naval state.",
 "The peace did not settle the rivalry. Carthage soon faced a brutal revolt by unpaid mercenaries, while Rome later took Sardinia and Corsica during Carthage's weakness. Carthaginian expansion in Spain followed. A generation later, Hannibal would inherit a family and a state determined not to lose to Rome in the same way again."
 ]}
 ];
 FIRST_PUNIC.beats.forEach((beat,i)=>{
   if(!chapters[i]) return;
   beat.title=chapters[i].title;
   beat.text=chapters[i].text;
   beat.tactics="";
   beat.forces="";
   if(beat.diagram && Array.isArray(beat.diagram.phases)) {
     // Retain original tactical movements; provide newly authored concise narration.
     const notes=[
       ["Rome enters the conflict through Messana, drawing both powers into a struggle for Sicily."],
       ["Roman armies can capture inland ground, but coastal Carthaginian bases remain supplied by sea."],
       ["Roman ships close on their opponents; boarding gives Roman infantry a way to influence naval combat."],
       ["Carthaginian cavalry and elephants exploit open ground, defeating the Roman invasion army."],
       ["The Roman approach loses cohesion; Carthaginian ships maneuver into a stronger position."],
       ["A trained Roman fleet intercepts Carthaginian reinforcements near the Aegates Islands."]
     ][i]||[];
     beat.diagram.phases.forEach((p,n)=>{p.caption=notes[n]||("Tactical phase "+(n+1)+": follow the positions and movements shown above.");});
   }
 });
}
