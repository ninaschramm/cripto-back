import { UserData } from "@/utils/types";
import authService from "../services/authService";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { errorHandlerMiddleware } from "../middlewares/errorHandlerMiddleware";

export async function createUser(req: Request, res: Response) {
    const { email, password, name, description } = req.body;
    const image = 'https://cripto-tracker.s3.sa-east-1.amazonaws.com/profile-pics/anonymous-avatar-icon-25.png';
  
    try {
      const user = await authService.createUser({ email, password, image, name, description });
      return res.status(httpStatus.CREATED).json({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      if (error.name === "DuplicatedEmailError") {
        return res.status(httpStatus.CONFLICT).send(error);
      }
      return res.status(httpStatus.BAD_REQUEST).send(error);
    }
  }

export async function login(req:Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  const userData: UserData = {
    email,
    password
  }
    try {
      const token = await authService.login(userData);
      return res.status(200).send(token)
  }
  catch(err) {
      errorHandlerMiddleware(err, req, res, next);
  }    
  
}