import { messageSchema } from "../schemas";
import { Message, User } from "../models";
import { isObjectId } from "../utils/functions";
import pubsub from "../pubsub";

const NEW_MESSAGE = "NEW_MESSAGE";

export default {
  Query: {
    getMessages: (root, arg, { req }, info) => {
      return Message.find({});
    },
    getMessage: (root, { id }, { req }, info) => {
      isObjectId(id);
      return Message.findById(id);
    },
  },
  Mutation: {
    sendMessage: async (root, args, { req }, info) => {
      // abortEarly false to show all the failures not just the first one
      await messageSchema.validateAsync(args, { abortEarly: false });

      const { userId } = req.session;
      const message = await Message.create({ body: args.body, sender: userId });
      // Add the new message to the subscription channel
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
      // the point here is to deal with message sender as an object of type User
      try {
        return (await message.populate("sender").execPopulate()).sender;
      } catch {
        return User.findById(message.sender);
      }
    },
  },
};
