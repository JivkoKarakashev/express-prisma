import { NextFunction, Request, Response } from "express";

import { models } from "../models";
import { Prisma } from "../generated/prisma/client";

const createStockManagement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data: Prisma.StockManagementCreateInput = req.body;
    console.log(data);
    res.status(201).json(data);
    // const result = await models.stockManagement.create({ data });
    // res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while creating stock management record for a product!' });
    next(err);
  }
};

const updateStockManagementById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { uid } = req.params;
    if (!uid) {
      throw new Error('Missing uid param!');
    }
    const data: Prisma.StockManagementUpdateInput = req.body;
    console.log(data);
    res.status(201).json(data);
    // const result = await models.stockManagement.update({ data, where: { id: Number(uid) } });
    // res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: 'An error occurred while updating stock management record for a product!' });
    next(err);
  }
};

const deleteStockManagementById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { uid } = req.params;
  try {
    if (!uid) {
      throw new Error('Missing uid param!');
    }
    await models.stockManagement.delete({ where: { id: Number(uid) } });
    res.status(204).json({});
  } catch (err) {
    res.status(400).json({ error: 'An error occurred while deleting stock management record for a product!' });
    next(err);
  }
};

export {
  createStockManagement,
  updateStockManagementById,
  deleteStockManagementById
}