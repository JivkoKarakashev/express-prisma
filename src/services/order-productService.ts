import { NextFunction, Request, Response } from "express";

import { models } from "../models";
import { Prisma } from "../generated/prisma/client";

const createOrderProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data: Prisma.OrderProductCreateInput = req.body;
    console.log(data);
    res.status(201).json(data);
    // const result = await models.orderProduct.create({ data });
    // res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while creating an order record and associated product!' });
    next(err);
  }
};

const updateOrderProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { uid } = req.params;
    if (!uid) {
      throw new Error('Missing uid param!');
    }
    const data: Prisma.OrderProductUpdateInput = req.body;
    console.log(data);
    res.status(201).json(data);
    // const result = await models.orderProduct.update({ data, where: { id: Number(uid) } });
    // res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: 'An error occurred while updating an order record and associated product!' });
    next(err);
  }
};

const deleteOrderProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { uid } = req.params;
  try {
    if (!uid) {
      throw new Error('Missing uid param!');
    }
    await models.orderProduct.delete({ where: { id: Number(uid) } });
    res.status(204).json({});
  } catch (err) {
    res.status(400).json({ error: 'An error occurred while deleting an order record and associated product!' });
    next(err);
  }
};

export {
  createOrderProduct,
  updateOrderProductById,
  deleteOrderProductById
}