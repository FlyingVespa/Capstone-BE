import express from 'express';
import * as Controllers from "../../controllers/login.control.js"
import {JWTAuthenticate, VerifyUserType} from "../../middlewares/login.middleware.js"
const loginRouter = express.Router();


loginRouter
    .route("/")
    .post(VerifyUserType, Controllers.loginUser)



export default loginRouter;