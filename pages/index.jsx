import {useForm} from "react-hook-form";
import {useState, useEffect} from "react";
import 'styles/main.module.css';
import {userService} from "../services";
import {Component} from "react";
import {Layout} from "../components/users";

export default function Home() {
    const isStudent = localStorage.getItem("role") === localStorage.getItem("studentRole");
    console.log(isStudent);
    const [studentData, setStudentData] = useState([]);
    const [personData, setPersonData] = useState([]);
    function authHeader() {
        const user = userService.userValue;
        return {Authorization: `Bearer ${user}`};
    }

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    useEffect(() => {
        async function load(){
            const resP = await fetch("http://localhost:7040/GetPersonInfo?Id="+localStorage.getItem("id"), requestOptions);
            const resSt = await fetch("http://localhost:7040/GetStudentInfo?PersonId="+localStorage.getItem("id"), requestOptions);
            const dataP = await resP.json();
            const dataSt = await resSt.json();
            setPersonData(dataP);
            setStudentData(dataSt);
        }

        load();
    }, [])

    console.log(data);

    if (true) {
        return (<div>
            <div className="header">
                <h1>Мой профиль</h1>
            </div>
            <div className="profile">
                <ul>
                    <li><h3>Имя и фамилия: </h3><h2>{personData.Login}</h2></li>
                    <li><h3>Номер телефона: </h3><h2>{personData.PhoneNumber}</h2></li>
                    <li><h3>Группа: </h3><h2>{studentData.Group}</h2></li>
                    <li><h3>Email: </h3><h2>{personData.Email}</h2></li>
                    <li><h3>О себе: </h3><h2>{studentData.About}</h2></li>
                </ul>
                <style>{'ul{position:relative} li{list-style-type: none; margin-top: 10px;} .profile{width: 300px; height: 500px; left: 40%; position:relative} .header{background: #F0F0F0; height: 80px;} .profile h3{background: grey} .header h1{position:relative; top:15%; left: 2%}'}</style>
            </div>
        </div>);
    }
}