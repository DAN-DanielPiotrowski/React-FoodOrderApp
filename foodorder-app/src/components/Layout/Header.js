import React from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

export default function Header({ setVisible }) {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>FoodOrderApp</h1>
        <HeaderCartButton setVisible={setVisible} />
      </header>
      <div className={classes["main-image"]}>
        <img src="/assets/images/meals.jpg" alt="Delicious Food" />
      </div>
    </React.Fragment>
  );
}
