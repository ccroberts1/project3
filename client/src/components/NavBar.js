import React from "react";
import { Routes, Route } from "react-router-dom";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import { Media } from "../utils/MediaContextProvider";
import { Icon, Menu, Sidebar, Dropdown, Container } from "semantic-ui-react";
import Auth from "../utils/auth";
import ProductList from "../pages/ProductList";
import Cart from "./Cart";
import Footer from "../pages/Footer";
import Home from "../pages/Home";
import Account from "../pages/Account";
import Success from "../pages/Success";

const NavBarMobile = (props) => {
  const { leftItems, onPusherClick, onToggle, visible } = props;

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

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
        <h1>weeeee</h1>
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
              <Menu.Item onClick={logout}>Sign Out</Menu.Item>
              <Menu.Item as="a">
                {/* <Dropdown text='Account' pointing className='link item'>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      Order History
                    </Dropdown.Item>
                    <Dropdown.Item>Account Settings</Dropdown.Item>
                    <Dropdown.Item>Sign Out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}
                <Account />
              </Menu.Item>
              <Menu.Item as="a" onClick={onToggle}>
                <Icon name="shopping cart"></Icon>
              </Menu.Item>
            </Menu.Menu>
          ) : (
            <Menu.Menu position="right">
              <Menu.Item as="a">
                <SignInModal></SignInModal>
              </Menu.Item>
              <Menu.Item as="a">
                <SignUpModal></SignUpModal>
              </Menu.Item>
            </Menu.Menu>
          )}
        </Menu>
        <Container style={{ marginTop: "50px" }}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/ProductList" element={<ProductList />} />
            <Route exact path="/Succes" element={<Success />} />
          </Routes>
        </Container>
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
              <Menu.Item onClick={logout}>Sign Out</Menu.Item>
              <Menu.Item style={{ padding: 0 }} as="a">
                {/* <Dropdown text='Account' pointing className='link item'>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      Order History
                    </Dropdown.Item>
                    <Dropdown.Item>Account Settings</Dropdown.Item>
                    <Dropdown.Item>Sign Out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}
                <Account />
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
            <Route exact path="/ProductList" element={<ProductList />}></Route>
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
