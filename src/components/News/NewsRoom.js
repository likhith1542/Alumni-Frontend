import React from "react";
import "./NewsRoom.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";

function NewsRoom() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    axios
      .get("https://backend-yws9.onrender.com/api/news/getnews")
      .then((result) => {
        result.data.sort(GetSortOrder("postedOn"));
        setNews(result.data.slice(0, 5));
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
    <div className="events">
      <div className="eventsdiv">
        {news.map((newss) => (
          <div className="jobdiv">
            <p className="jobname newsname">{newss.name}</p>
            <span className="jobposted">
              {moment(newss.postedOn).format("lll")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsRoom;
