import { Router } from "express";
import { getUserInfo } from "../controllers/userControllers";
import { authenticateToken } from "../middlewares/authenticationMiddleware";

const userRouter = Router();

userRouter
    .all("/*", authenticateToken)
    .get("/user", getUserInfo)

export { userRouter };
