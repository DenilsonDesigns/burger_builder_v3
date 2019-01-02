import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const Burger = props => {
  //flatten state object from BurgerBuilder into an array.
  let transformedIng = Object.keys(props.ingredients)
    .map(el => {
      return [...Array(props.ingredients[el])].map((_, index) => {
        return <BurgerIngredient key={el + index} type={el} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIng.length === 0) {
    transformedIng = <p>Please start adding ingredients</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIng}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
