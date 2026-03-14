import { NextFunction, Request, Response } from "express";

const defaultHandler = (_req: Request, res: Response, _next: NextFunction): void => {
  res.status(404).send('<main><h1>Resource Not Found!</h1></main>');
}

export default defaultHandler;