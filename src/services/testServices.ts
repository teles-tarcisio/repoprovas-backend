import {
  categoryServices,
  teacherDisciplineServices,
 } from "./index.js";
import { testRepository } from "../repositories/index.js";
import {
  NewTestSchema,
  CreateNewTest,
} from "../repositories/testRepository.js";


async function create(newTest: NewTestSchema) {
  await categoryServices.categoryIdExists(newTest.categoryId);
  
  const teacherDiscipline = await teacherDisciplineServices.checkTeacherAndDisciplineIds(newTest.teacherId, newTest.disciplineId);

  const createTest: CreateNewTest = {
    name: newTest.name,
    pdfUrl: newTest.pdfUrl,
    categoryId: newTest.categoryId,
    teacherDisciplineId: teacherDiscipline.id,
  };
 
  await testRepository.insert(createTest);
}


const testServices = {
  create,
};

export default testServices;