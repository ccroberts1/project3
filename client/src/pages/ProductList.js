import React from 'react';
import { Grid, Image } from 'semantic-ui-react'

function ProductList() {
  return (
    <Grid centered center aligned columns={4} divided='vertically'>
    <Grid.Column>Product List</Grid.Column>
   

    <Grid.Row columns={6}>
      <Grid.Column>
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      </Grid.Column>
      <Grid.Column>
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      </Grid.Column>
      <Grid.Column>
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      </Grid.Column>
    </Grid.Row>
  </Grid>
  );
}

export default ProductList;
