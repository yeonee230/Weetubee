import express from "express";

//앱을 만들고 
const app = express(); //서버를 만들었다. 
const PORT = "4000";

const handleHome = (req, res) => {
   return res.end();
}


const loggerMiddleware = (req, res, next) =>{
    console.log(`${req.method} ${req.url}`);
    next();
};



//middleware를 use하는게 먼저 오고, 그 다음 url의 get이 와야한다. 
app.use(loggerMiddleware); //.use()는 global middleware를 만들어준다. = 어느 URL에도 작동하는 middleware를 만든다. 


//root(/) 페이지로 get request 보내면 함수를 동작시킨다. 
app.get("/",handleHome);




//외부 접속을 listening함. 
const handleListening = () => console.log(`server listening on port ${PORT}`);

app.listen(PORT, handleListening); // 서버가 port 4000의 request(handleListening 콜백) 를 받는다. 

