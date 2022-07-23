import { Request, Response } from "express";
import { testServices } from "../services/index.js";
import { NewTest } from "../repositories/testRepository";

export async function create(req: Request, res: Response) {
  const newTest: NewTest = res.locals.payload.validSchema;
  await testServices.create(newTest);

  return res.status(201).send('new test succesfully created');
}
