import React from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:9000/api";

axios.interceptors.request.use(
  function(options) {
    // put the token on the auth headers
    options.headers.authorization = localStorage.getItem("jwt");

    return options;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default function(Component) {
  return class Authenticated extends React.Component {
    render() {
      const token = localStorage.getItem("jwt");
      const notLoggedIn = <div>Please login to see content</div>;
      return <> {token ? <Component {...this.props} /> : notLoggedIn}</>;
    }
  };
}
