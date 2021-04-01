/*
A Project by: Anthony Donatelli

FACE DETECTION: MESH

Original Code by: Jeff Thompson | 2021 | jeffreythompson.org
*/

let video;  // webcam input
let model;  // Face Landmarks machine-learning model
let face;   // detected face

let firstFace = true;


function preload() {
  stache = loadImage('stache.png');
  hat = loadImage('chefhat.png');
  chain = loadImage('goldchain.png');
  tattoo = loadImage('tattoo.png');
  wine = loadImage('wine.png');
}

function setup() {
  createCanvas(1080,600);

  sprop=stache.width/stache.height;
  hprop=hat.width/hat.height;
  //cprop=chain.width/chain.height;
  tprop=tattoo.width/tattoo.height;
  wprop=wine.width/wine.height;
  
  video = createCapture(VIDEO);
  video.hide();

  loadFaceModel();
}


async function loadFaceModel() {
  model = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
    
    { maxFaces: 1 }
  );
}


function draw() {

  // get face data if the video and model are both loaded
  if (video.loadedmetadata && model !== undefined) {
    getFace();
  }
  //flip the video horizontally so it doesn't flip movements
  translate(width,0);
  scale(-1,1);
  
  // if we have face data, show us!
  if (face !== undefined) {
    image(video, 0,0, width,height);

    // print info the first time a face is detected
    if (firstFace) {
      console.log(face);
      firstFace = false;
    }

    // this model gives us a *ton* of data!
    // first, let's see all the points
    /*
    fill(255);
    noStroke();
    for (let pt of face.scaledMesh) {
      pt = scalePoint(pt);
      circle(pt.x, pt.y, 3);
    }
    */
    
    
    push();
    imageMode(CENTER);
    
    
    pttattoo=scalePoint(face.scaledMesh[280]);
    ptsize7=scalePoint(face.scaledMesh[193]);
    ptsize8=scalePoint(face.scaledMesh[417]);
    ang3=atan2(ptsize8.y-ptsize7.y,ptsize8.x-ptsize7.x);
    push();
    translate(pttattoo.x,pttattoo.y);
    rotate(ang3);
    image(tattoo,0,0,1*abs(ptsize8.x-ptsize7.x),1*abs(ptsize8.x-ptsize7.x)/tprop);
    pop();
    
    
    ptstache=scalePoint(face.scaledMesh[164]);
    ptsize1=scalePoint(face.scaledMesh[216]);
    ptsize2=scalePoint(face.scaledMesh[436]);
    ang1=atan2(ptsize2.y-ptsize1.y,ptsize2.x-ptsize1.x);
    push();
    translate(ptstache.x,ptstache.y);
    rotate(ang1);
    image(stache,0,0,1.5*abs(ptsize2.x-ptsize1.x),1.5*abs(ptsize2.x-ptsize1.x)/sprop);
    pop();
    
    
    pthat=scalePoint(face.scaledMesh[151]);
    ptsize3=scalePoint(face.scaledMesh[108]);
    ptsize4=scalePoint(face.scaledMesh[337]);
    ang2=atan2(ptsize4.y-ptsize3.y,ptsize4.x-ptsize3.x);
    push();
    translate(pthat.x-abs(ptsize4.x-ptsize3.x)/3,pthat.y-3.5*abs(ptsize4.x-ptsize3.x)/hprop);
    //rotate(ang2);
    image(hat,0,0,7*abs(ptsize4.x-ptsize3.x),7*abs(ptsize4.x-ptsize3.x)/hprop);
    pop();
    
    
    
    ptchain=scalePoint(face.scaledMesh[152]);
    ptsize5=scalePoint(face.scaledMesh[83]);
    ptsize6=scalePoint(face.scaledMesh[313]);
    image(chain,ptchain.x,ptchain.y+4*abs(ptsize6.x-ptsize5.x),10.5*abs(ptsize6.x-ptsize5.x),10.5*abs(ptsize6.x-ptsize5.x));
    
    
    ptmouthtop=scalePoint(face.scaledMesh[13]);
    ptmouthbottom=scalePoint(face.scaledMesh[14]);
    pt1=scalePoint(face.scaledMesh[0]);
    pt2=scalePoint(face.scaledMesh[13]);
    if(ptmouthbottom.y-ptmouthtop.y>=(pt2.y-pt1.y)*4)
      {
        ptwine=scalePoint(face.scaledMesh[421]);
        
        push();
        imageMode(CORNER);
        translate(ptwine.x,ptwine.y);
        rotate(ang1);
        rotate(-3*PI/5)
        image(wine,0,0,1*abs(ptsize2.x-ptsize1.x),1*abs(ptsize2.x-ptsize1.x)/wprop);
        pop();
      }
    
    
    pop();
    

    
  }
}


// converts points from video coordinates to canvas
function scalePoint(pt) {
  let x = map(pt[0], 0,video.width, 0,width);
  let y = map(pt[1], 0,video.height, 0,height);
  return createVector(x, y);
}


// gets face points from video input
async function getFace() {
  const predictions = await model.estimateFaces({
    input: document.querySelector('video')
  }); 
  if (predictions.length === 0) {
    face = undefined;
  }
  else {
    face = predictions[0];
  }
}

