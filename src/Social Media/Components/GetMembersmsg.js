import React from "react";
import "./GetMembers.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function GetMembersmsg({ newConv, setNewConv, setConvId, convId }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const auth = useSelector((state) => state.auth);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
              setNewConv(result.data);
              setConvId(result.data._id);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert("Chat Already Exists");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("https://backend-yws9.onrender.com/api/users/getUsers")
      .then((result) => {
        setUsers(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const results = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.id.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
    // eslint-disable-next-line
  }, [searchTerm]);

  return (
    <div className="members">
      <p className="divheading membersheading">Alumni Members</p>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      {searchTerm === ""
        ? users.map((user) =>
            user.id !== auth.user.id ? (
              <div
                className="memberdata"
                onClick={(e) => {
                  createConversation(e, user.id);
                }}
              >
                <p className="postid">{user.name}</p>
                <p className="postdate">{user.id}</p>
              </div>
            ) : null
          )
        : searchResults.map((item) =>
            item.id !== auth.user.id ? (
              <div
                className="memberdata"
                onClick={(e) => {
                  createConversation(e, item.id);
                }}
              >
                <p className="postid">{item.name}</p>
                <p className="postdate">{item.id}</p>
              </div>
            ) : null
          )}
    </div>
  );
}

export default GetMembersmsg;
