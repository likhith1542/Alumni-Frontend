import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { GET_ERRORS } from "./../../actions/types";
import axios from "axios";
import Post from "./../../Social Media/Components/Post";
import moment from "moment";
import { AiFillDelete } from "react-icons/ai";

function Profile() {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState("");
  const [prgrm, setPrgrm] = useState("");
  const [year, setYear] = useState("");
  const [avatar, SetAvatar] = useState("");
  const [DOB, setDOB] = useState("");
  const dispatch = useDispatch();

  const [postsSelected, setPostsSelected] = useState(true);

  const [profilePosts, setProfilePosts] = useState(null);
  const [profileJobs, setProfileJobs] = useState(null);

  const [deletedId, setDeletedId] = useState([]);
  const deleteJob = (e, cid) => {
    e.preventDefault();
    setDeletedId([...deletedId, cid]);
    axios
      .delete(`http://localhost:5000/api/jobs/deleteJob/${cid}`)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const reverseSelection = () => {
    setPostsSelected(!postsSelected);
  };

  const [pdata, setPdata] = useState(null);

  const getProfileDate = async () => {
    await axios
      .get(`http://localhost:5000/api/users/getuser/${auth.user.id}`)
      .then(function (response) {
        setPdata(response.data);
        setDesignation(response.data.designation);
        setDept(response.data.dept);
        setPrgrm(response.data.prgrm);
        setYear(response.data.year);
        setDOB(response.data.DOB);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getProfilePosts = async () => {
    await axios
      .get(`http://localhost:5000/api/posts/getPosts/${auth.user.id}`)
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
      .get(`http://localhost:5000/api/jobs/getjobs/${auth.user.id}`)
      .then(function (response) {
        var data = response.data;

        data.sort(GetSortOrder("postedOn"));

        setProfileJobs(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    SetAvatar(file);
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

  const submitForm = (e) => {
    var profileUpdate = new FormData();
    profileUpdate.append("name", name);
    profileUpdate.append("designation", designation);
    profileUpdate.append("email", email);
    profileUpdate.append("dept", dept);
    profileUpdate.append("prgrm", prgrm);
    profileUpdate.append("year", year);
    profileUpdate.append("DOB", DOB);

    if (avatar) {
      profileUpdate.append("avatar", avatar);
    }

    axios
      .post(
        `http://localhost:5000/api/users/${auth.user.id}/edit`,
        profileUpdate
      )
      .then((res) => {
        dispatch({
          type: GET_ERRORS,
          payload: "",
        });

        setEdit(false);
      })
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  };

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    setName(auth.user.name);
    setEmail(auth.user.email);
    getProfilePosts();
    getProfileJobs();

    // eslint-disable-next-line
  }, [auth]);

  useEffect(() => {
    getProfileDate();
    // eslint-disable-next-line
  }, [auth, edit]);

  return (
    <div className="profile">
      <div className="profcard card">
        <div style={{ width: "450px" }}>
          <div className="pdetails">
            <p style={{ fontWeight: "bold" }}>Name : </p>
            {!edit ? (
              <p>{auth.user.name}</p>
            ) : (
              <input
                defaultValue={auth.user.name}
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
              />
            )}
          </div>

          <div className="pdetails">
            <p style={{ fontWeight: "bold" }}>DOB : </p>

            {!edit ? (
              <p>{pdata ? pdata.DOB : ""}</p>
            ) : (
              <input
                defaultValue={pdata.DOB}
                onChange={(e) => {
                  e.preventDefault();
                  setDOB(e.target.value);
                }}
              />
            )}
          </div>

          <div className="pdetails">
            <p style={{ fontWeight: "bold" }}>Id : </p>

            <p>{auth.user.id}</p>
          </div>

          <div className="pdetails">
            <p style={{ fontWeight: "bold" }}>Email : </p>
            {!edit ? (
              <p>{auth.user.email}</p>
            ) : (
              <input
                defaultValue={auth.user.email}
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value);
                }}
              />
            )}
          </div>
          <div className="pdetails">
            <p style={{ fontWeight: "bold" }}>Department : </p>
            {!edit ? (
              <p>{pdata ? pdata.dept : ""}</p>
            ) : (
              <input
                defaultValue={pdata.dept}
                onChange={(e) => {
                  e.preventDefault();
                  setDept(e.target.value);
                }}
              />
            )}
          </div>
          <div className="pdetails">
            <p style={{ fontWeight: "bold" }}>Program : </p>
            {!edit ? (
              <p>{pdata ? pdata.prgrm : ""}</p>
            ) : (
              <input
                defaultValue={pdata.prgrm}
                onChange={(e) => {
                  e.preventDefault();
                  setPrgrm(e.target.value);
                }}
              />
            )}
          </div>
          <div className="pdetails">
            <p style={{ fontWeight: "bold" }}>Year : </p>
            {!edit ? (
              <p>{pdata ? pdata.year : ""}</p>
            ) : (
              <input
                defaultValue={pdata.year}
                onChange={(e) => {
                  e.preventDefault();
                  setYear(e.target.value);
                }}
              />
            )}
          </div>
          <div className="pdetails">
            <p style={{ fontWeight: "bold" }}>Designation : </p>
            {!edit ? (
              <p>{pdata ? pdata.designation : ""}</p>
            ) : (
              <input
                defaultValue={pdata.designation}
                onChange={(e) => {
                  e.preventDefault();
                  setDesignation(e.target.value);
                }}
              />
            )}
          </div>
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
            }}
            type="submit"
            className="btn btn-small waves-effect waves-light blue accent-3"
            onClick={
              !edit
                ? (e) => {
                    e.preventDefault();
                    setEdit(true);
                  }
                : (e) => {
                    e.preventDefault();
                    submitForm();
                  }
            }
          >
            {!edit ? (
              <>
                Edit Profile&nbsp;&nbsp;
                <FiEdit2 />
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
        <div className="info_avatar">
          <img
            src={
              avatar ? URL.createObjectURL(avatar) : pdata ? pdata.avatar : ""
            }
            alt="profile"
          />
          {edit ? (
            <span>
              <i className="fas fa-camera" />
              <p>Change</p>
              <input
                type="file"
                name="file"
                id="file_up"
                accept="image/*"
                onChange={changeAvatar}
              />
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
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
        {/* <div className="col s6" ></div> */}
        <div className="col s12">
          {postsSelected ? (
            profilePosts ? (
              profilePosts.map((ppost) => (
                <Post
                  key={ppost._id}
                  postt={ppost}
                  name={name}
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
                {profileJobs.map((newss) =>
                  !deletedId.includes(newss._id) ? (
                    <div
                      className="jobdiv newsdiv"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* <img className="newsimage" src={newss.image} /> */}
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
                          <p className="posttype newsdetailtype">
                            {newss.type}
                          </p>
                        </div>

                        <p className="jobname newsmessage">
                          {newss.description}
                        </p>
                      </div>
                      <div>
                        {auth.user.isA === "Yes" ||
                        newss.postedBy === auth.user.id ? (
                          <AiFillDelete
                            size={"20px"}
                            color="red"
                            onClick={(e) => {
                              deleteJob(e, newss._id);
                            }}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* <div className="col s6" ></div> */}
      </div>
    </div>
  );
}

export default Profile;
