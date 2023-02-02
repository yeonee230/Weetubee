import User from "../models/User";
import bcrypt from "bcrypt";

//export 해주면 다른 파일에서 이 함수를 import할 수 있다. 
export const getJoin = (req, res) => {
    return res.render("join",{pageName : "Join"});
};
export const postJoin = async(req, res) => {
    //1. post로 넘긴 값 받기 
    //2. db에 create()하기 
    //3. 로그인 페이지 리턴 
    const {email,password,password2,name,username,location} = req.body;
    const pageTitle = "Join";

    //비밀번호 확인 
    if(password !== password2){
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "Password confirmation does not match.",
          });
    }

    //username과 email 중복 검사 방법2
    const exist = await User.exists({ $or : [{username}, {email}] });
    if(exist){
        return res.status(400).render("join",{
            pageTitle,
            errorMessage: "This username/email is already taken.",
        });

    }

    //username과 email 중복 검사 방법1
    // const usernameCheck = await User.exists({username});// true or false 리턴
    // if(usernameCheck) {
    //     return res.status(400).render("join",{
    //         pageTitle,
    //         errorMessage: "This username is already taken.",
    //     });
    // }
    // const emailCheck = await User.exists({email});// true or false 리턴
    // if(emailCheck) {
    //     return res.status(400).render("join",{
    //         pageTitle,
    //         errorMessage: "This email is already taken.",
    //     });
    // }
    try{
        //user 정보 디비에 저장 
        await User.create({
            email,
            username,
            password,
            name,
            location,
        });
        return res.redirect("/login");
    }catch(error){
        return res.status(400).render("join",{
            pageTitle,
            errorMessage: "Fail to create an account.",
        });

    }
    
};

//사용자 로그인 
export const getLogin = (req, res) => {
    return res.render("login",{pageName : "Login"});
};
export const postLogin = async (req, res) => {
    //1.post로 사용자가 입력한 값 받기
    //2.디비에 값이 존재하는지 확인하고 값 가져오기 findOne()
    //3.비밀번호 확인 
    //4.redirect 홈 

    const {username, password} = req.body;
    const userDB = await User.findOne({username});
    if(!userDB){//db에 유저 없을 때 
        return res.status(400).render("login",{errorMessage : "An account with this username does not exists."});
    }
    //비밀번호 확인 
    const ok = await bcrypt.compare(password, userDB.password);

    if(!ok){//비밀번호 틀렸을 때 
        return res.status(400).render("login",{errorMessage : "Wrong password."});
    }

    //세션처리 로그인 성공시 해당 정보를 세션에 저장한다. 
    req.session.loggedIn = true;
    req.session.user = userDB;

    return res.redirect("/");
};


//로그아웃 
export const logout = (req, res) => {
    //세션 destroy() -> redirect home 
    req.session.destroy();
    return res.redirect("/");
};

export const see = (req, res) => res.send("see user profile");
export const edit = (req, res) => res.render("edit", { pageName : "Edit" });
