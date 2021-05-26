import { messageSchema } from "../schemas";
import { Message } from "../models";
import { isObjectId } from "../utils/functions";

export default {
  Query: {
    getMessages: (root, arg, { req }, info) => {
      //TODO paginiation
      return Message.find({});
    },
    getMessage: (root, { id }, { req }, info) => {
      isObjectId(id);
      return User.findById(id);
    },
  },
  Mutation: {
    sendMessage: async (root, args, { req }, info) => {
      await messageSchema.validateAsync(args, { abortEarly: false });
      const { userId } = req.session;

      const message = await Message.create({ body: args.body, sender: userId });
      return message;
    },
  },
  Message: {
    sender: async (message, args, { req }, info) => {
      return (await message.populate("sender").execPopulate()).sender;
    },
  },
};
