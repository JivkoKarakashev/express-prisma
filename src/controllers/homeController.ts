import { Router } from "express";

import homeHanlder from "../handlers/homeHandler";

const homeContoller = Router();

homeContoller.get('/', homeHanlder);

export default homeContoller;