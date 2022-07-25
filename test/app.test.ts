import app from "../src/app.js";
import supertest from "supertest";
import { prisma } from "../src/database/dbConfig.js";
import userFactory from "./factories/userFactory.js";
import dotenv from "dotenv";
import { NewTestSchema } from "../src/repositories/testRepository.js";
dotenv.config();


beforeEach( async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE;`;
});

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

  it("returns 422 when trying to register user with password length < 4", async () => {
    const newUser = userFactory.createUserData(3);

    const response = await supertest(app).post("/sign-up").send(newUser);
    expect(response.statusCode).toBe(422);

    const persistedUser = await prisma.user.findUnique({
      where: {
        email: newUser.email,
      },
    });
    expect(persistedUser).toBeNull();
  });
  
  it("returns 422 when trying register an invalid email adress", async () => {
    const newUser = {
      email: "invalid_email@domain",
      password: "invalid_email",
    };

    const response = await supertest(app).post("/sign-up").send(newUser);
    expect(response.statusCode).toBe(422);

    const persistedUser = await prisma.user.findUnique({
      where: {
        email: newUser.email,
      },
    });
    expect(persistedUser).toBeNull();

  });

  it("returns 409 when trying to register user with duplicated email", async () => {
    const newUser = userFactory.createUserData(4);
    
    await supertest(app).post("/sign-up").send(newUser);

    const response = await supertest(app).post("/sign-up").send(newUser);
    expect(response.statusCode).toBe(409);

    const persistedUser = await prisma.user.findMany({
      where: {
        email: newUser.email,
      },
    });
    expect(persistedUser.length).toBe(1);
  });

});

describe("POST /sign-in, user test suite", () => {
  it("successfully signs-in an existent user", async () => {
    const newUser = {
      email: "000@mail.com",
      password: "0000",
    };

    await supertest(app).post("/sign-up").send(newUser);

    const response = await supertest(app).post("/sign-in").send(newUser);
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeTruthy();
  });

  it("returns 404 when given an unregistered email", async () => {
    const newUser = userFactory.createUserData(4);

    await supertest(app).post("/sign-up").send(newUser);

    const response = await supertest(app).post("/sign-in").send({
      email: "another_invalid_email@mail.com",
      password: newUser.password,
    });
    expect(response.statusCode).toBe(404);
  });

  it("returns 401 when given wrong password", async () => {
    const newUser = userFactory.createUserData(4);

    await supertest(app).post("/sign-up").send(newUser);

    const response = await supertest(app).post("/sign-in").send({
      email: newUser.email,
      password: "wrong",
    });
    expect(response.statusCode).toBe(401);
  });

});

describe("POST /tests/new, newtest test suite", () => {
  it("returns 201 when given valid new-test data", async () => {
    const newUser = userFactory.createUserData(4);
    
    await supertest(app).post("/sign-up").send(newUser);
    const signInResponse = await supertest(app).post("/sign-in").send(newUser);
    const receivedToken = signInResponse.body.token;

    const newTestData: NewTestSchema = {
      name: "newTest111",
      pdfUrl: "http://pdfurl.com/newtest111",
      categoryId: 1,
      disciplineId: 1,
      teacherId: 1,
    };

    const response = await supertest(app).post("/tests/new").send(newTestData).set("Authorization", `Bearer ${receivedToken}`);
    
    expect(response.statusCode).toBe(201);

  });
});

describe("GET /tests, tests test suite", () => {
  it("returns 401 when given an invalid token", async () => {
    const newUser = userFactory.createUserData(4);
    
    await supertest(app).post("/sign-up").send(newUser);
    const signInResponse = await supertest(app).post("/sign-in").send(newUser);
    const receivedToken = signInResponse.body.token;

    const response = await supertest(app).get("/tests").set("Authorization", `Bearer ${receivedToken}ZZZ`);
    expect(response.statusCode).toBe(401);
  });

  it("returns 422 when given valid token but invalid query string", async () => {
    const newUser = userFactory.createUserData(4);
    
    await supertest(app).post("/sign-up").send(newUser);
    const signInResponse = await supertest(app).post("/sign-in").send(newUser);
    const receivedToken = signInResponse.body.token;

    const response = await supertest(app).get("/tests").set("Authorization", `Bearer ${receivedToken}`);
    expect(response.statusCode).toBe(422);
  });

});