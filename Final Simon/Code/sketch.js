p5.disableFriendlyErrors = true;

let colors=[];
level=1;
WL=2;//0 is game still going, 1 is loss, 2 is not started yet
newLevel=0;
correct=0;
hiscore=0;
hardscore=0;
curscore=0;
fsize='20px';
avgsize=0;
blinking=1;
timer=0;
timer2=0;
timer3=0;
curco=0;
speed=400;
mode=1;

rn=0;
bn=0;
gn=0;
yn=0;

hellflag=0;

startgame=0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  avgsize=(windowWidth+windowHeight)/2/70;
  fsize=avgsize+'px';
  
  rx=windowWidth/4-windowWidth/4;
  ry=windowHeight/4-windowHeight/2/2+100;
  bx=windowWidth*3/4-windowWidth/2/2;
  by=windowHeight/4-windowHeight/2/2+100;
  gx=windowWidth/4-windowWidth/2/2;
  gy=windowHeight*3/4-windowHeight/2/2+50;
  yx=windowWidth*3/4-windowWidth/2/2;
  yy=windowHeight*3/4-windowHeight/2/2+50;
  
  rbutton = createButton('RED');
  rbutton.position(rx,ry);
  rbutton.mousePressed(r);
  bbutton = createButton('BLUE');
  bbutton.position(bx,by);
  bbutton.mousePressed(b);
  gbutton = createButton('GREEN');
  gbutton.position(gx,gy);
  gbutton.mousePressed(g);
  ybutton = createButton('YELLOW');
  ybutton.position(yx,yy);
  ybutton.mousePressed(y);
  
  rbutton.size(windowWidth/2,windowHeight/2-50);
  bbutton.size(windowWidth/2,windowHeight/2-50);
  gbutton.size(windowWidth/2,windowHeight/2-50);
  ybutton.size(windowWidth/2,windowHeight/2-50);
  
  rbutton.style('background-color','red');
  bbutton.style('background-color','blue');
  gbutton.style('background-color','green');
  ybutton.style('background-color','yellow');
  
  rbutton.style('font-size', '30px');
  bbutton.style('font-size', '30px');
  gbutton.style('font-size', '30px');
  ybutton.style('font-size', '30px');
  
  push();
  startbutton = createButton('NORMAL MODE');
  startbutton.position(windowWidth/2-windowWidth/16-windowWidth/8, windowHeight/2-windowHeight/16+50);
  startbutton.size(windowWidth/8,windowHeight/8);
  startbutton.style('font-size', fsize);
  startbutton.style('background-color','black')
  startbutton.style('color', 'white');
  startbutton.mousePressed(start);
  pop();
  
  push();
  hardbutton = createButton('HARD MODE');
  hardbutton.position(windowWidth/2-windowWidth/16+windowWidth/8, windowHeight/2-windowHeight/16+50);
  hardbutton.size(windowWidth/8,windowHeight/8);
  hardbutton.style('font-size', fsize);
  hardbutton.style('background-color','black')
  hardbutton.style('color', 'white');
  hardbutton.mousePressed(hard);
  pop();
  
  
  
  oscr = new p5.Oscillator('sine');
  oscb = new p5.Oscillator('sine');
  oscg = new p5.Oscillator('sine');
  oscy = new p5.Oscillator('sine');
  
  oscr.freq(200);
  oscb.freq(300);
  oscg.freq(400);
  oscy.freq(500);
  
  oscr.amp(0.2);
  oscb.amp(0.2);
  oscg.amp(0.2);
  oscy.amp(0.2);
  
  oscloss = new p5.Oscillator('sine');
  oscloss.freq(100);
  oscloss.amp(0.5);
  
  oscr2 = new p5.Oscillator('sine');
  oscb2 = new p5.Oscillator('sine');
  oscg2 = new p5.Oscillator('sine');
  oscy2 = new p5.Oscillator('sine');
  
  oscr2.freq(200);
  oscb2.freq(300);
  oscg2.freq(400);
  oscy2.freq(500);
  
  oscr2.amp(0.2);
  oscb2.amp(0.2);
  oscg2.amp(0.2);
  oscy2.amp(0.2);
  
}

