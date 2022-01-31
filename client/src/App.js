import NavBar from './components/NavBar';
import ProductList from './pages/ProductList';
import { MediaContextProvider } from "./utils/MediaContextProvider"


const leftItems = [
  { as: "a", content: "Home", key: "home" },
  { as: "a", content: "ProductList", key: "ProductList" }
];



function App() {
  return (
    <>
      <MediaContextProvider>
        <NavBar leftItems={leftItems}>

        </NavBar>
        <ProductList></ProductList>
      </MediaContextProvider>
    </>
  );
}

export default App;
