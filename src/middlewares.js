
export const localsMiddleware = (req,res,next) =>{
//locals에 저장하면 pug 템플릿에서 읽을 수 있다. 
    res.locals.siteName = "Wetube";
    res.locals.loggedIn = Boolean(req.session.loggedIn); //세션로그인이 true면 
    res.locals.loggedInUser = req.session.user;
    next();
};