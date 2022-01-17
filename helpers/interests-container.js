
let choseInterests = [];

export class InterestsContainer{

    static appendChoseInterests(value){
        choseInterests.push(value);
    }

    static get choseInterests(){
        return choseInterests;
    }

    static clear(){
        choseInterests = []
    }

    static removeValue(value){
        const index = choseInterests.indexOf(value);
        choseInterests.splice(index);
    }
}