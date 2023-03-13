import React from "react";
import classes from "./Cart.module.css";
import Modal from "./../UI/Modal";

export default function Cart({ cartItems, isVisible, setVisible }) {
  return (
    isVisible && (
      <Modal setVisible={setVisible}>
        <ul className={classes["cart-items"]}></ul>
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>Total Price</span>
        </div>
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={setVisible}>
            Close
          </button>
          <button className={classes.button}>Order</button>
        </div>
      </Modal>
    )
  );
}
