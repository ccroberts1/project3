import React, { useState } from "react";
import { Button, Form, Modal, Icon, Input, Dropdown } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { UPDATE_USER } from "../utils/mutations";

function Account() {
  const [open, setOpen] = React.useState(false);
  const { data } = useQuery(QUERY_USER);
  // const userData = data?.user || {};

  const [formState, setFormState] = useState({
    firstName: data?.user?.firstName,
    lastName: data?.user?.lastName,
    email: data?.user?.email,
  });
  //   console.log(data);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const [updateUser] = useMutation(UPDATE_USER);

  async function submitNewInfo(event) {
    event.preventDefault();
    try {
      const updatedUser = await updateUser({
        variables: {
          firstName: formState.firstName,
          lastName: formState.lastName,
          email: formState.email,
        },
      });
      alert("User information updated!");
    } catch (err) {
      console.log(err);
    }
  }
  //   console.log(data);
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Dropdown.Item
          // style={{
          //   height: "100%",
          //   width: "100%",
          //   border: 0,
          //   background: "transparent",
          //   color: "#c8c8c8",
          // }}
        >
          Update Account
        </Dropdown.Item>
      }
    >
      <Modal.Header>Update Your Account Information Here</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Field>
              <label>First Name</label>
              <input
                placeholder={data?.user.firstName}
                id="firstName"
                name="firstName"
                onChange={handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input
                placeholder={data?.user.lastName}
                id="lastName"
                name="lastName"
                onChange={handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <Input
                iconPosition="left"
                placeholder={data?.user.email}
                id="email"
                name="email"
                onChange={handleInputChange}
              >
                <Icon name="at" />
                <input />
              </Input>
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Update Account"
          labelPosition="right"
          icon="checkmark"
          onClick={submitNewInfo}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default Account;
