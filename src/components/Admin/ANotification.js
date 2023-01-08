import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import axios from "axios";
import { GET_ERRORS } from "../../actions/types";

function ANotification() {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const [id, setId] = useState("");

  const auth = useSelector((state) => state.auth);
  const error = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    setErrors(error);
  }, [error]);

  useEffect(() => {
    setId(auth.user.id);
  }, [auth]);

  const submitForm = (e) => {
    e.preventDefault();
    var formData = { id: id, message: message };

    axios
      .post("http://localhost:5000/api/notifications/addNotification", formData)
      .then((res) => {
        dispatch({
          type: GET_ERRORS,
          payload: "",
        });

        setMessage("");
      })
      .catch((err) => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Add Notification</b>
            </h4>
          </div>
          <form noValidate onSubmit={submitForm}>
            <div className="input-field col s6">
              <input
                disabled
                value={auth.user.name}
                error={errors.name}
                id="noname"
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

            <div className="input-field col s12">
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                error={errors.message}
                id="nomessage"
                type="text"
                className={classnames("materialize-textarea", {
                  invalid: errors.message,
                })}
              />
              <label htmlFor="nomessage">Message</label>
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
    </div>
  );
}

export default ANotification;
