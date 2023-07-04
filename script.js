// ADD time? (Still todo?)

var longsnake = [[6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10], [14, 10], [15, 10], [16, 10], [17, 10], [18, 10], [19, 10], [20, 10], [21, 10], [22, 10], [23, 10], [24, 10], [25, 10], [26, 10], [27, 10], [28, 10], [29, 10], [30, 10], [31, 10], [32, 10], [33, 10], [34, 10], [35, 10], [36, 10], [37, 10], [38, 10], [39, 10], [40, 10], [41, 10], [42, 10], [43, 10], [44, 10], [45, 10], [46, 10], [47, 10], [48, 10], [49, 10], [50, 10], [51, 10], [52, 10], [53, 10], [54, 10], [55, 10], [56, 10], [57, 10], [58, 10], [59, 10], [60, 10], [61, 10], [62, 10], [63, 10], [64, 10], [65, 10], [66, 10], [67, 10], [68, 10], [69, 10], [70, 10], [71, 10], [72, 10], [73, 10], [74, 10], [75, 10], [76, 10], [77, 10], [78, 10], [79, 10], [80, 10], [81, 10], [82, 10], [83, 10], [84, 10], [85, 10], [86, 10], [87, 10], [88, 10], [89, 10], [90, 10], [91, 10], [92, 10], [93, 10], [94, 10], [95, 10], [96, 10], [97, 10], [98, 10], [99, 10]];

var snakeTable = document.querySelector(".snakeTable");
var modul = document.querySelector(".modul");
var start = document.querySelector(".start");
var boxes = document.getElementsByClassName("box");
start.addEventListener("keydown", startSnake);

var height = Math.round((window.innerHeight / window.innerWidth) * 100);
var height = Math.floor((height / 10) * 10);
var img = '';

var imageCount = 11;
var totalScore = 10;
var currentRound = 1;
var snakelength = currentRound * 10 + 1;
var currentSnakeLength = longsnake.slice(0, snakelength);
var hasObstacle = false;
var amountObstacles = 0;



var table = {
  rowsCols: 100,
  boxes: 100 * height
};

var snake = {
  init: function () {
    snake.direction = "right";
    snake.length = longsnake.slice(0, snakelength);
    snake.interval = 80;
    snake.food = 0;
    snake.score = snakelength - 1;
    snake.time = 0;
    snake.canTurn = 0;
    snakeTable.innerHTML = "";
    tableCreation();
  }
};

// helper functions
function getRandom(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function isPositionInArray(position, array) {
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (item.length === position.length && item.every((value, index) => value === position[index])) {
      return true;
    }
  }
  return false;
}

// table creation
function tableCreation() {
  if (snakeTable.innerHTML === "") {
    // main table
    for (var i = 0; i < table.boxes; i++) {
      var divElt = document.createElement("div");
      divElt.classList.add("box");
      snakeTable.appendChild(divElt);
    }
   
    // status bar
    statusElt = document.createElement("div");
    statusElt.classList.add("status");
    snakeTable.appendChild(statusElt);
    // score
    scoreElt = document.createElement("span");
    roundElt = document.createElement("span");
    scoreElt.classList.add("score");
    roundElt.classList.add("score");
    scoreElt.innerHTML = snake.score + " MB";
    roundElt.innerHTML = currentRound + " Round";
    statusElt.appendChild(scoreElt);
    statusElt.appendChild(roundElt);
    // obstacle
    obstaclesElt = document.createElement("div");
    obstaclesElt.classList.add("obstacles");
    snakeTable.appendChild(obstaclesElt);

    obstacleImg = document.createElement("img");
    obstacleImg.classList.add("obstacle");
    obstacleImg.setAttribute("id", "obstacleImg");
    obstaclesElt.appendChild(obstacleImg);
  }
}

function makeRow(ranLeft, ranTop) {
  // make rows for the length of the width
  for (var countLeft = 0; countLeft < (obsWidth); countLeft++) {
    ranLeft++;
    var obsPos = [ranLeft, ranTop]
    obstacleArray.push(obsPos)
  }
}

function makeColumn(ranLeft, ranTop) {
  // make a row for length of the height
  for (var countTop = 0; countTop < (obsHeight); countTop++) {
    ranTop++;
    makeRow(ranLeft, ranTop)
  }
}

// get random img from list and make an array containing its coordinates
function makeImage() {
  var obstacles = [
    ['./asset/obstacles1.svg', '25', '20'],
    ['./asset/obstacles2.svg', '25', '20'],
    ['./asset/obstacles3.svg', '25', '20'],
    ['./asset/obstacles4.svg', '25', '20'],
    ['./asset/obstacles5.svg', '25', '20'],
    ['./asset/obstacles6.svg', '25', '20'],
    ['./asset/obstacles7.svg', '25', '20'],
    ['./asset/obstacles8.svg', '25', '20'],
    ['./asset/obstacles9.svg', '16', '25'],
    ['./asset/obstacles10.svg', '16', '25'],
    ['./asset/obstacles11.svg', '16', '25'],]
  ranImg = getRandom(0, 10)
  img = document.getElementById("obstacleImg");
  img.src = obstacles[ranImg][0]
  obsHeight = obstacles[ranImg][1]
  obsWidth = obstacles[ranImg][2]

  ranLeft = getRandom(0, (table.rowsCols - obsWidth))
  ranTop = getRandom(0, (height - obsHeight))

  obstacleArray = [];
  makeColumn((ranLeft - 1), (ranTop - 1), obsHeight, obsWidth)
}

