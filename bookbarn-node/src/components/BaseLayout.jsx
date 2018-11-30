import React, { Component } from "react";
import "./BaseLayout.css";
import Menu from "./Menu";
import Footer from "./Footer";

class BaseLayout extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <Menu />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default BaseLayout;
