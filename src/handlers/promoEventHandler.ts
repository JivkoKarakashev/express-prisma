import { Router } from "express";

import { createPromoEvent, deletePromoEventById, getAllPromoEvents, getPromoEventById, updatePromoEventById } from "../services/promoEventService";

import promoEventValidator from "../middleware/promoEventValidator";

const promoEventHandler = Router();

promoEventHandler.get('/', getAllPromoEvents);
promoEventHandler.get('/:uid', getPromoEventById);
promoEventHandler.put('/:uid', promoEventValidator, updatePromoEventById);
promoEventHandler.post('/create', promoEventValidator, createPromoEvent);
promoEventHandler.delete('/:uid', deletePromoEventById);

export default promoEventHandler;