import { Router } from "express";

import categoryHandler from "../../handlers/categoryHandler";

const categoryContoller = Router();

categoryContoller.use('/', categoryHandler);

export default categoryContoller;