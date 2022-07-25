import app from "../src/app.js";
import supertest from "supertest";
import { prisma } from "../src/database/dbConfig.js";
import userFactory from "./factories/userFactory.js";
import dotenv from "dotenv";
dotenv.config();


/*
beforeEach( async () => {
  await prisma.$executeRaw`TRUNCATE TABLE ?users CASCADE;`;
});
*/

describe("POST /sign-up, user test suite", () => {
  it("registers a new user given valid email and password", async () => {
    const newUser = userFactory.createUserData(4);

    const response = await supertest(app).post("/sign-up").send(newUser);
    expect(response.statusCode).toBe(201);

    const persistedUser = await prisma.user.findUnique({
      where: {
        email: newUser.email,
      },
    });
    expect(persistedUser.email).toBe(newUser.email);
  });

});