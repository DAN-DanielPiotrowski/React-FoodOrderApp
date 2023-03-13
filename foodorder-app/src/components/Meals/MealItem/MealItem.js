import React from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

export default function MealItem({ meal, addItem }) {
  const price = `$${meal.price.toFixed(2)}`;
  return (
    <li className={classes.meal}>
      <div>
        <h3>{meal.name}</h3>
        <div className={classes.description}>{meal.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm meal={meal} addItem={addItem} />
      </div>
    </li>
  );
}
