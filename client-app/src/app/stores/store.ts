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


interface Store{
    receptionistStore: ReceptionistStore;
    departmentStore: DepartmentStore;
    nurseStore: NurseStore;
    farmacistStore: FarmacistStore;
    testStore: TestStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;
    patientStore : PatientStore;
    cityStore : CityStore;
    therapyStore : TherapyStore;
}

export const store: Store = {
    receptionistStore: new ReceptionistStore(),
    departmentStore: new DepartmentStore(),
    nurseStore: new NurseStore(),
    farmacistStore: new FarmacistStore(),
    testStore: new TestStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore(),
    patientStore: new PatientStore(),
    cityStore: new CityStore(),
    therapyStore: new TherapyStore(),
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}