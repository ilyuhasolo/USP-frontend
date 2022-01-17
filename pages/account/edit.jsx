import {useRouter} from "next/router";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {Link} from "../../components";
import {userService} from "../../services";
import {useState} from "react";

export default function Edit(){
    const router = useRouter();
    const user = userService.userValue;
    const id = localStorage.getItem('id').replace(/"/g, "");

    const validationSchema = Yup.object().shape({
        newGroup: Yup.string().nullable(true),
        newPhoneNumber: Yup.string().nullable(true),
        newEmail: Yup.string().nullable(true),
        newAbout: Yup.string().nullable(true),
        newPassword : Yup.string().nullable(true)
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState, setValue } = useForm(formOptions);
    const { errors } = formState;

    async function onSubmit(usr){
        const user = userService.userValue;
        usr.personId = id;
        const requestOptions = {
            method : 'POST',
            headers : {'Content-Type': 'application/json', Authorization: `Bearer ${user}`},
            body : JSON.stringify(usr)
        }


        const req = await fetch(`https://localhost:7040/EditStudentProfile`, requestOptions);
        const res = await req.json();
        router.push("/");
    }

    return <>
        <div className="header"><h1>Редактировать профиль</h1></div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label>Группа</label>
                <input name="newGroup" type="text" {...register('newGroup')} className={`form-control ${errors.newGroup ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.newGroup?.message}</div>
            </div>
            <div className="form-group">
                <label>Номер телефона</label>
                <input name="newPhoneNumber" type="text" {...register('newPhoneNumber')} className={`form-control ${errors.newPhoneNumber ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.newPhoneNumber?.message}</div>
            </div>
            <div className="form-group">
                <label>Email</label>
                <input name="newEmail" type="text" {...register('newEmail')} className={`form-control ${errors.newEmail ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.newEmail?.message}</div>
            </div>
            <div className="form-group">
                <label>Расскажи о себе</label>
                <input name="newAbout" type="text" {...register('newAbout')} className={`form-control ${errors.newAbout ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.newAbout?.message}</div>
            </div>
            <div className="form-group">
                <label>Пароль</label>
                <input name="newPassword" type="text" {...register('newPassword')} className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.newPassword?.message}</div>
            </div>
            <button disabled={formState.isSubmitting} className="btn btn-primary">
                {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                Сохранить
            </button>
            <Link href="/" className="btn btn-link">Назад</Link>
            <style>{".header{background: #F0F0F0; height: 80px;} .header h1{position:relative; top:15%; left: 2%}"}</style>
        </form>
    </>
}