import React from "react";
import "./Jobs.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RiMessage3Line } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import AddJob from "./../components/Jobs/AddJob";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const auth = useSelector((state) => state.auth);
  let history = useHistory();

  const [deletedId, setDeletedId] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const deleteJob = (e, cid) => {
    e.preventDefault();
    setDeletedId([...deletedId, cid]);
    axios
      .delete(`https://backend-yws9.onrender.com/api/jobs/deleteJob/${cid}`)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("https://backend-yws9.onrender.com/api/jobs/getjobs")
      .then((result) => {
        result.data.sort(GetSortOrder("postedOn"));
        setJobs(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const createConversation = (e, fid) => {
    e.preventDefault();
    const newConvData = {
      senderId: auth.user.id,
      receiverId: fid,
    };

    axios
      .get(
        `https://backend-yws9.onrender.com/api/conversations/find/${fid}/${auth.user.id}`
      )
      .then((result) => {
        if (result.data === null) {
          axios
            .post(
              "https://backend-yws9.onrender.com/api/conversations/",
              newConvData
            )
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
  return (
    <div className="page_gallery">
      <div>
        <p className="galleryheading">Jobs</p>
        {!modalOpen && (
          <button
            className="openModalBtn"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Add Job
          </button>
        )}

        {modalOpen && <AddJob setOpenModal={setModalOpen} />}
      </div>
      <div className="gallerybox newsbox">
        {jobs.map((newss) =>
          !deletedId.includes(newss._id) ? (
            <div
              className="jobdiv newsdiv"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {/* <img className="newsimage" src={newss.image} /> */}
              <div className="newsdetails">
                <p className="jobname newsname">{newss.role}</p>
                <span className="jobposted">
                  posted by {newss.postedBy} on{" "}
                  {moment(newss.postedOn).format("lll")}
                </span>
                <div className="newsdetailsdiv">
                  <p className="posttype newsdetailcompany">{newss.company}</p>
                  <p className="posttype newsdetaillocation">
                    {newss.location}
                  </p>
                  <p className="posttype newsdetailtype">{newss.type}</p>
                </div>

                <p className="jobname newsmessage">{newss.description}</p>
                {auth.user.id !== newss.postedBy ? (
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
                ) : (
                  <></>
                )}
              </div>
              <div>
                {auth.user.isA === "Yes" || newss.postedBy === auth.user.id ? (
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
  );
}

export default Jobs;
