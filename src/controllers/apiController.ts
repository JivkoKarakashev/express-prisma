import { Router } from "express";
import userContoller from "./api/userController";

const apiContoller = Router();

apiContoller.use('/users', userContoller);

export default apiContoller;