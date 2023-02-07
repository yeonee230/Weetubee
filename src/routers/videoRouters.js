//1. express를 import한다. 
import express from "express";
import {getUpload, postUpload, watch, getEdit, postEdit, delVideo} from "../controllers/videoControllers";
import {protectMiddeleware, uploadVideoMiddleware} from "../middlewares";

//2. 변수 설정한다. 
const videoRouter = express.Router();

//4. globalRouter가 get 할 urls을 설정한다. 
// :는 url parameter 이다. url 안에 변수를 넣을 수 있게 해준다. 
//  /:id가 /upload 보다 위에 위치하면 express가 upload를 id로 인식하게 된다. 그래서 제일 위에 넣어준다.정규식 추가해주면 상관없음. 
videoRouter.route("/upload").all(protectMiddeleware).get(getUpload)
.post(uploadVideoMiddleware.fields([{name:"videoFile", maxCount:1},{name:"thumbFile", maxCount:1}]),//html input의 name attribute로 넘긴 값. 
     postUpload);   
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectMiddeleware).get(getEdit).post(postEdit);
videoRouter.all(protectMiddeleware).get("/:id([0-9a-f]{24})/delete",delVideo);


//3. 변수를 export default해준다. export default는 한 파일당 하나만 export 가능하다. 
export default videoRouter;