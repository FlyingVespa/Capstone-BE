import express from 'express';
import loginUser from "../../controllers/login.js"
import JWTAuthenticate from "../middlewares/login.js"

const loginRouter = express.Router();


loginRouter
    .route("/")
    .post(JWTAuthenticate, Controllers.loginUser)



export default loginRouter;