import React, { useEffect } from "react";
import { /*BrowserRouter as */Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import { history } from "./history";
import { useDispatch } from 'react-redux';
import "./App.css";
import { GET_ERRORS } from './actions/types';
import Assist from './components/Assist/Assist';
import Chat from './Social Media/Chat/Chat';
import Gallery from "./pages/Gallery";
import News from './pages/News';
import Jobs from "./pages/Jobs"
import Events from './pages/Events';
import Profile from './components/Profile/Profile';
import Admin from './components/Admin/Admin';
import VProfile from './components/Profile/VProfile';
import Search from './pages/Search';


function App() {

  const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            dispatch({
              type: GET_ERRORS,
              payload: '',
            })
        });
        // eslint-disable-next-line
    }, []);


  
  return (
    <div className="App">
      <Router history={history}>
      <Navbar />

        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/gallery" component={Gallery} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/profile/:userid" component={VProfile} />
          <PrivateRoute exact path="/alumniassociation" component={Register} />
          
          <PrivateRoute exact path="/chat/:cid" component={Chat} />
          <PrivateRoute exact path="/chat" component={Chat} />
          
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/assist" component={Assist} />
          {/* <PrivateRoute exact path="/alumniassociation" component={Register} /> */}
          <PrivateRoute exact path="/news" component={News} />
          <PrivateRoute exact path="/jobs" component={Jobs} />
          <PrivateRoute exact path="/events" component={Events} />
          <PrivateRoute exact path="/admin" component={Admin}/>
          <PrivateRoute exact path="/search" component={Search}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
