import { Router } from "express";

import { createOrder, deleteOrderById, getAllOrders, getOrderById, getProductByOrderId, updateOrderById } from "../services/orderService";

import orderValidator from "../middleware/orderValidator";

const orderHandler = Router();

orderHandler.get('/', getAllOrders);
orderHandler.get('/:uid', getOrderById);
orderHandler.get('/:uid/products', getProductByOrderId);
orderHandler.put('/:uid', orderValidator, updateOrderById);
orderHandler.post('/create', orderValidator, createOrder);
orderHandler.delete('/:uid', deleteOrderById);

export default orderHandler;