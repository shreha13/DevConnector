import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addExperience } from "../../actions/profile";
import Spinner from "../common/Spinner";

const AddExperience = (props) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: true,
    description: "",
  });

  const [displayTo, toggleTo] = useState(false);

  const { company, title, location, description, from, to, current } = formData;

  const onChange = (e) => {
    let data = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    if (e.target.name === "current") {
      toggleTo((prevState) => !prevState);
      data = {
        ...formData,
        [e.target.name]: e.target.checked,
      };
    }
    setFormData(data);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    props.addExperience(formData, props.history);
  };

  let content = <Spinner />;
  if (!props.profile.isLoading && props.profile) {
    content = (
      <Fragment>
        <h1 className="large text-primary">Add An Experience</h1>
        <p className="lead">
          <i className="fas fa-code-branch"></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={onFormSubmit}>
          <div className="form-group">
            <input
              onChange={(e) => onChange(e)}
              value={title}
              type="text"
              placeholder="* Job Title"
              name="title"
              required
            />
          </div>
          <div className="form-group">
            <input
              onChange={(e) => onChange(e)}
              value={company}
              type="text"
              placeholder="* Company"
              name="company"
              required
            />
          </div>
          <div className="form-group">
            <input
              onChange={(e) => onChange(e)}
              value={location}
              type="text"
              placeholder="Location"
              name="location"
            />
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input
              onChange={(e) => onChange(e)}
              value={from}
              type="date"
              name="from"
            />
          </div>
          <div className="form-group">
            <p>
              <input
                onChange={(e) => onChange(e)}
                checked={current}
                value={current}
                type="checkbox"
                name="current"
              />{" "}
              Current Job
            </p>
          </div>
          {displayTo && (
            <div className="form-group">
              <h4>To Date</h4>
              <input
                onChange={(e) => onChange(e)}
                value={to}
                type="date"
                name="to"
              />
            </div>
          )}
          <div className="form-group">
            <textarea
              onChange={(e) => onChange(e)}
              value={description}
              name="description"
              cols="30"
              rows="5"
              placeholder="Job Description"
            ></textarea>
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </Fragment>
    );
  }
  return <Fragment>{content}</Fragment>;
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addExperience: (formData, history) => dispatch(addExperience(formData, history)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddExperience));
