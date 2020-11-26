import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addEducation } from "../../actions/profile";
import Spinner from "../common/Spinner";

const AddEducation = (props) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: true,
    description: "",
  });

  const [displayTo, toggleTo] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

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
    props.addEducation(formData, props.history);
  };

  let content = <Spinner />;
  if (!props.profile.isLoading && props.profile) {
    content = (
      <Fragment>
        <h1 className="large text-primary">Add Your Education</h1>
        <p className="lead">
          <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
          that you have attended
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={onFormSubmit}>
          <div className="form-group">
            <input
              onChange={(e) => onChange(e)}
              value={school}
              type="text"
              placeholder="* School or Bootcamp"
              name="school"
              required
            />
          </div>
          <div className="form-group">
            <input
              onChange={(e) => onChange(e)}
              value={degree}
              type="text"
              placeholder="* Degree or Certificate"
              name="degree"
              required
            />
          </div>
          <div className="form-group">
            <input
              onChange={(e) => onChange(e)}
              value={fieldofstudy}
              type="text"
              placeholder="Field Of Study"
              name="fieldofstudy"
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
              placeholder="Program Description"
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
    addEducation: (formData, history) => dispatch(addEducation(formData, history)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddEducation));
