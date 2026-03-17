import { NextFunction, Request, Response } from 'express';
import * as z from "zod";

import { UserCreateInputObjectSchema } from '../generated/zod/schemas';

const userValidator = (req: Request, res: Response, next: NextFunction) => {
  const { success, error } = UserCreateInputObjectSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json(z.treeifyError(error));
  }
  next();
};

export default userValidator;