import { prisma } from "../database/dbConfig.js";


async function findById(categoryId: number) {
  const foundCategory = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  return foundCategory;
}


const categoryRepository = {
  findById,
};

export default categoryRepository;