import { model, Schema } from "mongoose";
const { ObjectId } = Schema.Types;

const messageSchema = new Schema(
  {
    body: String,
    sender: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Message = model("Message", messageSchema);
export default Message;
