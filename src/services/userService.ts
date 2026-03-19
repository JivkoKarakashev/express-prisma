import { NextFunction, Request, Response } from "express";

import { models } from "../models";
import { Prisma } from "../generated/prisma/client";

const getAllUsers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await models.user.findMany();
    const response = result.map(usr => ({ id: usr.id, username: usr.username, email: usr.email }));
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ error: 'An error occurred while fetching all users!' });
    next(err)
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { uid } = req.params;
    if (!uid) {
      throw new Error('Missing uid param!');
    }
    const result = await models.user.findUnique({ where: { id: Number(uid) } });
    if (!result) {
      throw new Error('User could not be found!');
    }
    const { id, username, email } = result;
    res.status(200).json({ id, username, email });
  } catch (err) {
    const error = err instanceof Error ? err.message : 'An error occurred while fetching an user by Id!';
    res.status(400).json({ error });
    next(err);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data: Prisma.UserCreateInput = req.body;
    console.log(data);
    res.status(201).json(data);
    // const { id, username, email } = await models.user.create({ data });
    // res.status(201).json({ id, username, email });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while creating an user!' });
    next(err);
  }
};

const updateUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { uid } = req.params;
    if (!uid) {
      throw new Error('Missing uid param!');
    }
    const data: Prisma.UserUpdateInput = req.body;
    console.log(data);
    res.status(201).json(data);
    // const { id, username, email } = await models.user.update({ data, where: { id: Number(uid) } });
    // res.status(200).json({ id, username, email });
  } catch (err) {
    res.status(400).json({ error: 'An error occurred while updating the user!' });
    next(err);
  }
};

const deleteUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { uid } = req.params;
  try {
    if (!uid) {
      throw new Error('Missing uid param!');
    }
    await models.user.delete({ where: { id: Number(uid) } });
    res.status(204).json({});
  } catch (err) {
    res.status(400).json({ error: 'An error occurred while deleting the user!' });
    next(err);
  }
};

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
}