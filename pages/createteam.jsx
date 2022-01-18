import {useRouter} from "next/router";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {Link} from "../components";
import {userService} from "../services";
import AllInterests from "../components/account/AllInterests";
import {InterestsContainer} from "../helpers/interests-container";
import VacantRoles from "../components/search/student/teams/VacantRoles";
import {RolesContainer} from "../helpers/roles-container";

export default function CreateTeam(){
    const router = useRouter();
    const id = localStorage.getItem('id').replace(/"/g, "");
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Необходимо указать имя команды"),
        teamLeadPhoneNumber: Yup.string()
            .required("Необходимо указать контактный телефон"),
        description: Yup.string()
            .required("Необходимо указать описание"),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState, setValue } = useForm(formOptions);
    const { errors } = formState;


    async function onSubmit(team){
        const user = userService.userValue;
        const interests = InterestsContainer.choseInterests;
        const roles = RolesContainer.choseRoles;
        team.interests = interests;
        team.vacantRoles = roles;
        let teamId;
        const requestOptions = {
            method : 'POST',
            headers : {'Content-Type': 'application/json', Authorization: `Bearer ${user}`},
            body : JSON.stringify(team)
        }


        const req = await fetch(`https://localhost:7040/CreateNewTeam`, requestOptions);
        const res = await req.json().then(response => teamId = response);

        const reqOptions = {
            method : 'PUT',
            headers : {Authorization: `Bearer ${user}`}
        }
        fetch('https://localhost:7040/AddPersonToTeam?PersonId='+id+'&TeamId='+teamId, reqOptions);

        router.push("/");
    }

    return <>
        <div className="header"><h1>Редактировать профиль</h1></div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label>Название команды</label>
                <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.name?.message}</div>
            </div>
            <div className="form-group">
                <label>Номер телефона тимлида</label>
                <input name="teamLeadPhoneNumber" type="text" {...register('teamLeadPhoneNumber')} className={`form-control ${errors.teamLeadPhoneNumber ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.teamLeadPhoneNumber?.message}</div>
            </div>
            <div className="form-group">
                <label>О команде</label>
                <input name="description" type="text" {...register('description')} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.description?.message}</div>
            </div>
            <AllInterests style={{display: "inline-block"}}>Интересы</AllInterests>
            <VacantRoles style={{display: "inline-block"}}>Вакантные роли</VacantRoles>
            <button disabled={formState.isSubmitting} className="butt but-st">
                {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                Сохранить
            </button>
            <Link href="/" className="butt but-st">Назад</Link>
            <style>{".header{background: #F0F0F0; height: 80px;} .header h1{position:relative; top:15%; left: 2%} .but-st{display:inline-block;font-weight:400;color:#212529;text-align:center;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:transparent;border:1px solid transparent;padding:.375rem .75rem;font-size:1rem;line-height:1.5;border-radius:.25rem;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out} .but-st:hover{color:#212529;text-decoration:none} .butt{margin-top:20px; position:relative; left:20%; color:#fff;background-color:#007bff;border-color:#007bff} .butt:hover{color:#fff;background-color:#0069d9;border-color:#0062cc}"}</style>
        </form>
    </>
}