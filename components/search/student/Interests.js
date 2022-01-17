import {userService} from "../../../services";
import {useEffect, useState} from "react";
import {InterestsContainer} from "../../../helpers/interests-container";
import React from "react";
import PropTypes from "prop-types";


export default function Interests(props){
    const [interests, setInterests] = useState([]);
    useEffect( () => {
            const user = userService.userValue;
            const requestOptions = {
                method: 'GET',
                headers: {Authorization: `Bearer ${user}`}
            };
            if(localStorage.getItem('role') === localStorage.getItem('studentRole')) {
                if(JSON.stringify(props.role) === JSON.stringify('0')) {
                    fetch('https://localhost:7040/GetAllTeamsInterests', requestOptions)
                        .then(response => response.json())
                        .then(response => setInterests(response));
                }
                else if(JSON.stringify(props.role) === JSON.stringify('1')){
                    fetch('https://localhost:7040/GetAllTeachersInterests', requestOptions)
                        .then(response => response.json())
                        .then(response => setInterests(response));
                }
                else if(JSON.stringify(props.role) === JSON.stringify('2')){
                    fetch('https://localhost:7040/GetAllEmployersInterests', requestOptions)
                        .then(response => response.json())
                        .then(response => setInterests(response));
                }
                else if(JSON.stringify(props.role) === JSON.stringify('3')){
                    fetch('https://localhost:7040/GetAllInterests', requestOptions)
                        .then(response => response.json())
                        .then(response => setInterests(response));
                }
            }
            else if(localStorage.getItem('role') === localStorage.getItem('roleTeacher')){

            }
            else if(localStorage.getItem('role') === localStorage.getItem('roleStudent')){

            }
    },[])

    function handleClick(event){
        if(!InterestsContainer.choseInterests.includes(event.target.id)){
            console.log(event.target.id);
            InterestsContainer.appendChoseInterests(event.target.id);
            event.target.classList.add("activer");
        }
        else{
            InterestsContainer.removeValue(event.target.id);
            event.target.classList.remove("activer");
        }
    }


    return <>
        <div className="interests-container">
            <h5>{props.children}</h5>
            <hr size="3px"/>
                {interests.map(
                    interest => {
                        return <div id={interest.interestName} onClick={handleClick} key={interest.id} className="op"><p>{interest.interestName}</p></div>
                    })}
            <style>{".interests-container{ position:relative;border: 1px solid; top:40px; height:300px; width: 150px; overflow-x: hidden; overflow-y: auto;} .op{position: relative; margin-top:20px; border-radius: 50%; background: lightgrey; height: 50px; width: 100px} .op:hover{background: grey} .activer{color: white;background: #007bff} .op p{text-align: center; position:relative; top:20%}"}</style>
        </div>
    </>
}
