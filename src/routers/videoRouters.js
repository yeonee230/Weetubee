//1. express를 import한다. 
import express from "express";
import {upload,see, edit, remove} from "../controllers/videoControllers";

//2. 변수 설정한다. 
const videoRouter = express.Router();

//4. globalRouter가 get 할 urls을 설정한다. 
videoRouter.get("/upload", upload);
videoRouter.get("/:id", see);
videoRouter.get("/:id/edit",edit);
videoRouter.get("/:id/delete",remove);

//3. 변수를 export default해준다. export default는 한 파일당 하나만 export 가능하다. 
export default videoRouter;