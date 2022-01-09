import getConfig from 'next/config';
import Router from 'next/router';

import {BehaviorSubject} from 'rxjs';

import {fetchWrapper} from 'helpers';

let querystring = require('querystring');
const bcrypt = require('bcryptjs');
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
const personUrl = `${publicRuntimeConfig.apiUrl}/GetPersonInfo`;

const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('token')));

export const userService = {
    user : userSubject.asObservable(),
    get userValue() {return userSubject.value},
    login,
    logout,
    register,
    update
};

function login(Login, password) {
    const Password = bcrypt.hashSync(password);
    return fetchWrapper.post(`${baseUrl}/AuthorizePerson`, { Login, Password })
        .then(user => {
            userSubject.next(user.AccessToken);
            localStorage.setItem('id', JSON.stringify(user.id));
            localStorage.setItem('token', JSON.stringify(user.accessToken));
            localStorage.setItem('role', JSON.stringify(user.role));
            localStorage.setItem('studentRole', "Student");

            return user;
        });
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    userSubject.next(null);
    Router.push('/account/login');
}

function register(user) {
    return fetchWrapper.post(`${baseUrl}/RegisterNewPerson`, user);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
        // .then(x => {
        //     // update stored user if the logged in user updated their own record
        //     if (id === userSubject.value.id) {
        //         // update local storage
        //         const user = { ...userSubject.value, ...params };
        //         localStorage.setItem('user', JSON.stringify(user));
        //
        //         // publish updated user to subscribers
        //         userSubject.next(user);
        //     }
        //     return x;
        //});
}
