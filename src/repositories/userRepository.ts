import { prisma } from "../database/dbConfig.js";
import { User } from "@prisma/client";


export type NewUser = Omit<User, "id">;

async function insert(newUser: NewUser) {
  await prisma.user.create({
    data: newUser,
  });
}

async function findByEmail(userEmail: string) {
  return await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });  
}

async function findById(userId: number) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });  
}


const userRepository = {
  insert,
  findByEmail,
  findById,
};

export default userRepository;