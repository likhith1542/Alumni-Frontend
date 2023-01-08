import React, { useEffect, useState } from "react";
import WritePost from "./../../Social Media/Components/WritePost";
import GetPosts from "./../../Social Media/Components/GetPosts";
import "./Dashboard.css";
import { useSelector } from "react-redux";
import axios from "axios";
import Spotlight from "./../SpotLight/Spotlight";
import { NavLink } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import Birthday from "../Birthdays/Birthday";

function Dashboard() {
  const [postChanged, setPostChanged] = useState(false);
  const auth = useSelector((state) => state.auth);
  const [pdata, setPdata] = useState(null);

  const getProfileDate = async () => {
    await axios
      .get(
        `https://backend-yws9.onrender.com/api/users/getuser/${auth.user.id}`
      )
      .then(function (response) {
        setPdata(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getProfileDate();
    // eslint-disable-next-line
  }, [auth]);

  return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="dashboardMain">
        <div className="col s6">
          <Spotlight />
          <Birthday />
        </div>
        <div className="col s12">
          <WritePost
            postChanged={postChanged}
            setPostChanged={setPostChanged}
          />
          <GetPosts postChanged={postChanged} setPostChanged={setPostChanged} />
        </div>
        <div className="col s6" style={{ width: "25%" }}>
          <a href="/profile" className="pcard">
            <img src={pdata ? pdata.avatar : ""} alt="profileimage" />
            <div className="pinner">
              <p className="name">{auth.user.name}</p>
              <div className="sizedbox"></div>
              <div className="pinnerw">
                <p>{auth.user.id.toUpperCase()}</p>
                <p>{pdata ? pdata.year : ""}</p>
                <p>{pdata ? pdata.dept + "-" + pdata.prgrm : ""}</p>
              </div>
            </div>
          </a>
          <p className="username">
            Hey, {auth.user.name.split(" ")[0]}{" "}
            {auth.user.isA === "Yes" ? (
              <span className="username usernamespan">the Admin</span>
            ) : (
              <></>
            )}
            <p className="usernamespan">Hope you are having a great day</p>
          </p>
          <p className="username usernamespan">
            New Features like Chapter and Group Chat Coming Soon
          </p>
          {auth.user.isA === "Yes" ? (
            <NavLink
              to="/admin"
              className="username usernamespan"
              style={{ color: "black", fontWeight: "bolder" }}
            >
              Admin Page&nbsp;
              <FaExternalLinkAlt color="#185ADB" />
            </NavLink>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
