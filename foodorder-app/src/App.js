import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <React.Fragment>
      <Cart
        isVisible={isVisible}
        setVisible={() => {
          setIsVisible(!isVisible);
        }}
      />
      <Header
        setVisible={() => {
          setIsVisible(!isVisible);
        }}
      />
      <main>
        <Meals />
      </main>
    </React.Fragment>
  );
}

export default App;
