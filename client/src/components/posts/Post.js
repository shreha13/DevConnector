import React, { Fragment, useEffect, useState } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addComment, deleteComment, getPost } from "../../actions/post";
import Spinner from "../common/Spinner";

const Post = (props) => {
  useEffect(() => {
    props.getPost(props.match.params.id);
  }, []);

  const [postText, setPostText] = useState("");

  const formSubmit = (e) => {
    e.preventDefault();
    debugger;
    props.addComment(props.posts.post._id, { text: postText });
    setPostText("")
  };

  const deleteComment = (e, id) => {
    e.preventDefault();
    props.deleteComment(props.posts.post._id, id);
  };

  let content = <Spinner />;
  if (!props.posts.loading && props.posts.post) {
    content = (
      <Fragment>
        <Link to="/posts" className="btn">
          Back To Posts
        </Link>
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${props.posts.post.user._id}`}>
              <img className="round-img" src={props.posts.post.avatar} alt="" />
              <h4>{props.posts.post.name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">{props.posts.post.text}</p>
          </div>
        </div>

        <div className="post-form">
          <div className="bg-primary p">
            <h3>Leave A Comment</h3>
          </div>
          <form className="form my-1" onSubmit={formSubmit}>
            <textarea
              name="text"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              cols="30"
              rows="5"
              placeholder="Comment on this post"
              required
            ></textarea>
            <input type="submit" className="btn btn-dark my-1" value="Submit" />
          </form>
        </div>
        <div className="comments">
          {props.posts.post.comments.length > 0 &&
            props.posts.post.comments.map((i) => (
              <div className="post bg-white p-1 my-1">
                <div>
                  <Link to={`/profile/${i.user}`}>
                    <img
                      className="round-img"
                      src={i.avatar}
                      alt=""
                    />
                    <h4>{i.name}</h4>
                  </Link>
                </div>
                <div>
                  <p className="my-1">{i.text}</p>
                  <p className="post-date">
                    Posted on <Moment format="YYYY/MM/DD">{i.date}</Moment>
                  </p>
                </div>
                {!props.auth.loading && i.user === props.auth.user._id && (
                  <button
                    type="button"
                    onClick={(e) => deleteComment(e, i._id)}
                    className="btn btn-danger"
                  >
                    <i className="fa fa-times"></i>
                  </button>
                )}
              </div>
            ))}
        </div>
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
    getPost: (id) => dispatch(getPost(id)),
    addComment: (id, formData) => dispatch(addComment(id, formData)),
    deleteComment: (postId, commentId) =>
      dispatch(deleteComment(postId, commentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
