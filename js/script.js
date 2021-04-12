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
function drawNet(){
    //set the color of the net
    ctx.fillStyle = net.color;

    // syntax --> fillRect(x,y,width,height)
    ctx.fillRect(net.x, net.y, net.width, net.height);
}
function drawScore(x,y,score){
    ctx.fillStyle = "#FF7F50";
    ctx.font = '30px sans-serif';

    // syntax --> fillText(text,x,y)
    ctx.fillText(score,x,y);
}

function drawPaddle(x,y,width,height,color){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,width,height);
}

function drawBall(x,y,radius,color){
    ctx.fillStyle = color;
    ctx.beginPath();
    // syntax --> arc(x, y, radius, startAngle, endAngle, antiClockwise_or_not)
    ctx.arc(x,y,radius,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

/* drawing functions ends */
function update(){
    // move the paddle

    // check if ball hits top or bottom wall

    // move the ball
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // ai paddle movement

    // collision detection on paddles
    
}

function render(){
    ctx.fillStyle = "#FFEBCD";
    ctx.fillRect(0,0, canvas.width, canvas.height);
drawNet();
//draw user score
drawScore(canvas.width / 4, canvas.height / 6, user.score);

//draw ai score
drawScore(3*canvas.width / 4, canvas.height / 6, ai.score);

//draw user paddle
drawPaddle(user.x, user.y, user.width, user.height, user.color);

//draw ai paddle
drawPaddle(ai.x, ai.y, ai.width, ai.height, ai.color);

//draw ball
drawBall(ball.x, ball.y, ball.radius, ball.color);
}

function gameLoop(){
    update();
    render();
}

// calls gameLoop() function 60 times per second
setInterval(gameLoop, 1000 / 60);
