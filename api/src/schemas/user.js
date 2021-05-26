import Joi from "joi";

const username = Joi.string().required().label("Name");
const avatarUrl = Joi.string().label("Avatar");

export const registerLoginSchema = Joi.object().keys({
  username,
  avatarUrl,
});
