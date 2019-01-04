import React from "react";
import Wrapper from "./../../hoc/Wrapper";
import classes from "./Layout.module.css";
import Toolbar from "./../Navigation/Toolbar/Toolbar";

const Layout = props => {
  return (
    <Wrapper>
      <Toolbar />
      <main className={classes.Content}>{props.children}</main>
    </Wrapper>
  );
};

export default Layout;
