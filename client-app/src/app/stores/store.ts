import { createContext, useContext } from "react";
import DepartmentStore from "./departmentStore";
import ReceptionistStore from "./receptionistStore";
import NurseStore from "./nurseStore";
import CommonStore from "./commonStore";


interface Store{
    receptionistStore: ReceptionistStore
    departmentStore: DepartmentStore
    nurseStore : NurseStore
    commonStore : CommonStore
}

export const store: Store = {
    receptionistStore: new ReceptionistStore(),
    departmentStore: new DepartmentStore(),
    nurseStore: new NurseStore(),
    commonStore: new CommonStore(),
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}