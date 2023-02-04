import mongoose from "mongoose";
import bcrypt from "bcrypt";

/*
    1. import 몽구스
    2. 스키마 만들기
    3. 모델 만들기
    4. export default 모델
*/

//model schema를 만들어준다. schema는 데이터가 어떤식으로 생겼는지 알려주는 것. 
const userSchema = new mongoose.Schema({
    name : { type: String, required : true, trim : true }, 
    avatarUrl : String,
    socialOnly : {type : Boolean, default : false},
    email :  { type: String, required : true, trim : true, unique : true },
    password :  { type: String },
    username : {type : String, required : true, trim : true, unique : true },
    location : {type : String, trim : true },
    videos : [{ type : mongoose.Schema.Types.ObjectId , ref : "Video"}],
});

//비밀번호 저장 전 해시화 
userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 5);
});

const userModel = mongoose.model("User", userSchema);
export default userModel;