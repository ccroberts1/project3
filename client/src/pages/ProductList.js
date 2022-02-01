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
import SignInModal from '../components/SignInModal';

function ProductList() {

  let chosenCategory = ""


  const {data: product_data, refetch } = useQuery(QUERY_PRODUCTS, {
    variables: {category: chosenCategory}
  });
  console.log(product_data);
  const products = product_data?.products || [];

  const { data: category_data } = useQuery(QUERY_CATEGORIES);
  const categories = category_data?.categories || [];
  console.log(category_data)

  
  const options = [
  { key: 1, text: 'Price: Low to High ', value: 1 },
  { key: 2, text: 'Price: High to Low', value: 2 }
]


  return (
    <Grid centered columns={4} divided="vertically">
      <Grid.Column width={8}>
        <Input fluid icon='search' placeholder='Search...' />
      </Grid.Column>
     
         {/* <Grid.Column>
         <Dropdown
          // icon="filter"
          floating
          labeled

          className="icon"
          clearable
          options={options}
          selection
        >
          
        </Dropdown>
      </Grid.Column> */}
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
              <Dropdown.Item
                      onClick={() => refetch({
                      category: ""
                      })}>Show All
              </Dropdown.Item>
              {categories.map((category) => (
                <>
                  <Dropdown.Item
                    style={{ textTransform: 'capitalize' }}
                    description="10"
                    id={category._id}
                    key={category._id}
                    onClick={() => refetch({
                      category: category._id
                    })}
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
            <Card key={product._id}>
              <Image src={product.image} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{product.name}</Card.Header>
                {/* <Card.Description>{product.description}</Card.Description> */}
              </Card.Content>

              <Card.Content extra>
                <Grid columns={2} style={{ margin: "1px" }}>
                <Grid.Column verticalAlign='middle'> 
                  <Icon name="dollar sign" />
                  {product.price}
                  </Grid.Column>
                  <Grid.Column verticalAlign='middle'> 
                    {product.quantity === 0 ? (<Card.Meta style={{color: "red"}}>Out of Stock</Card.Meta>) :
                      product.quantity === 1 ? (<Card.Meta style={{color: "red"}}>Only One Left</Card.Meta>) :
                      (<Card.Meta>Quantity: {product.quantity}</Card.Meta>)}
                    
                  </Grid.Column>
                </Grid>
                
              </Card.Content>
                {Auth.loggedIn() ? (
                  <Button>Add to Cart</Button>
                  ) : (<Button><SignInModal></SignInModal> to Purchase</Button>)}
            </Card>
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  );
}

export default ProductList;
