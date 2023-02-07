const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let mediaRecorder;
let videoFile;

const handleDownload = () => {
    const a = document.createElement("a");
    a.href=videoFile;
    a.download="MyVideo.webm";
    document.body.appendChild(a);
    a.click();
    //Closing camera after downloading
    // video.pause();
    // video.src = "";
    // stream.getTracks()[0].stop(); 
};

const handleStartBtn = () => {
    startBtn.innerText="Stop Recording";
    startBtn.removeEventListener("click", handleStartBtn);
    startBtn.addEventListener("click", handleStop);
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
        videoFile = URL.createObjectURL(event.data);
        video.srcObject = null;
        video.src = videoFile;
        video.loop = true;
        video.play();
    };

    mediaRecorder.start();
};

const handleStop = () => {
    startBtn.innerText="Download Recording";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleDownload);
    mediaRecorder.stop();
};

const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      height: 300,
      width: 200,
    },
  });
  //console.log(stream);
  video.srcObject = stream;
  video.play();
};
init()

startBtn.addEventListener("click", handleStartBtn);
