import Joi from "joi";

const body = Joi.string().required().label("Message");

export const messageSchema = Joi.object().keys({
  body,
});
