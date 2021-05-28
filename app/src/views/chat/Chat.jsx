import React from "react";
import { gql, useSubscription } from "@apollo/client";
import Messages from "../messages/Messages";
import { Container } from "shards-react";
import { getUserName } from "../../auth";
import { toast, ToastContainer } from "react-toastify";
import SendMessage from "../messages/SendMessage";
import "react-toastify/dist/ReactToastify.css";
import "./Chat.css";

const NEW_USER_STATUS = gql`
  subscription {
    getUsersStatusUpdate {
      id
      username
      userStatus
    }
  }
`;

const Chat = () => {
  let usersStatusUpdte = useSubscription(NEW_USER_STATUS);

  if (usersStatusUpdte.data) {
    if (usersStatusUpdte.data.getUsersStatusUpdate) {
      const users = usersStatusUpdte.data.getUsersStatusUpdate;
      if (users.userStatus == "LoggedIn")
        toast.success(`⭐ ${users.username} just joined the chat`);
      else toast.info(`😭 ${users.username} just left the chat`);
      usersStatusUpdte.data.getUsersStatusUpdate = null;
    }
  }

  return (
    <Container>
      <ToastContainer />
      <div className="chat-body">
        <Messages user={getUserName()} />
      </div>
      <SendMessage />
    </Container>
  );
};

export default Chat;
