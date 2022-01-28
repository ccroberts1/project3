import React from 'react';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';

function NavBar() {
    return (<>
        <Menu secondary>
            <Menu.Item style={{ fontSize: 24}}>Pro</Menu.Item>
        <SignInModal></SignInModal>
        <SignUpModal></SignUpModal>
        </Menu>
        </>);
    
}

export default NavBar;
