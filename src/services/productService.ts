import { NextFunction, Request, Response } from "express";

import { models } from "../models";
import { Prisma } from "../generated/prisma/client";

const getAllProducts = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await models.product.findMany();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: 'An error occurred while fetching all products!' });
    next(err)
  }
};

const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { uid } = req.params;
    if (!uid) {
      throw new Error('Missing uid param!');
    }
    const result = await models.product.findUnique({ where: { id: Number(uid) } });
    if (!result) {
      throw new Error('Product could not be found!');
    }
    res.status(200).json(result);
  } catch (err) {
    const error = err instanceof Error ? err.message : 'An error occurred while fetching a product by Id!';
    res.status(400).json({ error });
    next(err);
  }
};

const getProductsByCategoryId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { uid } = req.params;
    if (!uid) {
      throw new Error('Missing uid param!');
    }
    const result = await models.product.findMany({ where: { categoryId: Number(uid) } });
    res.status(200).json({ categoryId: uid, products: result });
  } catch (err) {
    const error = err instanceof Error ? err.message : 'An error occurred while fetching products by category!';
    res.status(400).json({ error });
    next(err)
  }
};

const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data: Prisma.ProductCreateInput = req.body;
    console.log(data);
    res.status(201).json(data);
    // const result = await models.product.create({ data });
    // res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while creating a product!' });
    next(err);
  }
};

const updateProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;
    if (!uid) {
      throw new Error('Missing uid param!');
    }
    const data: Prisma.ProductUpdateInput = req.body;
    console.log(data);
    res.status(201).json(data);
    // const result = await models.product.update({ data, where: { id: Number(uid) } });
    // res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: 'An error occurred while updating a product!' });
    next(err);
  }
};

const deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;
    if (!uid) {
      throw new Error('Missing uid param!');
    }
    await models.product.delete({ where: { id: Number(uid) } });
    res.status(204).json({});
  } catch (err) {
    res.status(400).json({ error: 'An error occurred while deleting a product!' });
    next(err);
  }
};

export {
  getAllProducts,
  getProductById,
  getProductsByCategoryId,
  createProduct,
  updateProductById,
  deleteProductById
}