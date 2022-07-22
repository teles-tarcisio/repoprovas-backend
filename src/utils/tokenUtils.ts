import jwt from "jsonwebtoken";
import { errorUtils } from "../utils/index.js";

import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET;
//  token expires after 4h (in seconds):
const tokenConfig = { expiresIn: 60*60*4 };

export async function createToken(tokenData: Object) {
  return jwt.sign(tokenData, secretKey, tokenConfig);
}

export async function verifyToken(token: string) {
  try {
    const verifiedData = jwt.verify(token, secretKey);
    return verifiedData;
  } catch (error) {
    console.error(error);
    throw errorUtils.jwtError("Invalid or expired token");
  }
}