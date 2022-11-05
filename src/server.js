import express from "express";

const app = express(); //서버를 만들었다. 
const PORT = "4000";

const handleListening = () => console.log(`server listening on port ${PORT}`);

app.listen(PORT, handleListening); // 서버가 port 4000의 request(handleListening 콜백) 를 받는다. 




