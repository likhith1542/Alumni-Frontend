import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Spotlight.css";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";

function Spotlight() {
  const [notifications, setNotifications] = useState([]);
  const [deletedId, setDeletedId] = useState([]);
  const auth = useSelector((state) => state.auth);

  const deleteNotification = (e, nid) => {
    e.preventDefault();
    setDeletedId([...deletedId, nid]);
    axios
      .delete(
        `https://backend-yws9.onrender.com/api/notifications/deleteNotification/${nid}`
      )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(
        "https://backend-yws9.onrender.com/api/notifications/getNotifications"
      )
      .then((result) => {
        setNotifications(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="members">
      <p className="divheading membersheading">Spotlight</p>
      {notifications.map((notification) =>
        !deletedId.includes(notification._id) ? (
          <div key={notification._id} className="spotlightdata">
            <p>{notification.message}</p>
            <div>
              {auth.user.isA === "Yes" ? (
                <AiFillDelete
                  size={"20px"}
                  color="red"
                  onClick={(e) => {
                    deleteNotification(e, notification._id);
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
  );
}

export default Spotlight;
