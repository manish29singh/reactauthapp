import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

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
    const { name, email, password } = this.state;
    const { onLogin } = this.props;

    return axios
      .post("http://localhost:8000/api/user/login", {
        email,
        password
      })
      .then(res => onLogin(res.data));
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  render() {
    const { email, password } = this.state;

    return (
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
