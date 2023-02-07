import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const actionBtn = document.getElementById("actionBtn");
const video = document.getElementById("preview");

let stream;
let mediaRecorder;
let videoFile;

const downloadFile = (fileUrl, fileName) => {
    const a = document.createElement("a");
    a.href=fileUrl;
    a.download= fileName;
    document.body.appendChild(a);
    a.click();
};

const handleDownload = async () => {
    actionBtn.removeEventListener("click",handleDownload);
    actionBtn.innerText = "Transcoding...";
    actionBtn.disabled = true;
    const file ={
        input:"recording.webm",
        output:"output.mp4",
        thumb:"thumbnail.jpg",
    };

    const ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load();
    ffmpeg.FS("writeFile", file.input, await fetchFile(videoFile));
    await ffmpeg.run("-i", file.input, "-r", "60",file.output); //영상을 초당 60프레임으로 인코딩
    await ffmpeg.run("-i", file.input, "-ss", "00:00:01", "-frames:v","1", file.thumb);

    const mp4File = ffmpeg.FS("readFile",file.output);
    const thumbFile = ffmpeg.FS("readFile", file.thumb);

    const mp4Blob = new Blob([mp4File.buffer],{type: "video/mp4"});
    const thumbBlob = new Blob([thumbFile.buffer],{type: "image/jpg"});

    const mp4Url = URL.createObjectURL(mp4Blob);
    const thumbUrl = URL.createObjectURL(thumbBlob);

    downloadFile(mp4Url,"MyVideo.mp4");
    downloadFile(thumbUrl,"MyThumbnail.jpg");
    
    //Closing camera after downloading
    // video.pause();
    // video.src = "";
    // stream.getTracks()[0].stop(); 

    ffmpeg.FS("unlink", file.input);
    ffmpeg.FS("unlink", file.output);
    ffmpeg.FS("unlink", file.thumb);
    URL.revokeObjectURL(mp4Url);
    URL.revokeObjectURL(thumbUrl);
    URL.revokeObjectURL(videoFile);
    
    actionBtn.disabled = false;
    init();
    actionBtn.innerText = "Start Recording";
    actionBtn.addEventListener("click",handleStart);
};

const handleStart = () => {
    actionBtn.innerText="Stop Recording";
    actionBtn.removeEventListener("click", handleStart);
    actionBtn.addEventListener("click", handleStop);
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
    actionBtn.innerText="Download Recording";
    actionBtn.removeEventListener("click", handleStop);
    actionBtn.addEventListener("click", handleDownload);
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

actionBtn.addEventListener("click", handleStart);
