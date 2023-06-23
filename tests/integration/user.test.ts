import app from "../../src/index";
import { faker } from "@faker-js/faker";
import { User } from "../../src/utils/types";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser } from "../factories/userFactory";
import {db, mongoClient} from "../../src/db/mongo";
import jwt from "jsonwebtoken";

const server = supertest(app);

async function cleanDb() {
  db.collection('users').deleteMany({})
}

async function generateValidToken(user?: User) {
    const incomingUser = user || (await createUser());
    const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);
  
    return token;
}
  

beforeAll(async () => {
  await cleanDb();
});

afterAll(async () => {
  await mongoClient.close();
  console.log("Disconnected from the database");
});

describe("GET /user", () => {
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
        expect(response.body).toEqual({
          _id: user.id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          description: user.description
        });
      });
    });
  });

  describe("PUT /user", () => {
    it("should respond with status 401 if no token is given", async () => {
      const response = await server.put("/user");
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  
    it("should respond with status 401 if given token is not valid", async () => {
      const token = faker.lorem.word();
  
      const response = await server.put("/user").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  
     describe("when token is valid", () => {     
  
      it("should respond with status 200 and acknowledge changes", async () => {
        const user = await createUser();      
        const token = await generateValidToken(user);
        const body = {
            image: 'http://updatedimage.com',
            description: 'updated description'
        }
  
        const response = (await server.put("/user").set("Authorization", `Bearer ${token}`).send(body));
  
        expect(response.status).toBe(httpStatus.OK);
        expect(response.body.acknowledged).toBe(true);        
      });

      it("should save changes on db", async () => {
        const user = await createUser();      
        const token = await generateValidToken(user);
        const body = {
            image: 'http://updatedimage.com',
            description: 'updated description'
        }
  
        const response = (await server.put("/user").set("Authorization", `Bearer ${token}`).send(body));
    
        const updatedUser = await db.collection('users').findOne({_id: user.id},
            { projection: { password: 0 } });

        expect(updatedUser).toEqual({
            _id: user.id,
            name: user.name,
            email: user.email,
            image: body.image,
            description: body.description
            });
        });
        
    });
  });