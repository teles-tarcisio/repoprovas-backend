import { Request, Response } from "express";
import { testServices } from "../services/index.js";
import { NewTestSchema } from "../repositories/testRepository.js";

export async function create(req: Request, res: Response) {
  const newTest: NewTestSchema = res.locals.payload.validSchema;
  await testServices.create(newTest);

  return res.status(201).send('new test succesfully created');
}
