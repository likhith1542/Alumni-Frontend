import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import Post from "./../../Social Media/Components/Post";
import moment from "moment";
import { RiMessage3Line } from "react-icons/ri";

function VProfile() {
  let { userid } = useParams();

  let history = useHistory();

  const [postsSelected, setPostsSelected] = useState(true);

  const [profilePosts, setProfilePosts] = useState(null);
  const [profileJobs, setProfileJobs] = useState(null);

  const reverseSelection = () => {
    setPostsSelected(!postsSelected);
  };

  const [pdata, setPdata] = useState(null);

  const getProfileDate = async () => {
    await axios
      .get(`http://localhost:5000/api/users/getuser/${userid}`)
      .then(function (response) {
        setPdata(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getProfilePosts = async () => {
    await axios
      .get(`http://localhost:5000/api/posts/getPosts/${userid}`)
      .then(function (response) {
        var data = response.data;

        data.sort(GetSortOrder("postedOn"));

        setProfilePosts(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getProfileJobs = async () => {
    await axios
      .get(`http://localhost:5000/api/jobs/getjobs/${userid}`)
      .then(function (response) {
        var data = response.data;

        data.sort(GetSortOrder("postedOn"));

        setProfileJobs(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] < b[prop]) {
        return 1;
      } else if (a[prop] > b[prop]) {
        return -1;
      }
      return 0;
    };
  }

  useEffect(() => {
    getProfilePosts();
    getProfileJobs();
    // eslint-disable-next-line
  }, [userid]);

  const auth = useSelector((state) => state.auth);

  const createConversation = (e, fid) => {
    e.preventDefault();
    const newConvData = {
      senderId: auth.user.id,
      receiverId: fid,
    };

    axios
      .get(
        `http://localhost:5000/api/conversations/find/${fid}/${auth.user.id}`
      )
      .then((result) => {
        if (result.data === null) {
          axios
            .post("http://localhost:5000/api/conversations/", newConvData)
            .then((result) => {
              history.push(`/chat/${result._id}`);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          history.push(`/chat/${result._id}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProfileDate();
    // eslint-disable-next-line
  }, [auth]);

  return (
    <div className="profile">
      {pdata ? (
        <div className="profcard card">
          <div style={{ width: "450px" }}>
            <div className="pdetails">
              <p style={{ fontWeight: "bold" }}>Name : </p>
              <p>{pdata ? pdata.name : ""}</p>
            </div>

            <div className="pdetails">
              <p style={{ fontWeight: "bold" }}>DOB : </p>

              <p>{pdata ? pdata.DOB : ""}</p>
            </div>

            <div className="pdetails">
              <p style={{ fontWeight: "bold" }}>Id : </p>
              <p>{pdata ? pdata.id : ""}</p>
            </div>

            <div className="pdetails">
              <p style={{ fontWeight: "bold" }}>Email : </p>
              <p>{pdata ? pdata.email : ""}</p>
            </div>
            <div className="pdetails">
              <p style={{ fontWeight: "bold" }}>Department : </p>
              <p>{pdata ? pdata.dept : ""}</p>
            </div>
            <div className="pdetails">
              <p style={{ fontWeight: "bold" }}>Program : </p>
              <p>{pdata ? pdata.prgrm : ""}</p>
            </div>
            <div className="pdetails">
              <p style={{ fontWeight: "bold" }}>Year : </p>
              <p>{pdata ? pdata.year : ""}</p>
            </div>
            <div className="pdetails">
              <p style={{ fontWeight: "bold" }}>Designation : </p>
              <p>{pdata ? pdata.designation : ""}</p>
            </div>
          </div>
          <div className="info_avatar">
            <img src={pdata ? pdata.avatar : ""} alt="profile" />
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="profcard card opselector">
        <p
          className="haedingselector"
          style={{
            fontWeight: postsSelected ? "bold" : "normal",
            fontSize: postsSelected ? "large" : "normal",
          }}
          onClick={reverseSelection}
        >
          Posts
        </p>
        <p
          className="haedingselector"
          style={{
            fontWeight: !postsSelected ? "bold" : "normal",
            fontSize: !postsSelected ? "large" : "normal",
          }}
          onClick={reverseSelection}
        >
          Jobs
        </p>
      </div>

      <div className="profileposts container valign-wrapper">
        <div className="col s12">
          {postsSelected ? (
            profilePosts ? (
              profilePosts.map((ppost) => (
                <Post
                  key={ppost._id}
                  postt={ppost}
                  name={pdata ? pdata.name : ""}
                  pic={pdata ? pdata.avatar : ""}
                />
              ))
            ) : (
              <></>
            )
          ) : profileJobs ? (
            <div
              className="page_gallery"
              style={{ marginTop: "0", marginBottom: "30px" }}
            >
              <div className="gallerybox newsbox">
                {profileJobs.map((newss) => (
                  <div
                    className="jobdiv newsdiv"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="newsdetails">
                      <p className="jobname newsname">{newss.role}</p>
                      <span className="jobposted">
                        posted by {newss.postedBy} on{" "}
                        {moment(newss.postedOn).format("lll")}
                      </span>
                      <div className="newsdetailsdiv">
                        <p className="posttype newsdetailcompany">
                          {newss.company}
                        </p>
                        <p className="posttype newsdetaillocation">
                          {newss.location}
                        </p>
                        <p className="posttype newsdetailtype">{newss.type}</p>
                      </div>

                      <p className="jobname newsmessage">{newss.description}</p>

                      <div>
                        <p
                          style={{
                            textDecoration: "underline",
                            fontWeight: "bold",
                            color: "gray",
                          }}
                        >
                          Contact Details{" "}
                        </p>
                        <p
                          style={{ color: "gray", cursor: "pointer" }}
                          onClick={(e) => {
                            createConversation(e, newss.postedBy);
                          }}
                        >
                          Message {newss.name} <RiMessage3Line />
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default VProfile;
