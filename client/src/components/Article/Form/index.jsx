import React from "react";
import axios from "axios";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      author: ""
    };

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { title, body, author } = this.state;
    console.log("state", this.state);

    return axios.post("http://localhost:8000/api/articles", {
      title,
      body,
      author
    });
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  render() {
    const { title, body, author } = this.state;

    return (
      <div className="col-12 col-lg-6 offset-lg-3">
        <input
          onChange={event => this.handleChangeField("title", event)}
          value={title}
          className="form-control my-3"
          placeholer="Article Title"
        />

        <textarea
          onChange={event => this.handleChangeField("body", event)}
          value={body}
          className="form-control my-3"
          placeholder="Article Description"
        />

        <input
          onChange={event => this.handleChangeField("author", event)}
          value={author}
          className="form-control my-3"
          placeholder="Article Author"
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

export default Form;
