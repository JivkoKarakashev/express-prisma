import { Router } from "express";

import userHanlder from "../../handlers/userHandler";

const userContoller = Router();

userContoller.use('/', userHanlder);

export default userContoller;