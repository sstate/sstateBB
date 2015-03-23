var Joi = require('joi');

exports.new_user = Joi.object().required().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
  email: Joi.string().email().required(),
  status: Joi.number(),
  user_role: Joi.number()
}).with('username', 'password', 'email', 'status', 'user_role');

exports.login = Joi.object().required().keys({
  password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
  email: Joi.string().email().required()
}).with('password', 'email');