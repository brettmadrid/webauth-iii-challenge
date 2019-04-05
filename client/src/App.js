import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";

import Login from "./login/Login";
import Users from "./users/Users";
import Register from "./register/Register";

import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <header>
          <nav>
            <NavLink to="/register">Register</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/login">Login</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/users">Users</NavLink>
          </nav>
        </header>
        <main>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/users" component={Users} />
        </main>
      </>
    );
  }
}

export default App;
