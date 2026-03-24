import { Router } from "express";

import userContoller from "./api/userController";
import orderContoller from "./api/orderController";
import categoryContoller from "./api/categoryController";
import productContoller from "./api/productController";
import promoEventContoller from "./api/promoEventController";

const apiContoller = Router();

apiContoller.use('/users', userContoller);
apiContoller.use('/orders', orderContoller);
apiContoller.use('/categories', categoryContoller);
apiContoller.use('/products', productContoller);
apiContoller.use('/promo-events', promoEventContoller);

export default apiContoller;