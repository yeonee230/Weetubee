const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text) => {
 const videoComments = document.querySelector(".video__comments ul");
 const newComment = document.createElement("li");
 const icon = document.createElement("i");
 const span = document.createElement("span");
 newComment.className="video__comment";
 icon.className = "fa-sharp fa-regular fa-comment";
 span.innerText = ` ${text}`;
 newComment.appendChild(icon);
 newComment.appendChild(span);
 videoComments.prepend(newComment);

};
const handleSubmit = async (event) => {
    const textarea = form.querySelector("textarea");
    event.preventDefault();
    
    //코멘트 내용 가져오고 -> 비디오id 가져오고 
    //-> session에서 user id가져오고
    const text = textarea.value;
    const video_id = videoContainer.dataset.id;
    if (text.trim() === "") { //comment에 아무것도 입력 안되어 있을 때 
        return;
      }
    const {status} = await fetch(`/api/videos/${video_id}/comment`,{
        method : "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({text}),
    });
 
    textarea.value = ""; //text창을 비운다. 
    
    if(status === 201){
        addComment(text);
    }

};

if(form){
    form.addEventListener("submit", handleSubmit);

}