import Paddle from "../Paddle.js";
import Ball from "../Ball.js";

const randomHex = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
};

class Population {
    constructor(size, config) {
        this.sample = [];
        this.balls = [];
        this.config = config;
        this.mutationRate = config.mutationRate;
        this.best = false;
        this.generation = 0;

        for (let i = 0; i < size; ++i) {
            let color = randomHex()
            this.sample.push(new Paddle(config.PaddlePos1, config.PaddleWidth, config.PaddleHeight, config.PaddleSpeed, config.width, config.height));
            this.balls.push(new Ball(config.BallWidth, config.BallWidth, config.BallSpeed, config.width, config.height));
            this.sample[this.sample.length - 1].color = color;
            this.balls[this.balls.length - 1].color = color;
        }
    }

    naturalSelection() {
        let total = 0;
        for (let paddle of this.sample) {
            total += paddle.fitness;
        }

        let newGen = [this.bestPaddle().copy()]
        newGen[0].best = true;
        newGen[0].color = "#fff";

        let bestBall = new Ball(this.config.BallWidth, this.config.BallWidth, this.config.BallSpeed, this.config.width, this.config.height);;
        bestBall.color = "#fff";
        this.balls = [bestBall];

        const selectRandom = () => {
            let random = Math.random * total;

            let running = 0;

            for (let paddle of this.sample) {
                running += paddle.fitness;

                if (random < running) {
                    return paddle;
                }
            }

            return this.sample[0];
        }



        for (let i = 1; i < this.sample.length; ++i) {
            let mama = selectRandom();
            let papa = selectRandom();
            let child = new Paddle(this.config.PaddlePos1, this.config.PaddleWidth, this.config.PaddleHeight, this.config.PaddleSpeed, this.config.width, this.config.height) // mama and papa did the thing ;)
            child.neural = mama.neural.crossover(papa.neural);
            child.neural.mutate(this.mutationRate);

            let color = randomHex()
            child.color = color;
            let childBall = new Ball(this.config.BallWidth, this.config.BallWidth, this.config.BallSpeed, this.config.width, this.config.height);
            childBall.color = color;

            this.balls.push(childBall);
            newGen.push(child);
        }

        this.sample = newGen;
        this.generation++;
    }

    calcFitness() {
        for (let paddle of this.sample) {
            paddle.calcFitness();
        }
    }

    bestPaddle() {
        let bestPaddle = this.sample[0];

        for (let i = 1; i < this.sample.length; ++i) {
            if (this.sample[i].fitness > bestPaddle.fitness) {
                bestPaddle = this.sample[i];
            }
        }

        return bestPaddle;
    }

    isDone() {
        let flag = true;

        for (let paddle of this.sample) {
            if (!paddle.dead) {
                flag = false;
                break;
            }
        }

        return flag;
    }

    genStats() {
        return `GEN: ${this.generation}, BEST: ${this.bestPaddle().fitness}`
    }
}

export default Population;