import { createContext, useContext } from "react";
import DepartmentStore from "./departmentStore";
import ReceptionistStore from "./receptionistStore";
import NurseStore from "./nurseStore";
interface Store{
    receptionistStore: ReceptionistStore
    departmentStore: DepartmentStore
    nurseStore : NurseStore
}

export const store: Store = {
    receptionistStore: new ReceptionistStore(),
    departmentStore: new DepartmentStore(),
    nurseStore: new NurseStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}