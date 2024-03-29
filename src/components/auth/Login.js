import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

function Login() {

  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const [loading, setLoading] = useState(true);


  const auth = useSelector(state => state.auth);
  const error = useSelector(state => state.errors);
  const dispatch = useDispatch();


  useEffect(() => {
    if(auth.isAuthenticated){
      
      history.push("/dashboard");
      setLoading(true);
    }else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [auth])

  useEffect(()=>{
    if(error){
      setErrors(error)
    }
  },[error])




  

  const submitLogin = (e) => {
    e.preventDefault();
    const userData = {
        email: email,
        password: password
      };
  dispatch(loginUser(userData));

    
  };


    return (
      loading?"":
        <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={submitLogin}>
              <div className="input-field col s12">
                <input
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}

                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>

              </div>
              <div className="input-field col s12">
                <input
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}

                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
}

export default Login
