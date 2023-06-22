import { NextFunction, Request, Response } from 'express';
import { ApplicationError } from '../utils/types';
import {  errorTypeToStatusCode, isAppError } from '../utils/errors'

export function errorHandlerMiddleware(
  err: Error | ApplicationError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (isAppError(err)) {
    return res.status(errorTypeToStatusCode(err.name)).send(err);
  }

  return res.sendStatus(500);
}
