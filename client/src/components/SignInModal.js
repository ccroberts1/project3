import React from 'react';
import {Button, Modal, Form, Input, Icon} from 'semantic-ui-react'

function SignInModal() {
    const [open, setOpen] = React.useState(false)


    return (
        <Modal
            size='tiny'
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<a>Sign In</a>}
    >
      <Modal.Header>Sign In</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                <Form>
                     <Form.Field>
                            <label>Email</label>
                                <Input iconPosition='left' placeholder='Email'>
                                    <Icon name='at' />
                                    <input />
                                </Input>
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input placeholder='Password' />
                    </Form.Field>
                    </Form>    
                    </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Sign In"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>);
}

export default SignInModal;
