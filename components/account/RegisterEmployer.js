import React from 'react';
import {useRouter} from "next/router";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {alertService, userService} from "../../services";
import {Layout} from "./Layout";
import {Link} from "../Link";

function RegisterEmployer() {
    const router = useRouter();

    // form validation rules
    const validationSchema = Yup.object().shape({
        companyName: Yup.string()
            .required('Company name is required'),
        about: Yup.string()
            .required('About is required'),
        login: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { defaultValues: {role: "Employer"}, resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
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
                <h4 className="card-header">Регистрация работодателя</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Название компании</label>
                            <input name="companyName" type="text" {...register('companyName')} className={`form-control ${errors.companyName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.companyName?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>О компании</label>
                            <input name="about" type="text" {...register('about')} className={`form-control ${errors.about ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.about?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Имя и фамилия</label>
                            <input name="login" type="text" {...register('login')} className={`form-control ${errors.login ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.login?.message}</div>
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

export default RegisterEmployer;