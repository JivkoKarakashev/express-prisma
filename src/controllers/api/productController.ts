import { Router } from "express";

import productHandler from "../../handlers/productHandler";

const productContoller = Router();

productContoller.use('/', productHandler);

export default productContoller;