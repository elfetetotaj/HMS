import { createContext, useContext } from "react";
import DepartmentStore from "./departmentStore";
import ReceptionistStore from "./receptionistStore";
import NurseStore from "./nurseStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import FarmacistStore from "./farmacistStore";


interface Store{
    receptionistStore: ReceptionistStore;
    departmentStore: DepartmentStore;
    nurseStore: NurseStore;
    farmacistStore: FarmacistStore;

    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    receptionistStore: new ReceptionistStore(),
    departmentStore: new DepartmentStore(),
    nurseStore: new NurseStore(),
    farmacistStore: new FarmacistStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}