import { Router } from "express";

import promoEventHandler from "../../handlers/promoEventHandler";

const promoEventContoller = Router();

promoEventContoller.use('/', promoEventHandler);

export default promoEventContoller;