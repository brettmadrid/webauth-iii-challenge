import React from "react";
import axios from 'axios';

import '../App.css';
class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const endpoint = "http://localhost:9000/api/auth/login";

    axios.post(endpoint, this.state)
      .then(res => {
        localStorage.setItem('jwt', res.data.token);
        this.props.history.push('/users');
      }).catch(e => {
        console.error(e);
      })
  }

  render() {
    return (
      <>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              id="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              type="text"
            />
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              type="password"
            />
          </div>

          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </>
    );
  }
}

export default Login;
