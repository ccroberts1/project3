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
import { QUERY_PRODUCTS, QUERY_CATEGORIES } from "../utils/queries";
import Auth from "../utils/auth"

function ProductList() {

  let chosenCategory = ""

  const handleCategorySelect = (event) => {
    event.preventDefault();
    console.log(event.target.id)
    chosenCategory = event.target.id
    
  }

  const { data: product_data } = useQuery(QUERY_PRODUCTS, {
    variables: {category: chosenCategory}
  });
  console.log(product_data);
  const products = product_data?.products || [];

  const { data: category_data } = useQuery(QUERY_CATEGORIES);
  const categories = category_data?.categories || [];
  console.log(category_data)

  // const productQuantity;
  // if ()

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
            <Dropdown.Header icon="tags" content="Categories" />
            {categories.map((category) => (
              <>
                <Dropdown.Item
                  style={{ textTransform: 'capitalize' }}
                  description="10"
                  id={category._id}
                  onClick={handleCategorySelect}
                  text={category.name}>
                    {category.name}
                </Dropdown.Item>
              </>
              ))}
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
                {/* <Card.Description>{product.description}</Card.Description> */}
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

                </Grid>
                
              </Card.Content>
                {Auth.loggedIn() ? (
                  <Button>Add to Cart</Button>
                  ) : (<Button>Sign in to Purchase</Button>)}
            </Card>
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  );
}

export default ProductList;
