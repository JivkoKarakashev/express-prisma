import { Router } from "express";

import { createUser, deleteUserById, getAllUsers, getUserById, updateUserById } from "../services/userService";
import userValidator from "../middleware/userValidator";

const userHandler = Router();

userHandler.get('/', getAllUsers);
userHandler.get('/:uid', getUserById);
userHandler.put('/:uid', updateUserById);
userHandler.post('/create', userValidator, createUser);
userHandler.delete('/:uid', deleteUserById);

export default userHandler;