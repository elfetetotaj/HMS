import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { TechEmployee } from "../models/techEmployee";

export default class TechEmployeeStore {
    techEmployeeRegistry = new Map<string, TechEmployee>();
    selectedTechEmployee: TechEmployee | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get techEmployeesByDate() {
        return Array.from(this.techEmployeeRegistry.values()).sort((a,b)=>
            a.datelindja!.getDay()-b.datelindja!.getDay());
        
    }

    loadTechEmployees = async () => {
        this.loadingInitial = true;
        try {
            const TechEmployees = await agent.TechEmployees.list();
                TechEmployees.forEach(TechEmployee => {
                    this.setTechEmployee(TechEmployee);
                })
                this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    private setTechEmployee = (techEmployee: TechEmployee) => {
        techEmployee.datelindja = new Date(techEmployee.datelindja!);
        this.techEmployeeRegistry.set(techEmployee.id, techEmployee);
    }

    loadTechEmployee = async (id: string) => {
        let techEmployee = this.getTechEmployee(id);
        if (techEmployee) {
            this.selectedTechEmployee = techEmployee;
            return techEmployee;
        } else {
            this.loadingInitial = true;
            try {
                techEmployee = await agent.TechEmployees.details(id);
                this.setTechEmployee(techEmployee);
                runInAction(() => {
                    this.selectedTechEmployee = techEmployee;
                })
                this.setLoadingInitial(false);
                return techEmployee;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getTechEmployee = (id: string) => {
        return this.techEmployeeRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createTechEmployee = async (TechEmployee: TechEmployee) => {
        this.loading = true;
        try {
            await agent.TechEmployees.create(TechEmployee);
            runInAction(() => {
                this.techEmployeeRegistry.set(TechEmployee.id, TechEmployee);
                this.selectedTechEmployee = TechEmployee;
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

    updateTechEmployee = async (TechEmployee: TechEmployee) => {
        this.loading = true;
        try {
            await agent.TechEmployees.update(TechEmployee);
            runInAction(() => {
                this.techEmployeeRegistry.set(TechEmployee.id, TechEmployee);
                this.selectedTechEmployee = TechEmployee;
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

    deleteTechEmployee = async (id: string) => {
        this.loading = true;
        try {
            await agent.TechEmployees.delete(id);
            runInAction(() => {
                this.techEmployeeRegistry.delete(id);
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

