import { User } from "../models";
import { isObjectId } from "../utils/functions";
import { registerLoginSchema } from "../schemas";
import { LogInOrRegister, LogOut } from "../auth";

export default {
  Query: {
    currentUser: (root, arg, { req }, info) => {
      return User.findById(req.session.userId);
    },
    users: (root, arg, { req }, info) => {
      return User.find({});
    },
    user: (root, { id }, { req }, info) => {
      isObjectId(id);
      return User.findById(id);
    },
  },
  Mutation: {
    register: async (root, args, { req }, info) => {
      await registerLoginSchema.validateAsync(args, { abortEarly: false });
      const user = await User.create(args);
      req.session.userId = user.id;
      return user;
    },

    logIn: async (root, args, { req }, info) => {
      const { userId } = req.session;
      if (userId) return User.findById(userId);
      await registerLoginSchema.validateAsync(args, { abortEarly: false });
      const user = await LogInOrRegister(args);
      req.session.userId = user.id;
      return user;
    },

    logOut: (root, args, { req, res }, info) => {
      return LogOut(req, res);
    },
  },
};
