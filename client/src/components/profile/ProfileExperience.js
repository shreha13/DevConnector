import React from "react";
import Moment from "react-moment";

const ProfileExperience = (props) => {
  return (
    <div className="profile-exp bg-white p-2">
      <h2 className="text-primary">Experience</h2>
      {props.profile.experience.length <= 0 && <h4>No Experience Found</h4>}
      {props.profile.experience.map((i) => (
        <div key={i._id}>
          <h3 className="text-dark">{i.company}</h3>
          <p>
            <Moment format="YYYY/MM/DD">{i.from}</Moment> -{" "}
            {!i.to ? "Current" : <Moment format="YYYY/MM/DD">{i.to}</Moment>}
          </p>
          <p>
            <strong>Position: </strong>
            {i.title}
          </p>
          <p>
            <strong>Description: </strong>
            {i.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProfileExperience;
