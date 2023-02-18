const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
//icon
const playBtnIcon = playBtn.querySelector("i");
const fullScreenBtnIncon = fullScreenBtn.querySelector("i");
//const muteBtnIcon = muteBtn.querySelector("i");

let controlsInVideoTimeout = null;
let controlsTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

//Play
const handlePlayClick = (event) => {

  if(video.paused){
    video.play();
    videoControls.classList.add("showing"); 
    setTimeout(hideControls, 2000);
  }else{
    video.pause();
    videoControls.classList.add("showing"); 
  }
  // //if 클릭하면 플레이
  // //else pose
  // if (video.paused) {
  //   //paused ===true 멈춤 만약 비디오가 멈춤상태면 클릭하면-> 플레이됨.
  //   video.play();
  // } else {
  //   video.pause();
  //   //videoControls.classList.add("showing");
  // }
};

const handlePlay = () => {//<i class="fa-duotone fa-pause"></i>
playBtnIcon.classList = "fa-solid fa-pause";//멈춤
};
const handlePause = () => {
  playBtnIcon.classList = "fa-solid fa-play";//재생
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

//Time formatting 방법1
const timeFormat = (seconds) => {
  const start = seconds >= 3600 ? 11 : 14;
  return new Date(seconds * 1000).toISOString().substring(start, 19);
};
//Time formatting 방법2
function formatTime(targetSeconds) {
  const totalSeconds = parseInt(targetSeconds, 10);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  let seconds = totalSeconds - hours * 3600 - minutes * 60;

  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");

  if (hours === "00") {
    return `${minutes}:${seconds}`;
  }
  return `${hours}:${minutes}:${seconds}`;
}

//Duration & Current time
const handleLoadedmetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};
const handleTimeupdate = () => {
  currentTime.innerText = timeFormat(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

//Timeline
const handleTimeline = (event) => {
  const {
    target: { value },
  } = event; //timeline range의 value 값
  video.currentTime = value;
};

//Fullsreen
const handlefullScreen = () => {
  //버튼 클릭
  const fullScreen = document.fullscreenElement;

  if (fullScreen) {
    //full screen 이 null 이 아닐때(풀스크린일때) 버튼클릭하면
    document.exitFullscreen(); //나간다.
    fullScreenBtnIncon.classList = "fa-solid fa-expand"; //open fullscreen
  } else {
    //fullScreen === null 풀스크린 아닐때 버튼클릭하면
    videoContainer.requestFullscreen(); //풀스크린 된다.
    fullScreenBtnIncon.classList = "fa-solid fa-compress";//close fullscreen 
  }
};
//esc 키로 나가면 버튼 변경
document.onfullscreenchange = () => {
  const fullscreen = document.fullscreenElement;
  if (!fullscreen) {
    fullScreenBtnIncon.classList = "fa-solid fa-expand";
  }
};

//Video Controls
const hideControls = () => videoControls.classList.remove("showing");

const handleMousemove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }

  // timeout id를 받았을 때만 실행됨. (cancel timeout)
  if (controlsInVideoTimeout) {
    //controlsInVideoTimeout 안에 숫자 있을 때 실행
    clearTimeout(controlsInVideoTimeout); // 타임아웃 숫자 지운다.
    controlsInVideoTimeout = null;
  }

  //(making timeout)
  videoControls.classList.add("showing");
  //setTimeout은 브라우저로 부터 실행될때마다 id값을 받는다.
  controlsInVideoTimeout = setTimeout(hideControls, 2000);
};

const handleMouseleave = () => {
  //setTimeout은 브라우저로 부터 실행될때마다 id값을 받는다.
  controlsTimeout = setTimeout(hideControls, 2000);
};

//Video screen click 
const handleVideoClick = (event) => {
  
  handlePlayClick();
  
};

const handleVideoKeyboard = (event) => {
  if((event.target !== textarea) && event.keyCode == 32){
    event.preventDefault(); //스페이스바를 누르면 브라우저가 아래로 스크롤 되는 것을 방지하기 위해서
    handlePlayClick();
  }
  
  
};

//View register
const handleEndedVideo = () => {
  const {id} = videoContainer.dataset;
  // console.log(videoContainer.dataset);
  // console.log(id);
  
  fetch(`/api/videos/${id}/view`,{
    method : "POST",
  });
};


playBtn.addEventListener("click", handlePlayClick);
video.addEventListener("play", handlePlay);
video.addEventListener("pause", handlePause);

muteBtn.addEventListener("click", handleMuteClick);

volumeRange.addEventListener("input", handleVolumeRange);
volumeRange.addEventListener("change", handleChangeVolumeRange);

//video.addEventListener("loadedmetadata", handleLoadedmetadata);
video.addEventListener("canplay", handleLoadedmetadata);
handleLoadedmetadata();
video.addEventListener("timeupdate", handleTimeupdate);

timeline.addEventListener("input", handleTimeline);

fullScreenBtn.addEventListener("click", handlefullScreen);

videoContainer.addEventListener("mousemove", handleMousemove);
videoContainer.addEventListener("mouseleave", handleMouseleave);

video.addEventListener("click", handleVideoClick);
window.addEventListener("keydown", handleVideoKeyboard);

video.addEventListener("ended", handleEndedVideo);


//<i class="fa-solid fa-compress"></i> fullscreen closed
//<i class="fa-duotone fa-pause"></i> uaused
//<i class="fa-solid fa-volume-xmark"></i> mute
//<i class="fa-solid fa-volume"></i> unmute