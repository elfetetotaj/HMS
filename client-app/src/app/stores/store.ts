import { createContext, useContext } from "react";
import DepartmentStore from "./departmentStore";
import ReceptionistStore from "./receptionistStore";
import NurseStore from "./nurseStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import FarmacistStore from "./farmacistStore";
import TestStore from "./testStore";
import PatientStore from "./patientStore";
import CityStore from "./cityStore";
import TherapyStore from "./therapyStore";
import ProfileStore from "./profileStore";
import DoctorStore from "./doctorStore";
import TechEmployeeStore from "./techEmployeeStore";
import SurgeryStore from "./surgeryStore";
import CommentStore from "./commentStore";
import CountryStore from "./countryStore";
import TerminStore from "./terminStore";
import BloodTypeStore from "./bloodTypeStore";
import EmergencyDriverStore from "./emergencyDriverStore";


interface Store{
    receptionistStore: ReceptionistStore;
    departmentStore: DepartmentStore;
    terminStore: TerminStore;
    nurseStore: NurseStore;
    farmacistStore: FarmacistStore;
    testStore: TestStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;
    commentStore: CommentStore;
    patientStore : PatientStore;
    cityStore : CityStore;
    therapyStore : TherapyStore;
    doctorStore : DoctorStore;
    techEmployeeStore : TechEmployeeStore;
    surgeryStore : SurgeryStore;
    countryStore : CountryStore;
    bloodTypeStore : BloodTypeStore;
    emergencyDriverStore : EmergencyDriverStore;
}

export const store: Store = {
    receptionistStore: new ReceptionistStore(),
    departmentStore: new DepartmentStore(),
    terminStore: new TerminStore(),
    nurseStore: new NurseStore(),
    farmacistStore: new FarmacistStore(),
    testStore: new TestStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore(),
    commentStore: new CommentStore(),
    patientStore: new PatientStore(),
    cityStore: new CityStore(),
    therapyStore: new TherapyStore(),
    doctorStore: new DoctorStore(),
    techEmployeeStore : new TechEmployeeStore(),
    surgeryStore: new SurgeryStore(),
    countryStore: new CountryStore(),
    bloodTypeStore: new BloodTypeStore(),
    emergencyDriverStore: new EmergencyDriverStore(),
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}