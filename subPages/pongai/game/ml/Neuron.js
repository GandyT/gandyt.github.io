class Neuron {
    constructor() {
        this.bias = Math.random() * 2 - 1; // gen num from -1 to 1;

        this.incoming = {
            neurons: [],
            weights: []
        }

        this.output;
    }

    connect(neuron) {
        neuron.incoming.neurons.push(this);
        neuron.incoming.weights.push(Math.random() * 2 - 1);
    }

    sigmoid(x) {
        return 1 / (1 + Math.exp(-x))
    }

    activate(input) {
        if (input) {
            // input neuron
            this.output = input;
        } else {
            let sum = this.bias;

            for (let i in this.incoming.neurons) {
                sum += (this.incoming.neurons[i].output * this.incoming.weights[i]);
            }

            this.output = sum;
            this.output = this.sigmoid(this.output); // normalize output
        }
        return this.output;
    }

    mutate(mutationRate) {
        for (let i in this.incoming.weights) {
            let random = Math.random();
            if (random < mutationRate) {
                this.incoming.weights[i] = Math.random() * 2 - 1;
            }
        }

        let biasRandom = Math.random();
        if (biasRandom < mutationRate) {
            this.bias = Math.random() * 2 - 1;
        }
    }
}

export default Neuron;
