import { NextFunction, Request, Response } from 'express';
import { z } from "zod";

import { UserSchema } from '../generated/zod/schemas';

type CreateUserSchema = z.infer<typeof createUserSchema>;

const createUserSchema = UserSchema.omit({ id: true }).extend({
  username: z.string().min(3, 'Username must be at least 3 characters long!'),
  email: z.email('A valid email is required!'),
  password: z.string().min(6, 'Password must be at least 6 characters long!'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  error: 'The confirmation password must be the same as the password!',
  path: ['confirmPassword']
});

const userValidator = (req: Request, res: Response, next: NextFunction) => {
  const { success, error } = createUserSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json(z.treeifyError(error));
  }
  next();
};

export default userValidator;

export {
  CreateUserSchema
}