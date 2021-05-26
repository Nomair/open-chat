import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useMutation,
  useQuery,
  gql,
} from "@apollo/client";
// import { WebSocketLink } from "@apollo/client/link/ws";
import { Container, Row, Col, FormInput, Button } from "shards-react";

// const link = new WebSocketLink({
//   uri: `ws://localhost:4000/`,
//   options: {
//     reconnect: true,
//   },
// });

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const GET_MESSAGES = gql`
  query {
    getMessages {
      id
      body
      sender {
        id
        username
      }
      createdAt
    }
  }
`;

const POST_MESSAGE = gql`
  mutation ($body: String!) {
    sendMessage(body: $body) {
      id
    }
  }
`;

const Messages = ({ user }) => {
  const { data } = useQuery(GET_MESSAGES);
  if (!data) return null;
  return (
    <>
      {data.messages.map(({ sender: messageUser, body }) => (
        <div
          style={{
            display: "flex",
            justifyContent:
              user === messageUser.username ? "flex-end" : "flex-start",
            paddingBottom: "1em",
          }}
        >
          {user !== messageUser.username && (
            <div
              style={{
                height: 50,
                width: 50,
                marginRight: "0.5em",
                border: "2px solid #e5e6ea",
                borderRadius: 25,
                textAlign: "center",
                fontSize: "18pt",
                paddingTop: 5,
              }}
            >
              {messageUser.username.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div
            style={{
              background: user === messageUser.username ? "blue" : "#e5e6ea",
              color: user === messageUser.username ? "white" : "black",
              padding: "1em",
              borderRadius: "1em",
              maxWidth: "60%",
            }}
          >
            {body}
          </div>
        </div>
      ))}
    </>
  );
};

const Chat = () => {
  const [state, stateSet] = React.useState({
    body: "",
  });
  const [postMessage] = useMutation(POST_MESSAGE);

  const onSend = () => {
    if (state.body.length > 0) {
      postMessage({
        variables: state,
      });
    }
    stateSet({
      body: "",
    });
  };
  return (
    <Container>
      <Messages user={state.user} />
      <Row>
        <Col xs={8}>
          <FormInput
            label="Message"
            value={state.body}
            onChange={(evt) =>
              stateSet({
                body: evt.target.value,
              })
            }
            onKeyUp={(evt) => {
              if (evt.keyCode === 13) {
                onSend();
              }
            }}
          />
        </Col>
        <Col xs={2} style={{ padding: 0 }}>
          <Button onClick={() => onSend()} style={{ width: "100%" }}>
            Send
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);

function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
}