function draw() {
  background(80,100,120);
  avgsize=(windowWidth+windowHeight)/2/70;
  fsize=avgsize+'px';
  textSize(avgsize*1.3);
  //losebutton.style('font-size', fsize);
  startbutton.style('font-size', fsize);
  hardbutton.style('font-size', fsize);
  
  text('CURRENT SCORE : '+curscore,0,50+(avgsize*1.3)/2);
  if(mode==1)
    {
      text('HIGHSCORE : '+hiscore,windowWidth/2,50+(avgsize*1.3)/2);
    }
  else
    {
      text('HIGHSCORE : '+hardscore,windowWidth/2,50+(avgsize*1.3)/2);
    }
  
  if(millis()-timer3>=200)
    {
      oscr2.stop();
      oscb2.stop();
      oscg2.stop();
      oscy2.stop();
    }
  
  if(blinking==0&&colors.length>0)
    {
      
      if(millis()-timer<=300)
        {
          if(hellflag==0&&millis()-timer>=150)
             {
               if(mode==2&&colors.length!=1)
                {
                  if(curscore%4==0)
                    {
                      rbutton.position(rx,ry);
                      bbutton.position(bx,by);
                      gbutton.position(gx,gy);
                      ybutton.position(yx,yy);
                    }
                  else if(curscore%4==1)
                    {
                      rbutton.position(bx,by);
                      bbutton.position(yx,yy);
                      gbutton.position(rx,ry);
                      ybutton.position(gx,gy);
                    }
                  else if(curscore%4==2)
                    {
                      rbutton.position(yx,yy);
                      bbutton.position(gx,gy);
                      gbutton.position(bx,by);
                      ybutton.position(rx,ry);
                    }
                  else if(curscore%4==3)
                    {
                      rbutton.position(gx,gy);
                      bbutton.position(rx,ry);
                      gbutton.position(yx,yy);
                      ybutton.position(bx,by);
                    }
                }
               hellflag=1;
             }
        }
      else if(millis()-timer<=speed+300)
        {
          blink(colors[curco].color);
        }
      else if(millis()-timer<=speed+400)
        {
          blink('clr');
          oscr.stop();
          oscb.stop();
          oscg.stop();
          oscy.stop();
        }
      else
        {
          timer=millis();
          curco++;
          rn=0;
          bn=0;
          gn=0;
          yn=0;
        }
      
      if(curco==colors.length)
        {
          curco=0;
          blinking=1;
          hellflag=0;
        }
    }
  else
    { 
      if(WL==0)
        {
          if(newLevel==0)
            {
              colors.push(new scolor());
              newLevel=1;
              blinking=0;
            }
        }
      else if(WL==1)
        {
          startbutton.show();
          hardbutton.show();
          if(millis()-timer2>=3000)
            {
              oscloss.stop();
            }
        }
    }
  
  
}

function scolor(length)
{
  this.color=random(['r','g','b','y']);
  //print(this.color);
  
  this.checkColor=function(input)
  {
    if(blinking==1)
      {
        if(input==this.color)
          {
            correct++;
          }
        else
          {
            WL=1;
            reset();
            oscloss.start();
            timer2=millis();
            if(mode==1)
              {
                if(curscore>hiscore)
                  {
                    hiscore=curscore;
                  }
              }
            else if (mode==2)
              {
                if(curscore>hardscore)
                  {
                    hardscore=curscore;
                  }
              }
          }

        if(correct==level)
          {
            level++;
            newLevel=0;
            correct=0;
            curscore++;
            timer=millis()+500;
          }
      }
  }
}

function reset()
{
  if(colors.length>=1)
    {
      colors.splice(0, colors.length);
    }
}

function r()
{
  if(colors.length>0)
    {
      colors[correct].checkColor('r');
      oscr2.start();
      oscb2.stop();
      oscg2.stop();
      oscy2.stop();
      timer3=millis();
    }
}
function b()
{
  if(colors.length>0)
    {
      colors[correct].checkColor('b');
      oscb2.start();
      oscr2.stop();
      oscg2.stop();
      oscy2.stop();
      timer3=millis();
    }
}
function g()
{
  if(colors.length>0)
    {
      colors[correct].checkColor('g');
      oscg2.start();
      oscb2.stop();
      oscr2.stop();
      oscy2.stop();
      timer3=millis();
    }
}
function y()
{
  if(colors.length>0)
    {
      colors[correct].checkColor('y');
      oscy2.start();
      oscb2.stop();
      oscg2.stop();
      oscr2.stop();
      timer3=millis();
    }
}
function restart()
{
  //losebutton.hide();
  level=1;
  WL=0;//0 is game still going, 1 is loss
  newLevel=0;
  correct=0;
  curscore=0;
  
  fsize='20px';
  avgsize=0;
  blinking=1;
  timer=millis();
  curco=0;
  speed=400;
  hellflag=0;

  rn=0;
  bn=0;
  gn=0;
  yn=0;
  
  oscloss.stop();
  
  rx=windowWidth/4-windowWidth/4;
  ry=windowHeight/4-windowHeight/2/2+100;
  bx=windowWidth*3/4-windowWidth/2/2;
  by=windowHeight/4-windowHeight/2/2+100;
  gx=windowWidth/4-windowWidth/2/2;
  gy=windowHeight*3/4-windowHeight/2/2+50;
  yx=windowWidth*3/4-windowWidth/2/2;
  yy=windowHeight*3/4-windowHeight/2/2+50;
  
  rbutton.position(rx,ry);
  bbutton.position(bx,by);
  gbutton.position(gx,gy);
  ybutton.position(yx,yy);
}

