import { Router } from "express";

import { create, findMany } from "../handlers/crudHandlers";

const tableContoller = Router({ mergeParams: true });

tableContoller.get('/', findMany);
tableContoller.post('/', create);

export default tableContoller;