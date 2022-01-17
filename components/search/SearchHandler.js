import React, {Component} from 'react';
import Interests from "./student/Interests";
import {userService} from "../../services";
import {InterestsContainer} from "../../helpers/interests-container";
import TeamContainer from "./student/teams/TeamContainer";
import {RolesContainer} from "../../helpers/roles-container";
import VacantRoles from "./student/teams/VacantRoles";
import TeacherContainer from "./student/teacher/TeacherContainer";
import EmployerContainer from "./student/employer/EmployerContainer";

class SearchHandler extends Component {
    teams = [];
    teachers = [];
    employers = [];
    recievedTeams = [];
    recievedTeachers = [];
    recievedEmployers = [];
    name = "";
    find = false;
    constructor(props) {
        super(props);
        this.state = {
            find : false,
            thisRole : 0
        }
        this.getTeams();

        this.handleTeamFilters = this.handleTeamFilters.bind(this);
        this.handleRole = this.handleRole.bind(this);
        this.changeName = this.changeName.bind(this);
        this.handleTeamName = this.handleTeamName.bind(this);
        this.handleTeacherFilter = this.handleTeacherFilter.bind(this);
        this.handleTeacherName = this.handleTeacherName.bind(this);
        this.handleEmployerFilter = this.handleEmployerFilter.bind(this);
        this.handleEmployerName = this.handleEmployerName.bind(this);
        this.getTeams = this.getTeams.bind(this);
        this.getTeachers = this.getTeachers.bind(this);
        this.getEmployers = this.getEmployers.bind(this);
    }

    async getTeams(){
        const user = userService.userValue
        this.requestOptions = {
            method : 'GET',
            headers : {Authorization: `Bearer ${user}`}
        }
        const req = await fetch('https://localhost:7040/GetAllTeams', this.requestOptions);
        const res = req.json().then(response => this.recievedTeams = response);
        this.teams = this.recievedTeams;
        this.setState(state => {
            return {find : false}
        });
    }

    async getTeachers(){
        const user = userService.userValue
        this.requestOptions = {
            method : 'GET',
            headers : {Authorization: `Bearer ${user}`}
        }
        const req = await fetch('https://localhost:7040/GetAllTeachers', this.requestOptions);
        const res = req.json().then(response => this.recievedTeachers = response);
        this.teachers = this.recievedTeachers;
        this.setState(state => {
            return {find : false}
        });
    }

    async getEmployers(){
        const user = userService.userValue
        this.requestOptions = {
            method : 'GET',
            headers : {Authorization: `Bearer ${user}`}
        }
        const req = await fetch('https://localhost:7040/GetAllEmployers', this.requestOptions);
        const res = req.json().then(response => this.recievedEmployers = response);
        this.employers = this.recievedEmployers;
        this.setState(state => {
            return {find : false}
        });
    }

    handleTeamFilters(event){
        event.preventDefault();
        const interests = InterestsContainer.choseInterests;
        const vacantRoles = RolesContainer.choseRoles;
        if(this.find === true){
            this.teams = this.recievedTeams;
            this.find = false;
        }

        if(interests !== []) {
            interests.forEach(interest => {
                this.teams = this.teams.filter(team => team.interests.includes(interest));
            });
            this.find = true;
        }
        if(vacantRoles !== []){
            vacantRoles.forEach(role => {
                this.teams = this.teams.filter(team => team.vacantRoles.includes(role));
            });
            this.find = true;
        }
        this.setState(state => {
            return {find : true}
        });
    }

    handleTeacherFilter(event){
        event.preventDefault();
        const interests = InterestsContainer.choseInterests;
        if(this.find === true){
            this.teachers= this.recievedTeachers;
            this.find = false;
        }

        if(interests !== []) {
            interests.forEach(interest => {
                this.teachers = this.teachers.filter(teacher => teacher.interests.includes(interest));
            });
            this.find = true;
        }
        this.setState(state => {
            return {find : true}
        });

    }

    handleTeamName(event){
        event.preventDefault();

        if(this.find === true) {
            this.teams = this.recievedTeams;
            this.find = false;
        }
        if(this.find === false){
            this.teams = this.teams.filter(team => team.name.toUpperCase() === this.name.toUpperCase());
            this.find = true;
            this.setState(state => {
                return {find : true};
            });
        }
    }

