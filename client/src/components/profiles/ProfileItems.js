import React from "react";
import { Link } from "react-router-dom";

const ProfileItems = (props) => {
  debugger;
  return (
    <div className="profile bg-light">
      <img src={props.profile.user.avatar} className="round-img" />
      <div>
        <h2>{props.profile.user.name}</h2>
        <p>
          {props.profile.status} {props.profile.company && <span> at {props.profile.company}</span>}
        </p>
        <p className="my-1">
          {props.profile.location && <span>{props.profile.location}</span>}
        </p>
        <Link to={`/profile/${props.profile.user._id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {props.profile.skills.slice(0, 4).map((skill, index) => {
          return (
            <li key={index} className="text-primary">
              <i className="fa fa-check"></i> {skill}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProfileItems;
