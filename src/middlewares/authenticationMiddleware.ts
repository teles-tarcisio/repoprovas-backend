import { NextFunction, Request, Response } from "express";
import {
  verifyToken,
  errorUtils,
} from "../utils/index.js";

export default async function ensureAuthentication(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req?.headers;
  if (!authorization) {
    throw errorUtils.unauthorizedError("undefined token");
  }
  
  const token = authorization.replace("Bearer ", "");
  
  const verifiedToken = await verifyToken(token);
    
  res.locals.payload = {
    ...res.locals.payload,
    userAuthData: verifiedToken,
  };
  
  next();
}