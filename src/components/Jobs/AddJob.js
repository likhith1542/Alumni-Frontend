import React, { useState } from "react";
import "./AddJob.css";
import { GET_ERRORS } from "../../actions/types";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function AddJob({ setOpenModal }) {
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  function refreshPage() {
    window.location.reload(false);
  }

  const submitForm = (e) => {
    e.preventDefault();
    var newPost = {
      name: auth.user.name,
      experience: experience,
      location: location,
      postedBy: auth.user.id,
      type: type,
      description: description,
      company: company,
      role: role,
    };

    axios
      .post("http://localhost:5000/api/jobs/addjob", newPost)
      .then((res) => {
        dispatch({
          type: GET_ERRORS,
          payload: "",
        });
        setExperience("");
        setLocation("");
        setType("");
        setDescription("");
        setCompany("");
        setRole("");
        setOpenModal(false);
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
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>

        <div className="body">
          <div className="container" style={{ marginTop: "0" }}>
            <div className="row">
              <div className="col s8 offset-s2">
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <h4>
                    <b>Add Job</b>
                  </h4>
                </div>
                <form noValidate onSubmit={submitForm}>
                  <div className="input-field col s6">
                    <input
                      onChange={(e) => setRole(e.target.value)}
                      value={role}
                      id="role"
                      type="text"
                    />
                    <label htmlFor="role">Role</label>
                  </div>

                  <div className="input-field col s6">
                    <input
                      onChange={(e) => setExperience(e.target.value)}
                      value={experience}
                      id="experience"
                      type="text"
                    />
                    <label htmlFor="experience">Experience</label>
                  </div>

                  <div className="input-field col s6">
                    <input
                      onChange={(e) => setLocation(e.target.value)}
                      value={location}
                      id="location"
                      type="text"
                    />
                    <label htmlFor="location">Location</label>
                  </div>

                  <div className="input-field col s6">
                    <input
                      onChange={(e) => setType(e.target.value)}
                      value={type}
                      id="type"
                      type="text"
                    />
                    <label htmlFor="type">type</label>
                  </div>

                  <div className="input-field col s6">
                    <input
                      onChange={(e) => setCompany(e.target.value)}
                      value={company}
                      id="company"
                      type="text"
                    />
                    <label htmlFor="company">Company</label>
                  </div>

                  <div className="input-field col s12">
                    <textarea
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      id="description"
                      type="text"
                      className="materialize-textarea"
                    />
                    <label htmlFor="description">Description</label>
                  </div>

                  <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <button
                      style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                        backgroundColor: "cornflowerblue",
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
        </div>
      </div>
    </div>
  );
}

export default AddJob;
