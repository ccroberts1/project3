import React from "react";
import { Container } from "semantic-ui-react";

const Footer = () => {
  return (
    <div
      style={{
        width: "100%",
        color: "white",
        background: "#1b1c1d",
        textAlign: "center",
      }}
    >
      <p>Links</p>
      <a href="https://github.com/ccroberts1/project3.git">Github Repo</a>
      <br />
      <a href="https://raining-cats-and-dogs.herokuapp.com/">
        Heroku Deployed App
      </a>
    </div>
  );
};
export default Footer;
