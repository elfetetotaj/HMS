import { createContext, useContext } from "react";
import DepartmentStore from "./departmentStore";
import ReceptionistStore from "./receptionistStore";

interface Store{
    receptionistStore: ReceptionistStore
    departmentStore: DepartmentStore
}

export const store: Store = {
    receptionistStore: new ReceptionistStore(),
    departmentStore: new DepartmentStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}