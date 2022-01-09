import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
const bcrypt = require('bcryptjs');

import { Link } from 'components';
import { Layout } from 'components/account';
import { userService, alertService } from 'services';

export default Register;

function Register() {
    const router = useRouter();
    // form validation rules
    const validationSchema = Yup.object().shape({
        Group: Yup.string()
            .required('Group is required'),
        PhoneNumber: Yup.string()
            .required('Phone is required'),
        Email: Yup.string(),
        About: Yup.string(),
        Login: Yup.string()
            .required('Username is required'),
        Password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { defaultValues: {role: "Student"}, resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState, setValue } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
        const {password} = user;
        user.Password = bcrypt.hashSync(password, 10);
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
                            <input name="phone" type="text" {...register('phone')} className={`form-control ${errors.phone ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.phone?.message}</div>
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
                            <label>Имя пользователя</label>
                            <input name="username" value="Имя Фамилия" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
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
                        <Link href="/account/register" className="btn btn-link">Назад</Link>
                    </form>
                </div>
            </div>
        </Layout>
    );
}