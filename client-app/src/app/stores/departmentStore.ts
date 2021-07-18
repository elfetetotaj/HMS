import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Department, DepartmentFormValues } from "../models/department";
import { Profile } from "../models/profile";
import { store } from "./store";

export default class DepartmentStore {
    departmentRegistry = new Map<string, Department>();
    selectedDepartment: Department | undefined = undefined;
    selectedRegistry= this.departmentRegistry;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get departmentsByName() {
        return Array.from(this.departmentRegistry.values()).sort((a, b) => a.departmentName > b.departmentName ? 1:-1);
    }

    loadDepartments = async () => {
        this.loadingInitial = true;
        try {
            const departments = await agent.Departments.list();
                departments.forEach(department => {
                    this.setDepartment(department);
                })
                this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadDepartment = async (id: string) => {
        let department = this.getDepartment(id);
        if (department) {
            this.selectedDepartment = department;
            return department;
        } else {
            this.loadingInitial = true;
            try {
                department = await agent.Departments.details(id);
                this.setDepartment(department);
                runInAction(() => {
                    this.selectedDepartment = department;
                })
                this.setLoadingInitial(false);
                return department;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
        
    private setDepartment = (department: Department) => {
        const user = store.userStore.user;
        if (user) {
            department.isDoctor = department.departmentAttendees!.some(
                a => a.username === user.username
            )
            department.isHost = department.hostUsername === user.username;
            department.host = department.departmentAttendees?.find(x => x.username === department.hostUsername);
        }
        // department.date = new Date(department.date!);
        this.departmentRegistry.set(department.id, department);
    }

    private getDepartment = (id: string) => {
        return this.departmentRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createDepartment = async (department: DepartmentFormValues) => {
        const user = store.userStore.user;
        const departmentAttendee = new Profile(user!);
        try {
            await agent.Departments.create(department);
            const newDepartment = new Department(department);
            newDepartment.hostUsername = user!.username;
            newDepartment.departmentAttendees = [departmentAttendee];
            this.setDepartment(newDepartment);
            runInAction(() => {
                this.selectedDepartment = newDepartment;
            })
        } catch (error) {
            console.log(error);
        }
    }

    updateDepartment = async (department: DepartmentFormValues) => {
        try {
            await agent.Departments.update(department);
            runInAction(() => {
                if (department.id) {
                    let updatedDepartment = {...this.getDepartment(department.id), ...department}
                    this.departmentRegistry.set(department.id, updatedDepartment as Department);
                    this.selectedDepartment = updatedDepartment as Department;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteDepartment = async (id: string) => {
        this.loading = true;
        try {
            await agent.Departments.delete(id);
            runInAction(() => {
                this.departmentRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateAttendance = async () => {
        const user = store.userStore.user;
        this.loading = true;
        try {
            await agent.Departments.attend(this.selectedDepartment!.id);
            runInAction(() => {
                if (this.selectedDepartment?.isDoctor) {
                    this.selectedDepartment.departmentAttendees = 
                        this.selectedDepartment.departmentAttendees?.filter(a => a.username !== user?.username);
                    this.selectedDepartment.isDoctor = false;
                } else {
                    const departmentAttendee = new Profile(user!);
                    this.selectedDepartment?.departmentAttendees?.push(departmentAttendee);
                    this.selectedDepartment!.isDoctor = true;
                }
                this.departmentRegistry.set(this.selectedDepartment!.id, this.selectedDepartment!)
            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    clearSelectedDepartment = () => {
        this.selectedDepartment = undefined;
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