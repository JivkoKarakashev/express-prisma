import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { PromotionEventSchema } from "../generated/zod/schemas";

type CreatePromoEventSchema = z.infer<typeof createPromoEventSchema>;

const createPromoEventSchema = PromotionEventSchema
  .omit({ id: true })
  .extend({
    startDate: z.iso.datetime({ offset: true }),
    endDate: z.iso.datetime({ offset: true }),
    name: z.string().max(50, 'Name must not exceed 50 characters long!'),
    priceReduction: z.number().int()
  });

const promoEventValidator = (req: Request, res: Response, next: NextFunction) => {
  const { success, error } = createPromoEventSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json(z.treeifyError(error));
  }
  next();
};

export default promoEventValidator;

export {
  type CreatePromoEventSchema
}