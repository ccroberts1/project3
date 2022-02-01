
import { useEffect } from "react";
import { Icon, Menu, Button } from "semantic-ui-react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import CartItem from "./CartItem";
import Auth from "../utils/auth";
import { useStoreContext } from "../utils/StoreContext";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../utils/actions";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx"); //Needs our stripe key?

function Cart() {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
      if (data) {
        console.log(data)
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
    console.log(productIds)
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
          <strong>Total: ${calculateTotal()}</strong>
        </Menu.Item>
        <Menu.Item>       {/* Check to see if the user is logged in. If so render a button to check out */}
          {Auth.loggedIn() ? (
            <Button onClick={submitCheckout}>Checkout</Button>
          ) : (
            <span>(log in to check out)</span>
          )}</Menu.Item>
      </div>
    ) : (
      <h3>
        <span role="img" aria-label="shocked">
          😱
        </span>
        You haven't added anything to your cart yet!
      </h3>
    )}
  </Menu.Item>
);
};

export default Cart;
