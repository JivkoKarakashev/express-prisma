import { Router } from "express";

import productPromoEventHandler from "../../handlers/product-promoEventHandler";

const productPromoEventController = Router();

productPromoEventController.use('/', productPromoEventHandler);

export default productPromoEventController;