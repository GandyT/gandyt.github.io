function newChar() {
    let c = Math.floor(Math.random() * (122 - 63)) + 63;
    if (c === 63) c = 32;
    if (c === 64) c = 46;

    return String.fromCharCode(c);
}


class DNA {
    constructor(target) {
        this.genes = [];
        this.target = target;
        this.fitness = 0.01;

        for (let i = 0; i < target.length; ++i) {
            this.genes.push(newChar())
        }
    }

    calcFitness() {
        let phrase = this.target;
        let score = 0;

        this.genes.forEach((char, i) => {
            if (char == phrase[i]) {
                score++;
            }
        })

        this.fitness = (score / phrase.length) || 0.01;
    }

    crossOver(MateDNA) {
        var childGenes = [];

        var midpoint = Math.floor(MateDNA.length / 2)
        childGenes = [...this.genes.slice(0, midpoint), ...MateDNA.genes.slice(midpoint)]

        var childRef = new DNA(this.target);
        childRef.genes = childGenes;

        return childRef;
    }

    getString() {
        return this.genes.join("");
    }

    mutate(mutationRate) {
        for (let charIndex = 0; charIndex < this.genes.length; ++charIndex) {
            let random = Math.random();

            if (random < mutationRate) {
                // mutation

                this.genes[charIndex] = newChar();
            }
        }
    }
}

export default DNA;