const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

const netWidth = 4;
const netHeight = canvas.height;

const paddleWidth = 10;
const paddleHeight = 100;

let upArrowPressed = false;
let downArrowPressed = false;

/* objects*/
//net
const net = {
    x: canvas.width / 2 - netWidth / 2,
    y: 0,
    width: netWidth,
    height: netHeight,
    color: "#FF7F50"
};

const user = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "#FF7F50",
    score: 0
};

const ai = {
    x: canvas.width - (paddleWidth +10),
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "#FF7F50",
    score: 0
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 7,
    speed: 7,
    velocityX: 5,
    velocityY: 5,
    color: "#FF7F50",
};
/* object declaration ends */

/* drawing functions */


/* drawing functions ends */






























function render(){
    ctx.fillStyle = "#FFEBCD";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

render();