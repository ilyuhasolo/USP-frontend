import React from "react";
import {Layout} from "../../../users";

function TeacherContainer(props) {

    if(props.teachers !== []) {
        return <Layout>
            <div className="container">
                <ul>
                    {props.teachers.map(teacher => {
                        return <div className={"content"} key={teacher.id}>
                            <li id={teacher.id}>
                                <table width="1000px">
                                    <tr className={"row"}>
                                        <td width="150px">
                                            <center><h3>{teacher.name}</h3></center>
                                        </td>
                                        <td width={"150px"}>
                                            <p className={"institute"}><h5>Институт: </h5>{teacher.teacher.institute}
                                            </p>
                                        </td>
                                        <td><p className={"interests"}>Интересы: {teacher.interests.map(interest => {
                                            return <div key={interest.id} style={{
                                                background: "#007bff",
                                                borderRadius: "40%",
                                                color: "white"
                                            }} className={"interests"}>{interest.interestName} </div>
                                        })}</p></td>
                                    </tr>
                                </table>
                            </li>
                            <p className={"about"}>{teacher.teacher.post}</p>
                            <p className={"phone"}>Контактный номер: {teacher.phoneNumber}</p>
                        </div>
                    })}
                </ul>
                <style>{".row td:nth-child(1){background: #007bff; margin-top: -1px; margin-left: 10px; border-radius: .75em; padding:2px; color: white}.content{border: .1em solid lightgrey; border-radius: .75em; margin-bottom:10px} .about{display: none; margin-top: 10px;} .content:hover{border: .3em solid #007bff;} .phone{display:none} .content:hover>.phone{display:block} .content:hover>.about{display:block} li{list-style-type : none;  } td h3 {position: relative; display: inline-block; text-align: center;} .institute{position: relative;display: inline-block; margin-left: 20%} .interests{position:  relative; margin-left: 30px; margin-top: 1px; display: inline-block} .container{display: block; width: 1000px; position: absolute; left: 10%; top:55%}"}</style>
            </div>
        </Layout>
    }
    else{
        return <></>
    }
}

export default TeacherContainer;