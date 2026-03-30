import { Router } from "express";

import orderProductHandler from "../../handlers/order-productHandler";

const orderProductController = Router();

orderProductController.use('/', orderProductHandler);

export default orderProductController;