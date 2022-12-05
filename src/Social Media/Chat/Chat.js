import React, { useState } from 'react'
import "./Chat.css"
import RecentChat from './RecentChat'
import GetMembersmsg from './../Components/GetMembersmsg';
import Messages from './Messages';
import { useParams } from 'react-router-dom';

function Chat() {

    let { cid } = useParams();


    const [convId, setConvId] = useState(cid?cid:null)
    const [newConv, setNewConv] = useState(null)
    const [name, setName] = useState(null)
    const [pic, setPic] = useState(null)





    return (
        <div className="chat" >
            <div className="recentchats" >
            <RecentChat names={name} setPic={setPic} setName={setName} convId={convId} setConvId={setConvId} newConv={newConv} />
            </div>
            <div className="currentchat" >
                <Messages pic={pic} name={name} convId={convId} />
            </div>
            <div className="onlineusers" >
            <GetMembersmsg  convId={convId} setConvId={setConvId} newConv={newConv} setNewConv={setNewConv} />
            </div>
            
        </div>
    )
}

export default Chat
