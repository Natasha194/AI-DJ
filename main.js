var capture;
var song = "";
rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

scoreLeftWrist = 0;



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
    console.log('Right Wrist X: ' + rightWristX + 'Right Wrist Y: ' + rightWristY + 'Left Wrist X: ' + leftWristX + 'Left Wrist Y: ' + leftWristY);
  }
}



function play() {
  song.play();
  song.setVolume(volume);
  song.rate(1);
}