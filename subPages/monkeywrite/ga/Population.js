import DNA from "./DNA.js";

class Population {
    constructor(popSize, target, mutationRate) {
        this.population = [];
        this.target = target;
        this.mutationRate = mutationRate;
        this.generation = 0;
        this.finished = false;

        for (let i = 0; i < popSize; ++i) {
            this.population.push(new DNA(target))
        }

        this.calcFitness();
    }

    naturalSelection() {
        var selectionArray = [];

        for (let gene of this.population) {
            // squared fitness
            for (let i = 0; i < Math.floor((gene.fitness ** 2) * 100); ++i) {
                selectionArray.push(gene);
            }
        }

        for (let k = 0; k < this.population.length; ++k) {
            let randomMom = selectionArray[Math.floor(Math.random() * selectionArray.length)];
            let randomDad = selectionArray[Math.floor(Math.random() * selectionArray.length)];

            /* CHILD */

            this.population[k] = randomMom.crossOver(randomDad);

            this.population[k].mutate(this.mutationRate);
        }

        this.generation++;
    }

    calcFinished() {
        for (let gene of this.population) {
            if (gene.getString() == this.target) {
                this.finished = true;
                break;
            }
        }
    }

    calcFitness() {
        for (let gene of this.population) {
            gene.calcFitness(this.target);
        }
    }

    get bestGene() {
        var best = undefined;

        for (let gene of this.population) {
            if (!best) {
                best = gene;
                continue;
            }

            if (best.fitness < gene.fitness) {
                best = gene;
            }
        }

        return best;
    }

    get averageFitness() {
        var fitness = 0;

        this.population.forEach(gene => {
            fitness += gene.fitness / this.population.length
        })

        return fitness;
    }
}

export default Population;