    handleTeacherName(event){
        event.preventDefault();

        if(this.find === true) {
            this.teachers = this.recievedTeachers;
            this.find = false;
        }
        if(this.find === false){
            this.teachers = this.teachers.filter(teacher => teacher.name.toUpperCase() === this.name.toUpperCase());
            this.find = true;
            this.setState(state => {
                return {find : true};
            })
        }

    }

    handleEmployerFilter(event){
        event.preventDefault();
        const interests = InterestsContainer.choseInterests;
        if(this.find === true){
            this.employers = this.recievedEmployers;
            this.find = false;
        }

        if(interests !== []) {
            interests.forEach(interest => {
                this.employers = this.employers.filter(employer => employer.interests.includes(interest));
            });
            this.find = true;
        }
        this.setState(state => {
            return {find : true}
        });
    }

    handleEmployerName(event){
        event.preventDefault();
        if(this.find === true) {
            this.employers = this.recievedEmployers;
            this.find = false;
        }
        if(this.find === false){
            this.employers = this.employers.filter(employer => employer.employer.company.toUpperCase() === this.name.toUpperCase());
            this.find = true;
            this.setState(state => {
                return {find : true};
            })
        }
    }

    changeName(event){
        this.name = event.target.value;
    }

    handleRole(event){
        event.preventDefault();
        if(event.target.id === "0"){
            this.name = "";
            this.getTeams();
            InterestsContainer.clear();
            RolesContainer.clear();
            this.setState(state => {
                return {
                    thisRole : 0,
                    find : false
                }
            });
        }
        else if(event.target.id === "1"){
            this.name = "";
            this.getTeachers();
            InterestsContainer.clear();
            console.log(this.teachers);
            this.setState(state => {
                return {
                    thisRole : 1,
                    find : false
                }
            });

        }
        else if(event.target.id === "2"){
            this.name = "";
            this.getEmployers()
            InterestsContainer.clear();
            this.setState(state => {
                return {
                    thisRole : 2,
                    find : false
                }
            })
        }
    }


