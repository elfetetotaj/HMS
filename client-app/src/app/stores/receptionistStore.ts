import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Receptionist } from '../models/receptionist';
import { v4 as uuid } from 'uuid';

export default class ReceptionistStore {
    receptionistRegistry = new Map<string, Receptionist>();
    selectedReceptionist: Receptionist | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get receptionistsByDate() {
        return Array.from(this.receptionistRegistry.values())/*.sort((a, b) => 
            Date.parse(a.date) - Date.parse(b.date));*/
    }

    loadReceptionists = async () => {
        this.setLoadingInitial(true);
        try {
            const receptionists = await agent.Receptionists.list();
                receptionists.forEach(receptionist => {
                    // receptionist = receptionist.split('T')[0];
                    this.receptionistRegistry.set(receptionist.id, receptionist);
                })
                this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) =>{
        this.loadingInitial = state;
    }

    selectReceptionist = (id: string) => {
        this.selectedReceptionist = this.receptionistRegistry.get(id);
    }

    cancelSelectedReceptionist = () => {
        this.selectedReceptionist = undefined;
    }
    openForm = (id?: string) => {
        id ? this.selectReceptionist(id) : this.cancelSelectedReceptionist();
        this.editMode=true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createReceptionist = async (receptionist: Receptionist) => {
        this.loading = true;
        receptionist.id = uuid();
        try{
            await agent.Receptionists.create(receptionist);
            runInAction(() => {
                this.receptionistRegistry.set(receptionist.id, receptionist);
                this.selectedReceptionist = receptionist;
                this.editMode = false;
                this.loading = false;
            })
        }catch(error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    updateReceptionist = async (receptionist: Receptionist) =>{
        this.loading = true;
        try{
            await agent.Receptionists.update(receptionist);
            runInAction(() => {
                this.receptionistRegistry.set(receptionist.id, receptionist);
                this.selectedReceptionist = receptionist;
                this.editMode = false;
                this.loading = false;
            })
        }catch(error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteReceptionist = async (id: string) => {
        this.loading = true;
        try{
            await agent.Receptionists.delete(id);
            runInAction(() => {
                this.receptionistRegistry.delete(id);
                if (this.selectedReceptionist?.id === id) this.cancelSelectedReceptionist();
                this.loading = false;
            })

        }catch(error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}
