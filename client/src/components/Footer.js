import React from "react";
import { Grid, Icon } from "semantic-ui-react";

const Footer = () => {
  return (
    <div
      style={{
        width: "100%",
        color: "#c8c8c8",
        textAlign: "center",
        background: "#1b1c1d",
        position: "fixed",
        height: "40px",
        bottom:"0"
      }}
    >
      <Grid style={{height:"60px", background: "#1b1c1d",}}>
      <Grid.Column  floated='left' width={3}>
      
        <a href="https://github.com/ccroberts1/project3.git">View this Project on Github <Icon name="github"></Icon></a>
        </Grid.Column>
        <Grid.Column floated='center' width={8}>
          <p>Created by <span>Charlie Highum</span>, <span>Thomas Highum</span>, <span>Olivia Hall</span>, <span>Caitlin Roberts</span> {`&`} <span>Nicole Lucena</span>  </p>
        </Grid.Column>
      <Grid.Column floated='right' width={3} >
      <a href="https://raining-cats-and-dogs.herokuapp.com/">
        Heroku Deployed App
        </a>
        </Grid.Column>
        </Grid>
    </div>
  );
};
export default Footer;
