import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "./../UI/Modal";
import CartContext from "./../../store/cart-context";
import CartItem from "./CartItem";

export default function Cart({ isVisible, setVisible }) {
  const ctx = useContext(CartContext);

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    console.log(
      `Order: \n ${ctx.items.map(
        (item) => ` ${item.name} in amount: ${item.amount}`
      )} \n totalAmount: $${ctx.totalAmount.toFixed(2)}`
    );
    ctx.orderItems();
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
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={setVisible}>
            Close
          </button>
          {ctx.items.length > 0 && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      </Modal>
    )
  );
}
