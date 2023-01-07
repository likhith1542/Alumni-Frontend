import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Events.css";
import moment from "moment";

function Events() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios
      .get("https://backend-yws9.onrender.com/api/events/getevents")
      .then((result) => {
        result.data.sort(GetSortOrder("postedOn"));
        setEvents(result.data);
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
        {events.map((event) => (
          <div className="eventdiv">
            <div className="eventdetails">
              <p className="eventdate">{moment(event.date).format("ll")}</p>
              <p className="eventmonth">{moment(event.date).format("LT")}</p>
            </div>
            <p className="eventname">{event.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
