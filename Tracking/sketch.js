//Original hand tracking sketch by Yining Shi
//Adapted For a classwork project by Anthony Donatelli

let model, video, keypoints, predictions=[];
let bullets = [];
let gunX;
let gunY;
let currang;
let timer=0;
let timer2=0;
let enemies = [];
let furthestLeft=0;
let furthestRight=0;
let furthestDown=0;
let incXflag=1;
let started=0;
let enemiesAlive=1;
let displayWinLoss=0;
let speed=700;

function preload() {
  video = createCapture(VIDEO, () => {
    loadHandTrackingModel();
  });
  video.hide();
  Invader = loadImage('SpaceInvader.png');
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  Invader.resize(int(width/40),int(width/40));
  //furthestLeft=int(width/20-width/40);
  //furthestRight=int(19*width/20+width/40);
  for(j=0;j<4;j++)
    {
      for(i=0;i<20;i++)
        {
          if(i>=3&&j!=0&&j!=4&&i<=17)
            {
              enemies.push(new enemy(int(i*width/20),int(j*height/16)));
            }
          else
            {
              
            }
        }
    }
  textSize(100);
  button = createButton('START');
  button.center();
  button.mousePressed(StartGame);
}

async function loadHandTrackingModel() {
  // Load the MediaPipe handpose model.
  model = await handpose.load();
  predictHand();
}

function draw() {
  background(0);
      if (predictions.length > 0) {
        //drawKeypoints();
        //drawSkeleton();
        drawGun();
        if(started==1)
          {
            enemiesAlive=0;
            for(let enem of enemies)
              {
                if(enem.alive==1)
                  {
                    enemiesAlive++;
                  }
              }
            if(enemiesAlive<=0)
              {
                started=0;
                displayWinLoss=1;
              }
            
            if(timer>60)
              {
                bullets.push(new bullet());
                timer=0;
              }
            else
              {
                timer++;
              }
          }
      }
  if(started==1)
    {
      for(let bull of bullets)
        {
          bull.update();
          for(let enem of enemies)
            {
              if(enem.alive==1)
                {
                  hit=enem.checkHit(bull.posX,bull.posY);
                  if(hit==1)
                    {
                      bull.removeBullet();
                    }
                }
            }
          bull.display();
        }
      enemiesAlive=0;
      for(let enem of enemies)
        {
          if(enem.alive==1)
            {
              enemiesAlive++;
            }
        }
      if(enemiesAlive<=0)
        {
          started=0;
          displayWinLoss=1;
        }
      tempflag=1;
      for(let enem of enemies)
        {
          if(enem.alive==1)
            {
              if(tempflag==1)
                {
                  furthestLeft=enem.posX-int(width/40);
                  furthestRight=enem.posX+int(width/40);
                  furthestDown=enem.posY+int(width/40);
                  tempflag=0;
                }

              if(enem.posX-int(width/40)<furthestLeft)
                {
                  furthestLeft=enem.posX-int(width/40);
                }
              if(enem.posX+int(width/40)>furthestRight)
                {
                  furthestRight=enem.posX+int(width/40);
                }
              if(enem.posY+int(width/40)>furthestDown)
                {
                  furthestDown=enem.posY+int(width/40);
                }
            }
        }
    }
  for(let enem of enemies)
    {
      enem.displayenem();
    }
  if(timer2>15)
    {
      for(let enem of enemies)
        {
          if(started==1)
            {
              enem.updateEnem();
            }
        }
      timer2=0;
    }
  else
    {
      timer2++;
    }
  
  if(started==1)
    {
      tempflag=1;
      for(let enem of enemies)
        {
          if(enem.alive==1)
            {
              if(tempflag==1)
                {
                  furthestLeft=enem.posX-int(width/40);
                  furthestRight=enem.posX+int(width/40);
                  furthestDown=enem.posY+int(width/40);
                  tempflag=0;
                }

              if(enem.posX-int(width/40)<furthestLeft)
                {
                  furthestLeft=enem.posX-int(width/40);
                }
              if(enem.posX+int(width/40)>furthestRight)
                {
                  furthestRight=enem.posX+int(width/40);
                }
              if(enem.posY+int(width/40)>furthestDown)
                {
                  furthestDown=enem.posY+int(width/40);
                }
            }
        }
      if(furthestDown>7*height/8)
        {
          started=0;
          displayWinLoss=2;
        }
    }
  if(displayWinLoss==1)
    {
      displayWin();
    }
  if(displayWinLoss==2)
    {
      displayLoss();
    }
}

