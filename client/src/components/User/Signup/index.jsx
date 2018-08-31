import React, { Component } from "react";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  handleSubmit() {
    const { name, email, password } = this.state;

    return axios
      .post("http://localhost:8000/api/user/signup", {
        name,
        email,
        password
      })
      .then(res => console.log("User registered : ", res.data));
  }

  render() {
    const { name, email, password } = this.state;
    return (
      <div className="container">
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            <h1>Signup</h1>
          </div>
        </div>

        <div className="col-12 col-lg-6 offset-lg-3">
          <input
            type="text"
            onChange={event => this.handleChangeField("name", event)}
            value={name}
            className="form-control my-3"
            placeholder="Name"
            required
          />

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
            className="btn btn-primary float-right"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default Signup;
