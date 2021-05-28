import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    # these quiries are extra just for test purposes.
    currentUser: User @auth
    users: [User!]! @auth
    user(id: ID!): User @auth
  }

  extend type Mutation {
    # register is an extra mutations just for test purposes.
    register(username: String!, avatarUrl: String): User @guest
    logIn(username: String!, avatarUrl: String): User
    logOut: Boolean @auth
  }
  extend type Subscription {
    getUsersStatusUpdate: UsersStatusUpdate! @auth
  }
  # The Backend is ready to receive  the user profile picture URL,
  #  but it's not mandatory because its not implemented in the Frontend.
  type User {
    id: ID!
    username: String!
    avatarUrl: String
    messages: [Message!]!
    createdAt: String!
  }

  type UsersStatusUpdate {
    id: ID!
    username: String!
    userStatus: String!
  }
`;
