import mongoose from "mongoose";

//model schema를 만들어준다. schema는 데이터가 어떤식으로 생겼는지 알려주는 것. 
const videoSchema = mongoose.Schema({
    title : String,
    description : String,
    createdAt : Date,
    hashtags : [{type : String}],
    meta : {
        views : Number,
        rating : Number,
    },
});

const videoModel = mongoose.model("video", videoSchema);
export default videoModel;
