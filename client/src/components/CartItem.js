import { useStoreContext } from "../utils/StoreContext";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";
import { Icon, Menu, Sidebar, Dropdown, Container, Input } from "semantic-ui-react";

const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === "0") {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
      idbPromise("cart", "delete", { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    // restyle but maintain functionality
    <Menu.Item className="flex-row">
      {/* <div>
        <img src={item.image} alt="" />
      </div> */}
      <div>
        <Menu.Item>
          {item.name} ${item.price}
        </Menu.Item>
        <div>
          <span>Qty:</span>
          <Input
            size="small"
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <Icon name="trash alternate outline"  onClick={() => removeFromCart(item)} />
        </div>
      </div>
    </Menu.Item>
  );
};

export default CartItem;
