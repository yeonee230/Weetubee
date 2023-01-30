//1. express를 import한다. 
import express from "express";
import {trending} from "../controllers/videoControllers";
import {join} from "../controllers/userControllers";

//2. 변수 설정한다. 
const globalRouter = express.Router();

//4. globalRouter가 get 할 urls을 설정한다. 
globalRouter.get("/",trending);
globalRouter.get("/join",join);

//3. 변수를 export default해준다. export default는 한 파일당 하나만 export 가능하다. 
export default globalRouter;