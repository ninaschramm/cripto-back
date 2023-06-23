import app from "../../src/index";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser } from "../factories/userFactory";
import { User } from "@/utils/types";
import jwt from 'jsonwebtoken';


const server = supertest(app);

async function generateValidToken(user?: User) {
    const incomingUser = user || (await createUser());
    const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);
  
    return token;
}
  

describe("GET /cripto", () => {
    it("should respond with status 401 if no token is given", async () => {
      const response = await server.get("/user");
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  
    it("should respond with status 401 if given token is not valid", async () => {
      const token = faker.lorem.word();
  
      const response = await server.get("/user").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  
     describe("when token is valid", () => {     
  
      it("should respond with status 200 and info for given user", async () => {
        const user = await createUser();      
        const token = await generateValidToken(user);
  
        const response = await server.get("/user").set("Authorization", `Bearer ${token}`);
  
        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toBeDefined();
      });
    });
  });