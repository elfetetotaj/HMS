import { Profile } from "./profile";

export interface Department {
    id: string;
    departmentName: string;
    departmentDescription: string;
    hostUsername: string;
    isDoctor: boolean;
    isHost: boolean;
    host?: Profile;
    departmentAttendees: Profile[];
}

export class Department implements Department {
    constructor(init?: DepartmentFormValues) {
        Object.assign(this, init);
    }
}

export class DepartmentFormValues {
    id?: string = undefined;
    departmentName: string = '';
    departmentDescription: string = '';

    constructor(department?: DepartmentFormValues) {
        if (department) {
            this.id = department.id;
            this.departmentName = department.departmentName;
            this.departmentDescription = department.departmentDescription;
        }
    }
}