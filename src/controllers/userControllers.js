import User from "../models/User";

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
        return res.render("join", {
            pageTitle,
            errorMessage: "Password confirmation does not match.",
          });
    }

    //username과 email 중복 검사 방법2
    const exist = await User.exists({ $or : [{username}, {email}] });
    if(exist){
        return res.render("join",{
            pageTitle,
            errorMessage: "This username/email is already taken.",
        });

    }

    //username과 email 중복 검사 방법1
    // const usernameCheck = await User.exists({username});// true or false 리턴
    // if(usernameCheck) {
    //     return res.render("join",{
    //         pageTitle,
    //         errorMessage: "This username is already taken.",
    //     });
    // }
    // const emailCheck = await User.exists({email});// true or false 리턴
    // if(emailCheck) {
    //     return res.render("join",{
    //         pageTitle,
    //         errorMessage: "This email is already taken.",
    //     });
    // }

    //user 정보 디비에 저장 
    await User.create({
        email,
        username,
        password,
        name,
        location,
    });

    return res.redirect("/login");
};
export const edit = (req, res) => res.render("edit", { pageName : "Edit" });
export const remove = (req, res) => res.send("delete user profile! ");
export const login = (req, res) => res.send("user login! ");
export const logout = (req, res) => res.send("user logout");
export const see = (req, res) => res.send("see user profile");
