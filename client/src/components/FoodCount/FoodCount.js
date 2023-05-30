import React, { useState, useContext } from "react";
import "./FoodCount.css";

import { Context } from "../../context/UserContext";

const FoodCount = (props) => {
  const { food } = props;

  const { handleFoodList } = useContext(Context);

  const [count, setCount] = useState(0);

  const handleSub = () => {
    setCount((prev) => (prev > 0 ? --prev : 0));
    handleFoodList(food.id, "sub");
  };

  const handleAdd = () => {
    setCount((prev) => ++prev);
    handleFoodList(food.id, "add");
  };

  return (
    <div className="food-count-container">
      <p
        className="food-sub"
        onClick={(e) => {
          handleSub();
        }}
      >
        -
      </p>
      <div className="food-count">{count}</div>
      <p
        className="food-add"
        onClick={(e) => {
          handleAdd();
        }}
      >
        +
      </p>
    </div>
  );
};

export default FoodCount;
