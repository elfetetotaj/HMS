import axios, { AxiosResponse } from 'axios';
import { Department } from '../models/department';
import { Nurse } from '../models/nurse';
import { Receptionist } from '../models/receptionist';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
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
const agent = {
    Departments,
    Receptionists,
    Nurses
}

export default agent;