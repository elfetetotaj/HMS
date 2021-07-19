import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Medicine } from "../models/medicine";
import { Profile } from "../models/profile";
import { store } from "./store";

export default class MedicineStore {
    medicineRegistry = new Map<string, Medicine>();
    selectedMedicine: Medicine | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get medicinesByName() {
        return Array.from(this.medicineRegistry.values()).sort((a, b) => a.medicineName > b.medicineName ? 1:-1);
    }

    loadMedicines = async () => {
        this.loadingInitial = true;
        try {
            const medicines = await agent.Medicines.list();
            medicines.forEach(medicine => {
                    this.setMedicine(medicine);
                })
                this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadMedicine = async (id: string) => {
        let medicine = this.getMedicine(id);
        if (medicine) {
            this.selectedMedicine = medicine;
            return medicine;
        } else {
            this.loadingInitial = true;
            try {
                medicine = await agent.Medicines.details(id);
                this.setMedicine(medicine);
                runInAction(() => {
                    this.selectedMedicine = medicine;
                })
                this.setLoadingInitial(false);
                return medicine;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
        
    private setMedicine = (medicine: Medicine) => {
        this.medicineRegistry.set(medicine.id, medicine);
    }

    private getMedicine = (id: string) => {
        return this.medicineRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createMedicine = async (medicine: Medicine) => {
        this.loading = true;
        try {
            await agent.Medicines.create(medicine);
            runInAction(() => {
                this.medicineRegistry.set(medicine.id, medicine);
                this.selectedMedicine = medicine;
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

    updateMedicine = async (medicine: Medicine) => {
        try {
            await agent.Medicines.update(medicine);
            runInAction(() => {
                if (medicine.id) {
                    let updatedMedicine = {...this.getMedicine(medicine.id), ...medicine}
                    this.medicineRegistry.set(medicine.id, updatedMedicine as Medicine);
                    this.selectedMedicine = updatedMedicine as Medicine;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteMedicine = async (id: string) => {
        this.loading = true;
        try {
            await agent.Medicines.delete(id);
            runInAction(() => {
                this.medicineRegistry.delete(id);
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

    clearSelectedMedicine = () => {
        this.selectedMedicine = undefined;
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