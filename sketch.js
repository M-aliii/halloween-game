let cooldown = 60; //one second worth of frames.
let targetExists = false;
let score = 0;
let escapeTimer = 0;
const escapeFrames = 9;
let hitmarkers = [];

function setup() {
  createCanvas(480, 360);
  
}

  function spawnTarget() {
    randx = random(31,450);
    randy = random(31,330);
    targetExists = true;
  }

function draw() {
  background(76, 37, 97);
  fill(247, 236, 143);
  noStroke();
  ellipse( 420, 70 ,100,100 );
  
  fill(76, 37, 97);
  noStroke();
  ellipse(390,55,100,100);

  // Tree trunk
  fill("#190C28");
  noStroke();

  rect(90, 180, 25, 140);
  rect(0,300, 480,60);

// Main branches
  rect(75, 130, 20, 70);
  rect(110, 120, 20, 80);
  rect(60, 95, 15, 50);
  rect(125, 85, 15, 55);

// Twisted canopy
  ellipse(102, 95, 130, 110);
  ellipse(50, 115, 80, 80);
  ellipse(155, 100, 75, 75);
  ellipse(75, 45, 85, 85);
  ellipse(135, 40, 80, 80);
  ellipse(105, 25, 70, 70);

// Small branch stubs
rect(50, 115, 20, 8);
rect(135, 105, 20, 8);
rect(125, 75, 18, 8);
  
  

  

  if (!targetExists) {
  spawnTarget();
}
  if (targetExists) {
    Target(randx,randy);

    //cursor near teleport away sequence.
   let mouseDistance = dist(mouseX, mouseY, randx, randy);    
   // Cursor is near the target
   if (mouseDistance < 50) {
    escapeTimer++;

    if (escapeTimer >= escapeFrames) {
      spawnTarget();      // teleport to a new position
      escapeTimer = 0;
    }
   } 
   else {
    escapeTimer = 0;      // reset if cursor moves away
    }
  }
  //score text!!!
  fill(255);
  textSize(16);
  text('Score: ' + score, 12, 26);


   for (let i = hitmarkers.length - 1; i >= 0; i--) {

    // Draw the hitmarker
    stroke(255,0,0);
    strokeWeight(2);

    line(
    hitmarkers[i].x - 8,
    hitmarkers[i].y - 8,
    hitmarkers[i].x + 8,
    hitmarkers[i].y + 8
    );

    line(
    hitmarkers[i].x + 8,
    hitmarkers[i].y - 8,
    hitmarkers[i].x - 8,
    hitmarkers[i].y + 8
    );

    // Delete after 5 seconds
    if (frameCount - hitmarkers[i].time > 5) {
    hitmarkers.splice(i, 1);
    }
   }
  } //end of draw()



function mousePressed() {
  hitmarkers.push({
  x: mouseX,
  y: mouseY,
  time: frameCount
  });
  if (targetExists) {

    let clickDistance = dist(mouseX, mouseY, randx, randy);
    if (clickDistance < 10) { // radius of your 62px target
      targetExists = false;
      score = score+3;
    }
    else if(clickDistance < 20){
      targetExists = false;
      score = score+2;
    }
    else if(clickDistance < 30){
      targetExists = false;
      score = score+1;
    }
    else{
      score =score-2;
    }
    

      //blue circle radius: 30,
      //red circle radius: 20
      //yellow circle radius: 10
    }
  }

//target drawing
function Target(x, y) {
  noStroke();
  fill(243, 147, 46);
  ellipse(x, y, 70, 70);
  fill(244, 215, 69);
  noStroke();
  ellipse(x,y,20,20);
  // Left eye
  quad(
  x - 30, y - 20,
  x - 10, y - 15,
  x - 15, y - 5,
  x - 32, y - 10
  );

  // Right eye
  quad(
  x + 30, y - 20,
  x + 10, y - 15,
  x + 15, y - 5,
  x + 32, y - 10
  );

// Stem
  fill(60, 100, 40);

  rect(x - 3, y - 50, 10, 20);

  ellipse(x + 2, y - 49, 10, 10);
  
}