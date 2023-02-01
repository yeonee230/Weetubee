import mongoose from "mongoose";

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL);


const db = mongoose.connection;
const handleError = (error) => console.log("❌ db error : " + error);
const handleSuccess = () => console.log("✅ connected to db. ");

db.on("error", handleError);
db.once("open", handleSuccess);