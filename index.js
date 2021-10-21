// type npm run server
// in the command line to run this web page on a local server
// (remember to install dependencies)

var projectData = {
	"GandyClient": {
		thumbnail: "resource/background.png",
		description: "Minecraft 1.8.9 PvP Client (6/27/21)",
		url: "subPages/gandyclient/gandyclient.html"
	},
	"Learner": {
		thumbnail: "resource/discord.png",
		description: "Chat AI Discord Bot (6/2020)",
		url: "https://github.com/GandyT/Learner"
	},
	"FeatherCord.js": {
		thumbnail: "resource/discord.png",
		description: "Lightweight Discord Javascript Library (6/2020)",
		url: "https://github.com/GandyT/FeatherCord.js"
	},
	"MonkeyWrite": {
		thumbnail: "resource/background.png",
		description: "Genetic Algorithm to teach monkeys how to write",
		url: "subPages/monkeywrite/monkeywrite.html"
	},
	"SnakeAI": {
		thumbnail: "resource/background.png",
		description: "Genetic Algorithm to teach neural networks how to play snake.",
		url: "subPages/snakeai/snakeai.html"
	},
	"PongAI": {
		thumbnail: "resource/background.png",
		description: "Neural network perfected by genetic algorithm to play pong.",
		url: "subPages/pongai/pongai.html"
	}
}

window.onload = () => {
	console.log(`####################################\nWELCOME TO GANDY.IO\n####################################`);
	var projects = document.getElementById("projectsCont");

	if (!projects) return console.log("Missing Projects Cont");

	for (let key of Object.keys(projectData)) {
		projects.innerHTML += `<a href="${projectData[key].url}" class="projectTile">
            <div class="projectDesc">${projectData[key].description}</div>
            <img src="${projectData[key].thumbnail}" class="projectThumb">
            <div class="projectTitle">${key}</div>
        </a>`;
	}
}