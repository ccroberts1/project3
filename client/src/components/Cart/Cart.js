import { useEffect } from "react";
import { Menu, Button, Grid } from "semantic-ui-react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import CartItem from "./CartItem";
import Auth from "../../utils/auth";
import { useStoreContext } from "../../utils/StoreContext";
import { ADD_MULTIPLE_TO_CART, CLEAR_CART } from "../../utils/actions";
import SignInModal from "../SignInModal";


const stripePromise = loadStripe(
  "pk_test_51KMeBWA1XTMt9WgUQWw4VRGbdNl1eJlTDWx98cV8kPBrwkpGQrXzhVyLFZbutbQFZP6GJc9KwMvGkrfd8KhhbHr000suCUloro"
); //Needs our stripe key?

function Cart() {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      console.log(data);
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }
  const clearCart = () => {
    dispatch({ type: CLEAR_CART })
    idbPromise("cart", "clear")
  }

  return (
    // restyle but maintain functionality
    <Menu.Item className="cart">
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <Menu.Item className="flex-row space-between">
            <Grid columns={2}>
              <Grid.Column verticalAlign='middle' >
                <strong>Total: ${calculateTotal()}</strong> 
              </Grid.Column>
              <Grid.Column verticalAlign='middle' >
                <Button color="red" onClick={clearCart}> Clear Cart</Button>
              </Grid.Column>
            </Grid>
          </Menu.Item>
          <Menu.Item>
            {" "}
            {/* Check to see if the user is logged in. If so render a button to check out */}
            {Auth.loggedIn() ? (
              <Button style={{width: "100%",}} onClick={submitCheckout}>Checkout</Button>
            ) : (
              <SignInModal text="Sign In to Checkout"></SignInModal>
            )}
          </Menu.Item>
        </div>
      ) : (
        <Menu.Item>
          Cart is empty, please add items to the cart to purchase.
        </Menu.Item>
      )}
    </Menu.Item>
  );
}

export default Cart;
