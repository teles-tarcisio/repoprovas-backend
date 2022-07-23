import { prisma } from "../database/dbConfig.js";


async function findByTeacherDisciplineIds(teacherId: number, disciplineId: number) {
  const foundTeacherDiscipline = await prisma.teacherDiscipline.findFirst({
    where: {
      teacherId,
      disciplineId,
    },
  });

  return foundTeacherDiscipline;
}


const categoryRepository = {
  findByTeacherDisciplineIds,
};

export default categoryRepository;