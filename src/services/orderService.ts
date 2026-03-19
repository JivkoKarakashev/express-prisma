import { NextFunction, Request, Response } from "express";

import { models } from "../models";
import { Prisma } from "../generated/prisma/client";

const getAllOrders = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await models.order.findMany();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: 'An error occurred while fetching all orders!' });
    next(err)
  }
};

const getOrderById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { uid } = req.params;
    if (!uid) {
      throw new Error('Missing uid param!');
    }
    const result = await models.order.findUnique({ where: { id: Number(uid) } });
    if (!result) {
      throw new Error('Order could not be found!');
    }
    res.status(200).json(result);
  } catch (err) {
    const error = err instanceof Error ? err.message : 'An error occurred while fetching an order by Id!';
    res.status(400).json({ error });
    next(err);
  }
};

const getOrdersByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { uid } = req.params;
    if (!uid) {
      throw new Error('Missing uid param!');
    }
    const result = await models.order.findMany({ where: { userId: Number(uid) } });
    res.status(200).json({ userId: uid, orders: result });
  } catch (err) {
    const error = err instanceof Error ? err.message : "An error occurred while fetching certain user's orders!";
    res.status(400).json({ error });
    next(err)
  }
};

const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data: Prisma.OrderCreateInput = req.body;
    console.log(data);
    res.status(201).json(data);
    // const result = await models.order.create({ data });
    // res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while creating an order!' });
    next(err);
  }
};

const updateOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;
    if (!uid) {
      throw new Error('Missing uid param!');
    }
    const data: Prisma.OrderUpdateInput = req.body;
    console.log(data);
    res.status(201).json(data);
    // const result = await models.order.update({ data, where: { id: Number(uid) } });
    // res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: 'An error occurred while updating the user!' });
    next(err);
  }
};

const deleteOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;
    if (!uid) {
      throw new Error('Missing uid param!');
    }
    await models.order.delete({ where: { id: Number(uid) } });
    res.status(204).json({});
  } catch (err) {
    res.status(400).json({ error: 'An error occurred while deleting the order!' });
    next(err);
  }
};

export {
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  createOrder,
  updateOrderById,
  deleteOrderById
}