import { Router } from "express";

import userContoller from "./api/userController";
import orderContoller from "./api/orderController";

const apiContoller = Router();

apiContoller.use('/users', userContoller);
apiContoller.use('/orders', orderContoller);

export default apiContoller;