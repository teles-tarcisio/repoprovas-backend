import Joi from "joi";
import { NewTest } from "../repositories/testRepository";

export const newTestSchema = Joi.object<NewTest>({
  name: Joi.string().trim().required(),
  pdfUrl: Joi.string().trim().uri().required(),
  categoryId: Joi.number().min(1).required(),
  teacherDisciplineId: Joi.number().min(1).required(),
});