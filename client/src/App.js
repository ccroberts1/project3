import NavBar from "./components/NavBar";
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
  { as: "a", content: "Home", key: "home" },
  { as: "a", content: "ProductList", key: "ProductList" },
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
    <ApolloProvider client={client}>
      <MediaContextProvider>
        <StoreProvider>
          <NavBar
            leftItems={leftItems}
            children={<ProductList></ProductList>}
          ></NavBar>
        </StoreProvider>
      </MediaContextProvider>
    </ApolloProvider>
  );
}

export default App;
