import { Layout } from 'components/account';
import {Link} from "../../components";

export default Register;

function Register() {

    return (
        <Layout>
            <div className="card">
                <h4 className="card-header">Выберите роль</h4>
                <div className="card-body">
                    <div className="role-block">
                        <a href="/account/registers"><p>Студент</p></a>
                    </div>
                    <div className="role-block">
                        <a href="/account/registert"><p>Преподаватель</p></a>
                    </div>
                    <div className="role-block">
                        <a href="/account/registerw"><p>Работодатель</p></a>
                    </div>
                </div>

            </div>
            <Link href="/account/login">Отмена</Link>
            <style>
                {".role-block{position:relative; width: 150px; height: 50px; border-radius: 5px; left:40%; background: #2F8DFF; text-align:center; margin-top: 10px;} .role-block:hover{background: blue} .role-block p{color: white; margin: 0; position:relative; top: 25%; font-weight: bold}"}
            </style>
        </Layout>
    );
}
