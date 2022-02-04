import { useStoreContext } from "../utils/StoreContext";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";
import { Icon, Menu, Grid } from "semantic-ui-react";
import '../styles/CartQuantityStyle.css'



const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (target) => {
    const value = target.value;
    if (value === "0") {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
      idbPromise("cart", "delete", { ...item });
    } else if (value <= target.id) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    } else {
      alert("No More Available")
    }
  };


  const change_quantity = (e) => {
    let currentValue = e.target.parentNode.childNodes[2].value
    const target= e.target.parentNode.childNodes[2]
    if (e.target.title === "Up") { 
      if (currentValue < target.id) {
        currentValue = (parseInt(currentValue)) + 1;
        target.value = currentValue
        onChange(target)
      } else {
          alert("No More Available")
      }
    }
    if (e.target.title === "Down") {
      currentValue = (parseInt(currentValue)) - 1;
      target.value = currentValue
      onChange(target)
    }
  }

  
  return (
    // restyle but maintain functionality
    <Menu.Item>
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
            <Grid.Column verticalAlign='middle' width={1}> <span>Qty:</span></Grid.Column>
            <Grid.Column floated='right' width={10}>
              <fieldset id="data-quantity">
                <legend>Change quantity</legend>
                <button type="button" title="Down" className="sub" onClick={change_quantity}>Down</button>
                <input type="number" name="quantity" pattern="[0-9]+" value={item.purchaseQuantity} id={item.quantity}></input>
                <button type="button" title="Up" className="add" onClick={change_quantity}>Up</button>
              </fieldset>
            </Grid.Column>
            <Grid.Column floated='right' verticalAlign='middle' width={2} >
              <Icon name="trash alternate outline" onClick={() => removeFromCart(item)} />
              </Grid.Column>
            
          </Grid>
        </div>
      </div>


    </Menu.Item>
  );
};

export default CartItem;


