import { NextFunction, Request, Response } from 'express';
import { z } from "zod";

import { OrderSchema } from '../generated/zod/schemas';
import { models } from '../models';

type CreateOrderSchema = z.infer<typeof createOrderSchema>;

const createOrderSchema = OrderSchema
  .omit({ id: true })
  .extend({
    userId: z
      .number()
      .refine(async (id): Promise<boolean> => {
        const result = await models.user.findUnique({ where: { id }, select: { id: true } });
        return !!result;
      }, { error: 'User does not exist in the database!' }),
    createdAt: z.iso.datetime({ offset: true })
  });

const orderValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { success, error } = await createOrderSchema.safeParseAsync(req.body);
  if (!success) {
    return res.status(400).json(z.treeifyError(error));
  }
  next();
};

export default orderValidator;

export {
  type CreateOrderSchema
}