import React from "react";
import Moment from "react-moment";

const ProfileEducation = (props) => {
  return (
    <div className="profile-edu bg-white p-2">
      <h2 className="text-primary">Education</h2>
      {props.profile.education.length <= 0 && <h4>No Education Found</h4>}
      {props.profile.experience.map((i) => (
        <div>
          <h3>{i.school}</h3>
          <p>
            <Moment format="YYYY/MM/DD">{i.from}</Moment> -{" "}
            {!i.to ? "Current" : <Moment format="YYYY/MM/DD">{i.to}</Moment>}
          </p>
          <p>
            <strong>Degree: </strong>
            {i.degree}
          </p>
          <p>
            <strong>Field Of Study: </strong>
            {i.fieldofstudy}
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

export default ProfileEducation;
