console.log("LOADING GAME...");

const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

const frameRate = 30;
var deltaTime = 1;
var gravity = true;
var gravitySpeed = 5;
var jump = false;
var jumpProgress = 0;
var jumpMax = 100;
var jumpSpeed = 10;
var xVelocity = 0;


var handler = {
    player: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        speed: 1,
        color: "#FF0000"
    },
    powerup: {
        x: 500,
        y: 0,
        width: 100,
        height: 100,
        color: "#000"
    }
}

const clearRect = () => {
    var previousStyle = ctx.fillStyle;

    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = previousStyle;
}

const gameLoop = () => {
    ctx.beginPath();

    clearRect();

    handler.player.x += xVelocity;

    handler.player.x = Math.max(handler.player.x, 0);
    handler.player.x = Math.min(handler.player.x, width - handler.player.width);

    if (jump) {
        handler.player.y -= jumpSpeed;
        jumpProgress += jumpSpeed;

        if (jumpProgress >= jumpMax) {
            jump = false;
            jumpProgress = 0;
        }
    }

    var playerCollisions = detectCollision(handler.player, "player");

    for (name of playerCollisions) {
        if (name.indexOf("powerup") != -1) {
            console.log("COLLIDED");
            jumpMax *= 5;
            jumpSpeed *= 5;
            delete handler[name];
        }
    }

    for (key of Object.keys(handler)) {
        if (gravity) {
            if (handler[key].y < height - handler[key].height) {
                calculateGravity(key);
            }
        }
        ctx.fillStyle = handler[key].color;
        ctx.fillRect(handler[key].x, handler[key].y, handler[key].width, handler[key].height);
    }

    ctx.stroke();

    deltaTime += 1000 / frameRate;
    setTimeout(() => gameLoop(), 1000 / frameRate);
}

const calculateGravity = (key) => {
    handler[key].y += gravitySpeed;
}

const doJump = () => {
    if (isGrounded(handler.player)) {
        jump = true;
    }
}

const moveLeft = () => {

    if (isGrounded(handler.player)) {
        xVelocity = -10;
    } else {
        xVelocity = -5;
    }

}

const detectCollision = (reference, referencename) => {
    var collisions = [];

    for (key of Object.keys(handler)) {
        if (key == referencename) continue;
        var collision = handler[key];
        var xMin = collision.x;
        var yMin = collision.y;
        var xMax = collision.x + collision.width;
        var yMax = collision.y + collision.height;
        if (
            (withinBounds(reference.x, xMin, xMax) &&
                withinBounds(reference.y, yMin, yMax)) ||
            (withinBounds(reference.y + reference.height, yMin, yMax) &&
                withinBounds(reference.x + reference.width, xMin, xMax))
        ) {
            // detect bounds
            collisions.push(key);
        }
    }

    return collisions;
}

const withinBounds = (point, min, max) => {
    console.log(point >= min && point <= max);
    return point >= min && point <= max;
}

const moveRight = () => {
    if (isGrounded(handler.player)) {
        xVelocity = 10;
    } else {
        xVelocity = 5;
    }
}

const isGrounded = (object) => {
    if (object.y < height - object.height - 1) return false;
    return true;
}

window.addEventListener("keydown", keyEvent => {
    if (keyEvent.keyCode == 32) {
        doJump();
    }
    if (keyEvent.keyCode == 65) {
        // LEFT
        moveLeft();
    }
    if (keyEvent.keyCode == 68) {
        // RIGHT
        moveRight();
    }
});

window.addEventListener("keyup", keyEvent => {
    if (keyEvent.keyCode == 65) {
        xVelocity = 0;
    }
    if (keyEvent.keyCode == 68) {
        // RIGHT
        xVelocity = 0;
    }
});

gameLoop();