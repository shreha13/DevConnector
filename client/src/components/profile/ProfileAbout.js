import React, { Fragment } from "react";

const ProfileAbout = (props) => {
  return (
    <div className="profile-about bg-light p-2">
      {props.profile.bio && (
        <Fragment>
          <h2 className="text-primary">{props.user.name}'s Bio</h2>
          <p>{props.profile.bio}</p>
          <div className="line"></div>
        </Fragment>
      )}
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {props.profile.skills.map((i) => (
          <div className="p-1" key={i}>
            <i className="fa fa-check"></i> {i}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileAbout;
