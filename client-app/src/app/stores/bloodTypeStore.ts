import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { BloodType } from "../models/bloodTypes";
import { Profile } from "../models/profile";
import { store } from "./store";

export default class BloodTypeStore {
    bloodTypeRegistry = new Map<string, BloodType>();
    selectedbloodType: BloodType | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get bloodByType() {
        return Array.from(this.bloodTypeRegistry.values()).sort((a, b) => a.type > b.type ? 1:-1);
    }

    loadBloodTypes = async () => {
        this.loadingInitial = true;
        try {
            const types = await agent.BloodTypes.list();
                types.forEach(bloodType => {
                    this.setBloodType(bloodType);
                })
                this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    private setBloodType = (bloodType: BloodType) => {
        this.bloodTypeRegistry.set(bloodType.type, bloodType);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
}