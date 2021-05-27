import React, { useState } from "react";
import { useMutation, gql, useSubscription } from "@apollo/client";
import Messages from "../messages/Messages";
import { Container, Row, Col, FormInput, Button } from "shards-react";
import { userName } from "../../auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Chat.css";
const POST_MESSAGE = gql`
  mutation ($body: String!) {
    sendMessage(body: $body) {
      id
    }
  }
`;

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
  const [body, setBody] = useState("");
  const [postMessage] = useMutation(POST_MESSAGE);
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

  let LoggedUserName = userName();
  const onSend = () => {
    if (body.length > 0) {
      postMessage({ variables: { body } });
    }
    setBody("");
  };
  return (
    <Container>
      <ToastContainer />
      <div className="chat-body">
        <Messages user="alex" />
      </div>
      <Row>
        <Col xs={10}>
          <FormInput
            size="lg"
            label="Message"
            value={body}
            onChange={(evt) => setBody(evt.target.value)}
            onKeyUp={(evt) => {
              if (evt.keyCode === 13) {
                onSend();
              }
            }}
          />
        </Col>
        <Col xs={2} style={{ padding: 0 }}>
          <Button
            className="send-button"
            onClick={() => onSend()}
            style={{ width: "100%" }}
          >
            <span>Send </span>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
