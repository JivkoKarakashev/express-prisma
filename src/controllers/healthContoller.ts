import { Router } from "express";

import healthHanlder from "../handlers/healthHandler";

const healthController = Router();

healthController.get('/', healthHanlder);

export default healthController;