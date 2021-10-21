console.log("Running Odyssey Game.");

var gameDiv = document.getElementById("gameContainer");
let homeScreen = `<div id="homeScreen"><button class="homeButton" onclick="resetGame()">Begin Adventure</button></div>`
gameDiv.innerHTML = homeScreen;

let choices = [
	"Leave the island", "Explore the Cyclop's cave",
	"Take the Cyclop's cheese and run", "Wait for the cyclop to return to see what gifts he will give you.",
	"Greet the cyclops", "Run deeper into the cave.",
	"We're thiefs and ate all your cheese!", "We are Men of Achaea and bound now from Troy!",
	"Valiantly charge the cyclops with your sword", "Do nothing.",
	"Do Nothing", "Ask the cyclops if it wants to drink some fine wine.",
	"Quietly escape", "Stab it in the eye.",
	"No", "Yes"
];
let savedChoices = [];
let counter = 0;

let story = [
	{ type: "cutscene", body: "You (Odysseus), \"the great teller of tales, launched out on your story.\"" },
	{ type: "cutscene", body: "You: \"From there we sailed on, our spirits now at a low ebb, and reached the land of the high and mighty Cyclops\"" },
	{ type: "choice", set: 0, prompt: "What do you want to do?" },
	{ type: "specific", requirements: [0], body: "You left the island and survived with your crew.", end: true },
	{ type: "specific", requirements: [1], body: "You enter the cave and find the cyclop is not at home. The cyclop is in his pasture ranging his sleek flocks." },
	{ type: "choice", set: 1, prompt: "Your crew wants to leave. What is your plan?" },
	{ type: "specific", requirements: [2], body: "You leave the cave with the cheese and go on your way.", end: true },
	{ type: "specific", requirements: [3], body: "You urge your crew to stay." },
	{ type: "cutscene", body: "You eat some cheese and offer some food to the Gods, awaiting the Cyclops to return." },
	{ type: "cutscene", body: "The cyclops then comes back, throwing logs down the cave, startling everyone!" },
	{ type: "choice", set: 2, prompt: "What do you do?" },
	{ type: "specific", requirements: [4], body: "The cyclops is angry and murders you and your crew.", end: true },
	{ type: "cutscene", body: "you \"scuttled in panic into the deepest dark recess\"" },
	{ type: "cutscene", body: "BOOOOOOM!" },
	{ type: "cutscene", body: "\"such an immense stone the monster wedged to block the cave!\"" },
	{ type: "cutscene", body: "You and your crew attempt to make an escape but..." },
	{ type: "cutscene", body: "The cyclops lights a fire, illuminating the entire cave! The cyclops notices you and your crew." },
	{ type: "choice", set: 3, prompt: "Cyclops: \"Strangers! now who are you?\"" },
	{ type: "specific", requirements: [6], body: "Cyclops: Yeah, I'm killing you all.", end: true },
	{ type: "cutscene", body: "Cyclops: Strangers. You must be fools." },
	{ type: "choice", set: 4, prompt: "You and your crew are now scared." },
	{ type: "specific", requirements: [8], body: "The cyclops raises its fist and smashes your skull.", end: true },
	{ type: "cutscene", body: "You: \"I and the men you see escaped certain death\"" },
	{ type: "cutscene", body: "As soon as you say that, the cyclop snatches two of your men." },
	{ type: "cutscene", body: "Crew: AAAAAAA!" },
	{ type: "cutscene", body: "The cyclops devours them, \"Ripping them limb from limb to fix his meal.\"" },
	{ type: "cutscene", body: "The cyclops then leaves the cave..." },
	{ type: "cutscene", body: "You and your men groan, waiting for its return." },
	{ type: "cutscene", body: "A few hours later..." },
	{ type: "cutscene", body: "\"Nightfall brought him back, herding his wooly sheep\"" },
	{ type: "choice", set: 5, prompt: "What do you do?" },
	{ type: "specific", requirements: [10], body: "The cyclops grabs another two of your men and devours them." },
	{ type: "specific", requirements: [10], body: "Cyclops: Give me some fine wine to accompany these men." },
	{ type: "specific", requirements: [10], body: "You offer the cyclops a bowl of wine." },
	{ type: "cutscene", body: "The cyclops seized the bowl of wine." },
	{ type: "cutscene", body: "Shortly after drinking, the cyclops \"toppled over, sprawled full-length, flat on his back.\"" },
	{ type: "choice", set: 6, prompt: "The cyclops is now vulnerable. what do you do?" },
	{ type: "specific", requirements: [12], body: "You and your crew attempt to run. The cyclop snatches 3 men and rips their heads off. The remaining men run even faster." },
	{ type: "specific", requirements: [12], body: "You and the crew try to escape but it seems like there is a stone blocking the way." },
	{ type: "specific", requirements: [12], body: "The cyclops catches the crew and you all die.", end: true },
	{ type: "specific", requirements: [13], body: "You: So, cyclops, you ask me what my name is? My name is Nobody." },
	{ type: "specific", requirements: [13], body: "You hoist your olive stake high, and ram it into the monster's eye, driving your weight into it." },
	{ type: "specific", requirements: [13], body: "Cyclops: ARRGGHHH!" },
	{ type: "specific", requirements: [13], body: "You and your crew quickly scurry." },
	{ type: "specific", requirements: [13], body: "The cyclops calls its friends for help." },
	{ type: "specific", requirements: [13], body: "Cyclops: HELP! NOBODY IS KILLING ME!" },
	{ type: "specific", requirements: [13], body: "Cyclop-Friends: If nobody is killing you it must be a plague sent by Zeus!" },
	{ type: "cutscene", body: "You and the men quickly latch onto the rams with their thick fleece, hiding within them." },
	{ type: "cutscene", body: "You wait for dawn." },
	{ type: "cutscene", body: "The cyclops takes the ram outside and the moment you exit the cave" },
	{ type: "cutscene", body: "You and the men quickly run and bring the rams with you. You make it onto the ship." },
	{ type: "cutscene", body: "Your ship then departs away from the Cyclop's island." },
	{ type: "choice", set: 7, prompt: "Do you taunt the cyclops?" },
	{ type: "specific", requirements: [14], body: "You and your crew safely make it away.", end: true },
	{ type: "cutscene", body: "You: \"So, Cyclops, no weak coward it was whose crew you bent to devour there in your vaulted cave.\"" },
	{ type: "cutscene", body: "You: \"Your filthy crimes came down on your own head, you shameless cannibal\"" },
	{ type: "cutscene", body: "The cyclops rages, and throws a rock that lands right next to your ship, bringing it closer to shore." },
	{ type: "cutscene", body: "Your crew begs you to stop taunting, but you continue to taunt." },
	{ type: "cutscene", body: "The cyclops then prays to Poseidon to place a curse upon you and your crew." },
	{ type: "cutscene", body: "The cyclops then chucks one last rock, much bigger and heavier, and you get splashed away to an island, lucky to escape death", end: true }
]

