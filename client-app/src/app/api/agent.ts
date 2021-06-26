import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Department } from '../models/department';
import { Test } from '../models/test';
import { Farmacist } from '../models/farmacist';
import { Nurse } from '../models/nurse';
import { Receptionist } from '../models/receptionist';
import { User, UserFormValues } from '../models/user';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
        await sleep(1000);
        return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response!;
    switch (status) {
        case 400:
            if (typeof data === 'string') {
                toast.error(data);
            }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Departments = {
    list: () => requests.get<Department[]>('/departments'),
    details: (id: string) => requests.get<Department>(`/departments/${id}`),
    create: (department: Department) => axios.post<void>('/departments', department),
    update: (department: Department) => axios.put<void>(`/departments/${department.id}`, department),
    delete: (id: string) => axios.delete<void>(`/departments/${id}`)
}
const Receptionists = {
    list: () => requests.get<Receptionist[]>('/receptionists'),
    details: (id: string) => requests.get<Receptionist>(`/receptionists/${id}`),
    create: (receptionist: Receptionist) => axios.post<void>('/receptionists', receptionist),
    update: (receptionist: Receptionist) => axios.put<void>(`/receptionists/${receptionist.id}`, receptionist),
    delete: (id: string) => axios.delete<void>(`/receptionists/${id}`)
}
const Nurses = {
    list: () => requests.get<Nurse[]>('/nurses'),
    details: (id: string) => requests.get<Nurse>(`/nurses/${id}`),
    create: (nurse: Nurse) => axios.post<void>('/nurses', nurse),
    update: (nurse: Nurse) => axios.put<void>(`/nurses/${nurse.id}`, nurse),
    delete: (id: string) => axios.delete<void>(`/nurses/${id}`)
}
const Farmacists = {
    list: () => requests.get<Farmacist[]>('/farmacists'),
    details: (id: string) => requests.get<Farmacist>(`/farmacists/${id}`),
    create: (farmacist: Farmacist) => axios.post<void>('/farmacists', farmacist),
    update: (farmacist: Farmacist) => axios.put<void>(`/farmacists/${farmacist.id}`, farmacist),
    delete: (id: string) => axios.delete<void>(`/farmacists/${id}`)
}
const Tests = {
    list: () => requests.get<Test[]>('/tests'),
    details: (id: string) => requests.get<Test>(`/tests/${id}`),
    create: (test: Test) => axios.post<void>('/tests', test),
    update: (test: Test) => axios.put<void>(`/tests/${test.id}`, test),
    delete: (id: string) => axios.delete<void>(`/tests/${id}`)
}
const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}
const agent = {
    Departments,
    Receptionists,
    Nurses,
    Farmacists,
    Tests,
    Account
}

export default agent;