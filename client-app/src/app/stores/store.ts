import { createContext, useContext } from "react";
import ReceptionistStore from "./receptionistStore";

interface Store{
    receptionistStore: ReceptionistStore
}

export const store: Store = {
    receptionistStore: new ReceptionistStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}