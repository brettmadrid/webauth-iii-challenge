import React from "react";
import axios from 'axios';

import "../App.css";
class Register extends React.Component {
  state = {
    username: "",
    password: "",
    department: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const endpoint = "http://localhost:9000/api/auth/register";

    axios
      .post(endpoint, this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
        this.props.history.push("/login");
      })
      .catch(e => {
        console.error(e);
      });
  };

  render() {
    return (
      <>
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            &nbsp;
            <input
              name="username"
              id="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              type="text"
            />
            <label htmlFor="password">Password</label>
            &nbsp;
            <input
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              type="password"
            />
            <label htmlFor="department">Department</label>
            &nbsp;
            <input
              name="department"
              id="department"
              value={this.state.department}
              onChange={this.handleInputChange}
              type="text"
            />
          </div>

          <div>
            <button type="submit">Register</button>
          </div>
        </form>
      </>
    )
  }
}

export default Register;
