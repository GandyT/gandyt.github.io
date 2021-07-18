class Ball {
    constructor(width, height, speed, screenWidth, screenHeight) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        this.width = width;
        this.height = height;
        this.speed = speed;

        this.x = Math.floor(this.screenWidth / 2);
        this.y = Math.floor(Math.random() * (this.screenHeight - this.height * 2)) + this.height;

        this.velocity = [-1, 0];
    }

    render(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    detectPaddleHit(paddle) {
        let overlap = paddle.overlap(this.x, this.y, this.width, this.height)
        if (overlap !== undefined) {
            let flag = -1;
            let flag2 = -1;
            let flag3 = false;
            if (paddle.x < this.screenWidth / 2) flag3 = true;

            if (flag3) {
                this.x = paddle.x + paddle.width + 1;
            } else {
                this.x = paddle.x - this.width - 1;
            }

            if (this.velocity[0] < 0) flag = 1;
            if (this.velocity[1] < 0) flag2 = -1;

            this.velocity[0] = flag * overlap[0];
            this.velocity[1] = flag2 * overlap[1];
        }
    }

    move() {
        this.x += this.velocity[0] * this.speed;
        this.y += this.velocity[1] * this.speed;
    }

    isKillPaddle(paddle) {
        if (paddle.x < this.screenWidth / 2) {
            // left paddle

            if (this.x < paddle.x) return true;

        } else {
            // right paddle
            if (this.x > paddle.x + paddle.width) return true;
        }
    }

    detectWallHit() {
        if (this.y <= 0 || this.y + this.height >= this.screenHeight) {
            this.bound();
            this.velocity[1] = -this.velocity[1];
        }
    }

    bound() {
        this.y = Math.min(this.screenHeight - this.height, Math.max(0, this.y));
    }
}

export default Ball;