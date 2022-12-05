import React, { useEffect, useState } from "react";
import "./WritePost.css";
import { FiImage } from "react-icons/fi";
import { AiOutlineFilePdf } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { ImCross } from "react-icons/im";
import { GET_ERRORS } from "./../../actions/types";
import axios from "axios";

function WritePost({ postChanged, setPostChanged }) {
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [photo, setPhoto] = useState(null);
  const [file, setFile] = useState(null);

  const [Imagereader, setImageReader] = useState(null);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    setId(auth.user.id);
  }, [auth]);

  const callphoto = () => {
    document.getElementById("getPhoto").click();
  };
  const callFile = () => {
    document.getElementById("getFile").click();
  };

  const submitPost = (e) => {
    e.preventDefault();
    var newPost = new FormData();
    newPost.append("id", id);
    newPost.append("message", message);
    newPost.append("category", category);
    newPost.append("file", file);
    newPost.append("photo", photo);

    axios
      .post("https://backend-yws9.onrender.com/api/posts/addPost", newPost)
      .then((res) => {
        dispatch({
          type: GET_ERRORS,
          payload: "",
        });

        setId("");
        setCategory("");
        setMessage("");
        setPhoto(null);
        setFile(null);
        setImageReader(null);
        setPostChanged(!postChanged);
        refreshPage();
      })
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  };

  return (
    <div className="wpost">
      <textarea
        value={message}
        className="materialize-textarea postarea"
        placeholder="write a post"
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="fileuploaddiv">
        <div className="imgbtn" onClick={callphoto}>
          <FiImage />
          <p style={{ marginLeft: "10px" }}>{!photo ? "Photo" : photo.name}</p>
        </div>
        <span
          onClick={(e) => {
            e.preventDefault();
            setPhoto(null);
            setImageReader(null);
          }}
        >
          {!photo ? "" : <ImCross size={10} />}
        </span>
        <div className="imgbtn" onClick={callFile}>
          <AiOutlineFilePdf />
          <p style={{ marginLeft: "10px" }}>{!file ? "File" : file.name}</p>
        </div>
        <span
          onClick={(e) => {
            e.preventDefault();
            setFile(null);
          }}
        >
          {!file ? "" : <ImCross size={10} />}
        </span>
        <input
          type="file"
          id="getPhoto"
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files[0]) {
              setPhoto(e.target.files[0]);
              const reader = new FileReader();
              reader.addEventListener("load", () => {
                setImageReader(reader.result);
              });
              reader.readAsDataURL(e.target.files[0]);
            }
          }}
        />
        <input
          type="file"
          id="getFile"
          style={{ display: "none" }}
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <div className="input-field col S6">
          <select
            // className=""
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            id="category"
            type="text"
            className="browser-default wpostdrop"
          >
            <option value="" disabled selected>
              Choose Category
            </option>
            <option value="General">General</option>
            <option value="Looking for a Job">Looking for a Job</option>
            <option value="Seeking Help">Seeking Help</option>
            <option value="In News">In News</option>
            <option value="Question &amp; Answers">
              Question &amp; Answers
            </option>
            <option value="Knowledge Base">Knowledge Base</option>
            <option value="Buy / Sell / Rent">Buy / Sell / Rent</option>
            <option value="Spread the Word">Spread the Word</option>
            <option value="Technical Help">Technical Help</option>
            <option value="Alumni Introductions">Alumni Introductions</option>
          </select>
        </div>
      </div>
      <img className="imageReader" src={Imagereader} alt="" />
      <button className="postbutton" onClick={submitPost}>
        Post
      </button>
    </div>
  );
}

export default WritePost;
