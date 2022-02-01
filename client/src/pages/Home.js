import React from 'react';
import NavBar from '../components/NavBar';
import { Container, Image } from "semantic-ui-react";


function Home() {
  return (
    <Container fluid>
      <NavBar />
      <h1>Raining Cats & Dogs</h1>
      <Image src='https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' />
    </ Container>
  );
};

export default Home;
