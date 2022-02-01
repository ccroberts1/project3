import React from "react";
import {
  Grid,
  Dropdown,
  Input
} from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS, QUERY_CATEGORIES } from "../utils/queries";
import ProductItem from "../components/ProductItem";

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

  
//   const options = [
//   { key: 1, text: 'Price: Low to High ', value: 1 },
//   { key: 2, text: 'Price: High to Low', value: 2 }
// ]


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
          <ProductItem key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
          />
        ))}
      </Grid.Row>
    </Grid>
  );
}

export default ProductList;


