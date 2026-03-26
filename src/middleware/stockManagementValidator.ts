import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { StockManagementSchema } from "../generated/zod/schemas";
import { models } from "../models";

type CreateStockManagementSchema = z.infer<typeof createStockManagementSchema>;

const createStockManagementSchema = StockManagementSchema
  .omit({ id: true })
  .extend({
    productId: z.number().int().positive(),
    quantity: z
      .number()
      .int()
      .default(0)
      .refine(val => val >= 0, { error: "Quantity can't be negative!" }),
    lastCheckedAt: z.iso.datetime({ offset: true })
  })
  .refine(async (data) => {
    const result = await models.product.findUnique({ where: { id: data.productId }, select: { id: true } });
    return !!result;
  }, { error: 'Product does not exist in the database!' });

const stockManagementValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { success, error } = await createStockManagementSchema.safeParseAsync(req.body);
  if (!success) {
    return res.status(400).json(z.treeifyError(error));
  }
  next();
};

export default stockManagementValidator;

export {
  type CreateStockManagementSchema
}