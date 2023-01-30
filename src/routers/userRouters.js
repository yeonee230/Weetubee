//1. express를 import한다. 
import express from "express";
import {edit, remove, logout, see} from "../controllers/userControllers";

//2. 변수 설정한다. 
const userRouter = express.Router();

//4. userRouter가 get 할 urls을 설정한다. 
userRouter.get("/edit", edit);
userRouter.get("/delete", remove);
userRouter.get("/logout", logout);
userRouter.get("/:id", see);


//3. 변수를 export default해준다. export default는 한 파일당 하나만 export 가능하다. 
export default userRouter;