import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Therapy } from "../models/therapy";

export default class TherapyStore {
    therapyRegistry = new Map<string, Therapy>();
    selectedTherapy: Therapy | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get therapiesByDate() {
        return Array.from(this.therapyRegistry.values())
        
    }

    loadTherapies = async () => {
        this.loadingInitial = true;
        try {
            const therapies = await agent.Therapies.list();
                therapies.forEach(therapy => {
                    this.setTherapy(therapy);
                })
                this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    private setTherapy = (therapy: Therapy) => {
        this.therapyRegistry.set(therapy.id, therapy);
    }

    loadTherapy = async (id: string) => {
        let therapy = this.getTherapy(id);
        if (therapy) {
            this.selectedTherapy = therapy;
            return therapy;
        } else {
            this.loadingInitial = true;
            try {
                therapy = await agent.Therapies.details(id);
                this.setTherapy(therapy);
                runInAction(() => {
                    this.selectedTherapy = therapy;
                })
                this.setLoadingInitial(false);
                return therapy;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getTherapy = (id: string) => {
        return this.therapyRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createTherapy = async (therapy: Therapy) => {
        this.loading = true;
        try {
            await agent.Therapies.create(therapy);
            runInAction(() => {
                this.therapyRegistry.set(therapy.id, therapy);
                this.selectedTherapy = therapy;
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

    updateTherapy = async (therapy: Therapy) => {
        this.loading = true;
        try {
            await agent.Therapies.update(therapy);
            runInAction(() => {
                this.therapyRegistry.set(therapy.id, therapy);
                this.selectedTherapy = therapy;
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

    deleteTherapy = async (id: string) => {
        this.loading = true;
        try {
            await agent.Therapies.delete(id);
            runInAction(() => {
                this.therapyRegistry.delete(id);
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
