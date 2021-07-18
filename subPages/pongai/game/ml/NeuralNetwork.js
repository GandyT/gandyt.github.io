import Neuron from "./Neuron.js";

class NeuralNetwork {
    constructor(numInput, numHidden, numOutput) {
        this.input = [];
        this.hidden = [];
        this.output = [];

        /* MAKING CONNECTIONS */
        for (let i = 0; i < numOutput; ++i) {
            this.output.push(new Neuron());
        }

        for (let i = 0; i < numHidden; ++i) {
            let hidden = new Neuron();

            for (let k = 0; k < numOutput; ++k) {
                hidden.connect(this.output[k]);
            }

            this.hidden.push(hidden);
        }

        for (let i = 0; i < numInput; ++i) {
            let input = new Neuron();

            for (let k = 0; k < numHidden; ++k) {
                input.connect(this.hidden[k])
            }

            this.input.push(input);
        }
    }

    reconnect() {
        // re-establish connections with new neurons (maybe after crossing over)
        for (let i = 0; i < this.output.length; ++i) {
            this.output[i].incoming.neurons = [];
            for (let k = 0; k < this.hidden.length; ++k) {
                this.output[i].incoming.neurons.push(this.hidden[k])
            }
        }
        for (let i = 0; i < this.hidden.length; ++i) {
            this.hidden[i].incoming.neurons = [];
            for (let k = 0; k < this.input.length; ++k) {
                this.hidden[i].incoming.neurons.push(this.input[k])
            }
        }
    }

    activate(ball, paddle) {
        let data = [
            ball.x,
            ball.y,
            paddle.height,
            ball.width,
            paddle.y,
            ball.velocity[0] * ball.speed,
            ball.velocity[1] * ball.speed,
            paddle.speed
        ];

        for (let i = 0; i < this.input.length; ++i) {
            // num of inputs should be same as length of data
            this.input[i].activate(data[i]);
        }

        for (let i = 0; i < this.hidden.length; ++i) {
            this.hidden[i].activate();
        }

        let neuralOut = [];
        for (let i = 0; i < this.output.length; ++i) {
            let value = this.output[i].activate();
            neuralOut.push(value);
        }

        return neuralOut;
    }

    mutate(mutationRate) {
        for (let neuron of this.input) {
            neuron.mutate(mutationRate)
        }
        for (let neuron of this.hidden) {
            neuron.mutate(mutationRate)
        }
        for (let neuron of this.output) {
            neuron.mutate(mutationRate)
        }
    }

    crossover(partner) {
        /* slice at random points */
        let r1 = Math.floor(Math.random() * this.input.length);
        let r2 = Math.floor(Math.random() * this.hidden.length);
        let r3 = Math.floor(Math.random() * this.output.length);

        let child = new NeuralNetwork(this.input.length, this.hidden.length, this.output.length);
        child.input = [...this.input.slice(0, r1), ...partner.input.slice(r1)];
        child.hidden = [...this.hidden.slice(0, r2), ...partner.hidden.slice(r2)];
        child.output = [...this.output.slice(0, r3), ...partner.output.slice(r3)];
        child.reconnect();

        return child;
    }
}

export default NeuralNetwork;