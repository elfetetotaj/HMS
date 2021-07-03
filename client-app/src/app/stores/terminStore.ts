import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Termin } from "../models/termin";
import { Profile } from "../models/profile";
import { store } from "./store";

export default class TerminStore {
    terminRegistry = new Map<string, Termin>();
    selectedTermin: Termin | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get terminsByDate() {
        return Array.from(this.terminRegistry.values()).sort((a, b) =>
            a.terminTime!.getTime() - b.terminTime!.getTime());
    }

    loadTermins = async () => {
        this.loadingInitial = true;
        try {
            const termins = await agent.Termins.list();
            termins.forEach(termin => {
                    this.setTermin(termin);
                })
                this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadTermin = async (id: string) => {
        let termin = this.getTermin(id);
        if (termin) {
            this.selectedTermin = termin;
            return termin;
        } else {
            this.loadingInitial = true;
            try {
                termin = await agent.Termins.details(id);
                this.setTermin(termin);
                runInAction(() => {
                    this.selectedTermin = termin;
                })
                this.setLoadingInitial(false);
                return termin;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
        
    private setTermin = (termin: Termin) => {
        termin.terminTime = new Date(termin.terminTime!);
        this.terminRegistry.set(termin.id, termin);
    }

    private getTermin = (id: string) => {
        return this.terminRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createTermin = async (termin: Termin) => {
        this.loading = true;
        try {
            await agent.Termins.create(termin);
            runInAction(() => {
                this.terminRegistry.set(termin.id, termin);
                this.selectedTermin = termin;
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

    updateTermin = async (termin: Termin) => {
        try {
            await agent.Termins.update(termin);
            runInAction(() => {
                if (termin.id) {
                    let updatedTermin = {...this.getTermin(termin.id), ...termin}
                    this.terminRegistry.set(termin.id, updatedTermin as Termin);
                    this.selectedTermin = updatedTermin as Termin;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteTermin = async (id: string) => {
        this.loading = true;
        try {
            await agent.Termins.delete(id);
            runInAction(() => {
                this.terminRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    // updateAttendance = async () => {
    //     const user = store.userStore.user;
    //     this.loading = true;
    //     try {
    //         await agent.Departments.attend(this.selectedDepartment!.id);
    //         runInAction(() => {
    //             if (this.selectedDepartment?.isDoctor) {
    //                 this.selectedDepartment.departmentAttendees = 
    //                     this.selectedDepartment.departmentAttendees?.filter(a => a.username !== user?.username);
    //                 this.selectedDepartment.isDoctor = false;
    //             } else {
    //                 const departmentAttendee = new Profile(user!);
    //                 this.selectedDepartment?.departmentAttendees?.push(departmentAttendee);
    //                 this.selectedDepartment!.isDoctor = true;
    //             }
    //             this.departmentRegistry.set(this.selectedDepartment!.id, this.selectedDepartment!)
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         runInAction(() => this.loading = false);
    //     }
    // }

    clearSelectedTermin = () => {
        this.selectedTermin = undefined;
    }

    // Use this method at Termin crud Video 15.7
    // cancelDepartmentToggle = async () => {
    //     this.loading = true;
    //     try {
    //         await agent.Departments.attend(this.selectedDepartment!.id);
    //         runInAction(() => {
    //             this.selectedDepartment!.isCancelled = !this.selectedDepartment?.isCancelled;
    //             this.departmentRegistry.set(this.selectedDepartment!.id, this.selectedDepartment!);
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         runInAction(() => this.loading = false);
    //     }
    // }
}