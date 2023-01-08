import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import axios from "axios";
import { GET_ERRORS } from "../../actions/types";
import "../Assist/Assist.css";
import { FiImage } from "react-icons/fi";
import { ImCross } from "react-icons/im";

function AEvents() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("");
  const [errors, setErrors] = useState([]);

  const error = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState(null);

  const [Imagereader, setImageReader] = useState(null);

  const callphoto = () => {
    document.getElementById("getPhotoEvent").click();
  };

  useEffect(() => {
    setErrors(error);
  }, [error]);

  const submitForm = (e) => {
    e.preventDefault();
    var newPost = new FormData();
    newPost.append("name", name);
    newPost.append("date", date);
    newPost.append("location", location);
    newPost.append("type", type);
    newPost.append("topic", topic);
    newPost.append("file", photo);

    axios
      .post("http://localhost:5000/api/events/addEvent", newPost)
      .then((res) => {
        dispatch({
          type: GET_ERRORS,
          payload: "",
        });

        setName("");
        setDate("");
        setLocation("");
        setType("");
        setTopic("");
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
              <b>Add Events</b>
            </h4>
          </div>
          <form noValidate onSubmit={submitForm}>
            <div className="input-field col s6">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                error={errors.name}
                id="ename"
                type="text"
                className={classnames("", {
                  invalid: errors.name,
                })}
              />
              <label htmlFor="ename">Name</label>
              <span className="red-text">{errors.name}</span>
            </div>

            <div className="input-field col s6">
              <input
                onChange={(e) => setDate(e.target.value)}
                value={date}
                error={errors.date}
                id="date"
                type="text"
                className={classnames("", {
                  invalid: errors.date,
                })}
              />
              <label htmlFor="date">Date</label>
              <span className="red-text">{errors.date}</span>
            </div>

            <div className="input-field col s6">
              <input
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                error={errors.location}
                id="location"
                type="text"
                className={classnames("", {
                  invalid: errors.location,
                })}
              />
              <label htmlFor="location">Location</label>
              <span className="red-text">{errors.location}</span>
            </div>

            <div className="input-field col s6">
              <input
                onChange={(e) => setType(e.target.value)}
                value={type}
                error={errors.type}
                id="type"
                type="text"
                className={classnames("", {
                  invalid: errors.type,
                })}
              />
              <label htmlFor="type">type</label>
              <span className="red-text">{errors.type}</span>
            </div>

            <div className="input-field col s12">
              <textarea
                onChange={(e) => setTopic(e.target.value)}
                value={topic}
                error={errors.topic}
                id="topic"
                type="text"
                className={classnames("materialize-textarea", {
                  invalid: errors.topic,
                })}
              />
              <label htmlFor="topic">Topic</label>
              <span className="red-text">{errors.topic}</span>
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
                id="getPhotoEvent"
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

export default AEvents;
