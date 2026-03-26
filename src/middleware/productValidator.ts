import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { ProductSchema } from "../generated/zod/schemas";
import { models } from "../models";
import { baseStockManagementSchema } from "./stockManagementValidator";

type CreateProductSchema = z.infer<typeof createProductSchema>;

const baseProductSchema = ProductSchema
  .omit({ id: true })
  .extend({
    categoryId: z.number().int().positive(),
    name: z.string().max(50, 'Name must not exceed 50 characters long!'),
    slug: z.string().max(55),
    description: z.string(),
    isDigital: z.boolean().default(false),
    isActive: z.boolean().default(false),
    updatedAt: z.iso.datetime({ offset: true }).nullable().optional(),
    createdAt: z.iso.datetime({ offset: true }),
    price: z.number().min(0, "Price can't be negative!").max(99999999.99, 'Price is too high!')
  });

const createProductSchema = baseProductSchema
  .extend({
    stock: baseStockManagementSchema.omit({ productId: true }).optional()
  })
  .refine(async (data) => {
    const result = await models.category.findUnique({ where: { id: data.categoryId }, select: { id: true } });
    return !!result;
  }, { error: 'Category does not exist in the database!' });

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