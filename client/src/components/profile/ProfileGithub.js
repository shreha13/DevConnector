import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getGitRepo } from "../../actions/profile";

const ProfileGithub = (props) => {
  useEffect(() => {
    props.getGitHubRepos(props.username);
  }, []);
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
      </h2>
      {props.repos.length <= 0 && <h4>No Repos Found</h4>}
      {props.repos.map((i) => (
        <div key={i.id} className="repo bg-white p-1 my-1">
          <div>
            <h4>
              <a href="#" target="_blank" rel="noopener noreferrer">
                {i.name}
              </a>
            </h4>
            <p>{i.description}</p>
          </div>
          <div>
            <ul>
              <li className="badge badge-primary">
                Stars: {i.stargazers_count}
              </li>
              <li className="badge badge-dark">Watchers: {i.watchers_count}</li>
              <li className="badge badge-light">Forks: {i.forks_count}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile.profile,
    repos: state.profile.repos,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    getGitHubRepos: (username) => dispatch(getGitRepo(username)),
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(ProfileGithub);
