import getConfig from 'next/config';
import Router from 'next/router';

import {BehaviorSubject} from 'rxjs';

import {fetchWrapper} from 'helpers';

let querystring = require('querystring');
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

function login(name, password) {
    return fetchWrapper.post(`${baseUrl}/AuthorizePerson`, { name, password })
        .then(user => {
            userSubject.next(user.accessToken);
            localStorage.setItem('id', JSON.stringify(user.id));
            localStorage.setItem('token', JSON.stringify(user.accessToken));
            localStorage.setItem('role', JSON.stringify(user.role));
            localStorage.setItem('studentRole', JSON.stringify("Student"));
            localStorage.setItem('teacherRole', JSON.stringify("Teacher"));
            localStorage.setItem('employerRole', JSON.stringify("Employer"));

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
        // });
}
