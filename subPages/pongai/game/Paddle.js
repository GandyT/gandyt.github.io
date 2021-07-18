import NeuralNetwork from "./ml/NeuralNetwork.js";

class Paddle {
    constructor(constantX, width, height, speed, screenWidth, screenHeight) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.height = height;
        this.width = width;

        this.x = constantX;
        this.y = Math.floor((screenHeight - this.height) / 2);
        this.speed = speed;
        this.dead = false;

        /* GENETIC ALGORITHM */
        this.score = 0;
        this.fitness = 0;

        /* NEURAL NET */
        this.neural = new NeuralNetwork(8, 4, 2);
    }

    render(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    decide(ball) {
        let output = this.neural.activate(ball, this);
        let left = this.x < (this.screenWidth / 2); // let neural net work for both sides of the game

        if (output[0] > output[1]) {
            if (left) {
                this.up();
            } else {
                this.down();
            }
        } else {
            if (left) {
                this.down();
            } else {
                this.up();
            }
        }
    }

    /* MOVEMENT */
    up() {
        if (this.y <= 0) {
            this.y = 0;
        } else {
            this.y -= this.speed;
        }
    }
    down() {
        if (this.y >= this.screenHeight - this.height) {
            this.y = this.screenHeight - this.height;
        } else {
            this.y += this.speed;
        }
    }

    overlap(x, y, w, h) {
        let flag = false;
        if (this.x < this.screenWidth / 2) flag = true;
        if (
            (
                (this.y <= y && this.y + this.height >= y) ||
                (this.y <= y + h && this.y + this.height >= y + h)
            ) && (
                (flag && this.x + this.width > x) ||
                (!flag && this.x < x + w)
            )
        ) {
            // it has hit, calculate directions
            this.score++;
            let dfc = Math.abs((this.y + this.height) / 2 - (y + h) / 2) || 0.05
            return [2 - (dfc / (this.height / 2)), (dfc / (this.height / 2))];
        }

        return undefined;
    }

    revive() {
        this.dead = false;
        this.y = Math.floor((screenHeight - this.height) / 2);
        this.score = 0;
    }

    calcFitness() {
        this.fitness = this.score ** 2;
    }

    copy() {
        let child = new Paddle(this.x, this.width, this.height, this.speed, this.screenWidth, this.screenHeight);
        child.neural = this.neural;
        return child;
    }
}

export default Paddle;