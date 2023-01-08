import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RiMessage3Line } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";

function VAssist() {
  const [assists, setAssists] = useState([]);
  const auth = useSelector((state) => state.auth);
  let history = useHistory();
  const [deleted, setDeleted] = useState(false);
  const [deletedId, setDeletedId] = useState([]);

  const deleteAssist = (e, cassist) => {
    e.preventDefault();
    setDeletedId([...deletedId, cassist]);
    axios
      .delete(
        `https://backend-yws9.onrender.com/api/forms/deleterequest/${cassist}`
      )
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("https://backend-yws9.onrender.com/api/forms/getForms")
      .then((result) => {
        result.data.sort(GetSortOrder("postedOn"));
        setAssists(result.data);
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
              history.push(`/chat/${result.data._id}`);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          history.push(`/chat/${result.data._id}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="page_gallery">
      <p className="galleryheading">View Assists</p>
      <div className="gallerybox newsbox">
        {assists.map((assist) => (
          <div key={assist._id} className="jobdiv newsdiv">
            {deleted && deletedId.includes(assist._id) ? (
              <></>
            ) : (
              <div className="newsdetails" style={{ width: "100%" }}>
                <p
                  className="jobname newsname "
                  style={{ margin: "10px 10px 10px 0", fontWeight: "bold" }}
                >
                  {assist.subject}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span className="jobposted">
                    requested by {assist.name + " " + assist.id.toUpperCase()}{" "}
                    on {moment(assist.postedOn).format("lll")}
                  </span>
                  {assist.id === auth.user.id || auth.user.isA === "Yes" ? (
                    <AiFillDelete
                      size={"20px"}
                      color="red"
                      onClick={(e) => {
                        deleteAssist(e, assist._id);
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </div>

                <div style={{ height: "10px" }} className="sizedBox"></div>
                <div className="newsdetailsdiv">
                  <p
                    className="posttype newsdetailtype"
                    style={{ fontWeight: "bold", margin: "10px 10px 10px 0" }}
                  >
                    {assist.type}
                  </p>
                </div>
                <div style={{ height: "20px" }} className="sizedBox"></div>
                <p className=" ">{assist.message}</p>
                <div style={{ height: "20px" }} className="sizedBox"></div>

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
                      createConversation(e, assist.id);
                    }}
                  >
                    Message {assist.name} <RiMessage3Line />
                  </p>
                  <p style={{ color: "gray" }}>{assist.email}</p>
                  <p style={{ color: "gray" }}>{assist.phone}</p>
                </div>

                <p className="jobname newsmessage">{assist.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VAssist;
