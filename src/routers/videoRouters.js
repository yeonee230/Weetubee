//1. express를 import한다. 
import express from "express";
import {getUpload, postUpload, watch, getEdit, postEdit, delVideo} from "../controllers/videoControllers";

//2. 변수 설정한다. 
const videoRouter = express.Router();

//4. globalRouter가 get 할 urls을 설정한다. 
// :는 url parameter 이다. url 안에 변수를 넣을 수 있게 해준다. 
//  /:id가 /upload 보다 위에 위치하면 express가 upload를 id로 인식하게 된다. 그래서 제일 위에 넣어준다.
videoRouter.route("/upload").get(getUpload).post(postUpload);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete",delVideo);


//3. 변수를 export default해준다. export default는 한 파일당 하나만 export 가능하다. 
export default videoRouter;