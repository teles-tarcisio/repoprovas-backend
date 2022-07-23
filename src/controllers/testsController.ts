import { Request, Response } from "express";
import { Test } from "@prisma/client";
import { testServices } from "../services/index.js";
import { NewTestSchema } from "../repositories/testRepository.js";
import { errorUtils } from "../utils/index.js";

export async function create(req: Request, res: Response) {
  const newTest: NewTestSchema = res.locals.payload.validSchema;
  await testServices.create(newTest);

  return res.status(201).send('new test succesfully created');
}

export async function get(req: Request, res: Response) {
  let foundTests: Test[];

  const groupTestsBy = req.query?.groupBy;
  if (!groupTestsBy) {
    throw errorUtils.unprocessableError("group tests by 'disciplines' or 'teachers'");
  } else {
    if (groupTestsBy === "teachers") {
      return res.status(501).send('grouping by TEACHERS');
    }
    if (groupTestsBy === "disciplines") {
      return res.status(501).send('grouping by DISCIPLINES');
    }

  }
  
}
