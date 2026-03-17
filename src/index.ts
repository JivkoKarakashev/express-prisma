import express from "express";
import cors from "cors";

import config from "./config";
import appRouter from "./appRouter";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
appRouter(app);

app.listen(config.port, () => {
  console.log(`HTTP server is listening on port ${config.port} [env: ${config.env}]`);
});