import { Router } from "express";

import orderHandler from "../../handlers/orderHandler";

const orderContoller = Router();

orderContoller.use('/', orderHandler);

export default orderContoller;