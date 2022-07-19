import { NextFunction, Request, Response } from "express";
import { errorUtils } from "../utils/index.js";

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error("An error occurred!", err);
  if(errorUtils.isAppError(err)) {
    const statusCode = errorUtils.errorTypeToStatusCode(err.type); return res.status(statusCode).send(err.message);
  }
  
  return res.sendStatus(500);
}