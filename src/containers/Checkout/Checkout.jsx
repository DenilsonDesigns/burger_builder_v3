import React, { Component } from "react";
import CheckoutSummary from "./../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({
      ingredients: ingredients,
      totalPrice: price
    });
  }

  checkoutCancelled = () => {
    this.props.history.goBack();
  };

  checkoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutCancelled={this.checkoutCancelled}
          checkoutContinued={this.checkoutContinued}
          ingredients={this.state.ingredients}
        />
        <Route
          render={props => (
            <ContactData
              price={this.state.totalPrice}
              ingredients={this.state.ingredients}
              {...props}
            />
          )}
          path={this.props.match.path + "/contact-data"}
        />
      </div>
    );
  }
}

export default Checkout;
