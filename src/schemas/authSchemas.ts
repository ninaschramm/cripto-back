import Joi from "joi";

export const newUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    description: Joi.string().required(),
  });

export const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6)
})
