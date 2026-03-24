import { NextFunction, Request, Response } from "express";

import { models } from "../models";
import { Prisma } from "../generated/prisma/client";

const getAllPromoEvents = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await models.promotionEvent.findMany();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: 'An error occurred while fetching all promo Events!' });
    next(err)
  }
};

const getPromoEventById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { uid } = req.params;
    if (!uid) {
      throw new Error('Missing uid param!');
    }
    const result = await models.promotionEvent.findUnique({ where: { id: Number(uid) } });
    if (!result) {
      throw new Error('Promo-event could not be found!');
    }
    res.status(200).json(result);
  } catch (err) {
    const error = err instanceof Error ? err.message : 'An error occurred while fetching a promo-event by Id!';
    res.status(400).json({ error });
    next(err);
  }
};

const createPromoEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data: Prisma.PromotionEventCreateInput = req.body;
    console.log(data);
    res.status(201).json(data);
    // const result = await models.promotionEvent.create({ data });
    // res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while creating a promo-event!' });
    next(err);
  }
};

const updatePromoEventById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;
    if (!uid) {
      throw new Error('Missing uid param!');
    }
    const data: Prisma.PromotionEventUpdateInput = req.body;
    console.log(data);
    res.status(201).json(data);
    // const result = await models.promotionEvent.update({ data, where: { id: Number(uid) } });
    // res.status(200).json(result);
  } catch (err) {
    const error = err instanceof Error ? err.message : 'An error occurred while updating a promo-event!';
    res.status(400).json({ error });
    next(err);
  }
};

const deletePromoEventById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;
    if (!uid) {
      throw new Error('Missing uid param!');
    }
    await models.promotionEvent.delete({ where: { id: Number(uid) } });
    res.status(204).json({});
  } catch (err) {
    const error = err instanceof Error ? err.message : 'An error occurred while deleting a promo-event!';
    res.status(400).json({ error });
    next(err);
  }
};

export {
  getAllPromoEvents,
  getPromoEventById,
  createPromoEvent,
  updatePromoEventById,
  deletePromoEventById
}