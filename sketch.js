var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running, monkey_running2;

var banana2, bananaImage, obstacle, obstacleImage;

var FoodGroup, obstacleGroup;

var gameover, gameoverImg, restart, restartImg;

var score
var ground

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  monkey_running2 = loadAnimation("sprite_0.png");

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

  gameoverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

}

function setup() {
  createCanvas(600, 400);
  monkey = createSprite(100, 300);
  monkey.addAnimation("monkeyrunning", monkey_running);
  monkey.addAnimation("collided", monkey_running2);
  monkey.scale = 0.2;

  ground = createSprite(200, 370, 1500, 20);
  ground.velocityX = -4;

  FoodGroup = new Group();
  obstacleGroup = new Group();

  gameover = createSprite(300, 100);
  gameover.addImage("gameover", gameoverImg);
  gameover.visible = false;
  gameover.scale = 0.5;

  restart = createSprite(300, 140);
  restart.addImage("restart", restartImg);
  restart.visible = false;
  restart.scale = 0.5;

  monkey.setCollider("rectangle", 0, 0, monkey.width, monkey.height)
  //monkey.debug = true;

  score = 0;
}


function draw() {
  background("white");
  monkey.collide(ground);
  text("SURVIVAL TIME:" + score, 250, 50);
  monkey.velocityY = monkey.velocityY + 0.8;


  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  if (gameState === PLAY) {

    score = score + Math.round(getFrameRate() / 60);

    if (keyDown("space") && monkey.y >= 298) {
      monkey.velocityY = -20;

    }

    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
    }

    spawnObstacles();
    spawnBanana();
  } else if (gameState === END) {


    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);

    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    monkey.changeAnimation("collided", monkey_running2);

    gameover.visible = true;
    restart.visible = true;

    if (mousePressedOver(restart)) {
      reset();

    }
  }
  drawSprites();
}

function reset() {
  gameState = PLAY;
  score = 0;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  monkey.changeAnimation('monkeyrunning', monkey_running);
  score = score + Math.round(getFrameRate() / 60);
  gameover.visible = false;
  restart.visible = false;

}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var rock = createSprite(600, 330);
    rock.velocityX = -6;
    rock.addImage("rock", obstaceImage);
    rock.scale = 0.2;
    rock.lifetime = 200;
    obstacleGroup.add(rock)

  }
}

function spawnBanana() {
  if (frameCount % 80 === 0) {
    var food = createSprite(600, 100)
    food.y = Math.round(random(120, 200));
    food.addImage("food", bananaImage);
    food.scale = 0.2;
    food.velocityX = -7;
    food.lifetime = 200;
    food.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    FoodGroup.add(food);

  }
}