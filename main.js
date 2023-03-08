song1 = " ";
song2 = " ";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;
status_song1 = " ";
status_song2 = " ";

song1_name = "Peter Pan";
song2_name = "Harry Potter";

function preload()
{
    song1 = loadSound("music2.mp3");
    song2 = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.position(450,200);
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses); 
}

function modelLoaded()
{
    console.log("Posenet model is initialized");
}
function draw()
{
    image(video, 0, 0, 600, 600);
    
    status_song1 = song1.isPlaying();
    status_song2 = song2.isPlaying();

    fill("red");
    stroke("red");

    if(scoreLeftWrist > 0.2)
    {

    circle(leftWristX, leftWristY, 20);
    song2.stop();

    if(status_song1 == false)
    {
        song1.play();
        document.getElementById("update_song_name").innerHTML = "Song Name : " + song1_name;
    }
    }

    if(scoreRightWrist > 0.2)
    {

    circle(rightWristX, rightWristY, 20);
    song1.stop();

    if(status_song2 == false)
    {
        song2.play();
        document.getElementById("update_song_name").innerHTML = "Song Name : " + song2_name;
    }
    }  
    
}
function gotPoses(results)
{
    if(results.length > 0)
                {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score of left wrist = " + scoreLeftWrist + "Score of right wrist" + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist x = " + leftWristX + "Left wrist y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Right wrist x = " + rightWristX + "Right wrist y = " + rightWristY);
    }
}
