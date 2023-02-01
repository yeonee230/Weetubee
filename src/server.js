
import express from "express";
import morgan from "morgan";
//라우터 폴터에서 각 라우터들을 import한다. 
import rootRouter from "./routers/rootRouters";
import userRouter from "./routers/userRouters";
import videoRouter from "./routers/videoRouters";

const app = express(); //서버를 만들었다. 

const logger = morgan("dev");// logger middleware 만든다. 

//view engine 세팅 
app.set("view engine", "pug"); 
app.set("views", process.cwd() + "/src/views"); //현재작업폴더(cwd) = node.js를 실행하는 파일(package.js)이 있는 폴더임.

//morgan 사용 
app.use(logger); 

//미들웨어니까..
//라우터 전에 실행되어야함. req.body값을 express가 인지할 수 있다. (req.body가 undefined으로 나오기 때문에 필요.)
app.use(express.urlencoded({ extended: true }));

//큰주제가 되는 각 라우터들을 use()에 넣는다. 
app.use("/",rootRouter);
app.use("/users",userRouter);
app.use("/videos",videoRouter);


export default app;





