
//Screen
let blockSize = 25
let rows = 20;
let colum = 20;
let screen;
let context;

// Snake Head
let snakeX = 250;
let snakeY = 250;

let velocityX = 0;
let velocityY = 0;

//Body
let snakeBody = [];

//Food
let foodX;
let foodY;

//Score
let score = 0;

//Game Over
let gameOver = false;

window.onload = function(){
    screen = document.getElementById('screen');
    screen.height = blockSize * rows;
    screen.width = blockSize * colum;
    context = screen.getContext('2d');

    placeFood()
    document.addEventListener("keyup", changeDirection);

    setInterval(update, 12000/100);
}

function update(){
    if(gameOver){
        return;
    }

    context.fillStyle = 'white';
    context.fillRect(0, 0, screen.width, screen.height); // fillRect(positionX, positionY, width, height)

    context.fillStyle = 'red';
    context.fillRect(foodX, foodY, blockSize, blockSize )

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        placeFood();
        collectPoints();
    }  
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1]
     }
     if(snakeBody.length){
         snakeBody[0] = [snakeX, snakeY]
     } 
    context.fillStyle = 'black';
    snakeX += velocityX;
    snakeY += velocityY;  
    context.fillRect(snakeX, snakeY, blockSize, blockSize )
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 || snakeX > colum*blockSize-1 || snakeY < 0 || snakeY > rows*blockSize-1) {
        alert("HIT!")
        
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            alert('HIT!')
        }
    }
}


    

function placeFood(){
    foodX = Math.floor(Math.random() * colum)*blockSize;
    foodY = Math.floor(Math.random() * rows)*blockSize;
}

function changeDirection(e){
    if(e.code == 'ArrowUp' && velocityY != blockSize){
        velocityX = 0;
        velocityY = - blockSize;
    }
    else if(e.code == 'ArrowDown' && velocityY != -blockSize){
        velocityX = 0;
        velocityY =  blockSize;
    }
    else if(e.code == 'ArrowRight' && velocityX != -blockSize){
        velocityX =  blockSize;
        velocityY = 0;
    }
    else if(e.code == 'ArrowLeft' && velocityX != blockSize){
        velocityX = - blockSize;
        velocityY = 0;
    }
}

function collectPoints(){
    score++
    console.log('Score: ' + score)
}
