import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise("cart", "get");
      const products = cart.map((item) => item._id);
      console.log(cart)
      console.log(products)

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;
        console.log(data)
        console.log(productData)

        // productData.forEach((item) => {
        //   idbPromise("cart", "delete", item);
        // });
      }

      setTimeout(() => {
        window.location.assign("/");
      }, 50000000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <h1>Thanks for shopping with us!</h1>
      <p>
        Your purchase has been completed and you will now be redirected to the
        homepage
      </p>
    </div>
  );
}

export default Success;
