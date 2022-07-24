import {
  categoryServices,
  teacherDisciplineServices,
  disciplineServices,
  teacherServices,
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

async function getByDisciplines() {
  const testsByDisciplines = await disciplineServices.getDisciplinesByTerms();

  return testsByDisciplines;
}

async function getByTeachers() {
  const testsByTeachers = await teacherServices.getCategoriesByTeacher();

  return testsByTeachers;
}


const testServices = {
  create,
  getByDisciplines,
  getByTeachers,
};

export default testServices;