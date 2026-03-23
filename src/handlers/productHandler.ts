import { Router } from "express";

import { createProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from "../services/productService";

import productValidator from "../middleware/productValidator";

const productHandler = Router();

productHandler.get('/', getAllProducts);
productHandler.get('/:uid', getProductById);
productHandler.put('/:uid', productValidator, updateProductById);
productHandler.post('/create', productValidator, createProduct);
productHandler.delete('/:uid', deleteProductById);

export default productHandler;