import React, { useEffect, useState } from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import moment from "moment";
import { AiFillDelete, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { GrSend } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { GET_ERRORS } from "./../../actions/types";
import axios from "axios";
import "./GetPosts.css";

function Post({ postt, name, pic }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [message, setMessage] = useState("");
  const [post, setPost] = useState(postt);
  const [names, setNames] = useState([]);
  const [ppics, setPpics] = useState([]);
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);

  var colors = {
    General: "#383CC1",
    "Looking for a Job": "#5A20CB",
    "Seeking Help": "#FF4331",
    "In News": "#BF3325",
    "Question & Answers": "#E03B8B",
    "Knowledge Base": "#8D3DAF",
    "Buy / Sell / Rent": "#E8BD0D",
    "Spread the Word": "#FF6666",
    "Technical Help": "#E07C24",
    "Alumni Introductions": "#03C6C7",
  };

  const getNames = () => {
    const promises = [];
    post.comments.forEach((post) => {
      promises.push(
        axios.get(
          `https://backend-yws9.onrender.com/api/users/getUser/${post.id}`
        )
      );
    });

    Promise.all(promises).then((responses) => {
      const namesfromapi = responses.map((response) => response.data.name);
      const picsfromapi = responses.map((response) => response.data.avatar);
      setNames(namesfromapi);
      setPpics(picsfromapi);
    });
  };

  const deletePost = (e) => {
    e.preventDefault();
    axios
      .delete(
        `https://backend-yws9.onrender.com/api/posts/deletePost/${post._id}`
      )
      .then((res) => {
        dispatch({
          type: GET_ERRORS,
          payload: "",
        });
        setDeleted(true);
      })
      .catch((err) => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      });
  };

  const updatePosts = async (postid) => {
    await axios
      .get(`https://backend-yws9.onrender.com/api/posts/${postid}`)
      .then((result) => {
        result.data.comments.sort(GetSortOrder("commentDate"));
        setPost(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const likeFunction = (postid, e) => {
    e.preventDefault();
    const userData = {
      id: auth.user.id,
    };
    axios
      .put(
        `https://backend-yws9.onrender.com/api/posts/${postid}/like`,
        userData
      )
      .then((result) => {
        updatePosts(postid);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendComment = (postid, e) => {
    e.preventDefault();
    const userData = {
      id: auth.user.id,
      comment: message,
    };
    axios
      .put(
        `https://backend-yws9.onrender.com/api/posts/${postid}/comment`,
        userData
      )
      .then((result) => {
        setMessage("");
        setNames([]);
        updatePosts(postid);
      })
      .catch((err) => {
        console.log(err);
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
    post.comments.sort(GetSortOrder("commentDate"));
    getNames();
    // eslint-disable-next-line
  }, [post.comments]);

  const auth = useSelector((state) => state.auth);

  return (
    <div>
      {deleted ? (
        <></>
      ) : (
        <div key={post._id} className="posts">
          <div className="postdetailshead">
            <div className="postdetailsspan">
              <p
                className="postid"
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={pic}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                  alt="ppic"
                />
                {name + " - " + post.id}
              </p>
              <p style={{ marginLeft: "40px" }} className="postdate">
                {moment(post.postedOn).format("lll")}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p
                style={{
                  backgroundColor: `${colors[post.type]}`,
                }}
                className="posttype"
              >
                {post.type}
              </p>
              {post.id === auth.user.id || auth.user.isA === "Yes" ? (
                <AiFillDelete size={"20px"} color="red" onClick={deletePost} />
              ) : (
                <></>
              )}
            </div>
          </div>

          {post.message && <p className="postmessage">{post.message}</p>}

          {post.file ? (
            <a className="postfile" href={post.file}>
              <AiOutlineFilePdf />
              Download File
            </a>
          ) : (
            ""
          )}
          {post.photo ? (
            <img className="postphoto" src={post.photo} alt="ppic" />
          ) : (
            ""
          )}
          <div className="postreactions">
            {post.likes.includes(auth.user.id) ? (
              <AiFillHeart
                className="react"
                size={20}
                color={"red"}
                onClick={(e) => {
                  likeFunction(post._id, e);
                }}
              />
            ) : (
              <AiOutlineHeart
                className="react"
                size={20}
                onClick={(e) => {
                  likeFunction(post._id, e);
                }}
              />
            )}
            {
              <FaRegComment
                className="react"
                onClick={() => setIsCollapsed(!isCollapsed)}
                size={18}
              />
            }
          </div>
          <div
            className={`collapse-content ${
              isCollapsed ? "collapsed" : "expanded comments"
            }`}
            aria-expanded={isCollapsed}
          >
            <div className="input-field col s12 commentarea">
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                id="message"
                type="text"
                placeholder="write a comment"
                className="materialize-textarea messageinput"
              />
              <GrSend
                className="commentsend"
                size={20}
                onClick={(e) => {
                  sendComment(post._id, e);
                }}
              />
            </div>
            {post.comments.map((comment, i) =>
              names[i] !== undefined ? (
                <div key={comment._id} className="comment">
                  <div className="commentdetails">
                    <p
                      className="commentid"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img
                        src={ppics[i]}
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                        alt="cpic"
                      />
                      {names[i]}
                    </p>
                    <p className="postdate">
                      {moment(comment.commentDate).format("lll")}
                    </p>
                  </div>
                  <p style={{ marginLeft: "40px" }}>{comment.comment}</p>
                </div>
              ) : (
                ""
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
