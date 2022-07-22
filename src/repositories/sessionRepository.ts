import { prisma } from "../database/dbConfig.js";
import { Session } from "@prisma/client";
import dayjs from "dayjs";


export type NewSession = Omit<Session, "id" | "createdAt">;
export type CreateSession = Omit<Session, "id">;

async function insert(userId: number) {
  const createSession:  CreateSession = {
    userId,
    createdAt: dayjs().toDate(),
    expiredToken: false,
  };

  await prisma.session.create({
    data: createSession,
  });
}


const sessionRepository = {
  insert,
};

export default sessionRepository;