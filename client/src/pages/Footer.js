import React from "react";
import { NavLink } from "react-router-dom";
import { Container } from "semantic-ui-react";

const Footer = () => {
    return (
        <Container>
            <h1 style={{
                color: "white",
                background: "black",
                textAlign: "center",
                marginTop: "25px"
            }}>
                Links
            </h1>
            <br></br>
                <NavLink href="https://github.com/ccroberts1/project3.git">Github Repo</NavLink>
                <br></br>
                <NavLink href="https://raining-cats-and-dogs.herokuapp.com/">Heroku Deployed</NavLink>
        </Container>
    );
};
export default Footer;