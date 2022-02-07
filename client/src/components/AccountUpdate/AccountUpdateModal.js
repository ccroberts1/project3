import React, { useState } from "react";
import { Button, Form, Modal, Icon, Input, Dropdown, Header, Accordion } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import { UPDATE_USER } from "../../utils/mutations";
import AccountDelete from './AccountDeleteModal'

function Account() {
  const [open, setOpen] = useState(false);
  const { data, refetch } = useQuery(QUERY_USER);
  // const userData = data?.user || {};
  const [confirmOpen, setConfirmOpen] = useState(false);

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
      refetch()
      setConfirmOpen(true)
      setOpen(false)
    } catch (err) {
      console.log(err);
    }
  }


  const panels = [
  {
    key: 'password-update',
    title: 'Update Password',
    content: {

      content: (
            <>
      <Form.Input
            label="Confirm Old Password"
            placeholder="Old Password"
            type="password"
            name="oldPassword"
            // onChange={handleInputChange}
            />
      <Form.Input
            label="New Password"
            placeholder="New Password"
            type="password"
            name="newPassword"
            // onChange={handleInputChange}
          />
      <Form.Input
            label="Confirm New Password"
            placeholder="Old Password"
            type="password"
            name="confirmNewPassword"
            // onChange={handleInputChange}
            />
          </>
      ),
    },
  },
]


  return (
    <>
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
              {/* <Accordion as={Form.Field} panels={panels}>
              </Accordion> */}
                
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        
        <AccountDelete></AccountDelete>
        <Button
          content="Update Account"
          labelPosition="right"
          icon="checkmark"
          onClick={submitNewInfo}
          positive
        />
      </Modal.Actions>
    </Modal>
    <Modal
      basic
      onClose={() => setConfirmOpen(false)}
      onOpen={() => setConfirmOpen(true)}
      open={confirmOpen}
      size='small'
    >
      <Header icon>
        <Icon name='thumbs up outline' />
        You have successfully updated your account information.
      </Header>

      <Modal.Actions>

        <Button color='green' inverted onClick={() => setConfirmOpen(false)}>
           Okay
        </Button>
      </Modal.Actions>
    </Modal>
    </>
  );
}

export default Account;
