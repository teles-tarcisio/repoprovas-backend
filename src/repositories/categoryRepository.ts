import { prisma } from "../database/dbConfig.js";


async function findById(categoryId: number) {
  const foundCategory = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  return foundCategory;
}

async function get() {
  return (await prisma.category.findMany({}));
}


const categoryRepository = {
  findById,
  get,
};

export default categoryRepository;