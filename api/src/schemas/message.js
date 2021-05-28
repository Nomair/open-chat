import Joi from "joi";

const body = Joi.string().required().label("Message");
// Accepting criteria for sending a message
export const messageSchema = Joi.object().keys({
  body,
});
