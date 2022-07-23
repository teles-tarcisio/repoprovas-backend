import {
  teacherDisciplineRepository,
} from "../repositories/index.js";
import {
  errorUtils,
} from "../utils/index.js";

async function checkTeacherAndDisciplineIds(teacherId: number, disciplineId: number) {
  const teacherDiscipline = await teacherDisciplineRepository.findByTeacherDisciplineIds(teacherId, disciplineId);
  if (!teacherDiscipline) {
    throw errorUtils.notFoundError("teacher_discipline does not exist");
  }

  return teacherDiscipline;
}

const teacherDisciplineServices = {
  checkTeacherAndDisciplineIds,
};

export default teacherDisciplineServices;