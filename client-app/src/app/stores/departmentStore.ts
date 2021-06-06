import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Department } from "../models/department";
import {v4 as uuid} from 'uuid';

export default class DepartmentStore {
    departmentRegistry = new Map<string, Department>();
    selectedDepartment: Department | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get departmentsByDate() {
        return Array.from(this.departmentRegistry.values())
    }

    loadDepartments = async () => {
        try {
            const departments = await agent.Departments.list();
                departments.forEach(department => {
                    // department.date = department.date.split('T')[0];
                    this.departmentRegistry.set(department.id, department);
                })
                this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectDepartment = (id: string) => {
        this.selectedDepartment = this.departmentRegistry.get(id);
    }

    cancelSelectedDepartment = () => {
        this.selectedDepartment = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectDepartment(id) : this.cancelSelectedDepartment();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createDepartment = async (department: Department) => {
        this.loading = true;
        department.id = uuid();
        try {
            await agent.Departments.create(department);
            runInAction(() => {
                this.departmentRegistry.set(department.id, department);
                this.selectedDepartment = department;
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

    updateDepartment = async (department: Department) => {
        this.loading = true;
        try {
            await agent.Departments.update(department);
            runInAction(() => {
                this.departmentRegistry.set(department.id, department);
                this.selectedDepartment = department;
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

    deleteDepartment = async (id: string) => {
        this.loading = true;
        try {
            await agent.Departments.delete(id);
            runInAction(() => {
                this.departmentRegistry.delete(id);
                if (this.selectedDepartment?.id === id) this.cancelSelectedDepartment();
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