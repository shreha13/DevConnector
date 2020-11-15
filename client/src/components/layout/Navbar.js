import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { logout } from "../../actions/auth";

const Navbar = (props) => {
  let authBar = (
    <Fragment>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  const logoutUser = () => {
    props.logout();
    return <Redirect to="/" />;
  };

  if (props.isAuthenticated) {
    authBar = (
      <li>
        <Link to="/" onClick={logoutUser}>
          <i className="fa fa-sign-out"></i>{" "}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    );
  }

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fa fa-code"></i> DevConnector
        </Link>
      </h1>
      <ul>{authBar}</ul>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
