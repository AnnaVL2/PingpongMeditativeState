const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

// some sounds
const hitSound = new Audio('../sounds/hitSound.wav');
const scoreSound = new Audio('../sounds/scoreSound.wav');
const wallHitSound = new Audio('../sounds/wallHitSound.wav');

const netWidth = 10;
const netHeight = canvas.height;

const paddleWidth = 11;
const paddleHeight = 130;

let upArrowPressed = false;
let downArrowPressed = false;

/* objects*/
//net
const net = {
    x: canvas.width / 2 - netWidth / 2,
    y: 0,
    width: netWidth,
    height: netHeight,
    color: "white"
};


const user = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "#f150e4",
    score: 0
};

// for "rectangles" the axis starts from its top left corner
const ai = {
    x: canvas.width - (paddleWidth +10),
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "#68f10c",
    score: 0
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 26,
    speed: 5,
    velocityX: 20,
    velocityY: 20,
    color: "#09a89b",
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
    ctx.fillStyle = "white";
    ctx.font = '10rem Montserrat';

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


/* moving paddles*/
window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);

// gets activated when we press we press down a key
function keyDownHandler(event){
    switch (event.keyCode){
        case 38:
            // set upArrowPressed = true
            upArrowPressed = true;
            break;
            // "down arrow" key
        case 40:
            downArrowPressed = true;
            break;
    }
}

// gets activated when we release the key
function keyUpHandler(event){
    switch (event.keyCode){
        // "up arrow" key
        case 38:
            // set upArrowPressed = false
            upArrowPressed = false;
            break;
        // "down arrow" key
        case 40:
            downArrowPressed = false;
            break;
    }
}
/* moving paddles section end */

function reset(){
    // reset ball's value to older values
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 7;

    // change the direction of the ball
    ball.velocityY = -ball.velocityY;
    ball.velocityX = -ball.velocityX;
}

// collision Detect function
function collisionDetect(player, ball){
    // returns true or false
    player.top = player.y;
    player.right = player.x + player.width;
    player.bottom = player.y + player.height;
    player.left = player.x;

    ball.top = ball.y - ball.radius;
    ball.right = ball.x + ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;

    return ball.left < player.right && ball.top < player.bottom && ball.right > player.left && ball.bottom > player.top;
}

function update(){
    // move the paddle
    if (upArrowPressed && user.y > 0) {
        user.y -= 15;
    } else if (downArrowPressed && (user.y < canvas.height - user.height)){
        user.y += 15;
    }

    // check if ball hits top or bottom wall
    if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0){
        // play wallHitsound

        ball.velocityY = -ball.velocityY;
    }

    if (ball.x + ball.radius >= canvas.width){
        // play scoreSound

        // then user scored 1 point
        user.score += 1;
        reset();
    }



    if (ball.x - ball.radius <= 0){
        // play scoreSound

        // then ai scored 1 point
        ai.score += 1;
        reset();
    }

    // move the ball
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // ai paddle movement
    // insertinc spontaneous moment in to the ai paddle movment
    ai.y += ((ball.y - (ai.y + ai.height / 2))) * 0.45;

    // collision detection on paddles
    let player = (ball.x < canvas.width / 2) ? user : ai;

    if (collisionDetect(player, ball)) {
      // play hitSound
  
      // default angle is 0deg in Radian
      let angle = 0;
  
      if (ball.y < (player.y + player.height / 2)) {
        // if ball hit the top of paddle
        // then -1 * Math.PI / 4 = -45deg aka UP
        angle = Math.PI / 4;
      } else if (ball.y > (player.y + player.height / 2)) {
        // if it hit the bottom of paddle
        // then angle will be Math.PI / 4 = 45deg aka DOWN
        angle = -1 * Math.PI / 4;
      }
  
      /* change velocity of ball according to on which paddle the ball hitted */
      ball.velocityX = (player === user ? 1 : -1) * ball.speed * Math.cos(angle);
      ball.velocityY = ball.speed * Math.sin(angle);
  
    function printColor(colors){

        let random_color = colors[Math.floor(Math.random() * colors.length)];
    
        for(let i = 0; i < colors.length; i++){
            if (user.score < 10){
                ball.color = colors[i];
                console.log(random_color);
            }
        }
        return random_color;
    }
    
    let changeColor = ["Aqua", "Chartreuse", "Chocolate", "DarkOrange", 
    "DarkRed",  "DeepPink", "Fuchsia", "Gold", "GreenYellow", "HotPink",
    "LemonChiffon", "LightSeaGreen", "Violet", "MediumVioletRed", 
    "NavajoWhite", "MistyRose", "Orchid", "Plum", "SandyBrown", "Thistle", 
    "Tomato", "Turquoise", "Wheat", "Yellow", "White"];

    ball.color = printColor(changeColor);

    // increase ball speed
    ball.speed += 0.5;
    // ball.radius += 0.5;
    }
}

function render(){
    ctx.fillStyle = "#065e56";
    ctx.fillRect(0,0, canvas.width, canvas.height);
drawNet();
//draw user score
drawScore(canvas.width / 5, canvas.height / 1.7, user.score);

//draw ai score
drawScore(3.5*canvas.width / 5, canvas.height / 1.7, ai.score);

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
setInterval(gameLoop, 1200 / 60);

// random change color - ball.color [random function]
// if(score> 10){ multiply balls }
