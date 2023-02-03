//1. express를 import한다. 
import express from "express";
import {getEdit,postEdit , logout, see, startGithubLogin, finishGithubLogin} from "../controllers/userControllers";
import {protectMiddeleware, publicOnlyMiddleware} from "../middlewares";

//2. 변수 설정한다. 
const userRouter = express.Router();

//4. userRouter가 get 할 urls을 설정한다. 
userRouter.route("/edit").all(protectMiddeleware).get(getEdit).post(postEdit);
userRouter.get("/logout", protectMiddeleware, logout); //로그아웃 라우터
//userRouter.get("/:id", see);
userRouter.get("/github/start",publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish",publicOnlyMiddleware, finishGithubLogin);


//3. 변수를 export default해준다. export default는 한 파일당 하나만 export 가능하다. 
export default userRouter;