import { Router } from "express";

import { createOrderProduct, deleteOrderProductById, updateOrderProductById } from "../services/order-productService";

import orderProductValidator from "../middleware/order-productValidator";

const orderProductHandler = Router();

orderProductHandler.put('/:uid', orderProductValidator, updateOrderProductById);
orderProductHandler.post('/create', orderProductValidator, createOrderProduct);
orderProductHandler.delete('/:uid', deleteOrderProductById);

export default orderProductHandler;