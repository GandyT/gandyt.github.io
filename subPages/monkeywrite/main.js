import Population from "./ga/Population.js";
import runTests from "./ga/tests/test.js";

console.log("Loading MonkeyWrite-1.0.0");
runTests();

var trainTextInput = document.getElementById("trainTextInput");
var populationSizeInput = document.getElementById("populationSizeInput");
var mutationRateInput = document.getElementById('mutationRateInput');
var generateBtn = document.getElementById("generateBtn");
var stopBtn = document.getElementById("stopBtn");
var genStats = document.getElementById("genStats");
var trainResultDiv = document.getElementById("trainResultDiv");

/* CONFIG */
var popSize = 1000;
var mutationRate = 0.01;

var TrainPopulation = undefined;

const train = () => {
    TrainPopulation.naturalSelection();

    TrainPopulation.calcFitness();

    var resultsStr = "";
    TrainPopulation.population.forEach(gene => {
        resultsStr += `<p>${gene.getString()}</p>`;
    })
    trainResultDiv.innerHTML = resultsStr;

    var statsStr = `Gen: ${TrainPopulation.generation}, Best: ${TrainPopulation.bestGene.getString()}, Avg: ${TrainPopulation.averageFitness.toFixed(2)}, Best: ${TrainPopulation.bestGene.fitness.toFixed(2)}`;
    genStats.innerHTML = statsStr;

    TrainPopulation.calcFinished();

    if (TrainPopulation.finished) {
        return;
    }

    console.log(`[TRAIN(${TrainPopulation.generation})] - AvgFit: ${TrainPopulation.averageFitness}`);

    setTimeout(() => train(), 1)
};

generateBtn.addEventListener("click", (event) => {
    if (!trainTextInput.value.length) {
        console.log("Invalid Input");
        return;
    }

    if (populationSizeInput.value) popSize = Number(populationSizeInput.value);
    if (!popSize) {
        return console.log("Invalid Population Size");
    }

    if (mutationRateInput.value) mutationRate = Number(mutationRateInput.value);
    if (!mutationRate) {
        return console.log("Invalid Mutation Rate");
    }

    if (TrainPopulation) {
        if (trainTextInput.value != TrainPopulation.target || popSize != TrainPopulation.population.length || mutationRate != TrainPopulation.mutationRate) {
            console.log("Beginning Training")
            TrainPopulation = new Population(popSize, trainTextInput.value, mutationRate);
        } else {
            TrainPopulation.finished = false;
            console.log("RESUMING TRAINING");
        }
    } else {
        console.log("Beginning Training")
        TrainPopulation = new Population(popSize, trainTextInput.value, mutationRate);
    }

    train();
})

stopBtn.addEventListener('click', (event) => {
    TrainPopulation.finished = true;
})