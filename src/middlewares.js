import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
  region: "ap-northeast-2",
});

const isHeroku = process.env.NODE_ENV === "production";

const s3ImageUploader = multerS3({
  s3: s3,
  bucket: "weetubee1",
  acl: "public-read",
  // bucket 안에 folder 속에 file 분류하기
  key: function (request, file, ab_callback) {
    const newFileName = Date.now() + "-" + file.originalname;
    const fullPath = "images/" + newFileName;
    ab_callback(null, fullPath);
  },
});

const s3VideoUploader = multerS3({
  s3: s3,
  bucket: "weetubee1",
  acl: "public-read",

  // bucket 안에 folder 속에 file 분류하기
  key: function (request, file, ab_callback) {
    const newFileName = Date.now() + "-" + file.originalname;
    const fullPath = "videos/" + newFileName;
    ab_callback(null, fullPath);
  },
});

export const localsMiddleware = (req, res, next) => {
  //locals에 저장하면 pug 템플릿에서 읽을 수 있다.
  res.locals.siteName = "Wetube";
  res.locals.loggedIn = Boolean(req.session.loggedIn); //세션로그인이 true면
  res.locals.loggedInUser = req.session.user || {};
  res.locals.isHeroku = isHeroku;
  //console.log(` session에 있는 사용자 정보 :  ${req.session.user}`);
  //console.log(`locals :  ${JSON.stringify(res.locals.loggedInUser)}`);

  next();
};

//라우터 보호 1. 로그인한 사용자만 사용 가능.
export const protectMiddeleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not Authorized");
    return res.redirect("/login");
  }
};
//라우터 보호 2. 로그인하지 않은 사용자만 사용 가능.
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not Authorized");
    return res.redirect("/");
  }
};

//multer 이미지 파일 업로드 미들웨어
export const uploadImgMiddleware = multer({
  dest: "uploads/avatars/",
  limits: { fileSize: 3000000 },
  storage: isHeroku ? s3ImageUploader : undefined,
});

//multer 동영상 파일 업로드 미들웨어
export const uploadVideoMiddleware = multer({
  dest: "uploads/videos/",
  limits: { fileSize: 18000000 },
  storage: isHeroku ? s3VideoUploader : undefined,
});
