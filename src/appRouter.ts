import { Express } from "express";

import healthController from "./controllers/healthContoller";
import homeContoller from "./controllers/homeController";
import apiContoller from "./controllers/apiController";
import defaultHandler from "./handlers/defaultHandler";

function appRouter(app: Express) {
  app.get('/favicon.ico', (_req, res) => res.status(204).end());
  app.use('/', homeContoller);
  app.use('/health', healthController);
  app.use('/api', apiContoller);

  app.use(defaultHandler);
}

export default appRouter;