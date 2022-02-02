import { useStoreContext } from "../utils/StoreContext";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";
import { Icon, Menu, Input, Grid } from "semantic-ui-react";

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
          <Grid columns={2}>
            <Grid.Column>
              {item.name}
              </Grid.Column>
            <Grid.Column>
            ${item.price}
            </Grid.Column>
          </Grid>
        </Menu.Item>
        <div>
          <Grid columns={3}style={{ margin: "1px" }}>
            <Grid.Column verticalAlign='middle' width={2}> <span>Qty:</span></Grid.Column>
            <Grid.Column>
          <Input
            size="small"
            // type="number"
            placeholder="1"
            value={item.purchaseQuantity}
                onChange={onChange}
                width={"50px"}
              />
            </Grid.Column>
            <Grid.Column floated='right' verticalAlign='middle' >
              <Icon name="trash alternate outline" onClick={() => removeFromCart(item)} />
              </Grid.Column>
            
          </Grid>
        </div>
      </div>
    </Menu.Item>
  );
};

export default CartItem;
