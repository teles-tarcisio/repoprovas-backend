import { Request, Response } from "express";
import { categoryServices } from "../services/index.js";


export async function get(req: Request, res: Response) {
  const allCategories = await categoryServices.getAll();
  
  return res.status(200).send({ categories: allCategories });
}
