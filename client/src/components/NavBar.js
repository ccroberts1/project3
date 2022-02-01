import React from 'react';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import { Media} from "../utils/MediaContextProvider"
import { Icon, Menu, Sidebar, Dropdown, Container } from "semantic-ui-react";
import Auth from "../utils/auth"
import ProductList from "../pages/ProductList";
import Cart from "./Cart"



const NavBarMobile = (props) => {
  const {
    leftItems,
    onPusherClick,
    onToggle,
    visible
  } = props;
  
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
        direction='right'
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
              <Menu.Item onClick={logout}>
                Sign Out
              </Menu.Item>
              <Menu.Item>
                {/* <Dropdown text='Account' pointing className='link item'>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      Order History
                    </Dropdown.Item>
                    <Dropdown.Item>Account Settings</Dropdown.Item>
                    <Dropdown.Item>Sign Out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}
                Account
              </Menu.Item>
              <Menu.Item as="a"  onClick={onToggle}>
                    <Icon name='shopping cart'></Icon>
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
        <Container   style={{ marginTop: "50px" }}>
          <ProductList />
        </Container>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

const NavBarDesktop = (props) => {
  const { 
    leftItems,
    onPusherClick,
    onToggle,
    visible,
  } = props;

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
        direction='right'
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
              <Menu.Item onClick={logout}>
                Sign Out
              </Menu.Item>
              <Menu.Item>
                {/* <Dropdown text='Account' pointing className='link item'>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      Order History
                    </Dropdown.Item>
                    <Dropdown.Item>Account Settings</Dropdown.Item>
                    <Dropdown.Item>Sign Out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}
                Account
              </Menu.Item>
              <Menu.Item as="a"  onClick={onToggle}>
                    <Icon name='shopping cart'></Icon>
              </Menu.Item>
            </Menu.Menu>
          ) : (
              <Menu.Menu position="right">
                <Menu.Item style={{padding: 0}} as="a">
                  <SignInModal backgroundcolor="transparent"
                    textcolor="#c8c8c8"
                  text="Sign In"></SignInModal>
                </Menu.Item>
                <Menu.Item as="a">
                    <SignUpModal></SignUpModal>
                </Menu.Item>
              </Menu.Menu>
            )}
          
        </Menu>
        <Container   style={{ marginTop: "50px" }}>
          <ProductList />
        </Container>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};



class NavBar extends React.Component {
  state = {
    visible: false
  };

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const {leftItems} = this.props;
    const { visible } = this.state;

    return (
      <div>
        <Media at="mobile">
          <NavBarMobile
            leftItems={leftItems}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            visible={visible}
          > 
          </NavBarMobile>
        </Media>
        <Media greaterThan="mobile">
          <NavBarDesktop
            leftItems={leftItems}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            visible={visible}/>
        </Media>
      </div>
    );
  }
}


export default NavBar;
