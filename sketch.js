var Width = window.innerWidth;
var Height = window.innerHeight;

var Grass;

var gameState = "start";
var howToPlay = "no";

var buttons;

var soilder, treatment;
var bullet, bulletSound;

var enemy1, enemy2, enemy3, enemy4;
var bees, beeSound;

var enemy1PowerBar, enemy2PowerBar, enemy3PowerBar, enemy4PowerBar, soilderPowerBar;

var badge1, badge2, badge3, badge4;

var winner;

function preload(){
  Grass = loadImage("Image/Grass.jpg");

  bulletSound = loadSound("Sound/0437.mp3");
  beeSound = loadSound("Sound/0101.mp3");
}

function setup() {
  createCanvas(Width, Height);

    buttons = new SpawnButton();

    enemy1PowerBar = new EnemyPower(Width - 110, 20, 100, 25, 100, 1);
    enemy2PowerBar = new EnemyPower(Width - 110, 20 + 25 + 25/2, 100, 25, 100, 1);
    enemy3PowerBar = new EnemyPower(Width - 110, 20 + 25 + 25 + 25/2 + 25/2, 100, 25, 100, 1);
    enemy4PowerBar = new EnemyPower(Width - 110 - 25 - 25/2, 20, 25, 100, 100, 0);

    soilderPowerBar = new SoilderPower(100, Height - 20 - 25, 200, 25, 200, 1);

    soilder = new Soilder(100, -100);
    treatment = new Treatment(0, -100);

    bullet = new Bullet(soilder.x, soilder.y);

    enemy1 = new Enemy(75, 100);
    enemy2 = new Enemy(75, 100);
    enemy3 = new Enemy(75, 100);
    enemy4 = new Enemy(150, 200);

    bees = new Bee();

    badge1 = new Badges(250);
    badge2 = new Badges(750);
    badge3 = new Badges(1250);
    badge4 = new Badges(1750);
    }

function draw() {
  background(Grass);

  if(window.innerWidth !== Width || window.innerHeight !== Height){
    window.location.reload();
  }

  bees.display();
  
  for(var a = 0; a <= Height; a = a + 30){ 
    line(-200 + Width/2, a, -200 + Width/2, a + 10);
  }

  enemy1PowerBar.display(enemy1);
  enemy2PowerBar.display(enemy2);
  enemy3PowerBar.display(enemy3);
  enemy4PowerBar.display(enemy4);
  soilderPowerBar.display(soilder);

  if(howToPlay === "show"){
    HowDoIPlay();
  }

  if(soilder.Status === "spawnSoilder"){
    soilder.spawnSoilder();  
  }
  
  if(treatment.Status === "spawntreatment"){
    treatment.spawntreatment();
  }

  if(treatment.Status === "spawnedtreatment"){
    gameState = "showTreatment";
  }
  if(gameState === "showTreatment" && howToPlay === "no"){
    treatment.display();
  }
    
  if(soilder.Status === "spawnSoilder"){
    soilder.spawnSoilder();
    
    soilder.Status = "spawnedSoilder";
  }

  if(soilder.Status === "spawnedSoilder" && howToPlay === "no"){
    gameState = "play";
  }

  if(gameState === "play" && howToPlay === "no"){
    if(soilder.Status === "spawnedSoilder"){
      soilder.display();
    }
    treatment.display();
    bullet.display();

    enemy1.displayAndMove(250, 300, 100);
    enemy2.displayAndMove(750, 300, 100);
    enemy3.displayAndMove(1250, 300, 100);
    enemy4.displayAndMove(1750, 300, 100);

    enemy1.attack(40, 800);
    enemy2.attack(70, 1200);
    enemy3.attack(120, 3600);
    enemy4.attack(170, 4500);

    if(bullet.Status === "shootSetup" && bullet.speed === 0){
      bullet.shootSetup();
    }
    else{
      bullet.Status = "shoot";
    }
  
    if(bullet.Status === "shoot"){
      bullet.shoot();
    }
  
    if(bullet.speed === 0){
      soilder.dierection = soilder.tDierection;
    }

    bullet.damage();

    soilder.death();
  
    enemy1.rebornAndDeath(enemy1PowerBar); 
    enemy2.rebornAndDeath(enemy2PowerBar); 
    enemy3.rebornAndDeath(enemy3PowerBar); 
    enemy4.rebornAndDeath(enemy4PowerBar); 

    badge1.display();
    badge2.display();
    badge3.display();
    badge4.display();
  }

  buttons.display();

  if(soilder.living === "died" && gameState === "play"){
    winner = "enemy";
    gameState = "end";
  }
  if(enemy1.living === "died" && enemy2.living === "died" && enemy3.living === "died" && enemy4.living === "died" && gameState === "play"){
    if(badge1.collected === "yes" && badge2.collected === "yes" && badge3.collected === "yes" && badge4.collected === "yes"){
      winner = "soilder";
      gameState = "end";
    }
  }
  if(isTouching(enemy1, treatment, 50, 50) || isTouching(enemy2, treatment, 50, 50) || isTouching(enemy3, treatment, 50, 50) || isTouching(enemy4, treatment, 50, 50)){
    gameState = "end";
    winner = "enemy";
  }

  if(gameState === "end"){
    clear();

    background(0);

    if(winner === "enemy"){

      if(Width >= 800 && Height >= 259){
        textSize(Width/80)

      } else{
        resizeCanvas(800, 270);
        background(0); 
      } 
      
      fill(255);
      noStroke();

      text("Ohhh! No Problem you can try playing again now and win", 50, 100);
      text("Anyways you will win in a few tries", 50, 120);
      text("But have you thought about the soilders?", 50, 140);
      text("They Never get Another chance", 50, 160);
      text("If they lose they lose forever. We can only help them by providing better equipment which will make their work easier", 50, 180);
      text("So please donate how much ever you can donate even if it is 10 rupees the whole India can make up millions",50 ,200);
      text("To Get information about donation opens the link Below", 50, 220);

      text("To Play again click on reset", 50, 240);

      text("To donate Open This Link https://ndf.gov.in/", 50, 260);
    }
    if(winner === "soilder"){

      if(Width >= 800 && Height >= 259){
        textSize(Width/80)

      } else{
        resizeCanvas(800, 270);
        background(0); 
      } 

      fill(255);
      noStroke();

      text("Ahhhhh! Just won I am sure that you would have lost once before this", 50, 100);
      text("Anyways you have won in a few tries", 50, 120);
      text("But have you thought about the soilders?", 50, 140);
      text("They Never get Another chance", 50, 160);
      text("If they lose they lose forever. We can only help them by providing better equipment which will make their work easier", 50, 180);
      text("So please donate how much ever you can donate even if it is 10 rupees the whole India can make up millions",50 ,200);
      text("To Get information about donation opens the link Below", 50, 220);

      text("To Play again click on reset", 50, 240);

      text("To donate Open This Link https://ndf.gov.in/", 50, 260);
    }
  }
}

