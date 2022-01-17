import {useState, useEffect} from "react";
import {userService} from "../../services";
import {Component} from "react";
import {Link} from "../Link";
import {useRouter} from "next/router";
import TeamContainer from "./TeamContainer";
import getConfig from "next/config";

export default function Profile() {
    const router = useRouter();
    const [studentData, setStudentData] = useState([]);
    const [personData, setPersonData] = useState([]);
    const [teams, setTeams] = useState([]);
    const id = localStorage.getItem('id').replace(/"/g,"");
    function authHeader() {
        const user = userService.userValue;
        return {Authorization: `Bearer ${user}`};
    }

    function createTeam(event){
        router.push("/createteam");
    }

    function redir(){
        router.push('/account/edit');
    }

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    useEffect(() => {
        async function load(){
            const resP = await fetch(`https://localhost:7040/GetPersonInfo?Id=${id}`, requestOptions);
            const resSt = await fetch("https://localhost:7040/GetStudentInfo?PersonId="+id, requestOptions);
            const dataP = await resP.json();
            const resTeams = await fetch(`https://localhost:7040/GetTeamsByPersonId?Id=`+id, requestOptions);
            const dataTeams = await resTeams.json()
            const dataSt = await resSt.json();
            setTeams(dataTeams);
            setPersonData(dataP);
            setStudentData(dataSt);
        }

        load();
    }, [])

    if (true) {
        return (<div>
            <div className="header">
                <h1 style={{display: "inline-block"}}>Мой профиль</h1>
                <h1 style={{display: "inline-block", marginLeft: "30%"}}>Мои команды</h1>
                <button className={"but-st butt"} onClick={createTeam} style={{display: "inline-block"}}>Создать команду</button>
            </div>
            <div className="profile">
                <ul>
                    <li><p>Имя и фамилия: </p><h2>{personData.name}</h2></li>
                    <li><p>Номер телефона: </p><h2>{personData.phoneNumber}</h2></li>
                    <li><p>Группа: </p><h2>{studentData.group}</h2></li>
                    <li><p>Email: </p><h2>{personData.email}</h2></li>
                    <li><p>О себе: </p><h2>{studentData.about}</h2></li>
                </ul>
                <button onClick={redir} style={{display: "inline-block"}} className="but-st butt">Редактировать</button>
                <style>{'ul{position:relative} li{list-style-type: none; margin-top: 10px;} .profile{display: inline-block;width: 50%; height: 500px; position:relative; background:#ececec} .header{background: #F0F0F0; height: 80px;} .profile p{color: grey; font-size: 20px; font-weight: bold; font-style: italic} .header h1{position:relative; top:15%; left: 2%} .but-st{display:inline-block;font-weight:400;color:#212529;text-align:center;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:transparent;border:1px solid transparent;padding:.375rem .75rem;font-size:1rem;line-height:1.5;border-radius:.25rem;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out} .but-st:hover{color:#212529;text-decoration:none} .butt{margin-top:20px; position:relative; left:20%; color:#fff;background-color:#007bff;border-color:#007bff} .butt:hover{color:#fff;background-color:#0069d9;border-color:#0062cc} '}</style>
            </div>
            <TeamContainer teams={teams}/>
        </div>);
    }
}