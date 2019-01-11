import React, { Component } from "react";
import Button from "./../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "./../../../components/UI/Spinner/Spinner";
import Input from "./../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "./../../Orders/Orders";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "email",
        elementConfig: {
          type: "text",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "Cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  };

  orderHandler = e => {
    e.preventDefault();

    const formData = {};
    for (let formElementID in this.state.orderForm) {
      formData[formElementID] = this.state.orderForm[formElementID].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    };

    this.props.onOrderBurger(order);
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (e, inputID) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = { ...updatedOrderForm[inputID] };
    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputID] = updatedFormElement;
    let formIsValid = true;
    for (let inputID in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputID].valid && formIsValid;
    }
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(el => (
          <Input
            key={el.id}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            elementType={el.config.elementType}
            changed={e => this.inputChangedHandler(e, el.id)}
            invalid={!el.config.valid}
            touched={el.config.touched}
            shouldValidate={el.config.validation}
          />
        ))}

        <Button
          disabled={!this.state.formIsValid}
          clicked={this.orderHandler}
          btnType="Success"
        >
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: orderData => dispatch(actions.purchaseBurger(orderData))
  };
};

export default connect(mapStateToProps)(withErrorHandler(ContactData, axios));
