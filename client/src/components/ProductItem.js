import React from "react";
import {
  Grid,
  Image,
  Card,
  Icon,
  Button
} from "semantic-ui-react";
import { useStoreContext } from "../utils/StoreContext";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";
import SignInModal from './SignInModal';
import Auth from "../utils/auth"

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  
  }

  return (
          <Grid.Column>
            <Card key={_id}>
              <Image src={image} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{name}</Card.Header>
                {/* <Card.Description>{product.description}</Card.Description> */}
              </Card.Content>

              <Card.Content extra>
                <Grid columns={2} style={{ margin: "1px" }}>
                <Grid.Column verticalAlign='middle'> 
                  <Icon name="dollar sign" />
                  {price}
                  </Grid.Column>
                  <Grid.Column verticalAlign='middle'> 
                    {quantity === 0 ? (<Card.Meta style={{color: "red"}}>Out of Stock</Card.Meta>) :
                      quantity === 1 ? (<Card.Meta style={{color: "red"}}>Only One Left</Card.Meta>) :
                      (<Card.Meta>Quantity: {quantity}</Card.Meta>)}
                    
                  </Grid.Column>
                </Grid>
                
              </Card.Content>
                {Auth.loggedIn() ? (
                  <Button onClick={addToCart}>Add to Cart</Button>
                  ) : (<div><SignInModal backgroundcolor="grey"
                    textcolor="white"
                  text="Sign In to Purchase"></SignInModal></div>)}
            </Card>
          </Grid.Column>
  );
}

export default ProductItem;
