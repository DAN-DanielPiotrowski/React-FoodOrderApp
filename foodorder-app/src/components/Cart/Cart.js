import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "./../UI/Modal";
import CartContext from "./../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

export default function Cart({ isVisible, setVisible }) {
  const ctx = useContext(CartContext);
  const [order, setOrder] = useState(false);

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setOrder(!order);
  };

  const onOrderSubmitHandler = () => {
    console.log(
      `Order: \n ${ctx.items.map(
        (item) => ` ${item.name} in amount: ${item.amount}`
      )} \n totalAmount: $${ctx.totalAmount.toFixed(2)}`
    );
    ctx.orderItems();
    setOrder(!order);
  };

  return (
    isVisible && (
      <Modal setVisible={setVisible}>
        <ul className={classes["cart-items"]}>
          {ctx.items.length > 0
            ? ctx.items.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    item={item}
                    name={item.name}
                    amount={item.amount}
                    price={item.price * item.amount}
                    onRemove={ctx.removeItem}
                    orderInAction={order}
                    onAdd={cartItemAddHandler.bind(null, item)}
                  />
                );
              })
            : "It's empty here"}
        </ul>
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{`$${ctx.totalAmount.toFixed(2)}`}</span>
        </div>
        {order && <Checkout orderSubmit={onOrderSubmitHandler} />}
        <div className={classes.actions}>
          {!order && (
            <button className={classes["button--alt"]} onClick={setVisible}>
              Close
            </button>
          )}
          {ctx.items.length > 0 && (
            <button className={classes.button} onClick={orderHandler}>
              {order ? "Cancel" : "Order"}
            </button>
          )}
        </div>
      </Modal>
    )
  );
}
