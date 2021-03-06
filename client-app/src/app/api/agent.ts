import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Department, DepartmentFormValues } from '../models/department';
import { Test } from '../models/test';
import { Farmacist } from '../models/farmacist';
import { Nurse } from '../models/nurse';
import { Receptionist } from '../models/receptionist';
import { User, UserFormValues } from '../models/user';
import { store } from '../stores/store';
import { Patient } from '../models/patient';
import { City } from '../models/city';
import { Therapy } from '../models/therapy';
import { Profile } from '../models/profile';
import { Doctor } from '../models/doctor';
import { TechEmployee } from '../models/techEmployee';
import { Surgery } from '../models/surgery';
import { Country } from '../models/country';
import { Termin } from '../models/termin';
import { BloodType } from '../models/bloodTypes';
import { EmergencyDriver } from '../models/emergencyDriver';
import { Room } from '../models/room';
import { Medicine } from '../models/medicine';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === 'development') await sleep(1000);
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
    create: (department: DepartmentFormValues) => requests.post<void>('/departments', department),
    update: (department: DepartmentFormValues) => requests.put<void>(`/departments/${department.id}`, department),
    delete: (id: string) => requests.del<void>(`/departments/${id}`),
    attend: (id: string) => requests.post<void>(`/departments/${id}/attend`, {})
}
const Termins = {
    list: () => requests.get<Termin[]>('/termins'),
    details: (id: string) => requests.get<Termin>(`/termins/${id}`),
    create: (termin: Termin) => requests.post<void>('/termins', termin),
    update: (termin: Termin) => requests.put<void>(`/termins/${termin.id}`, termin),
    delete: (id: string) => requests.del<void>(`/termins/${id}`),
}
const Medicines = {
    list: () => requests.get<Medicine[]>('/medicines'),
    details: (id: string) => requests.get<Medicine>(`/medicines/${id}`),
    create: (medicine: Medicine) => requests.post<void>('/medicines', medicine),
    update: (medicine: Medicine) => requests.put<void>(`/medicines/${medicine.id}`, medicine),
    delete: (id: string) => requests.del<void>(`/medicines/${id}`),
}
const Receptionists = {
    list: () => requests.get<Receptionist[]>('/receptionists'),
    details: (id: string) => requests.get<Receptionist>(`/receptionists/${id}`),
    create: (receptionist: Receptionist) => requests.post<void>('/receptionists', receptionist),
    update: (receptionist: Receptionist) => requests.put<void>(`/receptionists/${receptionist.id}`, receptionist),
    delete: (id: string) => requests.del<void>(`/receptionists/${id}`)
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
const Patients ={
    list: () => requests.get<Patient[]>('/patients'),
    details: (id:string) => requests.get<Patient>(`/patients/${id}`),
    create: (patient: Patient) => axios.post<void>('/patients', patient),
    update: (patient: Patient) => axios.put<void>(`/patients/${patient.id}`,patient),
    delete: (id: string) => axios.delete<void>(`/patients/${id}`)
}
const Tests = {
    list: () => requests.get<Test[]>('/tests'),
    details: (id: string) => requests.get<Test>(`/tests/${id}`),
    create: (test: Test) => axios.post<void>('/tests', test),
    update: (test: Test) => axios.put<void>(`/tests/${test.id}`, test),
    delete: (id: string) => axios.delete<void>(`/tests/${id}`)
}
const TechEmployees = {
    list: () => requests.get<TechEmployee[]>('/techEmployees'),
    details: (id: string) => requests.get<TechEmployee>(`/techEmployees/${id}`),
    create: (techEmployee: TechEmployee) => axios.post<void>('/techEmployees', techEmployee),
    update: (techEmployee: TechEmployee) => axios.put<void>(`/techEmployees/${techEmployee.id}`, techEmployee),
    delete: (id: string) => axios.delete<void>(`/techEmployees/${id}`)
}
const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}
const Profiles = {
    get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
    updateProfile: (profile: Partial<Profile>) => requests.put(`/profiles`, profile)
}
const Cities = {
    list: () => requests.get<City[]>('/cities'),
    details: (id: string) => requests.get<City>(`/cities/${id}`),
    create: (city: City) => requests.post<void>('/cities', city),
    update: (city: City) => requests.put<void>(`/cities/${city.id}`, city),
    delete: (id: string) => requests.del<void>(`/cities/${id}`)
}
const Therapies = {
    list: () => requests.get<Therapy[]>('/therapies'),
    details: (id: string) => requests.get<Therapy>(`/therapies/${id}`),
    create: (therapy: Therapy) => axios.post<void>('/therapies', therapy),
    update: (therapy: Therapy) => axios.put<void>(`/therapies/${therapy.id}`, therapy),
    delete: (id: string) => axios.delete<void>(`/therapies/${id}`)
}
const Doctors ={
    list: () => requests.get<Doctor[]>('/doctors'),
    details: (id:string) => requests.get<Doctor>(`/doctors/${id}`),
    create: (doctor: Doctor) => axios.post<void>('/doctors', doctor),
    update: (doctor: Doctor) => axios.put<void>(`/doctors/${doctor.id}`,doctor),
    delete: (id: string) => axios.delete<void>(`/doctors/${id}`)
}
const Surgeries = {
    list: () => requests.get<Surgery[]>('/surgeries'),
    details: (id: string) => requests.get<Surgery>(`/surgeries/${id}`),
    create: (surgery: Surgery) => requests.post<void>('/surgeries', surgery),
    update: (surgery: Surgery) => requests.put<void>(`/surgeries/${surgery.id}`, surgery),
    delete: (id: string) => requests.del<void>(`/surgeries/${id}`)
}
const Rooms ={
    list: () => requests.get<Room[]>('/rooms'),
    details: (id:string) => requests.get<Room>(`/rooms/${id}`),
    create: (room: Room) => axios.post<void>('/rooms', room),
    update: (room: Room) => axios.put<void>(`/rooms/${room.id}`,room),
    delete: (id: string) => axios.delete<void>(`/rooms/${id}`)
}
const Countries = {
    list: () => requests.get<Country[]>('/countries'),
    details: (id: string) => requests.get<Country>(`/countries/${id}`),
    create: (country: Country) => requests.post<void>('/countries', country),
    update: (country: Country) => requests.put<void>(`/countries/${country.id}`, country),
    delete: (id: string) => requests.del<void>(`/countries/${id}`)
}
const BloodTypes = {
    list: () => requests.get<BloodType[]>('/bloodTypes'),

}
const EmergencyDrivers = {
    list: () => requests.get<EmergencyDriver[]>('/emergencyDrivers'),
    details: (id: string) => requests.get<EmergencyDriver>(`/emergencyDrivers/${id}`),
    create: (emergencyDriver: EmergencyDriver) => requests.post<void>('/emergencyDrivers', emergencyDriver),
    update: (emergencyDriver: EmergencyDriver) => requests.put<void>(`/emergencyDrivers/${emergencyDriver.id}`, emergencyDriver),
    delete: (id: string) => requests.del<void>(`/emergencyDrivers/${id}`)
}
const agent = {
    Departments,
    Termins,
    Medicines,
    Receptionists,
    Nurses,
    Farmacists,
    Patients,
    Tests,
    Account,
    Profiles,
    Cities,
    Countries,
    Therapies,
    Doctors,
    TechEmployees,
    Surgeries,
    BloodTypes,
    EmergencyDrivers,
    Rooms,
}

export default agent;