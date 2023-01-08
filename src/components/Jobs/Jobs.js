import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Jobs.css";
import moment from "moment";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    axios
      .get("https://backend-yws9.onrender.com/api/jobs/getjobs")
      .then((result) => {
        result.data.sort(GetSortOrder("postedOn"));
        setJobs(result.data.slice(0, 5));
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
        {jobs.map((newss) => (
          <div className="jobdiv">
            <p className="jobname newsname">
              {newss.role} at {newss.company}
            </p>
            <span className="jobposted">
              {moment(newss.postedOn).format("lll")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;
