import { AuthenticationError } from "apollo-server-express";
import { SESS_NAME } from "./config";
import { User } from "./models";

const loggedIn = (req) => req.session.userId;

export const LogInOrRegister = async (args) => {
  let user = await User.findOne({ username: args.username });
  if (!user) user = User.create(args);
  return user;
};

export const checkLoggedIn = (req) => {
  if (!loggedIn(req)) throw new AuthenticationError("You must be logged in!");
};

export const checkLoggedOut = (req) => {
  if (loggedIn(req))
    throw new AuthenticationError("You are already logged in!");
};

export const LogOut = (req, res) =>
  new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) reject(err);
      res.clearCookie(SESS_NAME);
      resolve(true);
    });
  });
