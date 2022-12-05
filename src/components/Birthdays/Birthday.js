import axios from "axios";
import React, { useEffect, useState } from "react";
import "../SpotLight/Spotlight.css";
import { RiMessage3Line } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function Birthday() {
  const [bdays, setBdays] = useState([]);

  let history = useHistory();

  const auth = useSelector((state) => state.auth);

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
            .then((res) => {
              history.push(`/chat/${res.data._id}`);
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

  useEffect(() => {
    const today = new Date();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    const formattedToday = dd + "-" + mm + "-";

    var newPost = {
      DOB: formattedToday,
    };

    axios
      .post("https://backend-yws9.onrender.com/api/users/getBdays", newPost)
      .then((result) => {
        setBdays(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="members" style={{ marginTop: "25px" }}>
      <p className="divheading membersheading">Birthdays</p>
      {bdays.length > 0 ? (
        bdays.map((bday) => (
          <div key={bday._id} className="spotlightdata">
            <p
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
              onClick={(e) => {
                createConversation(e, bday.id);
              }}
            >
              {bday.name} <RiMessage3Line />
            </p>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", color: "gray", opacity: 0.5 }}>
          No Birthdays
        </p>
      )}
    </div>
  );
}

export default Birthday;
