import { prisma } from "../database/dbConfig.js";


async function getTeachersCategories() {
  //teacher -> teachDisc -> tests
  
 const teacherTests = await prisma.teacherDiscipline.findMany({
   include: {
     discipline: {
       include: {
         terms: {},
       }
     },
     teacher: {},
     tests: {
       include: {
         category: {},
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