import { ObjectId } from "mongodb"

type NewUser = {
    id?: number
    name: string
    email: string
    password: string
    confirmPassword?: string
    image: string
    description: string
}

type User = {
    id: ObjectId
    name: string
    email: string
    password: string
    image: string
    description: string
}

type ApplicationError = {
    name: string;
    message: string;
  };

type UserData = {
    email: string
    password: string
}

export {
    NewUser,
    User,
    ApplicationError,
    UserData,
}