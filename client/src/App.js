import NavBar from "./components/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import ProductList from "./pages/ProductList";
import { MediaContextProvider } from "./utils/MediaContextProvider";
import { StoreProvider } from "./utils/StoreContext";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const leftItems = [
  { as: "a", content: "Home", key: "home", href: "/" },
  { as: "a", content: "ProductList", key: "ProductList", href: "/ProductList" },
];

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <StoreProvider>
          <MediaContextProvider>
            <NavBar
              leftItems={leftItems}
              children={<ProductList></ProductList>}
            ></NavBar>
          </MediaContextProvider>
        </StoreProvider>
      </ApolloProvider>
    </Router>
  );
}

export default App;
