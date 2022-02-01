import React from "react";
import {
  Grid,
  Image,
  Card,
  Icon,
  Dropdown,
  Button,
  GridColumn,
} from "semantic-ui-react";

function ProductList() {
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);
  console.log(data);
  const products = data?.products || [];
  return (
    <Grid centered center aligned columns={4} divided="vertically">
      <Grid.Column>Product List</Grid.Column>
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

      <Grid.Row columns={4}>
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
                <a>
                  <Icon name="dollar sign" />
                  {product.price}
                </a>
                <Button>Add to Cart</Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  );
}

export default ProductList;
