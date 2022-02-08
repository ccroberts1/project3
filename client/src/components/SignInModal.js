import React from "react";
import { Button, Modal, Form, Input, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

function SignInModal(props) {
  const [open, setOpen] = React.useState(false);
  const [formState, setFormState] = React.useState({
    email: "",
    password: "",
  });

  const { backgroundcolor, text, textcolor } = props;

  const [login, { error }] = useMutation(LOGIN);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginUser = await login({
        variables: {
          email: formState.email,
          password: formState.password,
        },
      });
      const token = loginUser.data.login.token;
      Auth.login(token);
      console.log("It worked");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      size="tiny"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button
          style={{
            height: "100%",
            width: "100%",
            border: 0,
            background: backgroundcolor,
            color: textcolor,
          }}
        >
          {text}
        </Button>
      }
    >
      <Modal.Header>Sign In</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Form onSubmit={handleFormSubmit}>
            <Form.Field>
              <label>Email</label>
              <Input
                iconPosition="left"
                placeholder="Email"
                name="email"
                id="email"
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
                name="password"
                id="password"
                onChange={handleInputChange}
              />
            </Form.Field>
            <Button type='submit' style={{display: "none"}}>Submit</Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Sign In"
          labelPosition="right"
          icon="checkmark"
          onClick={handleFormSubmit}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default SignInModal;
