import React, { useContext, useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import CartContext from "./../../store/cart-context";

export default function AvailableMeals() {
  const [mealItems, setMealItems] = useState([]);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://reactapp-68e8e-default-rtdb.firebaseio.com/Meals.json"
        );

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const responseData = await response.json();
        const loadedMeals = [];

        for (const key in responseData) {
          loadedMeals.push({
            id: responseData[key].id,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          });
        }

        setMealItems(loadedMeals);
      } catch (error) {
        setIsError(true);
      }
    };

    fetchMeals();
  }, []);

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
          {mealItems.length > 0 ? (
            mealItems.map((meal) => {
              return (
                <MealItem key={meal.id} meal={meal} addItem={addItemHandler} />
              );
            })
          ) : isError ? (
            <p style={{ textAlign: "center", color: "red" }}>
              Something went wrong.
            </p>
          ) : (
            <p style={{ textAlign: "center" }}>Loading...</p>
          )}
        </ul>
      </Card>
    </section>
  );
}
