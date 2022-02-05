const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    products(category: ID): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    favorites: [Product]
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    addOrder(products: [ID]!): Order
    addFavorite(product: ID!): Product
    removeFavorite(product: ID!): Product
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    removeUser(_id: ID!): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
    confirmPassword(email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
