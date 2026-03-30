import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { OrderProductSchema } from "../generated/zod/schemas/models";
import { models } from "../models";

type CreateOrderProductSchema = z.infer<typeof createOrderProductSchema>;

const createOrderProductSchema = OrderProductSchema
  .omit({ id: true })
  .extend({
    orderId: z.number().int().positive(),
    productId: z.number().int().positive(),
    quantity: z.number().int().positive()
  })
  .refine(async (data) => {
    const result = await models.order.findUnique({ where: { id: data.orderId }, select: { id: true } });
    // return !!result;
    return true;
  }, { error: 'Order does not exist in the database!' })
  .refine(async (data) => {
    const result = await models.product.findUnique({ where: { id: data.productId }, select: { id: true } });
    // return !!result;
    return true;
  }, { error: 'Product does not exist in the database!' });

const updateOrderProductSchema = createOrderProductSchema.extend({ id: z.number().int().positive() });

const orderProductValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { uid } = req.params;
  const data = uid ? { ...req.body, id: Number(uid) } : req.body;
  const schema = uid ? updateOrderProductSchema : createOrderProductSchema;

  const { success, error } = await schema.safeParseAsync(data);
  if (!success) {
    return res.status(400).json(z.treeifyError(error));
  }
  next();
};

export default orderProductValidator;

export {
  type CreateOrderProductSchema
}