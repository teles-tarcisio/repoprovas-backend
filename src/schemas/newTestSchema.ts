import Joi from "joi";
import { NewTestSchema } from "../repositories/testRepository.js";



export const newTestSchema = Joi.object<NewTestSchema>({
  name: Joi.string().trim().required(),
  pdfUrl: Joi.string().trim().uri().required(),
  categoryId: Joi.number().min(1).required(),
  disciplineId: Joi.number().min(1).required(),
  teacherId: Joi.number().min(1).required(),
});