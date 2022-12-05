import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import { useHistory } from "react-router-dom";
import "./Register.css"
function Register() {
  let history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [id, setId] = useState("");
  const [errors, setErrors] = useState([]);

  const [loading, setLoading] = useState(true);

  const auth = useSelector((state) => state.auth);
  const error = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated) {
      
      history.push("/dashboard");
      setLoading(true);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [auth]);

  useEffect(() => {
    setErrors(error);
  }, [error]);

  const submitRegister = (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      password: password,
      password2: password2,
      id: id,
    };
    dispatch(registerUser(newUser));
  };

  return (
    
      loading?"":
    
    <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Register</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
          <form noValidate onSubmit={submitRegister}>
            <div className="input-field col s12">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                error={errors.name}
                id="name"
                type="text"
                className={classnames("", {
                  invalid: errors.name,
                })}
              />
              <label htmlFor="name">Name</label>
              <span className="red-text">{errors.name}</span>
            </div>

            <div className="input-field col s12">
              <input
                onChange={(e) => setId(e.target.value)}
                value={id}
                error={errors.id}
                id="id"
                type="text"
                className={classnames("", {
                  invalid: errors.id,
                })}
              />
              <label htmlFor="id">ID</label>
              <span className="red-text">{errors.id}</span>
            </div>

            <div className="input-field col s12">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("", {
                  invalid: errors.email,
                })}
              />
              <label htmlFor="email">Email</label>
              <span className="red-text">{errors.email}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("", {
                  invalid: errors.password,
                })}
              />
              <label htmlFor="password">Password</label>
              <span className="red-text">{errors.password}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => setPassword2(e.target.value)}
                value={password2}
                error={errors.password2}
                id="password2"
                type="password"
                className={classnames("", {
                  invalid: errors.password2,
                })}
              />
              <label htmlFor="password2">Confirm Password</label>
              <span className="red-text">{errors.password2}</span>
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
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
