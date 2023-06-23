import { ApplicationError } from "./types";

export function isAppError(error: object): error is ApplicationError {
    return (error as ApplicationError).name !== undefined;
  }

export function errorTypeToStatusCode(name: string) {
  if (name === "conflict") return 409;
  if (name === "not_found") return 404;
  if (name === "unauthorized") return 401;
  return 400;
}


export function duplicatedEmailError(): ApplicationError {
    return {
      name: "DuplicatedEmailError",
      message: "There is already an user with given email",
    };
  }

export function unauthorizedError(message?: string): ApplicationError {
    return { name: "unauthorized", message };
  }