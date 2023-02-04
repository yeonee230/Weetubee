import mongoose from "mongoose";

//model schema를 만들어준다. schema는 데이터가 어떤식으로 생겼는지 알려주는 것. 
const videoSchema = new mongoose.Schema({
    title : { type: String, required : true, trim : true, maxLength: 30},
    videoFile : {type: String, required :true },
    description :  { type: String, required : true, trim : true, minLength: 20},
    createdAt :  { type: Date , required : true, default: Date.now},
    hashtags : [{type : String, trim : true}],
    meta : {
        views : { type: Number, default: 0,  required : true },
        rating :{ type: Number, default: 0,  required : true },
    },
    owner :{ type : mongoose.Schema.Types.ObjectId , required: true, ref : "User"},
});

//모델을 만들기 전에 mongoose middleware를 만든다. 
// videoSchema.pre("save", async function(){
//     this.hashtags = this.hashtags[0]
//     .split(",")
//     .map( (word) => (word.trim().startsWith("#") ? word.trim() : `#${word.trim()}`));
// });

videoSchema.static("formatHashtags", function(hashtags) {
    return hashtags.split(",")
                   .map( (word) => (word.trim().startsWith("#") ? word.trim() : `#${word.trim()}`));
    
})

const videoModel = mongoose.model("Video", videoSchema);
export default videoModel;
