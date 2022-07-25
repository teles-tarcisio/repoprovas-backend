import { prisma } from "../database/dbConfig.js";


async function getTeachersCategories() {
  //teacher -> teachDisc -> tests
  const teacherTests = await prisma.teacher.findMany({
    select: {
      id: true,
      name: true,
      teacherDisciplines: {
        include: {
          discipline: true,
          tests: {
            include: {
              category: true,
            }
          }
        }
      }
    }
  });

  return teacherTests;
}


const teacherRepository = {
  getTeachersCategories,
};

export default teacherRepository;