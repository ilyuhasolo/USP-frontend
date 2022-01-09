import {userService} from "../services";

export {Elem};

function Elem({ role, firstName, lastName, group }){

    return (<div>
        <ul>
            <li>{role}</li>
            <li>{firstName}</li>
            <li>{lastName}</li>
            <li>{group}</li>
        </ul>
    </div>);
}

