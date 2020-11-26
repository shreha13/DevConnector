import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { createProfile } from "../../actions/profile";
import Spinner from "../common/Spinner";

const EditProfile = (props) => {
  const profile = props.profile.profile;

  const [formData, setFormData] = useState({
    company: "",
    status: "",
    website: "",
    location: "",
    skills: "",
    bio: "",
    githubusername: "",
    youtube: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    facebook: "",
  });

  const [displaySocialMedia, toggleSocialMedia] = useState(false);

  useEffect(() => {
    setFormData({
      company: profile.company,
      bio: profile.bio,
      githubusername: profile.githubusername,
      location: profile.location,
      skills: profile.skills,
      status: profile.status,
      website: profile.website,
      facebook: profile.social && profile.social.facebook,
      instagram: profile.social && profile.social.instagram,
      linkedin: profile.social && profile.social.linkedin,
      youtube: profile.social && profile.social.youtube,
      twitter: profile.social && profile.social.twitter,
    });
  }, [profile]);

  const {
    company,
    status,
    website,
    location,
    skills,
    bio,
    githubusername,
    youtube,
    instagram,
    twitter,
    linkedin,
    facebook,
  } = formData;

  const onChange = (e) => {
    const data = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(data);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    props.createProfile(formData, props.history, true);
  };

  let content = props.profile.isLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onFormSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            value={company}
            placeholder="Company"
            name="company"
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            value={website}
            placeholder="Website"
            name="website"
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            value={location}
            placeholder="Location"
            name="location"
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            value={skills}
            placeholder="* Skills"
            name="skills"
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            value={githubusername}
            placeholder="Github Username"
            name="githubusername"
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            value={bio}
            placeholder="A short bio of yourself"
            name="bio"
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => toggleSocialMedia((prevState) => !prevState)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialMedia ? (
          <Fragment>
            <div className="form-group social-input">
              <i className="fa fa-twitter fa-2x"></i>
              <input
                onChange={(e) => onChange(e)}
                value={twitter}
                type="text"
                placeholder="Twitter URL"
                name="twitter"
              />
            </div>

            <div className="form-group social-input">
              <i className="fa fa-facebook fa-2x"></i>
              <input
                onChange={(e) => onChange(e)}
                value={facebook}
                type="text"
                placeholder="Facebook URL"
                name="facebook"
              />
            </div>

            <div className="form-group social-input">
              <i className="fa fa-youtube fa-2x"></i>
              <input
                onChange={(e) => onChange(e)}
                value={youtube}
                type="text"
                placeholder="YouTube URL"
                name="youtube"
              />
            </div>

            <div className="form-group social-input">
              <i className="fa fa-linkedin fa-2x"></i>
              <input
                onChange={(e) => onChange(e)}
                value={linkedin}
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
              />
            </div>

            <div className="form-group social-input">
              <i className="fa fa-instagram fa-2x"></i>
              <input
                onChange={(e) => onChange(e)}
                value={instagram}
                type="text"
                placeholder="Instagram URL"
                name="instagram"
              />
            </div>
          </Fragment>
        ) : null}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );

  return <Fragment>{content}</Fragment>;
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProfile: (profileData, history, edit) =>
      dispatch(createProfile(profileData, history, edit)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
