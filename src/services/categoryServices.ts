import {
  categoryRepository,
} from "../repositories/index.js";
import {
  errorUtils,
} from "../utils/index.js";

async function categoryIdExists(categoryId: number) {
  const category = await categoryRepository.findById(categoryId);
  if (!category) {
    throw errorUtils.notFoundError("category id does not exist");
  }

  return category;
}

async function getAll() {
  const categories = await categoryRepository.get();
  if (categories.length < 1) {
    throw errorUtils.notFoundError("there are no categories registered");
  }

  return categories;
}

const categoryServices = {
  categoryIdExists,
  getAll,
};

export default categoryServices;