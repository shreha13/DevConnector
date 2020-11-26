import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";
import Spinner from "../common/Spinner";
import ProfileItems from "./ProfileItems";

const Profiles = (props) => {
  useEffect(() => {
    props.getProfiles();
  }, []);

  let profileList = <Spinner />;
  if (!props.profile.loading) {
    let profilesList = <h4>No Profiles found...</h4>;
    if (props.profile.profiles.length > 0) {
        profilesList = props.profile.profiles.map((pro) => <ProfileItems profile={pro} key={pro._id} />)
    }

    profileList = (
      <Fragment>
        <h1 className="large text-primary">Developers</h1>
        <p className="lead">
          <i className="fa fa-connectdevelop"></i> Browse and connect with
          developers
        </p>
        <div className="profiles">{profilesList}</div>
      </Fragment>
    );
  }

  return <Fragment>{profileList}</Fragment>;
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfiles: () => dispatch(getProfiles()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
