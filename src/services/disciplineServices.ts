import { termRepository } from "../repositories/index.js";


async function getDisciplinesByTerms() {
  const disciplinesByTerms = await termRepository.getTermsDisciplines();

  return disciplinesByTerms;
}


const disciplineServices = {
  getDisciplinesByTerms,
};

export default disciplineServices;