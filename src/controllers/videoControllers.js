//export 해주면 다른 파일에서 이 함수를 import할 수 있다. 
export const trending = (req, res) => res.render("home", { pageName : "Home" });
export const see = (req, res) => res.render("watch", { pageName : "Watch"});
export const edit = (req, res) => res.send("edit video! ");
export const remove = (req, res) => res.send("delete video! ");
export const search = (req, res) => res.send("search video!");

export const getUpload = (req, res) => { 
    return res.render("upload",{ pageName : "Upload"})
};


export const postUpload = (req, res) => {
    const { title, description, hashtags} = req.body;
    console.log(title + description + hashtags);

    return res.redirect("/");
};

