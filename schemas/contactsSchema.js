const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
module.exports = { addSchema, updateSchema, updateFavoriteSchema };
