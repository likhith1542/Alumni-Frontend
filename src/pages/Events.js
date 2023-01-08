import React from "react";
import "./Jobs.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";

function Events() {
  const [jobs, setJobs] = useState([]);
  const auth = useSelector((state) => state.auth);

  const [deletedId, setDeletedId] = useState([]);

  const deleteEvent = (e, eid) => {
    e.preventDefault();
    setDeletedId([...deletedId, eid]);
    axios
      .delete(`http://localhost:5000/api/events/deleteEvent/${eid}`)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events/getevents")
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

  return (
    <div className="page_gallery">
      <p className="galleryheading">Events</p>
      <div className="gallerybox newsbox">
        {jobs.map((newss) =>
          !deletedId.includes(newss._id) ? (
            <div className="jobdiv newsdiv">
              <img className="newsimage" src={newss.image} alt={newss.name} />
              <div className="newsdetails">
                <p className="jobname newsname">{newss.name}</p>
                <span className="jobposted">
                  {moment(newss.date).format("lll")}
                </span>
                <div className="newsdetailsdiv">
                  <p className="posttype newsdetaillocation removemargin">
                    {newss.location}
                  </p>
                  <p className="posttype newsdetailtype">{newss.type}</p>
                </div>
                <p className="jobname newsmessage">{newss.topic}</p>
              </div>
              <div>
                {auth.user.isA === "Yes" ? (
                  <AiFillDelete
                    size={"20px"}
                    color="red"
                    onClick={(e) => {
                      deleteEvent(e, newss._id);
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

export default Events;
