import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import localStorage from "local-storage";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { email, password } = this.state;
    const { onLogin, history } = this.props;

    return axios
      .post("http://localhost:8000/api/user/login", {
        email,
        password
      })
      .then(res => {
        onLogin(res.data);
        localStorage.set("user", res.data);
        localStorage.set("userLoggedIn", true);
        history.push("/");
      });
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className="container">
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            <h1 className="text-center">Login</h1>
          </div>
        </div>
        <div className="col-12 col-lg-6 offset-lg-3">
          <input
            type="email"
            onChange={event => this.handleChangeField("email", event)}
            value={email}
            className="form-control my-3"
            placeholder="Email"
            required
          />
          <input
            type="password"
            onChange={event => this.handleChangeField("password", event)}
            value={password}
            className="form-control my-3"
            placeholder="Password"
            required
          />
          <button
            onClick={this.handleSubmit}
            className="btn btn-primary float-right"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLogin: data => dispatch({ type: "ACTIVE_USER", data })
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
