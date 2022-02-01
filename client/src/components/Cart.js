import { useEffect } from "react";
import { Icon, Menu } from "semantic-ui-react";
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

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

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

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

//   return (
//     // Simple Sample Items
//     <>
//       <Menu.Item as="a">
//         <Icon name="home" />
//         Home
//       </Menu.Item>
//       <Menu.Item as="a">
//         <Icon name="gamepad" />
//         Games
//       </Menu.Item>
//       <Menu.Item as="a">
//         <Icon name="camera" />
//         Channels
//       </Menu.Item>
//     </>
//   );
// }

return (
  <div className="cart">
    <div className="close" onClick={toggleCart}>
      [close]
    </div>
    <h2>Shopping Cart</h2>
    {state.cart.length ? (
      <div>
        {state.cart.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}

        <div className="flex-row space-between">
          <strong>Total: ${calculateTotal()}</strong>

          {/* Check to see if the user is logged in. If so render a button to check out */}
          {Auth.loggedIn() ? (
            <button onClick={submitCheckout}>Checkout</button>
          ) : (
            <span>(log in to check out)</span>
          )}
        </div>
      </div>
    ) : (
      <h3>
        <span role="img" aria-label="shocked">
          😱
        </span>
        You haven't added anything to your cart yet!
      </h3>
    )}
  </div>
);
};

export default Cart;
