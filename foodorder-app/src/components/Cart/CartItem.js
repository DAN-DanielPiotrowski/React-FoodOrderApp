import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  const cartItemRemoveHandler = () => {
    props.onRemove(props.item);
  };

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.orderInAction ? null : cartItemRemoveHandler}>
          −
        </button>
        <button onClick={props.orderInAction ? null : props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
