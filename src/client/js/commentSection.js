const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
// const delBtn = document.querySelector(".video__comments #del-btn");
const comment = document.getElementById("videoComment");
//let deleteComments = document.querySelectorAll("#delete__comment");
let delBtn = document.querySelectorAll("#del-btn");


const addComment = (text, id) => {
 const videoComments = document.querySelector(".video__comments-list ul");
 const newComment = document.createElement("li");
 
 const icon = document.createElement("i");
 const span = document.createElement("span");
//  const iconX = document.createElement("i");
const span2 = document.createElement("span");
 newComment.className="video__comment";
 newComment.dataset.id = id;
 
 icon.className = "fa-sharp fa-regular fa-comment";
//  iconX.className = "fa-regular fa-x del-btn";
 span.innerText = ` ${text}`;
 span2.innerText = "❌";
 span2.id="del-btn";


 newComment.appendChild(icon);
 newComment.appendChild(span);
 newComment.appendChild(span2);
//  newComment.appendChild(iconX);
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
    const response = await fetch(`/api/videos/${video_id}/comment`,{
        method : "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({text}),
    });
 
    
    
    
    if(response.status === 201){
        textarea.value = ""; //text창을 비운다. 
        const {newCommentId} = await response.json();
        
        addComment(text,newCommentId);
    }

    deleteComment = document.getElementById("del-btn");
    deleteComment.removeEventListener("click", handleDelClick);
    deleteComment.addEventListener("click", handleDelClick);

};

//댓글 삭제 버튼 클릭시 
const handleDelClick = async (event) => {
    //console.log('event::',event);
    const delComment = event.srcElement.parentNode;
    const delCommentId = delComment.dataset.id;
    console.log('delComment::',delComment);
    
    //const comment_id = comment.dataset.id;
    const response = await fetch(`/api/comments/${delCommentId}`,{
        method : "DELETE",
    });

    //백엔드에서 삭제 성공시 
    if(response.status === 200){
        //html에서 해당 코멘트 삭제 

        // const {commentId} = await response.json();     
        // const data = comment.getAttribute("data-id");
        delComment.remove();

    }

};

if(form){
    form.addEventListener("submit", handleSubmit);
}

//delBtn.addEventListener("click", handleDelClick);
if (delBtn) {
    delBtn.forEach((delBtn) => {
        delBtn.addEventListener("click", handleDelClick);
    });
}