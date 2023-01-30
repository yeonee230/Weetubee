import express from "express";
import morgan from "morgan";
//1. 라우터 폴터에서 각 라우터들을 import한다. 
import globalRouter from "./routers/globalRouters";
import userRouter from "./routers/userRouters";
import videoRouter from "./routers/videoRouters";

//앱을 만들고 
const app = express(); //서버를 만들었다. 
const PORT = "4000";
const logger = morgan("dev");// logger middleware 만든다. 



//morgan 사용 
app.use(logger); 

//2.큰주제가 되는 각 라우터들을 use()에 넣는다. 
app.use("/",globalRouter);
app.use("/users",userRouter);
app.use("/videos",videoRouter);




//외부 접속을 listening함. 
const handleListening = () => console.log(`server listening on port ${PORT}`);

app.listen(PORT, handleListening); // 서버가 port 4000의 request(handleListening 콜백) 를 받는다. 

