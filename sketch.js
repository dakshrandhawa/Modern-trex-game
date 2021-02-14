var PLAY = 1;
var END = 0;
var gameState = PLAY;


var trex;
var sun;
var cloud;
var score = 0;
var gameSound;
var gameOverImage,game_Over;
var restart, resartImage;

function preload(){
trexImage = loadImage("cute_dino.png");
  backgroundImage = loadImage("background.jpg");
  sunImage = loadImage("sun.png");
  bananaImage = loadImage("banana.png");
  beeImage = loadImage("bee.png");
  cloudImage = loadImage("cloud.png");
  flowerImage = loadImage("flower.png");
  fireImage = loadImage("fire.png");
  ghostImage = loadImage("ghost.png");
   gameSound = loadSound("game_sound.wav");
 jumpSound = loadSound("jump.wav");
gameOver = loadSound("gameOver.mp3");
  gameOverImage = loadImage("game_over_icon.jpg");
  restartImage = loadImage("restart.png");
}


function setup() {
  createCanvas(350, 400)
  
  background = createSprite(300, 200, 0, 0);
  background.addImage(backgroundImage);
  background.velocityX = (-3-2*score/100);
  background.scale = 2.5;

  
  invisibleGround = createSprite(300, 338 ,600, 1);
  invisibleGround.visible = false;
  
  
  
 
  
 trex = createSprite(25, 300, 20, 20);
 trex.addImage(trexImage);
 trex.scale = 0.1;
  
  sun = createSprite(275, 35, 20, 20);
 sun.addImage(sunImage);
  sun.scale = 0.1;
  
   game_Over = createSprite(175, 200, 300, 400);
   game_Over.addImage(gameOverImage);
  
  
  restart = createSprite(175, 370, 300, 400);
   restart.addImage(restartImage);
   
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
  
 
   
}



function draw() {
  
 if(gameState === PLAY)
   {
     game_Over.scale = 0;
      restart.scale = 0;
   background.velocityX = (-3-2*score/200);
     
     restart.visible =false;
     game_Over.visible = false;
  
     
     score = score + Math.round(frameCount/200); 
     
  if(background.x < 0)
{
  background.x = background.width/1;
} 
  
  if(keyDown("space")&& trex.y >=250)
    {
     jumpSound.play();
     trex.velocityY = -12;
     
    }
  trex.velocityY = trex.velocityY+0.5;
     
    trex.collide(invisibleGround);
  
  var select_obstacles = Math.round(random(1,6))
  if(frameCount%80 === 0)
    {
      if(select_obstacles === 1)
        {
          bananas();
        }else  if(select_obstacles === 2)
        {
          bees();
        }else  if(select_obstacles === 3)
        {
          fires();
        }else  if(select_obstacles === 4)
        {
          flowers();
        }else  if(select_obstacles === 5)
        {
          ghosts();
        }
    }
  
  if(obstacleGroup.isTouching(trex))
    {
      gameState = END;
      gameSound.stop();
      gameOver.play();
    
    
     
    }
  
  
  
   }
  
  if(gameState === END)
    {
      
       trex.collide(invisibleGround);
      
      background.velocityX = 0;
      
      cloudGroup.destroyEach();
     cloudGroup.setVelocityXEach(0);
      obstacleGroup.destroyEach();
     obstacleGroup.setVelocityXEach(0);
      
       
       game_Over.scale = 0.8;
       game_Over.visible = true;
      
        restart.scale = 0.3;
     restart.visible = true;
     
  
    }
  
  if(mousePressedOver(restart))
       {
         reset();
       }
  
  clouds();
  
  
  
  drawSprites();
  
  textFont("Arial Black");
  textSize (20);
  fill("red");
  text("Your Score =" + score, 100, 30)
}

function reset()
{
  score = 0;
  gameState = PLAY;
  cloudGroup.destroyEach();
  obstacleGroup.destroyEach();
    trex.collide(invisibleGround);
  
}

function clouds()
{
  if(frameCount%60 === 0)
    {
  cloud = createSprite(600, Math.round(random(40,80)), 20, 20);
 cloud.addImage(cloudImage);
  cloud.scale = 0.1;
      cloud.lifetime =220;
  cloud.velocityX = -3+1*score/100;
      cloudGroup.add(cloud);
    }
}


function bananas()
{
  banana = createSprite(600, 315, 10, 10)
  banana.addImage(bananaImage);
  banana.scale = 0.2;
  banana.velocityX = -3;
  banana.lifetime =220;
   obstacleGroup.add(banana);
}
  
function bees()
{
  bee = createSprite(600, 315, 10, 10)
  bee.addImage(beeImage);
  bee.scale = 0.1;
  bee.velocityX = -3;
  bee.lifetime =220;
   obstacleGroup.add(bee);
}  

function fires()
{
   fire = createSprite(600, 315, 10, 10)
  fire.addImage(fireImage);
  fire.scale = 0.2;
  fire.velocityX = -3;
  fire.lifetime =220;
   obstacleGroup.add(fire);
} 

function flowers()
{
  flower = createSprite(600, 310, 10, 10)
  flower.addImage(flowerImage);
  flower.scale = 0.1;
  flower.velocityX = -3;
  flower.lifetime =220;
   obstacleGroup.add(flower);
} 
 

function ghosts()
{
  ghost = createSprite(600, 315, 10, 10)
  ghost.addImage(ghostImage);
  ghost.scale = 0.1;
  ghost.velocityX = -3;
  ghost.lifetime =220;
  obstacleGroup.add(ghost);
}