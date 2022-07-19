import Joi from "joi";
import { NewUser } from "../repositories/userRepository.js";

export const newUserSchema = Joi.object<NewUser>({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(4).required(),
});