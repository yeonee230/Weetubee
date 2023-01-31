import mongoose from "mongoose";

//model schema를 만들어준다. schema는 데이터가 어떤식으로 생겼는지 알려주는 것. 
const videoSchema = new mongoose.Schema({
    title : { type: String, required : true, trim : true },
    description :  { type: String, required : true, trim : true},
    createdAt :  { type: Date , required : true, default: Date.now},
    hashtags : [{type : String, trim : true}],
    meta : {
        views : { type: Number, default: 0,  required : true },
        rating :{ type: Number, default: 0,  required : true },
    },
});

const videoModel = mongoose.model("video", videoSchema);
export default videoModel;
