import { User } from "../models";
import { isObjectId } from "../utils/functions";
import { registerLoginSchema } from "../schemas";
import { LogInOrRegister, LogOut } from "../auth";
import pubsub from "../pubsub";

const NEW_USER_STATUS = "NEW_USER_STATUS";

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
      req.session.username = user.username;
      const userStatus = {
        id: user.id,
        username: user.username,
        userStatus: "LoggedIn",
      };
      pubsub.publish(NEW_USER_STATUS, { getUsersStatusUpdate: userStatus });

      return user;
    },

    logOut: (root, args, { req, res }, info) => {
      const { userId, username } = req.session;
      const result = LogOut(req, res);
      const userStatus = {
        id: userId,
        username: username,
        userStatus: "LoggedOut",
      };
      pubsub.publish(NEW_USER_STATUS, { getUsersStatusUpdate: userStatus });
      return result;
    },
  },
  Subscription: {
    getUsersStatusUpdate: {
      subscribe: () => pubsub.asyncIterator([NEW_USER_STATUS]),
    },
  },
};
