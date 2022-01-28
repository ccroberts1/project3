import React from 'react';
import {Button, Form, Modal, Checkbox, Icon, Input} from 'semantic-ui-react'

function SignUpModal() {
    const [open, setOpen] = React.useState(false)

    return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<a>Sign Up</a>}
    >
      <Modal.Header>Sign Up for a New Account</Modal.Header>
      <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>First Name</label>
                            <input placeholder='First Name' />
                        </Form.Field>
                        <Form.Field>
                            <label>Last Name</label>
                            <input placeholder='Last Name' />
                        </Form.Field>
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
                        <Form.Field>
                            <label>Confirm Password</label>
                            <input placeholder='Confirm Password' />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox label='I agree to the Terms and Conditions' />
                        </Form.Field>
                        
                    </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Create Account"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>);
}


export default SignUpModal;
