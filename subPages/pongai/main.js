import Population from "./game/gen/Population.js";
import Paddle from "./game/Paddle.js";

var canvas = document.getElementById("gs");
var ctx = canvas.getContext("2d");
var viewBest = document.getElementById("viewBest");
var genStats = document.getElementById("genStats");

var width = canvas.width;
var height = canvas.height;

/* CONFIG */
const Frames = 60;

const PaddleWidth = 10;
const PaddleSpeed = 5;
const PaddlePos2 = width - (PaddleWidth * 2);

var config = {
    BallSpeed: 8,
    BallWidth: 10,
    Frames: 200,

    PaddleHeight: Math.floor(height / 8),
    PaddleWidth: 10,
    PaddleSpeed: 8,
    PaddlePos1: PaddleWidth,
    PaddlePos2: width - (PaddleWidth * 2),

    mutationRate: 0.04,
    width: width,
    height: height
}

// gotta make it more reasonable for people with bad pcs lol
let Sample = new Population(1000, config);
let trainWall = new Paddle(PaddlePos2, PaddleWidth, height, PaddleSpeed, width, height);
trainWall.color = "#fff";
let viewingBest = false;


/* DEBUG */
let paddleUp = false;
let paddleDown = false;
let debug = false;

const loop = () => {
    /* CLEAR SCREEN */
    ctx.beginPath()
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);
    trainWall.render(ctx);

    for (let i in Sample.sample) {
        let player = Sample.sample[i];
        let ball = Sample.balls[i];

        if (player.dead) continue;

        /* DEBUG */
        if (debug) {
            if (paddleUp) player.up();
            if (paddleDown) player.down();
        } else {
            player.decide(ball);
        }

        if (viewingBest) {
            if (player.best) player.render(ctx);
        } else {
            player.render(ctx);
        }


        ball.move();
        ball.detectPaddleHit(player);
        ball.detectPaddleHit(trainWall);
        ball.detectWallHit();

        ball.render(ctx);

        if (ball.isKillPaddle(player)) {
            player.dead = true;
        }
    }

    if (Sample.isDone()) {
        Sample.calcFitness();
        genStats.innerHTML = Sample.genStats();
        Sample.naturalSelection();
    }

    setTimeout(() => loop(), 1000 / Frames);
}

viewBest.addEventListener("click", event => {
    viewingBest = !viewingBest;

    if (viewingBest) {
        viewBest.innerHTML = "View All";
    } else {
        viewBest.innerHTML = "View Best";
    }
})

if (debug) {

    /* DEBUG */
    window.addEventListener("keydown", (event) => {
        if (event.keyCode == 38) {
            // up
            paddleUp = true;
        } else if (event.keyCode == 40) {
            // down
            paddleDown = true;
        }
    });
    window.addEventListener("keyup", (event) => {
        if (event.keyCode == 38) {
            // up
            paddleUp = false;
        } else if (event.keyCode == 40) {
            // down
            paddleDown = false;
        }
    })

}

loop();