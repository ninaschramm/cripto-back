import authRepository from "../repositories/authRepository";
import bcrypt from "bcrypt";
import { NewUser, User, ApplicationError } from "../types/types";

async function createUser({ email, password, image, name, description }: NewUser): Promise<User> {
  await validateUniqueEmailOrFail(email);
  const hashedPassword = await bcrypt.hash(password, 12);

  const newUserData = {
    email,
    password: hashedPassword,
    image,
    name,
    description
  }

  const result = authRepository.create(newUserData);
  return result
}

// async function getUsers() {
//   const users = await authRepository.getUsers();
//   return users
// }

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await authRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}


export function duplicatedEmailError(): ApplicationError {
  return {
    name: "DuplicatedEmailError",
    message: "There is already an user with given email",
  };
}

const authService = {
  createUser,
};

export default authService;