async function predictHand() {
  // Pass in a video stream (or an image, canvas, or 3D tensor) to obtain a
  // hand prediction from the MediaPipe graph.
  predictions = await model.estimateHands(video.elt);
  setTimeout(() => predictHand(), 100);
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  let prediction = predictions[0];
  for (let j = 0; j < prediction.landmarks.length; j++) {
    let keypoint = prediction.landmarks[j];
    fill(255, 0, 0);
    noStroke();
    ellipse(keypoint[0], keypoint[1], 10, 10);
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  let annotations = predictions[0].annotations;
  stroke(255, 0, 0);
  
  for (let j = 0; j < annotations.indexFinger.length - 1; j++) {
    line(annotations.indexFinger[j][0], annotations.indexFinger[j][1], annotations.indexFinger[j + 1][0], annotations.indexFinger[j + 1][1]);
  }
}

function drawGun()
{
  let annotations = predictions[0].annotations;
  push();
  stroke(0, 255, 0);
  strokeWeight(5);
  angle=atan((annotations.indexFinger[3][1]-annotations.indexFinger[2][1])/(annotations.indexFinger[3][0]-annotations.indexFinger[2][0]));
  if((annotations.indexFinger[3][0]-annotations.indexFinger[2][0])>0)
    {
      line(width/2,height,width/2-height/8*cos(angle),height-abs(height/8*sin(angle)));
      gunX=width/2-height/8*cos(angle);
    }
  else
    {
      line(width/2,height,width/2+height/8*cos(angle),height-abs(height/8*sin(angle)));
      gunX=width/2+height/8*cos(angle);
    }
  gunY=height-abs(height/8*sin(angle));
  currang=angle;
  pop();
}


function bullet()
{
  this.posX=gunX;
  this.posY=gunY;
  this.ang=currang;
  
  
  this.update = function()
  {
    if(this.posX>width/2)
      {
        this.posX+=height/80*cos(this.ang);
      }
    else
      {
        this.posX-=height/80*cos(this.ang);
      }
    this.posY-=abs(height/80*sin(this.ang));
  }
  
  this.display = function()
  {
    push();
    noFill();
    stroke(255);
    circle(this.posX,this.posY,width/80);
    pop();
  }
  
  this.removeBullet = function()
  {
    let index = bullets.indexOf(this);
    bullets.splice(index,1);
  }
  
}

function enemy(x,y)
{
  this.posX=x;
  this.posY=y;
  this.alive=1;
  
  
  this.displayenem = function()
  {
    if(this.alive==1)
      {
        push();
        fill(255,0,0);
        stroke(255,0,0);
        //circle(this.posX,this.posY,int(width/40));
        imageMode(CENTER);
        image(Invader,this.posX,this.posY);
        pop();
      }
  }
  
  this.updateEnem = function()
  {
    if(furthestLeft<=1)
      {
        incXflag=1;
        this.posY+=height/16;
      }
    if(furthestRight>=width-1)
      {
        incXflag=0;
        this.posY+=height/16;
      }
    
    if(incXflag==1)
      {
        this.posX+=speed/(enemiesAlive+10);
      }
    else
      {
        this.posX-=speed/(enemiesAlive+10);
      }
  }
  
  this.checkHit=function(bullX,bullY)
  {
    confirmed=0;
    if(bullX>=this.posX-int(width/40)&&bullX<=this.posX+int(width/40))
      {
        if(bullY>=this.posY-int(width/40)&&bullY<=this.posY+int(width/40))
          {
            this.alive=0;
            confirmed=1;
          }
      }
    return confirmed;
  }
}

function StartGame() 
{
  started=1;
  button.remove();
}

function displayWin()
{
  push();
  fill(0,255,0)
  strokeWeight(5);
  textAlign(CENTER,CENTER);
  text("WINNER",width/2,height/2);
  pop();
}

function displayLoss()
{
  push();
  fill(0,255,0)
  strokeWeight(5);
  textAlign(CENTER,CENTER);
  text("LOSER",width/2,height/2)
  pop();
}
