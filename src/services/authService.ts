import authRepository from "../repositories/authRepository";
import bcrypt from "bcrypt";
import { NewUser, User, ApplicationError } from "../types/types";

async function createUser({ email, password, image, name, description }: NewUser): Promise<User> {
  //await validateUniqueEmailOrFail(email);
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

async function getUsers() {
  const users = await authRepository.getUsers();
  return users
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await authRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

async function createUserAndFetchUsers(data: NewUser) {
  try {
    const createdUser = await authRepository.create(data);
    console.log("Usuário inserido:", createdUser);

    console.log("Obtendo usuários...");
    const users = await authRepository.getUsers();
    console.log("Usuários encontrados:", users);

    return users;
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    throw error;
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
  getUsers,
  createUserAndFetchUsers
};

export default authService;
