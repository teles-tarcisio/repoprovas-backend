import { prisma } from "../database/dbConfig.js";
import { Test } from "@prisma/client";


export type NewTest = Omit<Test, "id">;

async function insert(newTest: NewTest) {
  await prisma.test.create({
    data: newTest,
  });
}


const testRepository = {
  insert,
};

export default testRepository;