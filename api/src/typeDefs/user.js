import { gql } from "apollo-server-express";

export default gql`

  extend type Query {
    currentUser: User @auth
    users: [User!]! @auth
    user(id: ID!): User @auth
  }

  extend type Mutation {
    register(username: String!, avatarUrl: String): User @guest
    logIn(username: String!, avatarUrl: String): User
    logOut: Boolean @auth
  }

  type User {
    id: ID!
    username: String!
    avatarUrl: String
    messages: [Message!]!
    createdAt: String!
  }
`;
