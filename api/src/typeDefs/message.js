import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getMessages: [Message!]! @auth
    getMessage(id: ID!): Message @auth
  }

  extend type Mutation {
    sendMessage(body: String!): Message @auth
  }

  extend type Subscription {
    getFeeds: Message! @auth
  }

  type Message {
    id: ID!
    body: String!
    sender: User!
    createdAt: String!
  }
`;
