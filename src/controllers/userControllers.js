import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from 'cross-fetch';
import { redirect, render } from "express/lib/response";

//export 해주면 다른 파일에서 이 함수를 import할 수 있다. 
export const getJoin = (req, res) => {
    return res.render("join",{pageName : "Join"});
};
export const postJoin = async(req, res) => {
    //1. post로 넘긴 값 받기 
    //2. db에 create()하기 
    //3. 로그인 페이지 리턴 
    const {email,password,password2,name,username,location} = req.body;
    const pageName = "Join";

    //비밀번호 확인 
    if(password !== password2){
        return res.status(400).render("join", {
            pageName,
            errorMessage: "Password confirmation does not match.",
          });
    }

    //username과 email 중복 검사 방법2
    const exist = await User.exists({ $or : [{username}, {email}] });
    if(exist){
        return res.status(400).render("join",{
            pageName,
            errorMessage: "This username/email is already taken.",
        });

    }

    //username과 email 중복 검사 방법1
    // const usernameCheck = await User.exists({username});// true or false 리턴
    // if(usernameCheck) {
    //     return res.status(400).render("join",{
    //         pageName,
    //         errorMessage: "This username is already taken.",
    //     });
    // }
    // const emailCheck = await User.exists({email});// true or false 리턴
    // if(emailCheck) {
    //     return res.status(400).render("join",{
    //         pageName,
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
            pageName,
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
    const userDB = await User.findOne({username, socialOnly:false });
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

//Github 로그인 
export const startGithubLogin =(req, res) =>{
    //깃허브로 url 보내서 user's github identity 요청한다. 
    const base_url = "https://github.com/login/oauth/authorize";
    const config = {
        client_id : process.env.GITHUB_CLIENT_ID,
        allow_signup : false,
        scope : "read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const final_url = `${base_url}?${params}`;
    return res.redirect(final_url);
};
export const finishGithubLogin = async(req, res) =>{
    //깃허브로 access_token 요청해야함. 
    const base_url = "https://github.com/login/oauth/access_token";
    const config = {
        client_id : process.env.GITHUB_CLIENT_ID,
        client_secret :process.env.GITHUB_CLIENT_SECRET,
        code: req.query.code,
    }
    const params = new URLSearchParams(config).toString();
    const final_url = `${base_url}?${params}`;
    //post 로 final_url을 보내고 값을 받는다. 
    const tokenRequest = await (await fetch(final_url,{
                    method: "POST",
                    headers: {
                            Accept: "application/json",
                        },
                }
            )
        ).json();
            
   
    if( "access_token" in tokenRequest){ //json안에 access_token 이 있으면 
        //access Api 
        const api_url = "https://api.github.com";
        const {access_token} = tokenRequest;
        
        const userData = await (await fetch(`${api_url}/user`,{
                headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                }
            )
        ).json();
        //console.log(userData);
        const emailData = await(
            await fetch(`${api_url}/user/emails`,{
                headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                }
            )
        ).json();
        //console.log(emailData);
        const emailObj = emailData.find( //이부분 뭔가.. 다시 공부해야할듯 배열 find()함수 사용법. 
            (email) => email.primary === true && email.verified === true 
        );
        //console.log(`emailObj : ${emailObj}`);
        //github 이메일이 없으면 
        if(!emailObj){
            return res.redirect("/login");
        }

        //깃허브 이메일이 있고, 디비에도 같은 이메일 있는지 확인 
        let user = await User.findOne({email: emailObj.email});
        //console.log(`existingUser : ${existingUser}`);
            if(!user){ //디비에 깃허브 유저가 없으면 유저 계정을 create한다. 
                user = await User.create({
                    email : emailObj.email,
                    avatarUrl: userData.avatar_url,
                    username : userData.login,
                    password : "",
                    name : userData.name,
                    location : userData.location,
                    socialOnly : true,
                });
            }
            //유저가 있으면 바로 로그인 실행됨, 유저 없으면 유저 만들고 실행됨. 
            req.session.loggedIn = true;
            req.session.user = user;
            return res.redirect("/");


    }else{// json 안에 access_token이 없으면
        return res.redirect("/login");
    }
 
};

//로그아웃 
export const logout = (req, res) => {
    //세션 destroy() -> redirect home 
    req.session.destroy();
    return res.redirect("/");
};

//user profile edit
export const getEdit = (req, res) => {
    return res.render("edit-profile",{pageName : "Edit Profile"});
};

export const postEdit = async (req, res) => {
    /* 1. form 에서 보낸 업데이트 된 user 정보를 받는다. 
       2. 해당 user를 디비에서 찾고 정보를 업데이트 한다. findByIdUpdate()이용 
       3. 세션user 정보를 업데이트 한다. 이메일, 유저이름 중복 고려해서 */
    /*const {_id} = req.session.user._id;
    const { name,
            email,
            username,
            location } = req. body; 
    const  {name, email, username, location} = req.body;      */
    // ⬇️ ES6 문법으로 바꾸면 
    const {
            session : {user : {_id}},
            body : {name, email, username, location},
    } = req;

    const updatedUser = await User.findByIdAndUpdate(_id, {
        name,
        email,
        username,
        location,
    },{
        new : true,
    });
    req.session.user = updatedUser;
    return res.redirect("/users/edit");
};

//Change password 
export const getChangePW = (req, res ) => {
    return res.render("users/change-password",{pageName : "Change Password"});
}

export const postChangePW = async (req, res ) => {
    /*  1. 비밀번호 변경 폼으로 부터 비밀번호 정보를 가져온다.
        2. 현재 비밀번호가 맞는지 확인한다.
        3. 새 비밀번호(newPW, newPW2)가 같은지 확인한다. 
        4. 디비에 변경된 비밀번호 저장한다. 
        5. 세션에 업데이트 해준다. (혹은 로그아웃 해준다. ) */
    const {
        session : {user : {_id}},
        body : {currentPW, newPW, newPW2},
    } = req;
    const pageName = "Change Password"
    const user = await User.findById({_id});
    const currentPWInDB = req.session.user.password;
    const crrentPWCheck = await bcrypt.compare(currentPW, currentPWInDB);
    //const okNewPW = 
    if(!crrentPWCheck){
        return res.status(400).render("users/change-password",{pageName,errorMessage : "Not match the current password."});
    }
    if(newPW !== newPW2){
        return res.status(400).render("users/change-password",{pageName,errorMessage : "Not match New Password and New Password Confirmation."});
    }
    user.password = newPW; //저장할 때 User에 만들어둔 함수가 해시로 바꿔줌.
    await user.save();

    return res.redirect("/users/logout");
}


//export const see = (req, res) => res.send("see user profile");


