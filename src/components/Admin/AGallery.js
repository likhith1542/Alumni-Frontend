import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import axios from "axios";
import { GET_ERRORS } from "../../actions/types";
import "../Assist/Assist.css";
import { FiImage } from "react-icons/fi";
import { ImCross } from "react-icons/im";

function AGallery() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [errors, setErrors] = useState([]);

  const error = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState(null);

  const [Imagereader, setImageReader] = useState(null);

  const callphoto = () => {
    document.getElementById("getPhotoGallery").click();
  };

  useEffect(() => {
    setErrors(error);
  }, [error]);

  const submitForm = (e) => {
    e.preventDefault();
    var newPost = new FormData();
    newPost.append("name", name);
    newPost.append("type", type);
    newPost.append("file", photo);

    axios
      .post(
        "https://backend-yws9.onrender.com/api/galleries/addgallery",
        newPost
      )
      .then((res) => {
        dispatch({
          type: GET_ERRORS,
          payload: "",
        });

        setName("");
        setType("");
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
              <b>Add Gallery</b>
            </h4>
          </div>
          <form noValidate onSubmit={submitForm}>
            <div className="input-field col s6">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                error={errors.name}
                id="gname"
                type="text"
                className={classnames("", {
                  invalid: errors.name,
                })}
              />
              <label htmlFor="gname">Name</label>
              <span className="red-text">{errors.name}</span>
            </div>

            <div className="input-field col s12">
              <textarea
                onChange={(e) => setType(e.target.value)}
                value={type}
                error={errors.type}
                id="type"
                type="text"
                className={classnames("materialize-textarea", {
                  invalid: errors.topic,
                })}
              />
              <label htmlFor="type">Type</label>
              <span className="red-text">{errors.type}</span>
            </div>

            <div className="col s6">
              <div className="imgbtn" onClick={callphoto}>
                <FiImage />
                <p style={{ marginLeft: "10px" }}>
                  {!photo ? "Photo/Video" : photo.name}
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
                id="getPhotoGallery"
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
              {type === "video" ? (
                <video
                  style={{ maxWidth: "50%", maxHeight: "50%" }}
                  controls
                  className="imageReader"
                  src={Imagereader}
                  alt=""
                />
              ) : (
                <img
                  style={{ maxWidth: "50%", maxHeight: "50%" }}
                  className="imageReader"
                  src={Imagereader}
                  alt=""
                />
              )}
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

export default AGallery;
