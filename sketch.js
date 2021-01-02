var tower,towerImage;
var ghost,ghostImage;
var door,doorImage;
var climber,climberImage;
var invisibleBlock;
var doorGroup,climberGroup,invisibleGroup;
var gameState = "play";


function preload(){
  towerImage = loadImage("tower.png");
  ghostImage = loadImage("ghost-standing.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
}

function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3;
    
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleGroup = new Group();
}

function draw(){
  if(gameState==="play"){
  if(tower.y>400){
    tower.y = 300;
  }
    if(keyDown("left")){
      ghost.x = ghost.x-3;
    }
    if(keyDown("right")){
      ghost.x = ghost.x+3;
    }
    if(keyDown("space")){
      ghost.velocityY = -10;
    }                                  
    ghost.velocityY = ghost.velocityY +0.8;
  
  spawnObstacles();
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if(invisibleGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState = "end";
  }
  
  
  
  
  drawSprites();
  }
if(gameState==="end"){
  fill("blue");
  textSize(50);
  textFont("Algerian");
  text("Game Over",180,250);
}
}

function spawnObstacles(){
 if(frameCount%240===0)   {
   door = createSprite(200,-50);
   door.addImage(doorImage);
   climber = createSprite(200,10);
   climber.addImage(climberImage);
   invisibleBlock = createSprite(200,15);
   invisibleBlock.width = climber.width;
   invisibleBlock.height = 2;
   
   
   door.x = Math.round(random(100,500))
   climber.x = door.x;
   invisibleBlock.x = door.x;
   
   door.velocityY = 1;
   climber.velocityY = 1;
   invisibleBlock.velocityY = 1;
   
   doorGroup.add(door);
   climberGroup.add(climber);
   invisibleGroup.add(invisibleBlock);
   
   ghost.depth = door.depth;
   ghost.depth = ghost.depth +1;
   door.lifetime = 500;
   invisibleBlock.lifetime = 500;
   climber.lifetime = 500;
 }                                                                               
}



















