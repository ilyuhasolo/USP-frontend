import {userService} from "../../../../services";
import {useEffect, useState} from "react";
import {RolesContainer} from "../../../../helpers/roles-container"


export default function Interests({children}){
    const [roles, setRoles] = useState([]);

    useEffect( () => {
        const user = userService.userValue;
        const requestOptions = {
            method: 'GET',
            headers: {Authorization: `Bearer ${user}`}
        };
        fetch('https://localhost:7040/GetAllRoles', requestOptions)
            .then(response => response.json())
            .then(response => setRoles(response));
    }, []);

    function handleClick(event){
        if(!RolesContainer.choseRoles.includes(event.target.id)){
            RolesContainer.appendChoseRoles(event.target.id);
            event.target.classList.add("activer");
        }
        else{
            RolesContainer.removeValue(event.target.id);
            event.target.classList.remove("activer");
        }
    }


    return <>
        <div className="roles-container">
            <h5>{children}</h5>
            <hr size="3px"/>
            {roles.map(
                interest => {
                    return <div id={interest.roleName} onClick={handleClick} key={interest.id} className="op"><center>{interest.roleName}</center></div>
                })}
            <style>{".roles-container{ position:relative;border: 1px solid; top:40px; height:300px; width: 150px; overflow-x: hidden; overflow-y: auto;} .op{position: relative; margin-top:20px; border-radius: 50%; background: lightgrey; height: 50px; width: 100px} .op:hover{background: grey} .activer{color: white;background: #007bff} .op center{position:relative; top:20%}"}</style>
        </div>
    </>
}