function start()
{
  restart();
  mode=1;
  startbutton.hide();
  hardbutton.hide();
}
function hard()
{
  restart();
  mode=2;
  startbutton.hide();
  hardbutton.hide();
}

function blink(col)
{
  if(col=='clr')
    {
      rbutton.style('background-color','red');
      bbutton.style('background-color','blue');
      gbutton.style('background-color','green');
      ybutton.style('background-color','yellow');
    }
  else if(col=='r')
    {
      if(rn==0)
        {
          oscr.start();
          rn=1;
        }
      rbutton.style('background-color','white');
      bbutton.style('background-color','blue');
      gbutton.style('background-color','green');
      ybutton.style('background-color','yellow');
    }
  else if(col=='b')
    {
      if(bn==0)
        {
          oscb.start();
          bn=1;
        }
      rbutton.style('background-color','red');
      bbutton.style('background-color','white');
      gbutton.style('background-color','green');
      ybutton.style('background-color','yellow');
    }
  else if(col=='g')
    {
      if(gn==0)
        {
          oscg.start();
          gn=1;
        }
      rbutton.style('background-color','red');
      bbutton.style('background-color','blue');
      gbutton.style('background-color','white');
      ybutton.style('background-color','yellow');
    }
  else if(col=='y')
    {
      if(yn==0)
        {
          oscy.start();
          yn=1;
        }
      rbutton.style('background-color','red');
      bbutton.style('background-color','blue');
      gbutton.style('background-color','green');
      ybutton.style('background-color','white');
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  rx=windowWidth/4-windowWidth/4;
  ry=windowHeight/4-windowHeight/2/2+100;
  bx=windowWidth*3/4-windowWidth/2/2;
  by=windowHeight/4-windowHeight/2/2+100;
  gx=windowWidth/4-windowWidth/2/2;
  gy=windowHeight*3/4-windowHeight/2/2+50;
  yx=windowWidth*3/4-windowWidth/2/2;
  yy=windowHeight*3/4-windowHeight/2/2+50;
  if(mode==1)
    {
      rbutton.position(rx,ry);
      bbutton.position(bx,by);
      gbutton.position(gx,gy);
      ybutton.position(yx,yy);
    }
  else
    {
      if(curscore%4==0)
        {
          rbutton.position(rx,ry);
          bbutton.position(bx,by);
          gbutton.position(gx,gy);
          ybutton.position(yx,yy);
        }
      else if(curscore%4==1)
        {
          rbutton.position(bx,by);
          bbutton.position(yx,yy);
          gbutton.position(rx,ry);
          ybutton.position(gx,gy);
        }
      else if(curscore%4==2)
        {
          rbutton.position(yx,yy);
          bbutton.position(gx,gy);
          gbutton.position(bx,by);
          ybutton.position(rx,ry);
        }
      else if(curscore%4==3)
        {
          rbutton.position(gx,gy);
          bbutton.position(rx,ry);
          gbutton.position(yx,yy);
          ybutton.position(bx,by);
        }
    }
  
  rbutton.size(windowWidth/2,windowHeight/2-50);
  bbutton.size(windowWidth/2,windowHeight/2-50);
  gbutton.size(windowWidth/2,windowHeight/2-50);
  ybutton.size(windowWidth/2,windowHeight/2-50);
  
  startbutton.position(windowWidth/2-windowWidth/16-windowWidth/8, windowHeight/2-windowHeight/16+50);
  startbutton.size(windowWidth/8,windowHeight/8);
  
  hardbutton.position(windowWidth/2-windowWidth/16+windowWidth/8, windowHeight/2-windowHeight/16+50);
  hardbutton.size(windowWidth/8,windowHeight/8);
  
  avgsize=(windowWidth+windowHeight)/2/70;
  fsize=avgsize+'px';
}
