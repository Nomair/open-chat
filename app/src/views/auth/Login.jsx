import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useInput } from "../../hooks";
import { useHistory } from "react-router-dom";
import { rememberLogin } from "../../auth";
import { Form, FormGroup, FormInput, Button } from "shards-react";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await logIn();
    rememberLogin();
    history.push("/home");
  };

  return (
    <Form>
      <FormGroup>
        <label htmlFor="username">Username</label>
        <FormInput
          {...username}
          id="username"
          placeholder="Username"
          required
        />
      </FormGroup>
      <Button onClick={(e) => handleSubmit(e)} style={{ width: "100%" }}>
        LogIn
      </Button>
    </Form>
  );
};
export default Login;
