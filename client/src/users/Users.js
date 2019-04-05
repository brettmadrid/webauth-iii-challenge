import React from "react";
import axios from "axios";

import requiresAuth from "../auth/requiresAuth";
import "../App.css";
class Users extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios
      .get("/users")
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(e => {
        console.error(e);
      });
  }

  render() {
    return (
      <>
        <h2>Users</h2>
        {this.state.users.map(u => (
          <li key={u.id}>{u.username}</li>
        ))}
      </>
    );
  }
}

export default requiresAuth(Users);
