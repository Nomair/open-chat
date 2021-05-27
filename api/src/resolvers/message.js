import { messageSchema } from "../schemas";
import { Message, User } from "../models";
import { isObjectId } from "../utils/functions";
import pubsub from "../pubsub";

const NEW_MESSAGE = "NEW_MESSAGE";

export default {
  Query: {
    getMessages: (root, arg, { req }, info) => {
      //TODO paginiation
      return Message.find({});
    },
    getMessage: (root, { id }, { req }, info) => {
      isObjectId(id);
      return Message.findById(id);
    },
  },
  Mutation: {
    sendMessage: async (root, args, { req }, info) => {
      await messageSchema.validateAsync(args, { abortEarly: false });
      const { userId } = req.session;

      const message = await Message.create({ body: args.body, sender: userId });
      pubsub.publish(NEW_MESSAGE, { getFeeds: message });
      return message;
    },
  },
  Subscription: {
    getFeeds: {
      subscribe: () => pubsub.asyncIterator([NEW_MESSAGE]),
    },
  },

  Message: {
    sender: async (message, args, { req }, info) => {
      try {
        return (await message.populate("sender").execPopulate()).sender;
      } catch {
        return User.findById(message.sender);
      }
    },
  },
};
