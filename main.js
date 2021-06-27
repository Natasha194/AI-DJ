var capture;
var song = "";
rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

scoreLeftWrist = 0;
var scoreRightWrist = 0;



numberLeftWristY = 0;

function setup() {
  canvas =  createCanvas(450, 390);
  canvas.center();
    capture = createCapture(VIDEO);
    capture.hide();
    poseNet = ml5.poseNet(capture, modelLoaded);
    poseNet.on('pose', gotPoses);
  }

function modelLoaded() {
  console.log('poseNet is initalized');
}
  
function draw() {  
  push();
  translate(width,0);
  scale(-1, 1);
  image(capture, 0, 0, 450, 390);
  pop();



  if (scoreRightWrist > 0.2) {

  fill("#FFFFFF");
  stroke("#FFFFFF");

  

  circle(rightWristX, rightWristY, 20);

  if(rightWristY > 0 && rightWristY <= 78) {
    song.rate(0.5);
    document.getElementById("speed").innerHTML = "0.5";
  }
  else if(rightWristY > 78 && rightWristY <= 156) {
    song.rate(1);
    document.getElementById("speed").innerHTML = "1";
  }

  else if(rightWristY > 156 && rightWristY <= 234) {
    song.rate(1.5);
    document.getElementById("speed").innerHTML = "1.5";
  }
  else if(rightWristY > 234 && rightWristY <= 312) {
    song.rate(2);
    document.getElementById("speed").innerHTML = "2";
  }
  else if(rightWristY > 312 && rightWristY <= 390) {
    song.rate(2.5);
    document.getElementById("speed").innerHTML = "2.5";
  }

}

  


if(scoreLeftWrist > 0.2) {
   fill("#000000");
  stroke("#000000");

  circle(leftWristX, leftWristY, 20);

  numberLeftWristY = Number(leftWristY);

  numberLeftWristYround = floor(numberLeftWristY);
  console.log(numberLeftWristYround);

  volume = numberLeftWristYround/600;
  console.log(volume);

  song.setVolume(volume);
  
  document.getElementById("volume").innerHTML = volume;

}

  
}

function preload() {
  song = loadSound("music.mp3");
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;

    leftWristX = results[0].pose.rightWrist.x;
    leftWristY = results[0].pose.leftWrist.y;

    scoreLeftWrist = results[0].pose.keypoints[9].score;
    scoreRightWrist = results[0].pose.keypoints[10].score;
    console.log('Right Wrist X: ' + rightWristX + 'Right Wrist Y: ' + rightWristY + 'Left Wrist X: ' + leftWristX + 'Left Wrist Y: ' + leftWristY);
  }
}



function play() {
  song.play();
  song.setVolume(1);
  song.rate(1);
}

function stop() {
  song.stop();
}