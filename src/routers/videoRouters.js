//1. express를 import한다. 
import express from "express";
import {edit, remove} from "../controllers/videoControllers";

//2. 변수 설정한다. 
const videoRouter = express.Router();

//4. globalRouter가 get 할 urls을 설정한다. 
videoRouter.get("/edit",edit);
videoRouter.get("/delete",remove);

//3. 변수를 export default해준다. export default는 한 파일당 하나만 export 가능하다. 
export default videoRouter;