import { prisma } from "../database/dbConfig.js";
import { Test } from "@prisma/client";


export type CreateNewTest = Omit<Test, "id">;

export interface NewTestSchema {
  name: string;
  pdfUrl: string;
  categoryId: number;
  disciplineId: number;
  teacherId: number;
};

async function insert(newTest: CreateNewTest) {
  await prisma.test.create({
    data: newTest,
  });
}


const testRepository = {
  insert,
};

export default testRepository;