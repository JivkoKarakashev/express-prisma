import { NextFunction, Request, Response } from "express";

import { models } from "../models";
import { Prisma } from "../generated/prisma/client";

const getAllCategories = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await models.category.findMany();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: 'An error occurred while fetching all categories!' });
    next(err)
  }
};

const getCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { uid } = req.params;
    if (!uid) {
      throw new Error('Missing uid param!');
    }
    const result = await models.category.findUnique({ where: { id: Number(uid) } });
    if (!result) {
      throw new Error('Category could not be found!');
    }
    res.status(200).json(result);
  } catch (err) {
    const error = err instanceof Error ? err.message : 'An error occurred while fetching a category by Id!';
    res.status(400).json({ error });
    next(err);
  }
};

const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data: Prisma.CategoryCreateInput = req.body;
    console.log(data);
    res.status(201).json(data);
    // const result = await models.category.create({ data });
    // res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while creating a category!' });
    next(err);
  }
};

const updateCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;
    if (!uid) {
      throw new Error('Missing uid param!');
    }
    const data: Prisma.CategoryUpdateInput = req.body;
    console.log(data);
    res.status(201).json(data);
    // const result = await models.category.update({ data, where: { id: Number(uid) } });
    // res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: 'An error occurred while updating a category!' });
    next(err);
  }
};

const deleteCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;
    if (!uid) {
      throw new Error('Missing uid param!');
    }
    await models.category.delete({ where: { id: Number(uid) } });
    res.status(204).json({});
  } catch (err) {
    res.status(400).json({ error: 'An error occurred while deleting a category!' });
    next(err);
  }
};

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById
}