const generateScene = () => {
	let inner = "";

	let sceneData = story[counter];

	if (!sceneData) {
		gameDiv.innerHTML = homeScreen;
	}

	if (sceneData.body) {
		inner = `<div id="bodyScreen">
			${sceneData.body}
			${sceneData.end ? `<button class="homeButton" onclick="resetGame()">End</button>` : `<button class="homeButton" onclick="nextScene()">Next</button>`}
		</div>`
		gameDiv.innerHTML = inner;
	} else {
		// choice
		let set = sceneData.set;
		let choice1 = choices[sceneData.set * 2];
		let choice2 = choices[sceneData.set * 2 + 1]

		inner = `<div id="choiceScreen">
			<div id="prompt">${sceneData.prompt}</div>
			<button class="homeButton" onclick="selectChoice(${set}, 1)">${choice1}</button>
			<button class="homeButton" onclick="selectChoice(${set}, 2)">${choice2}</button>
		</div>`;
		console.log(inner);
		gameDiv.innerHTML = inner;
	}


}

const resetGame = () => {
	savedChoices = [];
	counter = 0;
	generateScene();
}

const meetsRequirements = () => {
	if (story[counter].requirements) {
		if (savedChoices.find(e => e == story[counter].requirements[0])) {
			return true;
		}

		return false;
	}

	return true;
}

const nextScene = () => {
	counter++;

	while (!meetsRequirements()) {
		counter++;
	}

	generateScene();
}

const selectChoice = (set, option) => {
	if (option == 1) {
		savedChoices.push(set * 2);
	} else {
		savedChoices.push(set * 2 + 1);
	}

	nextScene();
}