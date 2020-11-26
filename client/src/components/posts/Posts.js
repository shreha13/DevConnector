import React, { Fragment, useEffect, useState } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  createPost,
  deletePost,
  getPosts,
  likePost,
  unlikePost,
} from "../../actions/post";
import Spinner from "../common/Spinner";

const Posts = (props) => {
  useEffect(() => {
    props.getPosts();
  }, []);

  const [postText, setPostText] = useState("");

  let content = <Spinner />;

  const likePost = (e, id) => {
    e.preventDefault();
    props.likePost(id);
  };

  const unlikePost = (e, id) => {
    e.preventDefault();
    props.unlikePost(id);
  };

  const deletePost = (e, id) => {
    e.preventDefault();
    props.deletePost(id);
  };

  const formSubmit = (e) => {
      debugger;
    e.preventDefault();
    props.createPost({ text: postText });
  };

  if (props.posts && !props.posts.loading) {
    content = (
      <Fragment>
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
          <i className="fa fa-user"></i> Welcome to the community!
        </p>
        <div className="post-form">
          <div className="bg-primary p">
            <h3>Say Something...</h3>
          </div>
          <form className="form my-1" onSubmit={formSubmit}>
            <textarea
              name="text"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              cols="30"
              rows="5"
              placeholder="Create a post"
              required
            ></textarea>
            <input type="submit" className="btn btn-dark my-1" value="Submit" />
          </form>
        </div>
        {props.posts.posts.length > 0 &&
          props.posts.posts.map((i) => (
            <div className="posts" key={i._id}>
              <div className="post bg-white p-1 my-1">
                <div>
                  <Link to={`/profile/${i.user._id}`}>
                    <img className="round-img" src={i.avatar} alt="" />
                    <h4>{i.name}</h4>
                  </Link>
                </div>
                <div>
                  <p className="my-1">{i.text}</p>
                  <p className="post-date">
                    Posted on <Moment format="YYYY/MM/DD">{i.updatedAt}</Moment>
                  </p>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={(e) => likePost(e, i._id)}
                  >
                    <i className="fa fa-thumbs-up"></i>{" "}
                    {i.likes.length > 0 && <span>{i.likes.length}</span>}
                  </button>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={(e) => unlikePost(e, i._id)}
                  >
                    <i className="fa fa-thumbs-down"></i>
                  </button>
                  <Link to={`/post/${i._id}`} className="btn btn-primary">
                    Discussion{" "}
                    {i.comments.length > 0 && (
                      <span className="comment-count">{i.comments.length}</span>
                    )}
                  </Link>
                  {!props.auth.loading && i.user._id === props.auth.user._id && (
                    <button
                      type="button"
                      onClick={(e) => deletePost(e, i._id)}
                      className="btn btn-danger"
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </Fragment>
    );
  }

  return <Fragment>{content}</Fragment>;
};

const mapStateToProps = (state) => {
  return {
    posts: state.post,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => dispatch(getPosts()),
    likePost: (id) => dispatch(likePost(id)),
    unlikePost: (id) => dispatch(unlikePost(id)),
    deletePost: (id) => dispatch(deletePost(id)),
    createPost: (formData) => dispatch(createPost(formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
