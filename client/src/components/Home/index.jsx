import React from "react";
import { Form } from "../Article";
import { connect } from "react-redux";
import axios from "axios";

class Home extends React.Component {
  componentDidMount() {
    const { onLoad } = this.props;

    axios("http://localhost:8000/api/articles").then(res => {
      console.log("data fetched", res.data);
      onLoad(res.data);
    });
  }

  render() {
    const { articles } = this.props;

    return (
      <div className="container">
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            <h1 className="text-center">LightBlog</h1>
          </div>
          <Form />
        </div>
        {/* post list */}
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            {articles.map(article => {
              return (
                <div key={article._id} className="card my-3">
                  <div className="card-header">{article.title}</div>
                  <div className="card-body">{article.body}</div>
                  <div className="card-footer">
                    <i>
                      {article.author}
                      <p className="float-right">
                        {new Date(article.createdAt).toLocaleDateString()}
                      </p>
                    </i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.home.articles
});

const mapDispatchToProps = dispatch => ({
  onLoad: data => dispatch({ type: "HOME_PAGE_LOADED", data })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
