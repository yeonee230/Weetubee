import Video from "../models/Video"; //설정해둔 video model가져온다. 

//export 해주면 다른 파일에서 이 함수를 import할 수 있다. 
export const trending = (req, res) => res.render("home", { pageName : "Home" });
export const see = (req, res) => res.render("watch", { pageName : "Watch"});
export const edit = (req, res) => res.send("edit video! ");
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
            createdAt : Date.now(),
            hashtags : hashtags.split(",").map( word => !word.trim().startsWith("#") ? `#${word.trim()}` : word.trim()),
            meta : {
                views : 0,
                rating : 0,
            },
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

