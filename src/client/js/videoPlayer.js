const video = document.querySelector("video")
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");

//Play
const handlePlayClick = (event) =>{
    //if 클릭하면 플레이 
    //else pose
    if(video.paused){ //paused ===true 멈춤 만약 비디오가 멈춤상태면 클릭하면-> 플레이됨.
        video.play();
    }else{
        video.pause();
    }

}
const handlePlay =()=> {playBtn.innerText= "멈춤";}
const handlePause =()=> {playBtn.innerText= "재생";}

//Mute
const handleMuteClick = (event) =>{
    if(video.muted){ //video 가 mute 상태면 클릭하면-> unmute 됨.
        video.muted = false;
        
    }else{
        video.muted = true;
       
    }

    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    volumeRange.value = video.muted ? 0 : 0.5 ;

}

playBtn.addEventListener("click", handlePlayClick);
video.addEventListener("play", handlePlay);
video.addEventListener("pause", handlePause);

muteBtn.addEventListener("click", handleMuteClick);