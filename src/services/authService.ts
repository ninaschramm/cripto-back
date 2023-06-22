import authRepository from "../repositories/authRepository";
import bcrypt from "bcrypt";
import { NewUser, User, UserData } from "../utils/types";
import { duplicatedEmailError, unauthorizedError } from "../utils/errors";
import jwt from 'jsonwebtoken';

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

export async function login(login: UserData) {
  const user = await getUserOrFail(login);
  const expire = {expiresIn: 60*60*3};
  const data = {
      userId: user._id
  }
  const token = jwt.sign(data, process.env.JWT_SECRET, expire);

  return token;
}

export async function getUserOrFail(login: UserData) {
  const user = await authRepository.findByEmail(login.email);
  if (!user) throw unauthorizedError('Invalid credentials');

  const isPasswordValid = bcrypt.compareSync(login.password, user.password);
  if (!isPasswordValid) throw unauthorizedError('Invalid credentials');

  return user;
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await authRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

const authService = {
  createUser,
  login
};

export default authService;
