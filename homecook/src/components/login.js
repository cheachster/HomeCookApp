import React, { Component } from "react";

class Login extends Component {
  // Setting the component's initial state
  state = {
    email: "",
    password: ""
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
      alert("Please enter your e-mail");
    } else if (this.state.password.length < 6) {
      alert(
        `Choose a more secure password`
      );
    }

    this.setState({
      email: "",
      password: ""
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
            type="password"
            placeholder="Password"
          />
          <button onClick={this.handleFormSubmit}>Sign In</button>
        </form>
        <div>
          <div id="forgotPassword">Forgot password?</div>
          <p>Don't have an account? <a href="register.js">Sign Up</a></p>
        </div>
      </div>
    );
  }
}

export default Login;
