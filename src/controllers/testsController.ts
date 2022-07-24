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
  const groupTestsBy = req.query?.groupBy;

  if ((!groupTestsBy) || ((groupTestsBy !== "teachers") && (groupTestsBy !== "disciplines"))) { 
    throw errorUtils.unprocessableError("group tests by 'disciplines' or 'teachers'");
  } else {    
    if (groupTestsBy === "disciplines") {

      const testsByDisciplines = await testServices.getByDisciplines();

      return res.status(200).send(testsByDisciplines);
    }

    if (groupTestsBy === "teachers") {
      
      return res.status(501).send('grouping by TEACHERS');
    }
  }  
}