function Move(Obj, xs, ys){
  var x = Obj.x;
  x = x + xs;
  Obj.x = x;
  var y = Obj.y;
  y = y + ys;
  Obj.y = y;
}

function keyPressed(){
  if(soilder.x > 0 && soilder.x < Width && soilder.y > 0 && soilder.y < Height){
    if(keyCode ===  37){
      soilder.MoveSoilderLeft();
      soilder.tDierection = "left";
    }
    if(keyCode ===  38){
      soilder.MoveSoilderUp();
      soilder.tDierection = "up";
    }
    if(keyCode ===  39){
      soilder.MoveSoilderRight();
      soilder.tDierection = "right";
    }
    if(keyCode ===  40){
      soilder.MoveSoilderDown();
      soilder.tDierection = "down";
    }
    if(keyCode ===  32){
      bullet.Status = "shootSetup";
      if(gameState === "play"){
        bulletSound.play();
      }
    }
  }
}

function findC(obj1, obj2){
  if(obj1.x > obj2.x && obj1.y > obj2.y){
    var Xdifferance = obj1.x - obj2.x;
    var Ydifferance = obj1.y - obj2.y;
    var XYdifferance = (Xdifferance * Xdifferance) + (Ydifferance * Ydifferance);
    var c = Math.sqrt(XYdifferance);
    return c;
  }
  if(obj1.x < obj2.x && obj1.y > obj2.y){
    var Xdifferance = obj2.x - obj1.x;
    var Ydifferance = obj1.y - obj2.y;
    var XYdifferance = (Xdifferance * Xdifferance) + (Ydifferance * Ydifferance);
    var c = Math.sqrt(XYdifferance);
    return c;
  }
  if(obj1.x < obj2.x && obj1.y < obj2.y){
    var Xdifferance = obj2.x - obj1.x;
    var Ydifferance = obj2.y - obj1.y;
    var XYdifferance = (Xdifferance * Xdifferance) + (Ydifferance * Ydifferance);
    var c = Math.sqrt(XYdifferance);
    return c;
  }
  if(obj1.x > obj2.x && obj1.y < obj2.y){
    var Xdifferance = obj1.x - obj2.x;
    var Ydifferance = obj2.y - obj1.y;
    var XYdifferance = (Xdifferance * Xdifferance) + (Ydifferance * Ydifferance);
    var c = Math.sqrt(XYdifferance);
    return c;
  }
}

function isTouching(obj1, obj2, rangeX, rangeY){
  if(obj1.x > obj2.x - rangeX &&
    obj1.x < obj2.x + rangeX &&
    obj1.y > obj2.y - rangeY &&
    obj1.y < obj2.y + rangeY){
    return true;
  }
  else{
    return false;
  }
}
function HowDoIPlay(){
  resizeCanvas(800, 400);
  background(0);

  textSize(20);
  fill(255);
  noStroke();

  text("To start click on Treatment to spawn treatment", 50, 100);
  text("Then click on soilder and click on Enter to spawn soilder", 50, 120);
  
  text("Then Wait for sometime and then there will be Enemies spawning", 50, 160);
  text("You will have to shoot enemies by clicking on SPACE", 50, 180);
  text("When the Enemies spawn a badge will be appearing", 50, 220);
  text("You will have to go near the badge and make it green and wait until it is disappiaring", 50, 240);
  
  text("If you don't collect within the limit you lose", 50, 270);
  text("You will win when you collect all the Badges and also kill al the Enemies", 50, 290)
  
  text("There are also many other features you will have to explore", 50, 340);
  
  text("Click on reset to Play", 50, 380);
}