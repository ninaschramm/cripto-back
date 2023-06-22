import { Router } from "express";

import { newUserSchema } from "../schemas/authSchemas";
import { validateBody } from "../middlewares/validation-middleware";
import { createUser, getUsers } from "../controllers/authControllers";

const authRouter = Router();

authRouter.post("/sign-up", validateBody(newUserSchema), createUser);
authRouter.get("/", getUsers)

export { authRouter };
