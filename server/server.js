const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

const stripe = require("stripe")(
  "sk_test_51KMeBWA1XTMt9WgUa5GcO0LP2LejBD7czxMCWqgAlu81A2aYVfsc5aaKJk7FaZ3r6JkINaSFIYyDwTrAT3ApUraL00IdX9nNa6"
);

const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
