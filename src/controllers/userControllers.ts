import userService from "../services/userService";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { errorHandlerMiddleware } from "../middlewares/errorHandlerMiddleware";
import { AuthenticatedRequest } from "../middlewares/authenticationMiddleware";

export async function getUserInfo(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;

    try {
        const userInfo = await userService.getUserInfo(userId);
        return res.status(httpStatus.OK).send(userInfo)
    } catch (err) {
      errorHandlerMiddleware(err, req, res, next);
    }
}

export async function updateUserInfo(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const { image, description } = req.body;

    if (!image && !description) {
        return res.status(httpStatus.OK).send("No changes to save")
    }

    try {
        const updatedInfo = await userService.updateUserInfo(userId, image, description)
        return res.status(httpStatus.OK).send(updatedInfo)
    } catch (err) {
        errorHandlerMiddleware(err, req, res, next);
      }
}