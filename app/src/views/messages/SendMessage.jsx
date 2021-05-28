import React, { useState } from "react";
import { Row, Col, FormInput, Button } from "shards-react";
import { useMutation, gql } from "@apollo/client";

const POST_MESSAGE = gql`
  mutation ($body: String!) {
    sendMessage(body: $body) {
      id
    }
  }
`;

const SendMessage = () => {
  const [body, setBody] = useState("");
  const [postMessage] = useMutation(POST_MESSAGE);

  const onSend = () => {
    if (body.length > 0) {
      postMessage({ variables: { body } });
    }
    setBody("");
  };
  return (
    <Row>
      <Col xs={10}>
        <FormInput
          size="lg"
          label="Message"
          placeholder="Press Enter to send!"
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
  );
};

export default SendMessage;