// try to make a random img, but check if its overlapping the food 
// or snake. if so, do it again until it does not
function tryObstacle() {
  makeImage()
  var headPos = snake.length.length - 1;
  // only render image if it’s not on snake
  for (var i = 0; i < headPos; i++) {
    if (isPositionInArray(snake.length[headPos], obstacleArray)) {
      randomObstacle()
    }
  }
  // only render image if it’s not on food
  if (isPositionInArray(foodPos, obstacleArray)) {
    randomObstacle()
    console.log('on food');
  }
  // render image
  else {
    img.style.top = ranTop + "vw";
    img.style.left = ranLeft + "vw";
    img.style.height = obsHeight + "vw";
    img.style.width = obsWidth + "vw";
    hasObstacle = true;
    // Increase amount of obstacles w/ each level
    amountObstacles++;
  }
}


function randomObstacle() {
  if (currentRound > 1 && hasObstacle === false) {
    if (amountObstacles < currentRound){
      tryObstacle()
    }    
  }
}

setTimeout(randomObstacle, 000);

function doObstacle() {
  // Render obstacles at different / random times
  var randTime = getRandom(2, 4)
  randomObstacle()
  setTimeout(doObstacle, randTime * 1000);
}

// create random 'food'
function randomFood() {
  var randomX = Math.floor(Math.random() * table.rowsCols);
  var randomY = Math.floor(Math.random() * height);
  random = randomX + randomY * table.rowsCols;
  // picks another foodPos if food pops on snake
  while (boxes[random].classList.contains("snake")) {
    randomX = Math.floor(Math.random() * table.rowsCols);
    randomY = Math.floor(Math.random() * height);
    random = randomX + randomY * table.rowsCols;
  }
  boxes[random].classList.add("food");
  foodPos = [randomX, randomY];
}

function showGameoverImg(){
    const images = [
    '../asset/obstacles1.svg',
    '../asset/obstacles2.svg',
    '../asset/obstacles3.svg',
    '../asset/obstacles4.svg',
    '../asset/obstacles5.svg',
    '../asset/obstacles6.svg',
    '../asset/obstacles7.svg',
   ]
const chosenImage = images[Math.floor(Math.random() * images.length)]
const gameoverImg = document.createElement("img"); 
gameoverImg.style.width = "20"+"vw"//img태그를 추가한다
gameoverImg.src = `img/${chosenImage}`; //랜덤으로 images배열에 있는 img의 이름을 가지고와 img src태그에 넣는다.
gameoverImg.setAttribute("id", "gameoverImg");
document.body.appendChild(gameoverImg); // 바디태그 안에 child태그로 bgImage를 삽입한
}

// end of game
function stop() {
  clearInterval(setInt);
  start.querySelector('span').innerHTML='*GAME OVER PRESS THE RIGHT ARROW KEY TO RESTART*';
  start.style.marginBottom = "40vw";

  showGameoverImg();
  // resetting variables if lost
  currentRound = 1;
  difficulty = 5;
  snakelength = currentRound * 10 + 1;
  position = longsnake.slice(0, snakelength);

  snake.init();
  modul.classList.remove("hidden");
}

// remove the obstacle once its hit
function removeObstacle(head) {
  img = document.getElementById("obstacleImg");
  obstacleArray = [];
  if (img) {
    snake.score += 5;
    scoreElt.innerHTML = snake.score + " " + "MB";
    img.remove()
   

    obstacleImg = document.createElement("img");
    obstacleImg.classList.add("obstacle");
    obstacleImg.setAttribute("id", "obstacleImg");
    obstaclesElt.appendChild(obstacleImg);
    var tail = snake.length[0];
    hasObstacle = false;
    // add tail to tail 5 times
    snake.length.unshift(tail, tail, tail, tail, tail);
  }
}

// next level of game
// TODO: Not working (still todo?)
function nextLevel() {
  clearInterval(setInt);
  start.querySelector("span").innerHTML = "* NEXT LEVEL *";
  start.style.marginBottom = "0vw";

  currentRound++;
  totalScore += 10;
  snakelength = currentRound * 10 + 1;
  hasObstacle = false;
  amountObstacles = 0;

  // 화면에찍힐 길이는 
  currentSnakeLength = longsnake.slice(0, snakelength);

  // TODO: fix (still todo?)

  // ToDo: Check number, may be 10???
if (currentRound < 9){ 
  snake.init();
  modul.classList.remove("hidden");
}else{
  // ToDo: What happens now???
  console.log('won')
}
}

