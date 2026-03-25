import { Router } from "express";

import { createProductPromoEvent, deleteProductPromoEventById, updateProductPromoEventById } from "../services/product-promoEventService";

import productPromoEventValidator from "../middleware/product-promoEventValidator";

const productPromoEventHandler = Router();

productPromoEventHandler.put('/:uid', productPromoEventValidator, updateProductPromoEventById);
productPromoEventHandler.post('/create', productPromoEventValidator, createProductPromoEvent);
productPromoEventHandler.delete('/:uid', deleteProductPromoEventById);

export default productPromoEventHandler;