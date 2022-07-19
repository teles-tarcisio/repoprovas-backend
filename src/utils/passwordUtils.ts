import bcrypt from "bcrypt";

const SALT = 10;

export async function encryptPassword(password: string) {
  return await bcrypt.hash(password, SALT);
}

export async function decryptPassword(userPassword: string, hashedPassword: string) {
  const passwordMatch = await bcrypt.compare(userPassword, hashedPassword);
  if (!passwordMatch) {
    throw {
      type: "unauthorized",
      message: "incorrect password",
    };
  }
  return;
}