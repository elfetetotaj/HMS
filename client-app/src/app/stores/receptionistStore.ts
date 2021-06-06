import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Receptionist } from '../models/receptionist';

export default class ReceptionistStore {
    receptionistRegistry = new Map<string, Receptionist>();
    selectedReceptionist: Receptionist | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get receptionistsByDate() {
        return Array.from(this.receptionistRegistry.values())/*.sort((a, b) => 
            Date.parse(a.date) - Date.parse(b.date));*/
    }

    loadReceptionists = async () => {
        this.loadingInitial = true;
        try {
            const receptionists = await agent.Receptionists.list();
            receptionists.forEach(receptionist => {
                this.setReceptionist(receptionist);
            })
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    private setReceptionist = (receptionist: Receptionist) => {
        // receptionist.date = receptionist.date.split('T')[0];
        this.receptionistRegistry.set(receptionist.id, receptionist);
    }

    loadReceptionist = async (id: string) => {
        let receptionist = this.getReceptionist(id);
        if (receptionist) {
            this.selectedReceptionist = receptionist;
            return receptionist;
        } else {
            this.loadingInitial = true;
            try {
                receptionist = await agent.Receptionists.details(id);
                this.setReceptionist(receptionist);
                runInAction(() => {
                    this.selectedReceptionist = receptionist;
                })
                this.setLoadingInitial(false);
                return receptionist;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getReceptionist = (id: string) => {
        return this.receptionistRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createReceptionist = async (receptionist: Receptionist) => {
        this.loading = true;
        try {
            await agent.Receptionists.create(receptionist);
            runInAction(() => {
                this.receptionistRegistry.set(receptionist.id, receptionist);
                this.selectedReceptionist = receptionist;
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
    updateReceptionist = async (receptionist: Receptionist) => {
        this.loading = true;
        try {
            await agent.Receptionists.update(receptionist);
            runInAction(() => {
                this.receptionistRegistry.set(receptionist.id, receptionist);
                this.selectedReceptionist = receptionist;
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

    deleteReceptionist = async (id: string) => {
        this.loading = true;
        try {
            await agent.Receptionists.delete(id);
            runInAction(() => {
                this.receptionistRegistry.delete(id);
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