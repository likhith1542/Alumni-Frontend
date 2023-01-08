import axios from "axios";
import React, { useEffect, useState } from "react";
import "./RecentChat.css";
import { useSelector } from "react-redux";
function RecentChat({ name, setPic, setName, convId, setConvId, newConv }) {
  const [recentConversations, setRecentConversations] = useState([]);
  const [names, setNames] = useState([]);
  const [ppics, setPpics] = useState([]);

  const { user } = useSelector((state) => state.auth);

  const getNames = () => {
    const promises = [];
    recentConversations.forEach((post) => {
      let cfid =
        post.members[0] === user.id ? post.members[1] : post.members[0];
      promises.push(
        axios.get(`http://localhost:5000/api/users/getUser/${cfid}`)
      );
    });

    Promise.all(promises).then((responses) => {
      const namesfromapi = responses.map((response) => response.data.name);
      const picfromapi = responses.map((response) => response.data.avatar);
      setNames(namesfromapi);
      setPpics(picfromapi);
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
    axios
      .get(`http://localhost:5000/api/conversations/${user.id}`)
      .then((result) => {
        result.data.sort(GetSortOrder("postedOn"));

        setRecentConversations(result.data);
        getNames();
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, [newConv]);

  useEffect(() => {
    getNames();
    // eslint-disable-next-line
  }, [recentConversations]);

  useEffect(() => {
    setName(names[0]);
    // eslint-disable-next-line
  }, [names]);

  return (
    <div className="rchat">
      <p className="divheading membersheading">Recent Chats</p>
      {recentConversations.length === 0 ? (
        <p>No Conversations Found</p>
      ) : (
        recentConversations.map((conv, i) => {
          return (
            <div
              id={conv._id}
              className="messagerecent"
              onClick={(e) => {
                e.preventDefault();
                setConvId(conv._id);
                setName(names[i]);
                setPic(ppics[i]);
              }}
            >
              <img
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
                src={ppics[i]}
                alt={names[i] + "pic"}
              />
              {names[i]}
            </div>
          );
        })
      )}
    </div>
  );
}

export default RecentChat;
