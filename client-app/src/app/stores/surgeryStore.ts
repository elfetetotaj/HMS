import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Surgery } from "../models/surgery";

export default class SurgeryStore {
    surgeryRegistry = new Map<string, Surgery>();
    selectedSurgery: Surgery | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get surgeriesByDate() {
        return Array.from(this.surgeryRegistry.values())
    }

    get surgeriesByName() {
        return Array.from(this.surgeryRegistry.values()).sort((a, b) => a.surgeryName > b.surgeryName ? 1:-1);
    }

    loadSurgeries = async () => {
        this.loadingInitial = true;
        try {
            const counties = await agent.Surgeries.list();
            counties.forEach(surgery => {
                    this.setSurgery(surgery);
                })
                this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadSurgery = async (id: string) => {
        let surgery = this.getSurgery(id);
        if (surgery) {
            this.selectedSurgery = surgery;
            return surgery;
        } else {
            this.loadingInitial = true;
            try {
                surgery = await agent.Surgeries.details(id);
                this.setSurgery(surgery);
                runInAction(() => {
                    this.selectedSurgery = surgery;
                })
                this.setLoadingInitial(false);
                return surgery;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setSurgery = (surgery: Surgery) => {
        this.surgeryRegistry.set(surgery.id, surgery);
    }

    private getSurgery = (id: string) => {
        return this.surgeryRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createSurgery = async (surgery: Surgery) => {
        this.loading = true;
        try {
            await agent.Surgeries.create(surgery);
            runInAction(() => {
                this.surgeryRegistry.set(surgery.id, surgery);
                this.selectedSurgery = surgery;
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

    updateSurgery = async (surgery: Surgery) => {
        try {
            await agent.Surgeries.update(surgery);
            runInAction(() => {
                if (surgery.id) {
                    let updatedSurgery = {...this.getSurgery(surgery.id), ...surgery}
                    this.surgeryRegistry.set(surgery.id, updatedSurgery as Surgery);
                    this.selectedSurgery = updatedSurgery as Surgery;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteSurgery = async (id: string) => {
        this.loading = true;
        try {
            await agent.Surgeries.delete(id);
            runInAction(() => {
                this.surgeryRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    
    clearSelectedSurgery = () => {
        this.selectedSurgery = undefined;
    }

} 