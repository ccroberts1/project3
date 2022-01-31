import React from 'react';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import { Media} from "../utils/MediaContextProvider"
import { Icon, Menu, Sidebar } from "semantic-ui-react";



const NavBarMobile = (props) => {
  const {
    leftItems,
    onPusherClick,
    onToggle,
    visible
  } = props;

  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        items={leftItems}
        direction='right'
        visible={visible}
      />
      <Sidebar.Pusher
        dimmed={visible}
        onClick={onPusherClick}
        style={{ minHeight: "100vh" }}
      >
        <Menu fixed="top" inverted>
          <Menu.Item>
            <Icon name="sidebar" />
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
                <SignInModal></SignInModal>
            </Menu.Item>
            <Menu.Item>
                <SignUpModal></SignUpModal>
            </Menu.Item>
            <Menu.Item as="a"  onClick={onToggle}>
                <Icon name='shopping cart'></Icon>
            </Menu.Item>
          </Menu.Menu>
          
        </Menu>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

const NavBarDesktop = (props) => {
  const { 
    leftItems,
    onPusherClick,
    onToggle,
    visible
  } = props;

  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        items={leftItems}
        direction='right'
        visible={visible}
      />
      <Sidebar.Pusher
        dimmed={visible}
        onClick={onPusherClick}
        style={{ minHeight: "100vh" }}
      >
        <Menu fixed="top" inverted>
                  {leftItems.map((item) => (
                  <Menu.Item {...item} />
         ))}
          <Menu.Menu position="right">
            <Menu.Item as="a">
                <SignInModal></SignInModal>
            </Menu.Item>
            <Menu.Item as="a">
                <SignUpModal></SignUpModal>
            </Menu.Item>
            <Menu.Item as="a"  onClick={onToggle}>
                <Icon name='shopping cart'></Icon>
            </Menu.Item>
          </Menu.Menu>
          
        </Menu>
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