// move the snake function
function move() {
  // check if move allowed & then eat food
  hitFood();
  hitObstacle();
  hitBorder();
  hitSnake();
  // actually move the snake
  updatePositions();
  renderSnake();
  document.addEventListener("keydown", turn);
  snake.canTurn = 1;
}

function updatePositions() {
  // remove last snake part (first snake pos)
  var headPos = snake.length.length - 1;
  // If the snake is hitting the bottom do not do the update anymore
  // Else do the stop() function
  if (snake.length[headPos][1] <= height - 1) {
    boxes[snake.length[0][0] + snake.length[0][1] * table.rowsCols].classList.remove("snake");
  } else {
    stop();
  }
  snake.length.shift();

  var head = snake.length[snake.length.length - 1];
  // check if won
  if (!head) {
    // TODO: GO to next level, when snake is empty (still todo?)
    nextLevel();
  }
  else {
    // add new snake part
    switch (snake.direction) {
      case "left":
        snake.length.push([head[0] - 1, head[1]]);
        break;
      case "up":
        snake.length.push([head[0], head[1] - 1]);
        break;
      case "right":
        snake.length.push([head[0] + 1, head[1]]);
        break;
      case "down":
        snake.length.push([head[0], head[1] + 1]);
        break;
      default:
        break;
    }
  }
}

// checks border contact
function hitBorder() {
  var headPos = snake.length.length - 1;
  // goes of limits
  // changed rowsCols to height for the down movement
  if (headPos >= 0) {
    if (((snake.length[headPos][0] === table.rowsCols - 1) && (snake.direction === "right")) ||
      ((snake.length[headPos][0] === 0) && (snake.direction === "left")) ||
      ((snake.length[headPos][1] === table.height - 1) && (snake.direction === "down")) ||
      ((snake.length[headPos][1] === 0) && (snake.direction === "up"))) {
      stop();
    }
  }
}

// checks self contact
function hitSnake() {
  var headPos = snake.length.length - 1;
  for (var i = 0; i < headPos; i++) {
    if (snake.length[headPos]) {
      if (snake.length[headPos].toString() === snake.length[i].toString()) {
        stop();
      }
    }
  }
}

// checks obsticale hit
function hitObstacle() {
  if (typeof obstacleArray !== 'undefined') {
    var head = snake.length[snake.length.length - 1];
    if (isPositionInArray(head, obstacleArray)) {
      removeObstacle()
    }
  }
}

// checks food contact
function hitFood() {
  var head = snake.length[snake.length.length - 1];
  var tail = snake.length[0];
  var tail1 = snake.length[1];
  var tail2 = snake.length[2];
  var tail3 = snake.length[3];
  var tail4 = snake.length[4];
  if (head) {
    if (head.toString() === foodPos.toString()) {
      boxes[random].classList.remove("food");

      snake.length.shift(tail);
      snake.length.shift(tail1);
      snake.length.shift(tail2);
      snake.length.shift(tail3);
      snake.length.shift(tail4);

      // remove leftover tail bit
      var elems = document.querySelectorAll(".snake");
      [].forEach.call(elems, function (el) {
        el.classList.remove("snake");
      });

      randomFood();
      snake.food++;
      snake.score -= 5;
      scoreElt.innerHTML = snake.score + " " + "MB";

      // increase speed
      clearInterval(setInt);
      snake.interval = Math.floor(snake.interval - (snake.interval / 40));
      setInt = setInterval(function () {
        move();
      }, snake.interval);
    }
  }
}

// read positions and render the snake
function renderSnake() {
  var headPos = snake.length.length - 1;
  for (var i = 0; i < snake.length.length; i++) {
    if (snake.length[headPos][1] <= height - 1) {
      boxes[snake.length[i][0] + snake.length[i][1] * table.rowsCols].classList.add("snake");
    }
  }
}

// keypress handling to turn
function turn(e) {
  if (snake.canTurn) {
    switch (e.key) {
      case 'ArrowLeft':// left 65
      case 'a':// left 
        if (snake.direction === "right") return;
        snake.direction = "left";
        break;
      case 'ArrowUp':// up 
      case 'w':
        if (snake.direction === "down") return;
        snake.direction = "up";
        break;
      case 'ArrowRight':// right 
      case 'd':
        if (snake.direction === "left") return;
        snake.direction = "right";
        break;
      case 'ArrowDown':// down 
      case 's':
        if (snake.direction === "up") return;
        snake.direction = "down";
        break;
      default:
        return;
    }
    snake.canTurn = 0;
  }
}

// start game
function startSnake() {

  const gameoverImg = document.getElementById("gameoverImg"); 
  if (gameoverImg) {
    gameoverImg.remove();
  }

  modul.classList.add("hidden");
  snake.time = 1;
  renderSnake();
  randomFood();
  doObstacle();

  // randomObstacle();
  // interval, heart of the game
  setInt = setInterval(function () {
    move();
  }, snake.interval);
}

// init game
snake.init();

//intro keydown 
document.addEventListener("keydown", function (e) {
  const introElement = document.getElementsByClassName('intro')[0];

  if ((e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') && snake.time === 0) {
    if (introElement) {
      introElement.style.display = "none";
    }
    startSnake();
  }
});
