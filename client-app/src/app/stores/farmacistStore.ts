import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Farmacist } from "../models/farmacist";

export default class FarmacistStore {
    farmacistRegistry = new Map<string, Farmacist>();
    selectedFarmacist: Farmacist | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get farmacistsByDate() {
        return Array.from(this.farmacistRegistry.values()).sort((a,b)=>
            a.dateOfJoining!.getDay()-b.dateOfJoining!.getDay());
        
    }

    loadFarmacists = async () => {
        this.loadingInitial = true;
        try {
            const farmacists = await agent.Farmacists.list();
                farmacists.forEach(farmacist => {
                    this.setFarmacist(farmacist);
                })
                this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    private setFarmacist = (farmacist: Farmacist) => {
        farmacist.dateOfJoining = new Date(farmacist.dateOfJoining!);
        this.farmacistRegistry.set(farmacist.id, farmacist);
    }

    loadFarmacist = async (id: string) => {
        let farmacist = this.getFarmacist(id);
        if (farmacist) {
            this.selectedFarmacist = farmacist;
            return farmacist;
        } else {
            this.loadingInitial = true;
            try {
                farmacist = await agent.Farmacists.details(id);
                this.setFarmacist(farmacist);
                runInAction(() => {
                    this.selectedFarmacist = farmacist;
                })
                this.setLoadingInitial(false);
                return farmacist;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getFarmacist = (id: string) => {
        return this.farmacistRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createFarmacist = async (farmacist: Farmacist) => {
        this.loading = true;
        try {
            await agent.Farmacists.create(farmacist);
            runInAction(() => {
                this.farmacistRegistry.set(farmacist.id, farmacist);
                this.selectedFarmacist = farmacist;
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

    updateFarmacist = async (farmacist: Farmacist) => {
        this.loading = true;
        try {
            await agent.Farmacists.update(farmacist);
            runInAction(() => {
                this.farmacistRegistry.set(farmacist.id, farmacist);
                this.selectedFarmacist = farmacist;
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

    deleteFarmacist = async (id: string) => {
        this.loading = true;
        try {
            await agent.Farmacists.delete(id);
            runInAction(() => {
                this.farmacistRegistry.delete(id);
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

// function b(a: any, b: any) {
//     throw new Error("Function not implemented.");
// }
// function a(a: any, b: (a: any, b: any) => void) {
//     throw new Error("Function not implemented.");
// }

