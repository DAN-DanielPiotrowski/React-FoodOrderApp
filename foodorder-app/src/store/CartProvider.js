import React, { useReducer } from "react";
import CartContext from "./cart-context";

export default function CartProvider({ children }) {
  const itemReducer = (state, action) => {
    if (action.type === "ADD_ITEM") {
      const updatedTotalAmount =
        state.totalAmount + action.items.price * action.items.amount;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.items.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        if (existingCartItem.amount >= 5)
          return { items: state.items, totalAmount: state.totalAmount };
        const updatedItem = {
          ...existingCartItem,
          amount:
            parseInt(existingCartItem.amount) + parseInt(action.items.amount),
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.items);
      }

      return { items: updatedItems, totalAmount: updatedTotalAmount };
    }
    if (action.type === "REMOVE_ITEM") {
      if (parseInt(action.items.amount) === 1) {
        const removedItems = state.items.filter(
          (item) => item.id !== action.items.id
        );
        const updatedTotalAmount = state.totalAmount - action.items.price;
        return { items: removedItems, totalAmount: updatedTotalAmount };
      } else {
        const existingCartItemIndex = state.items.findIndex(
          (item) => item.id === action.items.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItem = {
          ...existingCartItem,
          amount: parseInt(existingCartItem.amount) - 1,
        };
        const updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
        const updatedTotalAmount = state.totalAmount - action.items.price;
        return { items: updatedItems, totalAmount: updatedTotalAmount };
      }
    }
    return { items: [], totalAmount: 0 };
  };

  const [itemsState, dispatchItems] = useReducer(itemReducer, {
    items: [],
    totalAmount: 0,
  });

  const addItemToCartHandler = (item) => {
    dispatchItems({
      type: "ADD_ITEM",
      items: item,
    });
  };

  const removeItemFromCartHandler = (item) => {
    dispatchItems({ type: "REMOVE_ITEM", items: item });
  };

  const orderItemsHandler = () => {
    dispatchItems({});
  };

  return (
    <CartContext.Provider
      value={{
        items: itemsState.items,
        totalAmount: itemsState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        orderItems: orderItemsHandler,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
