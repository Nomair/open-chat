import React from "react";
import { useQuery, useSubscription, gql } from "@apollo/client";
import "./Messages.css";

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
const GET_FEEDS = gql`
  subscription {
    getFeeds {
      body
      createdAt
      sender {
        id
        username
      }
    }
  }
`;

const Messages = ({ user }) => {
  let { data } = useQuery(GET_MESSAGES);
  console.log({ user });

  let feed = useSubscription(GET_FEEDS);
  if (feed.data) {
    if (feed.data.getFeeds) data.getMessages.push(feed.data.getFeeds);
    feed.data.getFeeds = null;
  }

  if (!data) return null;
  return (
    <>
      {data.getMessages.map(({ sender: messageUser, body }) => (
        <div
          style={{
            display: "flex",
            justifyContent:
              user === messageUser.username ? "flex-end" : "flex-start",
            paddingBottom: "1em",
          }}
        >
          {user !== messageUser.username && (
            <div className="others-message-names">
              {messageUser.username.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div
            className="message"
            style={{
              background:
                user === messageUser.username ? "#28a745ab" : "#6be4ff",
              color: user === messageUser.username ? "white" : "black",
            }}
          >
            {body}
          </div>
        </div>
      ))}
    </>
  );
};
export default Messages;
