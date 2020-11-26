import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteEducation, deleteExperience, getProfile } from "../../actions/profile";
import Spinner from "../common/Spinner";
import Moment from "react-moment";

const Dashboard = (props) => {
  useEffect(() => {
    props.getProfile();
  }, []);

  const { user } = props.auth;
  debugger;
  const { profile, loading } = props.profile;

  let dashboardContent;

  const deleteExperience = (e, id) => {
    e.preventDefault();
    props.deleteExperience(id);
  };
  
  const deleteEducation = (e, id) => {
    e.preventDefault();
    props.deleteEducation(id);
  };

  dashboardContent =
    profile === null && loading ? (
      <Spinner />
    ) : (
      <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fa fa-user"></i> Welcome {user && user.name}
        </p>
        {profile !== null ? (
          <Fragment>
            <div className="dash-buttons">
              <Link to="/edit-profile" className="btn btn-light">
                <i className="fa fa-user-circle text-primary"></i> Edit Profile
              </Link>
              <Link to="/add-experience" className="btn btn-light">
                <i className="fab fa-black-tie text-primary"></i> Add Experience
              </Link>
              <Link to="/add-education" className="btn btn-light">
                <i className="fa fa-graduation-cap text-primary"></i> Add
                Education
              </Link>
            </div>
            {profile.experience.length > 0 && (
              <Fragment>
                <h2 className="my-2">Experience Credentials</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th className="hide-sm">Title</th>
                      <th className="hide-sm">Years</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.experience &&
                      profile.experience.map((i) => (
                        <tr key="i._id">
                          <td>{i.company}</td>
                          <td className="hide-sm">{i.title}</td>
                          <td className="hide-sm">
                            <Moment format="YYYY/MM/DD">{i.from}</Moment> -{" "}
                            {!i.to ? (
                              "Current"
                            ) : (
                              <Moment format="YYYY/MM/DD">{i.to}</Moment>
                            )}
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={(e) => deleteExperience(e, i._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </Fragment>
            )}
            {profile.education.length > 0 && (
              <Fragment>
                <h2 className="my-2">Education Credentials</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th>School</th>
                      <th className="hide-sm">Degree</th>
                      <th className="hide-sm">Years</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {profile.education.map((i) => (
                      <tr key="i._id">
                        <td>{i.school}</td>
                        <td className="hide-sm">{i.degree}</td>
                        <td className="hide-sm">
                          <Moment format="YYYY/MM/DD">{i.from}</Moment> -{" "}
                          {!i.to ? (
                            "Current"
                          ) : (
                            <Moment format="YYYY/MM/DD">{i.to}</Moment>
                          )}
                        </td>
                        <td>
                          <button className="btn btn-danger" onClick={(e) => deleteEducation(e, i._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Fragment>
            )}

            <div className="my-2">
              <button className="btn btn-danger">
                <i className="fa fa-user-minus"></i>
                Delete My Account
              </button>
            </div>
          </Fragment>
        ) : (
          <div>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </div>
        )}
      </Fragment>
    );

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">{dashboardContent}</div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  getProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: () => dispatch(getProfile()),
    deleteExperience: (id) => dispatch(deleteExperience(id)),
    deleteEducation: (id) => dispatch(deleteEducation(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
