import NavBar from './components/NavBar';
import { MediaContextProvider } from "./utils/MediaContextProvider"


const leftItems = [
  { as: "a", content: "Home", key: "home" },
  { as: "a", content: "Users", key: "users" }
];



function App() {
  return (
    <>
      <MediaContextProvider>
      <NavBar leftItems={leftItems}>

      </NavBar>
      </MediaContextProvider>
    </>
  );
}

export default App;
