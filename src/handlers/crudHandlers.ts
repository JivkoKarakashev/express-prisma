import { Request, Response } from "express";

import { isValidModelName } from "../models";
import { crudEngine } from "../crudEngine";

const create = async (req: Request, res: Response) => {
  const { table } = req.params;
  // console.log(table);
  if (!isValidModelName(table)) {
    return res.status(404).json({ error: "Unknown model" });
  }

  const result = await crudEngine.create(table, req.body);
  res.status(201).json(result);
}

const findMany = async (req: Request, res: Response) => {
  const { table } = req.params;
  // console.log(table);
  if (!isValidModelName(table)) {
    return res.status(404).json({ error: "Unknown model" });
  }

  const result = await crudEngine.findMany(table);
  res.status(200).json(result);
}

export {
  create,
  findMany
}