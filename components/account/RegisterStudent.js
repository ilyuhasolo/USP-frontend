import React from 'react';
import {useRouter} from "next/router";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import bcrypt from "bcryptjs";
import {alertService, userService} from "../../services";
import {Link} from "../Link";
import {Layout} from "./Layout";

function RegisterStudent() {
    const router = useRouter();
    // form validation rules
    const validationSchema = Yup.object().shape({
        group: Yup.string()
            .required('Group is required'),
        phoneNumber: Yup.string()
            .required('Phone is required'),
        email: Yup.string(),
        about: Yup.string(),
        name: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { defaultValues: {role: "Student"}, resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState, setValue } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
        user.role = "Student";
        return userService.register(user)
            .then(() => {
                alertService.success('Registration successful', { keepAfterRouteChange: true });
                router.push('login');
            })
            .catch(alertService.error);
    }

    return (
        <Layout>
            <div className="card">
                <h4 className="card-header">Регистрация студента</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Группа</label>
                            <input name="group" type="text" {...register('group')} className={`form-control ${errors.group ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.group?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Номер телефона</label>
                            <input name="phone" type="text" {...register('phoneNumber')} className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.phoneNumber?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Расскажи о себе</label>
                            <input name="about" type="text" {...register('about')} className={`form-control ${errors.about ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.about?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Имя и фамилия</label>
                            <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.name?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Пароль</label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Зарегистрироваться
                        </button>
                        <Link href="/account/login" className="btn btn-link">Отмена</Link>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default RegisterStudent;