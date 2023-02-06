const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

let volumeValue = 0.5;
video.volume = volumeValue;

//Play
const handlePlayClick = (event) => {
  //if 클릭하면 플레이
  //else pose
  if (video.paused) {
    //paused ===true 멈춤 만약 비디오가 멈춤상태면 클릭하면-> 플레이됨.
    video.play();
  } else {
    video.pause();
  }
};
const handlePlay = () => {
  playBtn.innerText = "멈춤";
};
const handlePause = () => {
  playBtn.innerText = "재생";
};

//Mute
const handleMuteClick = (event) => {
  if (video.muted) {
    //video 가 mute 상태면 클릭하면-> unmute 됨.
    video.muted = false;
    video.volume = volumeValue; //*
  } else {
    video.muted = true;
  }

  muteBtn.innerText = video.muted ? "Unmute1" : "Mute1";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

//Volume Range
const handleVolumeRange = (event) => {
  //event.target.value에서 값 받을 수 있다.
  const {
    target: { value },
  } = event;

  if (video.muted) {
    //비디오가 mute상태일때 range변화가 있으면
    video.muted = false; // 다시 소리나고
    muteBtn.innerText = "Mute2"; // 버튼도 바껴야함.
  }

  if (Number(value) === 0) {
    //*
    video.muted == true;
    muteBtn.innerText = "Unmute2";
  }

  video.volume = value; // 실제 볼륨 변경

  //volumeValue = value; // volumeValue 값 변경
};

const handleChangeVolumeRange = (event) => {
  //*
  const {
    target: { value },
  } = event;

  if (value != 0) {
    volumeValue = value;
  }
};

//Duration & Current time 
const handleLoadedmetadata = () => {
  totalTime.innerText = Math.floor(video.duration);
};
const handleTimeupdate = () => {
  currentTime.innerText = Math.floor(video.currentTime);
};

playBtn.addEventListener("click", handlePlayClick);
video.addEventListener("play", handlePlay);
video.addEventListener("pause", handlePause);

muteBtn.addEventListener("click", handleMuteClick);

volumeRange.addEventListener("input", handleVolumeRange);
volumeRange.addEventListener("change", handleChangeVolumeRange);

video.addEventListener("loadedmetadata", handleLoadedmetadata);
video.addEventListener("timeupdate", handleTimeupdate);
