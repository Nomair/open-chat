import mongoose from "mongoose";
import { UserInputError } from "apollo-server-express";

export const isObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new UserInputError(`Input is not valid, please try again!`);
};
