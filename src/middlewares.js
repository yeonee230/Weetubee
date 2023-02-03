import multer from "multer";

export const localsMiddleware = (req,res,next) =>{
//locals에 저장하면 pug 템플릿에서 읽을 수 있다. 
    res.locals.siteName = "Wetube";
    res.locals.loggedIn = Boolean(req.session.loggedIn); //세션로그인이 true면 
    res.locals.loggedInUser = req.session.user || {};
    console.log(` session에 있는 사용자 정보 :  ${req.session.user}`);
    
    next();
};


//라우터 보호 1. 로그인한 사용자만 사용 가능. 
export const protectMiddeleware = (req, res, next) =>{
    if(req.session.loggedIn){
        return next();
    }else{
        return res.redirect("/login");
    }
};
//라우터 보호 2. 로그인하지 않은 사용자만 사용 가능. 
export const publicOnlyMiddleware = (req, res, next ) => {
    if(!req.session.loggedIn){
        return next();
    }else{
        return res.redirect("/");
    }

};

//multer 이미지 파일 업로드 미들웨어 
export const uploadImgMiddleware = multer({ dest: 'uploads/' });