    render() {
        if(localStorage.getItem('role') === localStorage.getItem('studentRole')) {
            if(this.state.thisRole === 0) {
                const role = "0";
                    return (
                        <div >
                            <h1>Кого ищем?</h1>
                            <button id="0" className="floating-button" onClick={this.handleRole}>Команду</button>
                            <button id="1" className="floating-button" onClick={this.handleRole}>Преподавателя</button>
                            <button id="2" className="floating-button" onClick={this.handleRole}>Работодателя</button>
                            <div className="contains" >
                                <h3>Название команды</h3>
                                <input onChange={this.changeName} name="login" type="text" className={`form-control forma`} />
                                <button onClick={this.handleTeamName} className="but button">Найти</button>
                            </div>
                            <TeamContainer teams={this.teams}/>
                            <Interests role={role}>Интересы команды</Interests>
                            <VacantRoles>Вакантые роли</VacantRoles>
                            <button className="but button find" onClick={this.handleTeamFilters}>Принять</button>
                            <style>{".contains{position:relative; margin-top: 3%} .but{display:inline-block;font-weight:400;color:#212529;text-align:center;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:transparent;border:1px solid transparent;padding:.375rem .75rem;font-size:1rem;line-height:1.5;border-radius:.25rem;transition:color .15s ease-in-out,background-color .15s ease-in-out, border-color .15s ease-in-out,box-shadow .15s ease-in-out} .button{position: relative; top:15px;  color:#fff;background-color:#007bff;border-color:#007bff}.button:hover{color:#fff;background-color:#0069d9;border-color:#0062cc}.forma{display: inline-block}.floating-button {text-decoration: none;display: inline-block; width: 150px;height: 45px;line-height: 45px;font-family: sans-serif;font-size: 12px;text-align: center;letter-spacing: 3px;font-weight: 600;color: #524f4e;background: white;box-shadow: 0 8px 15px rgba(0, 0, 0, .1);transition: .3s;}.floating-button:hover {background: #007bff;box-shadow: 0 15px 20px rgba(0,123,255, 0.4);color: white;transform: translateY(-7px);} .find{top: 55px}"}</style>
                        </div>
                    );
            }
            else if(this.state.thisRole === 1){
                const role = "1";
                    return (
                        <div >
                            <h1>Кого ищем?</h1>
                            <button id="0" className="floating-button" onClick={this.handleRole}>Команду</button>
                            <button id="1" className="floating-button" onClick={this.handleRole}>Преподавателя</button>
                            <button id="2" className="floating-button" onClick={this.handleRole}>Работодателя</button>
                            <div className="contains">
                                <h3>Фамилия и имя</h3>
                                <input onChange={this.changeName} name="login" type="text" className={`form-control forma`} />
                                <button onClick={this.handleTeacherName} className="but button">Найти</button>
                            </div>
                            <TeacherContainer teachers={this.teachers}/>
                            <Interests role={role}>Интересы куратора</Interests>
                            <button className="but button find" onClick={this.handleTeacherFilter}>Принять</button>
                            <style>{".contains{position:relative; margin-top: 3%} .but{display:inline-block;font-weight:400;color:#212529;text-align:center;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:transparent;border:1px solid transparent;padding:.375rem .75rem;font-size:1rem;line-height:1.5;border-radius:.25rem;transition:color .15s ease-in-out,background-color .15s ease-in-out, border-color .15s ease-in-out,box-shadow .15s ease-in-out} .button{position: relative; top:15px;  color:#fff;background-color:#007bff;border-color:#007bff}.button:hover{color:#fff;background-color:#0069d9;border-color:#0062cc}.forma{display: inline-block}.floating-button {text-decoration: none;display: inline-block; width: 150px;height: 45px;line-height: 45px;font-family: sans-serif;font-size: 12px;text-align: center;letter-spacing: 3px;font-weight: 600;color: #524f4e;background: white;box-shadow: 0 8px 15px rgba(0, 0, 0, .1);transition: .3s;}.floating-button:hover {background: #007bff;box-shadow: 0 15px 20px rgba(0,123,255, 0.4);color: white;transform: translateY(-7px);} .find{top: 55px}"}</style>
                        </div>
                    );
            }
            else if(this.state.thisRole === 2){
                const role = "2";
                    return (
                        <div>
                            <h1>Кого ищем?</h1>
                            <button id="0" className="floating-button" onClick={this.handleRole}>Команду</button>
                            <button id="1" className="floating-button" onClick={this.handleRole}>Преподавателя</button>
                            <button id="2" className="floating-button" onClick={this.handleRole}>Работодателя</button>
                            <div className="contains">
                                <h3 >Название компании</h3>
                                <input  onChange={this.changeName} name="login" type="text" className={`form-control forma`} />
                                <button  onClick={this.handleEmployerName} className="but button">Найти</button>
                            </div>
                            <EmployerContainer employers={this.employers} />
                            <Interests role={role}>Интересы работодателя</Interests>
                            <button className="but button find" onClick={this.handleEmployerFilter}>Принять</button>
                            <style>{".contains{position:relative; margin-top: 3%} .but{display:inline-block;font-weight:400;color:#212529;text-align:center;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:transparent;border:1px solid transparent;padding:.375rem .75rem;font-size:1rem;line-height:1.5;border-radius:.25rem;transition:color .15s ease-in-out,background-color .15s ease-in-out, border-color .15s ease-in-out,box-shadow .15s ease-in-out} .button{position: relative; top:15px;  color:#fff;background-color:#007bff;border-color:#007bff}.button:hover{color:#fff;background-color:#0069d9;border-color:#0062cc}.forma{display: inline-block}.floating-button {text-decoration: none;display: inline-block; width: 150px;height: 45px;line-height: 45px;font-family: sans-serif;font-size: 12px;text-align: center;letter-spacing: 3px;font-weight: 600;color: #524f4e;background: white;box-shadow: 0 8px 15px rgba(0, 0, 0, .1);transition: .3s;}.floating-button:hover {background: #007bff;box-shadow: 0 15px 20px rgba(0,123,255, 0.4);color: white;transform: translateY(-7px);} .find{top: 55px}"}</style>
                        </div>
                    );
            }
        }
    }
}


export default SearchHandler;
