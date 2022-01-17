import React, {Component} from 'react';
import RegisterStudent from "./RegisterStudent";
import RegisterTeacher from "./RegisterTeacher";
import RegisterEmployer from "./RegisterEmployer";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cout : 0
        }

        this.student = this.student.bind(this);
        this.teacher = this.teacher.bind(this);
        this.employer = this.employer.bind(this);
    }

    student(){
        this.setState(state => {
            return {cout: 0}
        });
    }

    teacher(){
        this.setState(state => {
            return {cout: 1}
        });
    }

    employer(){
        this.setState(state => {
            return {cout: 2}
        });
    }

    render() {
        console.log(this.state.cout);
        switch (this.state.cout){
            case 0:
                return (
                    <div>
                        <button className="btn btn-primary" onClick={this.student}>Студент</button>
                        <button className="btn btn-primary" onClick={this.teacher}>Куратор</button>
                        <button className="btn btn-primary" onClick={this.employer}>Работодатель</button>
                        <RegisterStudent/>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <button className="btn btn-primary" onClick={this.student}>Студент</button>
                        <button className="btn btn-primary" onClick={this.teacher}>Куратор</button>
                        <button className="btn btn-primary" onClick={this.employer}>Работодатель</button>
                        <RegisterTeacher/>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <button className="btn btn-primary" onClick={this.student}>Студент</button>
                        <button className="btn btn-primary" onClick={this.teacher}>Куратор</button>
                        <button className="btn btn-primary" onClick={this.employer}>Работодатель</button>
                        <RegisterEmployer/>
                    </div>
                );
        }
    }
}

export default Register;