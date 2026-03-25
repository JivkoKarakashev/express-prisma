import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { ProductSchema } from "../generated/zod/schemas";
import { models } from "../models";

type CreateProductSchema = z.infer<typeof createProductSchema>;

const createProductSchema = ProductSchema
  .omit({ id: true })
  .extend({
    categoryId: z
      .number()
      .int()
      .positive()
      .refine(async (id) => {
        const result = await models.category.findUnique({ where: { id }, select: { id: true } });
        return !!result;
      }, { error: 'Category does not exist in the database!' }),
    name: z.string().max(50, 'Name must not exceed 50 characters long!'),
    slug: z.string().max(55),
    description: z.string(),
    isDigital: z.boolean().default(false),
    isActive: z.boolean().default(false),
    updatedAt: z.iso.datetime({ offset: true }).nullable().optional(),
    createdAt: z.iso.datetime({ offset: true }),
    price: z
      .number()
      .refine(val => val >= 0, { error: "Price can't be negative!" })
      .refine(val => val <= 99999999.99, { error: 'Price is too high!' })
  });

const productValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { success, error } = await createProductSchema.safeParseAsync(req.body);
  if (!success) {
    return res.status(400).json(z.treeifyError(error));
  }
  next();
};

export default productValidator;

export {
  type CreateProductSchema
}