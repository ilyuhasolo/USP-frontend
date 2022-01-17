let choseRoles = [];

export class RolesContainer{

    static appendChoseRoles(value){
        choseRoles.push(value);
    }

    static get choseRoles(){
        return choseRoles;
    }

    static clear(){
        choseRoles = []
    }

    static removeValue(value){
        const index = choseRoles.indexOf(value);
        choseRoles.splice(index);
    }
}