import { teacherRepository } from "../repositories/index.js";


async function getCategoriesByTeacher() {
  const categoriesByTeacher = await teacherRepository.getTeachersCategories();

  return categoriesByTeacher;
}


const teacherServices = {
  getCategoriesByTeacher,
};

export default teacherServices;