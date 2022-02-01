import React from "react";
import {
  Grid,
  Image,
  Card,
  Icon,
  Dropdown,
  Button,
  Input
} from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_PRODUCTS } from "../utils/queries";
import Auth from "../utils/auth"

function ProductList() {
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);
  console.log(data);
  const products = data?.products || [];
  return (
    <Grid centered columns={4} divided="vertically">
      <Grid.Column width={8}>
        <Input fluid icon='search' placeholder='Search...' />
      </Grid.Column>
      <Grid.Column>
        <Dropdown
          text="Filter"
          icon="filter"
          floating
          labeled
          button
          className="icon"
        >
          <Dropdown.Menu>
            <Dropdown.Header icon="tags" content="Filter by tag" />
            <Dropdown.Item>Cats</Dropdown.Item>
            <Dropdown.Item>Dogs</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Grid.Column>

      {/* Create Cards from Seeds with Image, Name, Description, Price, Quantity and Category */}

      <Grid.Row  stretched columns={4}>
        {products.map((product) => (
          <Grid.Column>
            <Card>
              <Image src={product.image} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{product.name}</Card.Header>
                <Card.Description>{product.description}</Card.Description>
              </Card.Content>
              <Card.Content>
                <Card.Meta>Quantity Left: {product.quantity}</Card.Meta>
              </Card.Content>

              <Card.Content extra>
                <Grid columns={2} style={{ margin: "1px" }}>
                <Grid.Column verticalAlign='middle'> 
                  <Icon name="dollar sign" />
                  {product.price}
                </Grid.Column>
                {Auth.loggedIn() ? (
                  <Button>Add to Cart</Button>
                  ) : (<span>Sign in to Purchase</span>)}
                </Grid>
              </Card.Content>

            </Card>
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  );
}

export default ProductList;
