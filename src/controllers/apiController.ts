import { Router } from "express";

import userContoller from "./api/userController";
import orderContoller from "./api/orderController";
import categoryContoller from "./api/categoryController";
import productContoller from "./api/productController";

const apiContoller = Router();

apiContoller.use('/users', userContoller);
apiContoller.use('/orders', orderContoller);
apiContoller.use('/categories', categoryContoller);
apiContoller.use('/products', productContoller);

export default apiContoller;