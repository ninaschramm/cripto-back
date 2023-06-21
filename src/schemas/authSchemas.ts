import Joi from "joi";

export const newUserSchema = Joi.object({
    name: Joi.string().required().messages({
      'any.required': "Todos os campos são obrigatórios",}),
    email: Joi.string().email().required().messages({
      'string.email': "Digite um endereço de e-mail válido",
      'any.required': "Todos os campos são obrigatórios",}),
    password: Joi.string().required().min(6).messages({
      'any.required': "Todos os campos são obrigatórios",
      'string.min': "Sua senha deve ter pelo menos 6 caracteres",}),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
      'any.required': "Todos os campos são obrigatórios",
      'any.only': "A confirmação de senha não confere!",}),
    image: Joi.string().required().messages({
      'any.required': "Todos os campos são obrigatórios",}),
    description: Joi.string().required().messages({
      'any.required': "Todos os campos são obrigatórios",}),
  });

export const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6)
})
