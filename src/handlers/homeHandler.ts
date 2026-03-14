import { NextFunction, Request, Response } from "express";

const homeHanlder = (_req: Request, res: Response, _next: NextFunction): void => {
  res.status(200).send('<main><h1>Hello Express-Prisma App</h1></main>');
}

export default homeHanlder; 