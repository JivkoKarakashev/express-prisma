import express from "express";
import cors from "cors";

import config from "./config";

const app = express();
app.use(cors());
app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true, environment: config.env });
});

app.listen(config.port, () => {
  console.log(`HTTP server is listening on port ${config.port} [env: ${config.env}]`);
});