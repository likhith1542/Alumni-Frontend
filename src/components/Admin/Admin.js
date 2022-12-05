import React from 'react'
import "./Admin.css"
import { useSelector } from "react-redux";
import ANews from './ANews';
import AEvents from './AEvents';
import ANotification from './ANotification';
import AGallery from './AGallery';

function Admin() {
    const auth = useSelector((state) => state.auth);
  return (
    
    <div className='admin' >
        {auth.user.isA==='No'?<p>Access Denied</p>:
        <div className='admingrid' >
            <div className="ANews" >
                <ANews/>
            </div>
            <div className="AEvents">
                <AEvents/>
            </div>
            <div className="ANotification">
                <ANotification/>
            </div>
            <div className="AGallery">
                <AGallery/>
            </div>
        </div>
        }
        <p></p>
    </div>
  )
}

export default Admin