import bcrypt from "bcrypt";
import faker from "@faker-js/faker";
import db from "../../src/db/mongo";
import { User } from "../utils/types";

export async function createUser(email?: string): Promise<User> {
  const incomingPassword = faker.internet.password(6);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  const data = {
    email: email || faker.internet.email(),
    password: hashedPassword,
    image: faker.internet.url(),
    name: faker.name.findName(),
    description: faker.lorem.lines()
  }

  const result = await db.collection('users').insertOne(data);
    return {
        ...data,
        id: result.insertedId
    }
}