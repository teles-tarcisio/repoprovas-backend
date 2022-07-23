import { testRepository } from "../repositories/index.js";
  
import { NewTest } from "../repositories/testRepository.js";
import {
  errorUtils,
} from "../utils/index.js";

async function create(newTest: NewTest) {
  //existe categoryId?
  //existe teacherId/disciplineId/TeacherDisciplineId?

  await testRepository.insert(newTest);
}



const testServices = {
  create,
};

export default testServices;