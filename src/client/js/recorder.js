import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let mediaRecorder;
let videoFile;

const handleDownload = async () => {

    const ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load();
    ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));
    await ffmpeg.run("-i", "recording.webm", "-r", "60","output.mp4"); //영상을 초당 60프레임으로 인코딩

    const mp4File = ffmpeg.FS("readFile","output.mp4");
    const mp4Blob = new Blob([mp4File.buffer],{type: "video/mp4"});
    const mp4Url = URL.createObjectURL(mp4Blob);

    const a = document.createElement("a");
    a.href=mp4Url;
    a.download="MyVideo.mp4";
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
