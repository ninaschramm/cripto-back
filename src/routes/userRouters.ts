import { Router } from "express";
import { getUserInfo, updateUserInfo } from "../controllers/userControllers";
import { authenticateToken } from "../middlewares/authenticationMiddleware";

const userRouter = Router();

userRouter
    .all("/*", authenticateToken)
    .get("/user", getUserInfo)
    .put("/user", updateUserInfo)

export { userRouter };
