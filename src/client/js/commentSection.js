const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");


const handleSubmit = (event) => {
    const textarea = form.querySelector("textarea");
    event.preventDefault();
    
    //코멘트 내용 가져오고 -> 비디오id 가져오고 
    //-> session에서 user id가져오고
    const text = textarea.value;
    const video_id = videoContainer.dataset.id;
    if (text.trim() === "") { //comment에 아무것도 입력 안되어 있을 때 
        return;
      }
    fetch(`/api/videos/${video_id}/comment`,{
        method : "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({text}),
    });
 
    textarea.value = ""; //text창을 비운다. 
    


};

if(form){
    form.addEventListener("submit", handleSubmit);

}