import React from 'react';
import {userService} from "../../../../services";

function TeamContainer(props) {
    function commit(event){
        event.target.setAttribute('disabled', true);
        event.target.classList.add('innactive');
        const user = userService.userValue;
        const id = localStorage.getItem('id').replace(/"/g,"");
        const requestOptions = {
            method : 'PUT',
            headers : {Authorization: `Bearer ${user}`}
        }
        fetch('https://localhost:7040/AddPersonToTeam?PersonId='+id+'&TeamId='+event.target.id, requestOptions);
    }

    if(props.teams !== []) {
        return <div className="container">
            {
                props.teams.map(team => {
                    return <div key={team.id} className="result-card">
                        <div className="team-name"><a className="contact-text">{team.name}</a></div>
                        <button id={team.id} onClick={commit} className={"butt but-st"}>Присоединиться</button>
                        <ul className="interests"><a>Интересы:</a>
                            {team.interests.map(interest => {
                                return <li key={interest.id}>{interest.interestName}</li>
                            })}
                        </ul>
                        <ul className="vacant-roles"><a>Вакантные роли:</a>
                            {team.roles.map(role => {
                                return <li key={role.id}>{role.roleName}</li>
                            })}
                        </ul>
                        <p className={"about-title"}>О команде:</p>
                        <p className={"about"}>
                            {team.description}
                        </p>
                        <div className="card-phone">
                            <a>Контактный номер тимлида: </a>
                            <p>{team.teamLeadPhoneNumber}</p>
                        </div>
                        <style>{".about-title{display:none; position: relative; font-weight: bold} .about{display:none;position: relative}.card-phone a{position: relative; font-weight: bold; left: 10px} .card-phone p{position:relative; left: 20px} .result-card{display:inline-block;margin-top: 20px; margin-left: 20px; border:1px solid; position:relative; width:150px; background-color: white; border-color: lightgrey; border-radius:.75rem; transition:color .20s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out} li{list-style-type: none; left: 20px; position: relative} .result-card:hover{width: 350px; border: 3px solid; border-color: #007bff} .result-card:hover>.about{display: block} .result-card:hover>.about-title{display: block; left: 20px} .result-card:hover p{left: 20px}   .result-card:hover ul {display:block} .team-name{position:relative; background-color: #007bff; width:100%; height: 40px; border-bottom-radius: .75rem;} .contact-text{position:relative; color: white; top: 5px; left: 10px; font-size: 18px; font-weight: bold} .interests{position: relative; left: -20px; display: none} .vacant-roles{display: none; position: relative; left: -20px; top: -10px;} .interests a{font-weight: bold } .vacant-roles a{font-weight: bold}"}</style>
                    </div>
                })
            }
            <style>{".container{display: inline-block; position: absolute; left: 15%; top:35%} .result-card:hover>.but-st{display:inline-block} .but-st{display:none;font-weight:400;color:#212529;text-align:center;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:transparent;border:1px solid transparent;padding:.375rem .75rem;font-size:1rem;line-height:1.5;border-radius:.25rem;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out} .but-st:hover{color:#212529;text-decoration:none} .butt{position:relative; color:#fff;background-color:#007bff;border-color:#007bff} .butt:hover{color:#fff;background-color:#0069d9;border-color:#0062cc} .innactive{background: grey} .innactive:hover{background:grey}"}</style>
        </div>
    }
    else {
        return <></>
    }
}

export default TeamContainer;