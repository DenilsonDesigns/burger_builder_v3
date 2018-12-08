import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const Burger = props => {
  //flatten state object from BurgerBuilder into an array.
  const transformedIng = Object.keys(props.ingredients).map(el => {
    return [...Array(props.ingredients[el])].map((_, index) => {
      return <BurgerIngredient key={el + index} type={el} />;
    });
  });

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIng}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
