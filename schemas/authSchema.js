const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const createUserValidationSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginValidationSchema = Joi.object().keys({
  email: createUserValidationSchema.extract("email"),
  password: createUserValidationSchema.extract("password"),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.valid("starter", "pro", "business"),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});
module.exports = {
  createUserValidationSchema,
  loginValidationSchema,
  updateSubscriptionSchema,
  verifyEmailSchema,
};
