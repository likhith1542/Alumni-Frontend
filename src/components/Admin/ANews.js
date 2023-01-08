import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import axios from "axios";
import { GET_ERRORS } from "../../actions/types";
import "../Assist/Assist.css";
import { FiImage } from "react-icons/fi";
import { ImCross } from "react-icons/im";

function ANews() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);

  const error = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState(null);

  const [Imagereader, setImageReader] = useState(null);

  const callphoto = () => {
    document.getElementById("getPhotoNews").click();
  };

  useEffect(() => {
    setErrors(error);
  }, [error]);

  const submitForm = (e) => {
    e.preventDefault();
    var newPost = new FormData();
    newPost.append("name", name);
    newPost.append("message", message);
    newPost.append("file", photo);

    axios
      .post("https://backend-yws9.onrender.com/api/news/addnews", newPost)
      .then((res) => {
        dispatch({
          type: GET_ERRORS,
          payload: "",
        });

        setName("");
        setMessage("");
        setImageReader(null);
        setPhoto(null);
      })
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Add News</b>
            </h4>
          </div>
          <form noValidate onSubmit={submitForm}>
            <div className="input-field col s6">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                error={errors.name}
                id="nname"
                type="text"
                className={classnames("", {
                  invalid: errors.name,
                })}
              />
              <label htmlFor="nname">Name</label>
              <span className="red-text">{errors.name}</span>
            </div>

            <div className="input-field col s12">
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                error={errors.message}
                id="nmessage"
                type="text"
                className={classnames("materialize-textarea", {
                  invalid: errors.topic,
                })}
              />
              <label htmlFor="nmessage">Message</label>
              <span className="red-text">{errors.message}</span>
            </div>

            <div className="col s6">
              <div className="imgbtn" onClick={callphoto}>
                <FiImage />
                <p style={{ marginLeft: "10px" }}>
                  {!photo ? "Photo" : photo.name}
                </p>
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
              <input
                type="file"
                id="getPhotoNews"
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
            </div>

            <div className="col s6">
              <img
                style={{ maxWidth: "50%", maxHeight: "50%" }}
                className="imageReader"
                src={Imagereader}
                alt=""
              />
            </div>

            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ANews;
