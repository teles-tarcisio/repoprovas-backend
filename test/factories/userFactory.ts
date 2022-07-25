import { faker } from "@faker-js/faker";
import { NewUser } from "../../src/repositories/userRepository.js";

function createUserData(passwordLength: number): NewUser {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(passwordLength),
  };
}

const userFactory = {
  createUserData,
};

export default userFactory;