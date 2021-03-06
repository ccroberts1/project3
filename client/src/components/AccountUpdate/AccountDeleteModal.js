import React, { useState } from "react";
import { Button, Form, Modal, Input, Checkbox} from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import { REMOVE_USER, CONFIRM_PASSWORD } from "../../utils/mutations";
import Auth from "../../utils/auth";

function AccountDelete() {
  const [open, setOpen] = React.useState(false);
  const { data } = useQuery(QUERY_USER);
  // const userData = data?.user || {};

  const [ confirmBox, setConfirm ] = useState(false)
  function confirmToggle (e, {checked}) {
    const confirmed = checked;
    console.log(confirmed)
    setConfirm(confirmed)

  }


  const [formState, setFormState] = useState({
      email: data?.user?.email,
      password: "",
  });
  //   console.log(data);
    const UserId = data.user._id


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

    const [removeUser] = useMutation(REMOVE_USER);
    const [confirmPassword] = useMutation(CONFIRM_PASSWORD)

  async function submitNewInfo(event) {
    event.preventDefault();
      try {
          if (confirmBox) {
              const verification = await confirmPassword({
                  variables: {
                    email: formState.email,
                    password: formState.password,
                },
                })
              const deletedUser = await removeUser({ variables: { _id: UserId } });
              console.log("TestConfirm")
              Auth.logout()
          } else {
              console.log("incorrect email")
          }
    } catch (err) {
      console.log(err);
    }
    }


  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
          open={open}
          style={{backgroundColor: "red"}}
      trigger={
        <Button floated='left' color="red">
          Delete Account
        </Button>
      }
    >
      <Modal.Header>Permanantly Delete Your Account and all your Data</Modal.Header>
      <Modal.Content negative>
        <Modal.Description>
          <Form>

            <Form.Field required>
              <label>Confirm Email</label>
              <Input
                id="email-for-delete"
                name="email"
                onChange={handleInputChange}
              >
              </Input>
            </Form.Field>
            <Form.Field required>
              <label>Confirm Password</label>
              <input
                placeholder="Password"
                type="password"
                name="password"
                id="password"
                onChange={handleInputChange}
              />        
            </Form.Field>
            <Form.Field required> 
              <Checkbox label="I understand this is permanent" id="confirm" checked={confirmBox} onClick={confirmToggle}/>
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
          <Modal.Actions>

        <Button onClick={() => setOpen(false)}>
            Go Back
        </Button>
        <Button
          content="Delete Account"
          labelPosition="right"
          icon="delete"
          onClick={submitNewInfo}
                  negative
                  
        />
      </Modal.Actions>
    </Modal>
  );
}

export default AccountDelete;
