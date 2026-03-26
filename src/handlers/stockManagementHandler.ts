import { Router } from "express";

import { createStockManagement, deleteStockManagementById, updateStockManagementById } from "../services/stockManagementService";

import stockManagementValidator from "../middleware/stockManagementValidator";

const stockManagementHandler = Router();

stockManagementHandler.put('/:uid', stockManagementValidator, updateStockManagementById);
stockManagementHandler.post('/create', stockManagementValidator, createStockManagement);
stockManagementHandler.delete('/:uid', deleteStockManagementById);

export default stockManagementHandler;