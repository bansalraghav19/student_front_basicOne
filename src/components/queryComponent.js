import React , { useState, useEffect } from 'react';
import { Switch, Route, Redirect, NavLink, Link, useHistory} from 'react-router-dom';

import axios from "axios";
import Client from "./client/client"


export default function Query(props){

    const history=useHistory();

    const handlesubmit=async(e)=>{
        const subject=e.target.name;
        console.log(subject)
        // var number= await fetch("https://education4all.herokuapp.com/sendTeacher")
        // number=await number.json()
        var number={ "physics": "+919644012345",
        "maths": "+917994012369",
        "chemistry": "+918344012152" }
        console.log(number[subject],number)
        var tNumber=number[subject]
        var userPhone="+917983134335"

        var res=await axios.post("https://sgbtech96-chat-server.herokuapp.com/room",
        {
                "ph1": tNumber,
                "ph2":"+917983134335"
        }
        )
        console.log(res);
        var roomID= res.data;
        props.changeRoomID(roomID)
        console.log(roomID)
        history.push("/chat");
    };

    return (
        <div>
            <button onClick={handlesubmit} name="physics">Physics</button>
            <button onClick={handlesubmit} name="chemistry">Chemistry</button>
            <button onClick={handlesubmit} name="maths">Maths</button>
        </div>
    
    );
}

