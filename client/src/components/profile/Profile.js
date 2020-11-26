import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileById } from "../../actions/profile";
import Spinner from "../common/Spinner";
import ProfileAbout from "./ProfileAbout";
import ProfileEducation from "./ProfileEducation";
import ProfileExperience from "./ProfileExperience";
import ProfileGithub from "./ProfileGithub";
import ProfileTop from "./ProfileTop";

const Profile = (props) => {
  useEffect(() => {
    props.getProfileById(props.match.params.id);
  }, []);
  return (
    <Fragment>
      {props.profile.profile === null || props.profile.loading ? (
        <Spinner />
      ) : (
        <Link to="/profiles" className="btn btn-light">
          Back To Profiles
        </Link>
      )}
      {props.profile.profile &&
        props.auth.isAuthenticated &&
        props.auth.loading === false &&
        props.auth.user._id === props.profile.profile.user._id && (
          <Link to="/edit-profile" className="btn btn-dark">
            Edit Profile
          </Link>
        )}
      {props.profile.profile && (
        <div className="profile-grid my-1">
          <ProfileTop profile={props.profile.profile} />
          <ProfileAbout
            profile={props.profile.profile}
            user={props.profile.profile.user}
          />
          <ProfileExperience profile={props.profile.profile} />
          <ProfileEducation profile={props.profile.profile} />
          {props.profile.profile.githubusername && (
            <ProfileGithub username={props.profile.profile.githubusername} />
          )}
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfileById: (userId) => dispatch(getProfileById(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
