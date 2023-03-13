import React, { useRef } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

export default function MealItemForm({ meal, addItem }) {
  const amountInputRef = useRef();

  const addItemHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmount < 1 ||
      enteredAmount > 5
    ) {
      return false;
    }
    addItem(meal, enteredAmount);
  };
  return (
    <form className={classes.form}>
      <Input
        label="Amount"
        input={{
          id: `amount ${meal.id}`,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
        ref={amountInputRef}
      />
      <button onClick={addItemHandler}>+ Add</button>
    </form>
  );
}
