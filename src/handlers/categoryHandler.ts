import { Router } from "express";

import { createCategory, deleteCategoryById, getAllCategories, getCategoryById, updateCategoryById } from "../services/categoryService";

import categoryValidator from "../middleware/categoryValidator";

const categoryHandler = Router();

categoryHandler.get('/', getAllCategories);
categoryHandler.get('/:uid', getCategoryById);
categoryHandler.put('/:uid', categoryValidator, updateCategoryById);
categoryHandler.post('/create', categoryValidator, createCategory);
categoryHandler.delete('/:uid', deleteCategoryById);

export default categoryHandler;