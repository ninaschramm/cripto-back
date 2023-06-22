import { Router } from "express";

import { newUserSchema, userSchema } from "../schemas/authSchemas";
import { validateBody } from "../middlewares/validation-middleware";
import { createUser, login } from "../controllers/authControllers";

const authRouter = Router();

authRouter.post("/sign-up", validateBody(newUserSchema), createUser)
authRouter.post("/sign-in", validateBody(userSchema), login);

export { authRouter };
