import authRepository from "@/repositories/authRepository";
import bcrypt from "bcrypt";
import { NewUser, User, ApplicationError } from "@/types/types";

async function createUser({ email, password, confirmPassword, image, name, description }: NewUser): Promise<User> {
  
  await validateUniqueEmailOrFail(email);
  const hashedPassword = await bcrypt.hash(password, 12);

  const newUserData = {
    email,
    password: hashedPassword,
    confirmPassword,
    image,
    name,
    description
  }

  return authRepository.create(newUserData);
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await authRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

function duplicatedEmailError(): ApplicationError {
  return {
    name: "DuplicatedEmailError",
    message: "There is already an user with given email",
  };
}

const authService = {
  createUser,
};

export default authService;
