import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useInput } from "../../hooks";
import { useHistory } from "react-router-dom";
import { rememberLogin } from "../../auth";
import { Form, FormGroup, FormInput, Button, Container } from "shards-react";
import "./Login.css";
const LOG_IN = gql`
  mutation logIn($username: String!, $avatarUrl: String) {
    logIn(username: $username, avatarUrl: $avatarUrl) {
      id
    }
  }
`;

const Login = (props) => {
  const username = useInput();
  let history = useHistory();
  const [logIn] = useMutation(LOG_IN, {
    variables: {
      username: username.value,
    },
  });

  const handleSubmit = async () => {
    await logIn();
    rememberLogin();
    history.push("/home");
  };

  return (
    <Container>
      <Form className="login-form">
        <FormGroup>
          <FormInput
            {...username}
            id="username"
            placeholder="Username"
            required
          />
        </FormGroup>
        <Button
          className="send-button"
          onClick={() => handleSubmit()}
          style={{ width: "100%" }}
        >
          <span>Let's talk</span>
        </Button>
      </Form>
    </Container>
  );
};
export default Login;
