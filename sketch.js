var monkey, monkey_running, monkeyImage;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var backImage,backgr;

function preload() {
  monkeyImage = loadImage("Monkey_01.png");
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  obstaceImage = loadImage("stone.png");
  backImage = loadImage("jungle2.jpg");
}

function setup() {
  createCanvas(600, 600);
  
  score = 0;
  
  backgr = createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale = 1.5;
  backgr.x = backgr.width/2;
  backgr.velocityX = -4;

  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.addImage("stop", monkeyImage);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.visible = false;

  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {  
  survivalTime = Math.ceil(frameCount/getFrameRate());

  ground.x = camera.x - 100;
  monkey.x = camera.x - 250;
  
  if(ground.x < 0) {
    ground.x = ground.width/2;
  }
  
  if(backgr.x < 100) {
    backgr.x = backgr.width/2;
  }

  if(keyDown("space")) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);
  
  spawnFood();
  spawnObstacles();
  
  if(foodGroup.isTouching(monkey)) {
    foodGroup.destroyEach();
    score = score + 2;
  }
  
  switch(score) {
    case 10:
      monkey.scale = 0.12;
      break;
    case 20:
      monkey.scale = 0.14;
      break;
    case 30:
      monkey.scale = 0.16;
      break;
    case 40:
      monkey.scale = 0.18;
      break;
    default: break;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    backgr.velocityX = 0;
    monkey.velocityY = 0;
    survivalTime = 0;
    score = 0;
    
    monkey.changeImage("stop", monkeyImage);
    
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
 
  drawSprites();
  
  textSize(30);
  stroke("white");
  fill("white");
  text("Score: "+ score, 450,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: "+ survivalTime, 100,50);
}

function spawnFood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.addImage(bananaImage);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    banana.lifetime = 300;
    banana.scale = 0.05;
    
    monkey.depth = banana.depth + 1;

    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.addImage(obstaceImage);
    obstacle.velocityX = -6;
    obstacle.scale = 0.15;  
    obstacle.lifetime = 300;

    obstacleGroup.add(obstacle);
  }
}