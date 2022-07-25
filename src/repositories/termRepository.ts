import { prisma } from "../database/dbConfig.js";


async function getTermsDisciplines() {
  //term -> disc -> teachDisc -> tests
  
  const disciplinesTests = await prisma.term.findMany({
    select: {
      id: true,
      number: true,
      disciplines: {
        select: {
          id: true,
          name: true,
          teacherDisciplines: {
            include: {
              teacher: true,
              tests: {
                include: {
                  category: true,
                }
              }
            }
          }
        }
      }
    }
  });
    
  return disciplinesTests;
}


const termRepository = {
  getTermsDisciplines,
};

export default termRepository;