import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      validate: {
        validator: async (username) =>
          (await User.where({ username }).countDocuments()) === 0,
        message: ({ value }) =>
          `Username ${value} has already been save in DB!`,
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    avatarUrl: String,
    createdAt: String,
  },
  { timestamps: true }
);
const User = model("User", userSchema);
export default User;
