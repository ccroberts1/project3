import React from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Image, Card, Icon, Dropdown} from 'semantic-ui-react'
import {QUERY_ALL_PRODUCTS} from "../utils/queries"

function ProductList() {
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);
 console.log(data)
  const products = data?.products || [];

  return (


    <Grid centered center aligned columns={4} divided='vertically'>
      <Grid.Column>Product List</Grid.Column>
      <Grid.Column>
        <Dropdown
          text='Filter'
          icon='filter'
          floating
          labeled
          button
          className='icon'
  >
    <Dropdown.Menu>
      <Dropdown.Header icon='tags' content='Filter by tag' />
      <Dropdown.Item>Cats</Dropdown.Item>
      <Dropdown.Item>Dogs</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown></Grid.Column>
   
      {/* Create Cards from Seeds with Image, Name, Description, Price, Quantity and Category */}

      <Grid.Row columns={4}>
        
        {products.map((product) => (
          <Grid.Column >
            <Card>
              <Image src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*' wrapped ui={false} />
            <Card.Content>
              <Card.Header>Name</Card.Header>
              <Card.Description>
                Description
              </Card.Description>
              </Card.Content>
            <Card.Content>
              <Card.Meta>Quantity Left: </Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='dollar sign' />
                1000.00
              </a>
            </Card.Content>
            </Card>
        </Grid.Column>
          ))}
      
      <Grid.Column>
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      </Grid.Column>
      <Grid.Column>
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Grid.Column>
              <Grid.Column>
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      </Grid.Column>
      <Grid.Column>
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      </Grid.Column>
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
