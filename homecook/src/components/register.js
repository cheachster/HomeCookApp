import React, { Component } from "react";

class Register extends Component {
  // Setting the component's initial state
  state = {
    email: "",
    password: "",
    verifyPassword: ""
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    if (name === "password") {
      value = value.substring(0, 15);
    }
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    if (!this.state.email) {
      alert("Fill out your first and last name please!");
    } else if (this.state.password.length < 6) {
      alert(
        `Choose a more secure password`
      );
    } 

    this.setState({
      email: "",
      password: "",
      verifyPassword: ""
    });
  };

  render() {
    return (
      <div>
        <form className="form">
          <input
            value={this.state.email}
            name="email"
            onChange={this.handleInputChange}
            type="text"
            placeholder="E-mail"
          />
          <input
            value={this.state.password}
            name="password"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Password"
          />
          <input
            value={this.state.verifyPassword}
            name="verifyPassword"
            onChange={this.handleInputChange}
            type="password"
            placeholder="Verify password"
          />
          <p>By selecting Submit you agree to our <a href="#">Policy & Terms</a></p>
          <button onClick={this.handleFormSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Register;
