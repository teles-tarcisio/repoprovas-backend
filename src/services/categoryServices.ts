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

const categoryServices = {
  categoryIdExists,
};

export default categoryServices;