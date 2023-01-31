import Video from "../models/Video"; //설정해둔 video model가져온다. 

//export 해주면 다른 파일에서 이 함수를 import할 수 있다. 
export const home = async(req, res) => {
    const videos = await Video.find({});
    return res.render("home", { pageName : "Home", videos});//home.pug 템플릿으로 videos 어레이를 전달한다. 
};

export const watch = async (req, res) => {
    //비디오 id 값을 파라미터에서 받는다.
    //db에서 해당 비디오 data 값을 id를 통해 찾아서 watch.pug 템플릿으로 보낸다. 
    const {id} = req.params;
    const video = await Video.findById(id);

    if(!video){//비디오가 없을 경우
        return res.render("404", { pageName : "Video not found!"});
    };

    return res.render("watch", { pageName : video.title , video});
};

export const getEdit = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id);

    if(!video){//비디오가 없을 경우
        return res.render("404", { pageName : "Video not found!"});
    }

    return res.render("edit", { pageName : video.title , video});
};

export const postEdit = async(req, res) =>{
    const {id} = req.params;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({ _id : id}); //exists() : 해당 id의 비디오가 있냐 없냐만 true/false로 알려줌.

    if(!video){//비디오가 없을 경우 video = false 
        return res.render("404", { pageName : "Video not found!"});
    }

    await Video.findByIdAndUpdate( id, {
        title,
        description,
        hashtags : Video.formatHashtags(hashtags),
    });

    return res.redirect(`/videos/${id}`);

};

export const remove = (req, res) => res.send("delete video! ");
export const search = (req, res) => res.send("search video!");

export const getUpload = (req, res) => { 
    return res.render("upload",{ pageName : "Upload"});
};


export const postUpload = async(req, res) => {
    const { title, description, hashtags} = req.body;
    //console.log(title, description, hashtags);

    //mongoDB에 저장하는 두번째 방법 
    try {
        await Video.create({
            title,
            description,
            hashtags : Video.formatHashtags(hashtags),
        });
        return res.redirect("/");

    } catch (error) {
        return res.render("upload",{ 
            pageName : "Upload", 
            errorMsg : error._message,
        });
    };
    


    //mongoDB에 저장하는 첫번째 방법 
    // const video = new Video({
    //     title,
    //     description,
    //     createdAt : Date.now(),
    //     hashtags : hashtags.split(",").map( word => !word.trim().startsWith("#") ? `#${word.trim()}` : word.trim()),
    //     meta : {
    //         views : 0,
    //         rating : 0,
    //     },
    // });
    // await video.save(); //db에 저장된다. 
    

   
};

