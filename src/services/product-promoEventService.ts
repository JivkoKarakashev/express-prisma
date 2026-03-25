import { NextFunction, Request, Response } from "express";

import { models } from "../models";
import { Prisma } from "../generated/prisma/client";

const createProductPromoEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data: Prisma.ProductPromotionEventCreateInput = req.body;
    console.log(data);
    res.status(201).json(data);
    // const result = await models.productPromotionEvent.create({ data });
    // res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while creating a record for a product and associated promo event!' });
    next(err);
  }
};

const updateProductPromoEventById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { uid } = req.params;
    if (!uid) {
      throw new Error('Missing uid param!');
    }
    const data: Prisma.ProductPromotionEventUpdateInput = req.body;
    console.log(data);
    res.status(201).json(data);
    // const result = await models.productPromotionEvent.update({ data, where: { id: Number(uid) } });
    // res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: 'An error occurred while updating a record for a product and associated promo event!' });
    next(err);
  }
};

const deleteProductPromoEventById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { uid } = req.params;
  try {
    if (!uid) {
      throw new Error('Missing uid param!');
    }
    await models.productPromotionEvent.delete({ where: { id: Number(uid) } });
    res.status(204).json({});
  } catch (err) {
    res.status(400).json({ error: 'An error occurred while deleting a record for a product and associated promo event!' });
    next(err);
  }
};

export {
  createProductPromoEvent,
  updateProductPromoEventById,
  deleteProductPromoEventById
}