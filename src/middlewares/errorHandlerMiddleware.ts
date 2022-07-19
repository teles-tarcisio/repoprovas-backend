import { NextFunction, Request, Response } from "express";

function errorTypeToStatusCode(errorType: string) {
  if (errorType === "conflict") return 409;
  if (errorType === "not_found") return 404;
  if (errorType === "unauthorized") return 401;
  if (errorType === "unprocessable") return 422;
  
  return 400;
}

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  if(err.type) {
    return res.status(errorTypeToStatusCode(err.type)).send(err.message);
  }
  
  return res.sendStatus(500);
}