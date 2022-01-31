import React from "react";
import { Button, Form, Modal, Checkbox, Icon, Input } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

function SignUpModal() {
  const [open, setOpen] = React.useState(false);
  const [formState, setFormState] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const newUser = await addUser({
      variables: {
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        password: formState.password,
        confirmPassword: formState.confirmPassword,
      },
    });
    const token = newUser.data.addUser.token;
    Auth.login(token);
  };

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
              <input
                placeholder="First Name"
                id="firstName"
                name="firstName"
                onChange={handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input
                placeholder="Last Name"
                id="lastName"
                name="lastName"
                onChange={handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <Input
                iconPosition="left"
                placeholder="Email"
                id="email"
                name="email"
                onChange={handleInputChange}
              >
                <Icon name="at" />
                <input />
              </Input>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                placeholder="Password"
                type="password"
                id="password"
                name="password"
                onChange={handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Confirm Password</label>
              <input
                placeholder="Confirm Password"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox label="I agree to the Terms and Conditions" />
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Create Account"
          labelPosition="right"
          icon="checkmark"
          onClick={handleFormSubmit}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default SignUpModal;
