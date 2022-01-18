import React from 'react';
import {useRouter} from "next/router";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {alertService, userService} from "../../services";
import {Layout} from "./Layout";
import {Link} from "../Link";

function RegisterTeacher() {
    const router = useRouter();

    // form validation rules
    const validationSchema = Yup.object().shape({
        institute: Yup.string()
            .required('Institute is required'),
        post: Yup.string()
            .required('About is required'),
        phoneNumber : Yup.string()
            .required('Phone is required'),
        email : Yup.string(),
        name: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { defaultValues: {role: "Teacher"},resolver: yupResolver(validationSchema) };

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
                <h4 className="card-header">Регистрация куратора</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Институт</label>
                            <input name="institute" type="text" {...register('institute')} className={`form-control ${errors.institute ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.institute?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Должность</label>
                            <input name="post" type="text" {...register('post')} className={`form-control ${errors.post ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.post?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Номер телефона</label>
                            <input name="phoneNumber" type="text" {...register('phoneNumber')} className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.phoneNumber?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
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

export default RegisterTeacher;