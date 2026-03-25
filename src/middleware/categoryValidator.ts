import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { CategorySchema } from "../generated/zod/schemas";
import { models } from "../models";

type CreateCategorySchema = z.infer<typeof createCategorySchema>;

const createCategorySchema = CategorySchema
  .omit({ id: true })
  .extend({
    parentId: z.number().int().positive().nullable().optional(),
    name: z.string().min(2).max(50),
    slug: z.string().min(2).max(55),
    isActive: z.boolean().default(false),
    level: z.number().int().min(0).default(0)
  })
  .refine(data => {
    if (!data.parentId) {
      return data.level === 0;
    }
    return data.level > 0;
  }, { error: 'The main category must be at level 0 and the subcategory must be above level 0!' })
  .refine(async (data) => {
    const parentId = data.parentId;
    if (!parentId) {
      return true;
    }

    const result = await models.category.findUnique({ where: { id: parentId }, select: { id: true } });
    return !!result;
  }, { error: 'Category does not exist in the database!', });

const categoryValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { success, error } = await createCategorySchema.safeParseAsync(req.body);
  if (!success) {
    res.status(400).json(z.treeifyError(error));
  }
  next();
};

export default categoryValidator;

export {
  type CreateCategorySchema
}