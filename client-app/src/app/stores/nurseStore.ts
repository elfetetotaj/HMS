import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Nurse } from "../models/nurse";

export default class NurseStore {
    nurseRegistry = new Map<string, Nurse>();
    selectedNurse: Nurse | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get nursesByDate() {
        return Array.from(this.nurseRegistry.values());
    }

    loadNurses = async () => {
        this.loadingInitial = true;
        try {
            const nurses = await agent.Nurses.list();
                nurses.forEach(nurse => {
                    this.setNurse(nurse);
                })
                this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    private setNurse = (nurse: Nurse) => {
        // department.date = department.date.split('T')[0];
        this.nurseRegistry.set(nurse.id, nurse);
    }

    loadNurse = async (id: string) => {
        let nurse = this.getNurse(id);
        if (nurse) {
            this.selectedNurse = nurse;
            return nurse;
        } else {
            this.loadingInitial = true;
            try {
                nurse = await agent.Nurses.details(id);
                this.setNurse(nurse);
                runInAction(() => {
                    this.selectedNurse = nurse;
                })
                this.setLoadingInitial(false);
                return nurse;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getNurse = (id: string) => {
        return this.nurseRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createNurse = async (nurse: Nurse) => {
        this.loading = true;
        try {
            await agent.Nurses.create(nurse);
            runInAction(() => {
                this.nurseRegistry.set(nurse.id, nurse);
                this.selectedNurse = nurse;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateNurse = async (nurse: Nurse) => {
        this.loading = true;
        try {
            await agent.Nurses.update(nurse);
            runInAction(() => {
                this.nurseRegistry.set(nurse.id, nurse);
                this.selectedNurse = nurse;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteNurse = async (id: string) => {
        this.loading = true;
        try {
            await agent.Nurses.delete(id);
            runInAction(() => {
                this.nurseRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}