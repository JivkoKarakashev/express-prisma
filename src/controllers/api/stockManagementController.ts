import { Router } from "express";

import stockManagementHandler from "../../handlers/stockManagementHandler";

const stockManagementController = Router();

stockManagementController.use('/', stockManagementHandler);

export default stockManagementController;