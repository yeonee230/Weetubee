//1. express를 import한다. 
import express from "express";
import {home, search} from "../controllers/videoControllers";
import {getJoin, postJoin, login} from "../controllers/userControllers";

//2. 변수 설정한다. 
const rootRouter = express.Router();

//4. globalRouter가 get 할 urls을 설정한다. 
rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.get("/login", login);
rootRouter.get("/search", search);

//3. 변수를 export default해준다. export default는 한 파일당 하나만 export 가능하다. 
export default rootRouter;