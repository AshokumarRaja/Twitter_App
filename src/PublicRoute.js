import React from "react";
import { Redirect } from "react-router-dom";

class PublicRoute extends React.Component {
  render() {
    const Component = this.props.component;
    const isAuthenticated = localStorage.getItem("auth-token");

    return isAuthenticated ? (
      <Redirect to={{ pathname: "/home" }} />
    ) : (
      <Component />
    );
  }
}

export default PublicRoute;
