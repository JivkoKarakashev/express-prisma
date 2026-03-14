import { NextFunction, Request, Response } from "express";

import config from "../config";

const healthHanlder = (_req: Request, res: Response, _next: NextFunction): void => {
  res.status(200).json({ ok: true, environment: config.env });
}

export default healthHanlder;