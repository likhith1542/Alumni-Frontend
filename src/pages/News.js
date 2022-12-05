import React from "react";
import "./News.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";

function News() {
  const [news, setNews] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [deletedId, setDeletedId] = useState([]);
  const auth = useSelector((state) => state.auth);

  const deleteNews = (e, cnews) => {
    e.preventDefault();
    setDeletedId([...deletedId, cnews]);
    axios
      .delete(`https://backend-yws9.onrender.com/api/news/deleteNews/${cnews}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    <div className="page_gallery">
      <p className="galleryheading">News</p>
      <div className="gallerybox newsbox">
        {news.map((newss) => (
          <div key={newss._id} className="jobdiv newsdiv">
            {deleted && deletedId.includes(newss._id) ? (
              <></>
            ) : (
              <>
                <img className="newsimage" src={newss.image} alt={newss.name} />
                <div className="newsdetails">
                  <p className="jobname newsname">{newss.name}</p>
                  <span className="jobposted">
                    {moment(newss.postedOn).format("lll")}
                  </span>
                  <p className="jobname newsmessage">{newss.message}</p>
                </div>
                {auth.user.isA === "Yes" ? (
                  <div>
                    <AiFillDelete
                      size={"20px"}
                      color="red"
                      onClick={(e) => {
                        deleteNews(e, newss._id);
                      }}
                    />
                    {/* <p
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={(e) => {
                    
                  }}
                >
                  Delete
                </p> */}
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
