import React, { useContext } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import CartContext from "./../../store/cart-context";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

export default function AvailableMeals() {
  const ctx = useContext(CartContext);

  const addItemHandler = (item, amount) => {
    ctx.addItem({
      id: item.id,
      name: item.name,
      amount: amount,
      price: item.price,
    });
  };

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {DUMMY_MEALS.map((meal) => {
            return (
              <MealItem key={meal.id} meal={meal} addItem={addItemHandler} />
            );
          })}
        </ul>
      </Card>
    </section>
  );
}
