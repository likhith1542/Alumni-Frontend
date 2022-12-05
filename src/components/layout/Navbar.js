import React, { useEffect, useState } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./../../actions/authActions";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [auth]);

  const loggingout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="navbar">
      <div className="homenav">
        <Link
          className="homenavoption"
          to="/"
          style={{
            color: "inherit",
          }}
        >
          <h2 className="logoheader">V-Connect</h2>
          <span className="logospan">Let's Reconnect</span>
        </Link>
      </div>
      {isLoggedIn ? (
        <div className="navlinks">
          {/* <div className="secNavOption">About Us</div>
          <div className="secNavOption">Alumni Association</div>
          <div className="secNavOption">Chapters</div>
          <div className="secNavOption">More</div> */}

          <NavLink
            activeClassName="selected"
            to="/dashboard"
            style={{
              color: "inherit",
            }}
          >
            Feed
          </NavLink>

          

          <NavLink
            activeClassName="selected"
            to="/search"
            style={{
              color: "inherit",
            }}
          >
            Search
          </NavLink>
          <NavLink
            activeClassName="selected"
            to="/assist"
            style={{
              color: "inherit",
            }}
          >
            Assist
          </NavLink>

          <NavLink
            activeClassName="selected"
            to="/news"
            style={{
              color: "inherit",
            }}
          >
            News
          </NavLink>
          <NavLink
            activeClassName="selected"
            to="/gallery"
            style={{
              color: "inherit",
            }}
          >
            Gallery
          </NavLink>
          <NavLink
            activeClassName="selected"
            to="/jobs"
            style={{
              color: "inherit",
            }}
          >
            Jobs
          </NavLink>

          <NavLink
            activeClassName="selected"
            to="/events"
            style={{
              color: "inherit",
            }}
          >
            Events
          </NavLink>
          <NavLink
            activeClassName="selected"
            to="/chat"
            style={{
              color: "inherit",
            }}
          >
            Chat
          </NavLink>
          <p style={{ cursor: "pointer" }} onClick={loggingout}>
            logout
          </p>
        </div>
      ) : (
        <div className="navlinks">
          <NavLink
            activeClassName="selected"
            to="/register"
            style={{
              color: "inherit",
            }}
          >
            Register
          </NavLink>
          <NavLink
            activeClassName="selected"
            to="/login"
            style={{
              color: "inherit",
            }}
          >
            Log In
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default withRouter(Navbar);
