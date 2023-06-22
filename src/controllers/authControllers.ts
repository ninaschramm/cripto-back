import authService from "../services/authService";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function createUser(req: Request, res: Response) {
    const { email, password, image,
    name, description } = req.body;
  
    try {
      const user = await authService.createUser({ email, password, image,
        name, description });
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

// export async function getUsers(req: Request, res: Response) {  
//   try {
//     const result = await authService.getUsers();
//     console.log(result)
//     return res.status(httpStatus.OK).send(result)
//   }
//   catch (error) {
//     return res.sendStatus(httpStatus.BAD_GATEWAY)
//   }
// }