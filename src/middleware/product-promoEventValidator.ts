import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { ProductPromotionEventSchema } from "../generated/zod/schemas";
import { models } from "../models";

type CreateProductPromoEventSchema = z.infer<typeof createProductPromoEventSchema>;

const baseProductPromoEventSchema = ProductPromotionEventSchema
  .omit({ id: true })
  .extend({
    productId: z.number().int().positive(),
    promotionEventId: z.number().int().positive()
  })
  .refine(async (data) => {
    const result = await models.product.findUnique({ where: { id: data.productId }, select: { id: true } });
    // return !!result;
    return true;
  }, { error: 'Product does not exist in the database!' })
  .refine(async (data) => {
    const result = await models.promotionEvent.findUnique({ where: { id: data.promotionEventId }, select: { id: true } });
    // return !!result;
    return true;
  }, { error: 'Promo-event does not exist in the database!' });

const createProductPromoEventSchema = baseProductPromoEventSchema
  .refine(async ({ productId, promotionEventId }) => {
    const result = await models.productPromotionEvent.findUnique({ where: { productId_promotionEventId: { productId, promotionEventId } }, select: { id: true } });
    return !result;
  }, { error: 'This product - promo event combination already exists in the database!' });

const updateProductPromoEventSchema = baseProductPromoEventSchema
  .extend({
    id: z.number().int().positive()
  })
  .refine(async ({ id, productId, promotionEventId }) => {
    const result = await models.productPromotionEvent.findUnique({ where: { productId_promotionEventId: { productId, promotionEventId } }, select: { id: true } });
    return !result || result.id === id;
  }, { error: 'This product - promo event combination already exists in the database!' });

const productPromoEventValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { uid } = req.params;
  const data = uid ? { ...req.body, id: Number(uid) } : req.body;
  const schema = uid ? updateProductPromoEventSchema : createProductPromoEventSchema;

  const { success, error } = await schema.safeParseAsync(data);
  if (!success) {
    return res.status(400).json(z.treeifyError(error));
  }
  next();
};

export default productPromoEventValidator;

export {
  type CreateProductPromoEventSchema
}