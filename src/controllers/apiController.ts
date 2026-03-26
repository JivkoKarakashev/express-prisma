import { Router } from "express";

import userContoller from "./api/userController";
import orderContoller from "./api/orderController";
import categoryContoller from "./api/categoryController";
import productContoller from "./api/productController";
import promoEventContoller from "./api/promoEventController";
import productPromoEventController from "./api/product-promoEventController";
import stockManagementController from "./api/stockManagementController";

const apiContoller = Router();

apiContoller.use('/users', userContoller);
apiContoller.use('/orders', orderContoller);
apiContoller.use('/categories', categoryContoller);
apiContoller.use('/products', productContoller);
apiContoller.use('/promo-events', promoEventContoller);
apiContoller.use('/product-promo-events', productPromoEventController);
apiContoller.use('/stock-management', stockManagementController);

export default apiContoller;