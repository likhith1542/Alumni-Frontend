import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Assist.css";
import classnames from "classnames";
import axios from "axios";
import { GET_ERRORS } from "../../actions/types";
import VAssist from "./../Admin/VAssist";

function Assist() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [subject, setsubject] = useState("");
  const [id, setId] = useState("");
  const [errors, setErrors] = useState([]);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const auth = useSelector((state) => state.auth);
  const error = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    setName(auth.user.name);
    setId(auth.user.id);
    setEmail(auth.user.email);
  }, [auth]);

  useEffect(() => {
    setErrors(error);
  }, [error]);

  const submitForm = (e) => {
    e.preventDefault();
    const newForm = {
      name: name,
      id: id,
      email: email,
      phone: phoneNumber,
      category: category,
      subject: subject,
      message: message,
    };

    axios
      .post("https://backend-yws9.onrender.com/api/forms/addForm", newForm)
      .then((res) => {
        dispatch({
          type: GET_ERRORS,
          payload: "",
        });

        // setName('');
        // setId('')
        // setEmail('')
        setphoneNumber("");
        setsubject("");
        setCategory("");
        setMessage("");
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
      {auth.user.isA === "No" ? (
        <div className="row">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Assistance Form</b>
              </h4>
            </div>
            <form noValidate onSubmit={submitForm}>
              <div className="input-field col s6">
                <input
                  disabled
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name,
                  })}
                />
                <span className="red-text">{errors.name}</span>
              </div>

              <div className="input-field col s6">
                <input
                  disabled
                  onChange={(e) => setId(e.target.value)}
                  value={id}
                  error={errors.id}
                  id="id"
                  type="text"
                  className={classnames("", {
                    invalid: errors.id,
                  })}
                />
                <span className="red-text">{errors.id}</span>
              </div>

              <div className="input-field col s6">
                <input
                  disabled
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email,
                  })}
                />
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s6">
                <input
                  onChange={(e) => setphoneNumber(e.target.value)}
                  value={phoneNumber}
                  error={errors.phoneNumber}
                  id="phoneNumber"
                  type="tel"
                  className={classnames("", {
                    invalid: errors.phoneNumber,
                  })}
                />
                <label htmlFor="phoneNumber">Phone Number</label>
                <span className="red-text">{errors.phoneNumber}</span>
              </div>
              <div className="input-field col s6">
                <select
                  // className=""
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  error={errors.category}
                  id="category"
                  type="text"
                  className={classnames("browser-default", {
                    invalid: errors.category,
                  })}
                >
                  <option value="" disabled selected>
                    Category
                  </option>
                  <option value="contact">Contact</option>
                  <option value="Campus Visit">Campus Visit</option>
                  <option value="Alumni Achievements">
                    Alumni Achievements
                  </option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="Mentor">Mentor</option>
                  <option value="Other">Other</option>
                </select>
                {/* <label htmlFor="category">Category</label> */}
                <span className="red-text">{errors.category}</span>
              </div>
              <div className="input-field col s6">
                <input
                  onChange={(e) => setsubject(e.target.value)}
                  value={subject}
                  error={errors.subject}
                  id="subject"
                  type="text"
                  className={classnames("", {
                    invalid: errors.subject,
                  })}
                />
                <label htmlFor="subject">Subject</label>
                <span className="red-text">{errors.subject}</span>
              </div>
              <div className="input-field col s12">
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  error={errors.message}
                  id="message"
                  type="text"
                  className={classnames("materialize-textarea", {
                    invalid: errors.message,
                  })}
                />
                <label htmlFor="message">Message</label>
                <span className="red-text">{errors.message}</span>
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
      ) : (
        <VAssist />
      )}
    </div>
  );
}

export default Assist;
