import React from "react";
import { Routes, Route } from "react-router-dom";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import { Media } from "../utils/MediaContextProvider";
import { Icon, Menu, Sidebar, Container, Dropdown } from "semantic-ui-react";
import Auth from "../utils/auth";
import ProductList from "../pages/ProductList";
import Cart from "./Cart/Cart";
import Footer from "./Footer";
import Home from "../pages/Home";
import Account from "./AccountUpdate/AccountUpdateModal";
import Success from "../pages/Success";

const NavBarMobile = (props) => {
  const { leftItems, onPusherClick, onToggle, visible } = props;

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  
  const notFound = () => {
    alert("This page is not complete. Sorry")
  }

  return (
     <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        direction="right"
        visible={visible}
        vertical
      >
        <Cart></Cart>
      </Sidebar>
      <Sidebar.Pusher
        dimmed={visible}
        onClick={onPusherClick}
        style={{ minHeight: "100vh" }}
      >
        <Menu fixed="top" inverted>
          {leftItems.map((item) => (
            <Menu.Item {...item} />
          ))}

          {Auth.loggedIn() ? (
            <Menu.Menu position="right">
              <Menu.Item style={{ padding: 0 }} as="a">
                <Dropdown icon='sidebar' pointing className='link item'>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={notFound}>
                      Order History
                    </Dropdown.Item>
                    <Account />
                    <Dropdown.Item onClick={logout}>Sign Out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                
              </Menu.Item>
              <Menu.Item as="a" onClick={onToggle}>
                <Icon name="shopping cart"></Icon>
              </Menu.Item>
            </Menu.Menu>
          ) : (
            <Menu.Menu position="right">
              <Menu.Item style={{ padding: 0 }} as="a">
                <SignInModal
                  backgroundcolor="transparent"
                  textcolor="#c8c8c8"
                  text="Sign In"
                ></SignInModal>
              </Menu.Item>
              <Menu.Item style={{ padding: 0 }} as="a">
                <SignUpModal
                  backgroundcolor="transparent"
                  textcolor="#c8c8c8"
                  text="Sign Up"
                ></SignUpModal>
              </Menu.Item>
            </Menu.Menu>
          )}
        </Menu>
        <Container style={{ marginTop: "50px" }}>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>

            <Route exact path="/ProductList" element={<ProductList  columnNumber={4}  />}></Route>

            <Route exact path="/Success" element={<Success />}></Route>
          </Routes>
        </Container>
        <Footer />
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

const NavBarDesktop = (props) => {
  const { leftItems, onPusherClick, onToggle, visible } = props;

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const notFound = () => {
    alert("This page is not complete. Sorry")
  }

  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        direction="right"
        visible={visible}
        vertical
      >
        <Cart></Cart>
      </Sidebar>
      <Sidebar.Pusher
        dimmed={visible}
        onClick={onPusherClick}
        style={{ minHeight: "100vh" }}
      >
        <Menu fixed="top" inverted>
          {leftItems.map((item) => (
            <Menu.Item {...item} />
          ))}

          {Auth.loggedIn() ? (
            <Menu.Menu position="right">
              <Menu.Item style={{ padding: 0 }} as="a">
                <Dropdown text='Account' pointing className='link item'>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={notFound}>
                      Order History
                    </Dropdown.Item>
                    <Account />
                    <Dropdown.Item onClick={logout}>Sign Out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                
              </Menu.Item>
              <Menu.Item as="a" onClick={onToggle}>
                <Icon name="shopping cart"></Icon>
              </Menu.Item>
            </Menu.Menu>
          ) : (
            <Menu.Menu position="right">
              <Menu.Item style={{ padding: 0 }} as="a">
                <SignInModal
                  backgroundcolor="transparent"
                  textcolor="#c8c8c8"
                  text="Sign In"
                ></SignInModal>
              </Menu.Item>
              <Menu.Item style={{ padding: 0 }} as="a">
                <SignUpModal
                  backgroundcolor="transparent"
                  textcolor="#c8c8c8"
                  text="Sign Up"
                ></SignUpModal>
              </Menu.Item>
            </Menu.Menu>
          )}
        </Menu>
        <Container style={{ marginTop: "50px" }}>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>

            <Route exact path="/ProductList" element={<ProductList  columnNumber={4}  />}></Route>

            <Route exact path="/Success" element={<Success />}></Route>
          </Routes>
        </Container>
        <Footer />
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

class NavBar extends React.Component {
  state = {
    visible: false,
  };

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { leftItems } = this.props;
    const { visible } = this.state;

    return (
      <div>
        <Media at="mobile">
          <NavBarMobile
            leftItems={leftItems}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            visible={visible}
          ></NavBarMobile>
        </Media>
        <Media greaterThan="mobile">
          <NavBarDesktop
            leftItems={leftItems}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            visible={visible}
          />
        </Media>
      </div>
    );
  }
}

export default NavBar;
