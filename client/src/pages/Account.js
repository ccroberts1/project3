import React, { useState } from "react";
import { Grid, Dropdown, Input } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { UPDATE_USER } from "../utils/mutations";

function Account() {
  const { data, loading } = useQuery(QUERY_USER);
  const userData = data?.user || {};
  //   console.log(userData);
  const [formState, setFormState] = useState({
    firstName: data?.user?.firstName,
    lastName: data?.user?.lastName,
    email: data?.user?.email,
  });
  console.log(formState);

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
    <div>
      <div>Update Your Account Information Here</div>
      {userData ? (
        <form className="form">
          <input
            name="firstName"
            placeholder={formState.firstName}
            onChange={handleInputChange}
          ></input>
          <input
            name="lastName"
            value={formState.lastName}
            onChange={handleInputChange}
          ></input>
          <input
            name="email"
            value={formState.email}
            onChange={handleInputChange}
          ></input>
          <button onClick={submitNewInfo}>Update Information</button>
        </form>
      ) : (
        <h1>No User</h1>
      )}
    </div>
  );
}

export default Account;
