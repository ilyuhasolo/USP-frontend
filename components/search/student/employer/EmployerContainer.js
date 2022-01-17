import React from "react";
import {Layout} from "../../../users";

function TeacherContainer(props) {


    if(props.employers !== []) {
        return <Layout>
            <div className="container">
                <ul>
                    {props.employers.map(employer => {
                        return <div className={"content"} key={employer.id}>
                            <li id={employer.id}>
                                <table width="1000px">
                                    <tr className={"emp-row"}>
                                        <td width="150px">
                                            <center><h3>{employer.employer.company}</h3></center>
                                        </td>
                                        <td width="300px"><p
                                            className={"interests"}>Интересы: {employer.interests.map(interest => {
                                            return <div key={interest.id} style={{
                                                background: "#007bff",
                                                borderRadius: "40%",
                                                color: "white"
                                            }} className={"interests"}>{interest.interestName} </div>
                                        })}</p></td>
                                        <td>Контактный номер: <p className={"phone-n"}>{employer.phoneNumber}</p></td>
                                    </tr>
                                </table>
                            </li>
                            <p className={"about"}>Презентация: {employer.employer.presentation}</p>
                        </div>
                    })}
                </ul>
                <style>{".emp-row td:nth-child(1){background: #007bff; margin-top: -1px; margin-left: 10px; border-radius: .75em; color: white}.content{border: .1em solid lightgrey; border-radius: .75em; margin-bottom:10px} .about{display: none; margin-top: 10px} .content:hover{border: .3em solid #007bff;} .phone{display:none} .content:hover>.phone{display:block} .content:hover>.about{display:block} li{list-style-type : none;  } td h3 {position: relative; display: inline-block; text-align: center;} .institute{position: relative;display: inline-block; margin-left: 20%} .interests{position:  relative; margin-left: 30px; display: inline-block} .phone-n{-webkit-user-select: none; -moz-user-select: none; -khtml-user-select: none; user-select: none; position:  relative; margin-left: 30px; display: inline-block} .container{display: block; width: 1000px; position: absolute; left: 10%; top:55%}"}</style>
            </div>
        </Layout>
    }
    else{
        return <></>
    }
}

export default TeacherContainer;