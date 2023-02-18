import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server.js";

const PORT = process.env.PORT || 4000;
//외부 접속을 listening함. 
const handleListening = () => console.log(`✅ server listening on port ${PORT}`);

app.listen(PORT, handleListening); // 서버가 port 4000의 request(handleListening 콜백) 를 받는다. 
//listen() is the code that opens the port to listen for connections.

