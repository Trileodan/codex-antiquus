/* Review-only Second Punic War: chapter-length reading journey.
   All source prose remains untouched in ../js/data/ and review/wars.js. */
const PUNIC_SOURCE = CHAPTERS.find(c => c.id === "war-punic-2");
const PUNIC_BEATS = PUNIC_SOURCE.beats;
function punicBeat(title, paragraphs, extra) {
  return Object.assign({ title, text: paragraphs }, extra || {});
}
const PUNIC_LESSONS = [
  { id:"punic-road", title:"The Road to War", era:"219–218 BC", minutes:5, intro:"Before Hannibal crossed a mountain, two powers had already backed themselves into war.", beats:[
    punicBeat("The peace that did not settle anything",[
      "The First Punic War ended in 241 BC with Carthage defeated, Sicily lost and an enormous indemnity to pay. Rome had proved that it could build fleets, absorb disasters and keep fighting. Carthage had learned that it could not win a contest of endurance on Rome's terms.",
      "Carthage's commanders turned towards Iberia, modern Spain and Portugal, where silver mines, recruits and allied communities could support a new army. Hamilcar Barca led the expansion; after his death, his son-in-law Hasdrubal continued it. In 221 BC Hamilcar's son Hannibal took command.",
      "The Roman and Carthaginian spheres of influence in Spain were not clearly agreed. A treaty associated with the River Ebro set a limit on Carthaginian advance, but Saguntum, a city south of that river, had ties to Rome. Ancient accounts differ over precisely which commitments each side violated."
    ]),
    punicBeat("Saguntum becomes a test of strength",[
      "In 219 BC Hannibal besieged Saguntum. Its fall after a long resistance made the dispute impossible to ignore. Rome demanded that Carthage surrender Hannibal. Carthage refused, and war followed in 218 BC.",
      "Rome expected to send armies towards Spain and North Africa. Hannibal chose something more dangerous: take the war across the Alps and into Italy itself. His target was not simply Rome's city walls. It was Rome's network of Italian allies, which supplied soldiers year after year.",
      "If those allies decided Rome could no longer protect them, the Roman war machine might unravel. Everything Hannibal did in Italy was aimed, ultimately, at that political result."
    ])
  ]},
  { id:"punic-alps", title:"Across the Alps", era:"218 BC", minutes:5, intro:"A daring march turned a distant war into an invasion of Italy.", beats:[
    punicBeat("A race through southern Gaul",[
      "Hannibal marched north from Spain, crossed the Pyrenees and approached the Rhône. Roman forces tried to intercept him, but the two armies missed one another. Hannibal's route through the Alps remains disputed: our ancient sources describe the ordeal more clearly than the exact passes.",
      "Mountain communities attacked parts of the column, the weather deteriorated, and men and animals struggled on narrow paths. Hannibal emerged into northern Italy with a much smaller army than he had started with. The surviving force, however, included experienced soldiers and cavalry.",
      "Northern Italy was not secure Roman territory. Some Gallic peoples had fought Rome recently and now saw Hannibal as a possible ally. He needed their supplies and manpower; they needed proof he could beat Rome."
    ]),
    punicBeat("The first clash at Ticinus",[
      "The consul Publius Cornelius Scipio confronted Hannibal near the River Ticinus. This was mainly a cavalry engagement, not a full battle between the two infantry armies. The Romans were driven back and Scipio was wounded.",
      "Scipio withdrew towards the River Trebia to await the other consul, Tiberius Sempronius Longus. Hannibal had won an opening advantage, but he still needed a victory large enough to convince the Gallic communities that siding with him was worth the risk."
    ])
  ]},
  { id:"punic-trebia", title:"Trebia: The First Trap", era:"218 BC", minutes:6, intro:"A freezing river, an impatient commander and a trap prepared in advance.", beats:[
    punicBeat("Why the Romans chose to fight",[
      "Sempronius had joined the wounded Scipio near Placentia. Rome now had a substantial army in the field, and its commanders faced a political as well as a military problem: Hannibal was recruiting allies in northern Italy while Roman land was under threat.",
      "Ancient writers portray Sempronius as eager to win a victory before his year as consul ended. We should be cautious about reducing a complicated decision to one man's vanity. What matters is that Hannibal found a way to draw the Romans into battle on a day and ground of his choosing."
    ]),
    Object.assign({},PUNIC_BEATS[1],{text:[
      "On a cold December morning, Carthaginian horsemen rode towards the Roman camp and then withdrew. The Romans pursued them across the Trebia, a river swollen and bitterly cold. By the time the infantry formed for battle, many men were wet, hungry and exhausted. Hannibal's troops had eaten and prepared.",
      "Hannibal's cavalry and elephants pressed the Roman wings while the infantry fought in the center. His brother Mago had concealed a picked force in a low watercourse. At the crucial moment those men emerged behind the Romans.",
      "Some Roman infantry in the center fought through the Carthaginian line and escaped. Much of the rest of the army was shattered. Trebia was not a magical trick: it was a sequence of decisions about timing, terrain, preparation and the enemy's likely response."
    ]})
  ]},
  { id:"punic-trasimene", title:"The Road to Trasimene", era:"217 BC", minutes:7, intro:"Hannibal's next victory began months before the ambush.", beats:[
    punicBeat("The winter between the battles",[
      "Trebia did not end the war. The Roman Republic still had armies, money and allies. Hannibal wintered in northern Italy, rebuilding his strength through Gallic support. Rome elected new consuls for 217 BC and positioned forces to guard the routes south.",
      "In the spring Hannibal crossed the Apennines and moved through difficult, marshy country in Etruria. The march was punishing; ancient sources say Hannibal suffered an eye infection and lost the sight of one eye. His army nevertheless emerged past Roman defensive positions.",
      "Hannibal then devastated land within reach of the consul Gaius Flaminius. Burning crops and villages served a military purpose: it threatened Rome's allies and made a Roman commander look powerless unless he followed. Flaminius pursued, but the exact extent of his recklessness is colored by hostile ancient accounts."
    ]),
    Object.assign({},PUNIC_BEATS[2],{text:[
      "At Lake Trasimene, a road ran between hills and water. Hannibal placed troops along the rising ground and left a visible force ahead. As the Roman column entered the confined route, the Carthaginians attacked from several directions.",
      "The Romans had little room to deploy into their usual fighting formation. Their consul Flaminius was killed, and the army was devastated. Mist may have worsened the confusion, though the trap did not depend on it.",
      "This was more than another Roman defeat. Hannibal had destroyed a consular army while it was still on the march. In Rome, fear turned into a question: should the Republic keep seeking decisive battles at all?"
    ]})
  ]},
  { id:"punic-fabius", title:"Fabius and the Road to Cannae", era:"217–216 BC", minutes:7, intro:"Rome tried patience, then decided it could no longer afford to wait.", beats:[
    punicBeat("The man who would not fight",[
      "After Trasimene, Rome appointed Quintus Fabius Maximus dictator, an extraordinary office intended to provide unified leadership in a crisis. Fabius refused to offer Hannibal the open battle he wanted.",
      "Instead, Roman forces shadowed the Carthaginians, occupied defensible ground and threatened their foraging parties. The logic was simple: Hannibal could defeat Roman armies, but he could not remain indefinitely in hostile territory without food, allies and replacements.",
      "This approach came at a terrible political cost. Italian farms were being burned while Rome's army watched. Fabius was called Cunctator, the Delayer. What later generations admired as strategic patience looked to many contemporaries like an unwillingness to defend them."
    ]),
    punicBeat("Why Rome changed course",[
      "Fabius's term ended. Roman leaders continued to debate how to respond, and the pressure to confront Hannibal remained intense. In 216 BC the consuls Lucius Aemilius Paullus and Gaius Terentius Varro commanded an exceptionally large Roman army.",
      "Hannibal seized the supply depot at Cannae in Apulia. Its stores and location mattered: Rome could not ignore an enemy who threatened the grain and security of its Italian allies.",
      "The Roman commanders brought their army to the open ground near the Aufidus River. They possessed overwhelming numbers of infantry. Hannibal had better cavalry and an army that had spent years learning how to fight together. Each side believed it understood the coming battle."
    ])
  ]},
  { id:"punic-cannae", title:"Cannae: The Encirclement", era:"216 BC", minutes:10, intro:"Rome committed an immense army. Hannibal made its weight work against it.", beats:[
    Object.assign({},PUNIC_BEATS[4],{title:"The Battle of Cannae"})
  ]},
  { id:"punic-survival", title:"Why Rome Did Not Surrender", era:"216–211 BC", minutes:6, intro:"Hannibal won his greatest battle, but victory did not give him what he needed.", beats:[
    punicBeat("The political result Hannibal needed",[
      "Cannae devastated Rome's army and political class. Some important southern Italian communities, including Capua, moved towards Hannibal. But the network of Latin colonies and many central Italian allies stayed loyal to Rome.",
      "Hannibal had won the battle that should have broken Rome's alliance system. It did not. He lacked the heavy siege equipment and secure supply lines required for a straightforward assault on Rome, and marching on the city would not automatically have ended the Republic.",
      "Rome refused to negotiate peace. It raised new forces, enrolled men who would not ordinarily have served, and gradually returned to avoiding Hannibal's strongest army while attacking his allies and positions elsewhere."
    ]),
    punicBeat("The war spreads across Italy",[
      "The fighting did not stop while Hannibal waited. Cities changed hands, sieges dragged on, and Roman commanders learned to win smaller advantages rather than risk another Cannae.",
      "Syracuse in Sicily became a major theater of war, and Roman operations in Spain threatened the foundations of Carthaginian power. In 211 BC Rome recovered Capua. That loss mattered because it showed Italian communities that Hannibal could not always protect those who joined him.",
      "The war was becoming a contest of endurance, supply, alliances and simultaneous fronts — precisely the kind of contest Hannibal had tried to prevent."
    ])
  ]},
  { id:"punic-scipio", title:"Scipio Turns the War", era:"211–203 BC", minutes:7, intro:"Rome's answer came not from beating Hannibal in Italy, but from changing the battlefield.", beats:[
    punicBeat("The Spanish campaign",[
      "Rome suffered grave setbacks in Spain in 211 BC, when two commanders from the Scipio family were killed. The younger Publius Cornelius Scipio, later called Africanus, took command and rebuilt Rome's position.",
      "In 209 BC he captured New Carthage, the Carthaginian base with its stores, hostages and access to resources. He followed with further victories and by 206 BC had effectively broken Carthaginian military control of Spain.",
      "That mattered directly to Hannibal. Spain had supplied the money and soldiers that made his invasion possible. Losing it reduced Carthage's ability to sustain the wider war."
    ]),
    punicBeat("The last hope of reinforcement",[
      "Hannibal's brother Hasdrubal crossed the Alps with another army in 207 BC, hoping to join him. Roman forces intercepted Hasdrubal at the Metaurus and defeated him before the brothers could unite.",
      "The Romans could now see a path to victory without destroying Hannibal's veteran army in Italy. Scipio proposed taking the war to North Africa, where Carthage itself would be under threat.",
      "Scipio also cultivated an alliance with the Numidian leader Masinissa, whose cavalry would become decisive. Carthage recalled Hannibal from Italy. After years spent threatening Rome, he had to return to defend his own homeland."
    ])
  ]},
  { id:"punic-zama", title:"Zama and the Peace", era:"202–201 BC", minutes:7, intro:"The war ended in Africa, where the strategic balance had been reversed.", beats:[
    punicBeat("Two armies, one last battle",[
      "By 202 BC Scipio had carried the war into Africa. Hannibal returned with his Italian veterans, but the army he commanded was not the same force that had marched over the Alps. Some of its soldiers had only recently been assembled.",
      "Scipio had learned from Rome's defeats. Crucially, Masinissa's Numidian cavalry gave him the mounted strength Hannibal had used so effectively at Trebia and Cannae."
    ]),
    Object.assign({},PUNIC_BEATS[6],{text:[
      "Hannibal deployed war elephants ahead of his infantry. Scipio arranged lanes through his infantry formations so that elephants could be guided or driven past without breaking the Roman line. The maneuver was not perfectly orderly, but it reduced the attack's effect.",
      "The infantry battle was hard fought. Hannibal's veteran final line resisted, while the cavalry on both sides moved away from the main field. When the Roman and Numidian horsemen returned against the Carthaginian rear, the balance shifted decisively.",
      "Zama was a Roman victory. In 201 BC Carthage accepted a peace that stripped away its overseas empire, severely limited its military independence and imposed a large indemnity. Rome emerged as the dominant western Mediterranean power.",
      "Hannibal had repeatedly defeated Roman armies. Rome won because it could recover, keep its alliances together, and eventually force Carthage to fight on Roman terms. That is the larger lesson of the Second Punic War."
    ]})
  ]}
];
for (const lesson of PUNIC_LESSONS) CHAPTERS.push(Object.assign({set:"wars",kind:"punic-lesson",act:"Second Punic War",sides:PUNIC_SOURCE.sides},lesson));
