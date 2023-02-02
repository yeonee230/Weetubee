//1. express를 import한다. 
import express from "express";
import {edit, logout, see, startGithubLogin, finishGithubLogin} from "../controllers/userControllers";

//2. 변수 설정한다. 
const userRouter = express.Router();

//4. userRouter가 get 할 urls을 설정한다. 
userRouter.get("/edit", edit);
userRouter.get("/logout", logout); //로그아웃 라우터
userRouter.get("/:id", see);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);


//3. 변수를 export default해준다. export default는 한 파일당 하나만 export 가능하다. 
export default userRouter;