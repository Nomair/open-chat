import Joi from "joi";

const username = Joi.string().required().label("Name");
const avatarUrl = Joi.string().label("Avatar");
// Accepting criteria for adding user
export const registerLoginSchema = Joi.object().keys({
  username,
  avatarUrl,
});
