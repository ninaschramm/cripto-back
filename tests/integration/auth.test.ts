import app from "../../src/index";
import { faker } from "@faker-js/faker";
import { duplicatedEmailError } from "../../src/services/authService";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser } from "../factories/userFactory";
import db from "../../src/db/mongo";

const server = supertest(app);

async function cleanDb() {
  db.collection('users').deleteMany({})
}

beforeAll(async () => {
  await cleanDb();
});


describe("POST /sign-up", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/sign-up");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/sign-up").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const password = faker.internet.password(6)
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: password,
      confirmPassword: password,
      image: faker.internet.url(),
      name: faker.name.findName(),
      description: faker.lorem.lines()
    });

    it("should respond with status 409 when there is an user with given email", async () => {
    const body = generateValidBody();
    await createUser(body.email);

    const response = await server.post("/sign-up").send(body);

    expect(response.status).toBe(httpStatus.CONFLICT);
    expect(response.body).toEqual(duplicatedEmailError());
    });

    it("should respond with status 201 and create user when given email is unique", async () => {
    const body = generateValidBody();

    const response = await server.post("/sign-up").send(body);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual({
        id: expect.any(String),
        email: body.email,
    });
    });

    it("should not return user password on body", async () => {
    const body = generateValidBody();

    const response = await server.post("/sign-up").send(body);

    expect(response.body).not.toHaveProperty("password");
    });

    it("should save user on db", async () => {
    const body = generateValidBody();

    const response = await server.post("/sign-up").send(body);
    const email = response.body.email

    const result = await db.collection('users').findOne({ email });
    const user = {
      _id: result._id.toString(),
      email: body.email
    }
    expect(user).toEqual({
        _id: response.body.id,
        email: body.email,
            },
        );
        });
    });
});
