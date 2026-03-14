import { Express } from "express";

import healthController from "./controllers/healthContoller";
import homeContoller from "./controllers/homeController";
import defaultHandler from "./handlers/defaultHandler";
import tableContoller from "./controllers/tableController";

function appRouter(app: Express) {
  app.get('/favicon.ico', (_req, res) => res.status(204).end());
  app.use('/', homeContoller);
  app.use('/health', healthController);
  app.use('/:table', tableContoller);

  app.use(defaultHandler);
}

export default appRouter;