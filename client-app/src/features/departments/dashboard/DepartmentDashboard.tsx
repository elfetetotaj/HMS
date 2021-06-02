import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Department } from '../../../app/models/department';
import DepartmentDetails from '../details/DepartmentDetails';
import DepartmentForm from '../form/DepartmentForm';
import DepartmentList from './DepartmentList';

interface Props {
    departments: Department[];
    selectedDepartment: Department | undefined;
    selectDepartment: (id: string) => void;
    cancelSelectDepartment: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (department: Department) => void;
    deleteDepartment: (id: string) => void;
}

export default function DepartmentDashboard({departments, selectedDepartment, selectDepartment, cancelSelectDepartment, editMode, openForm, closeForm, createOrEdit, deleteDepartment}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <DepartmentList 
                    departments={departments} 
                    selectDepartment={selectDepartment} 
                    deleteDepartment={deleteDepartment}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedDepartment && !editMode &&
                <DepartmentDetails 
                    department={selectedDepartment} 
                    cancelSelectDepartment={cancelSelectDepartment} 
                    openForm={openForm}
                />}
                {editMode &&
                <DepartmentForm closeForm={closeForm} department={selectedDepartment} createOrEdit={createOrEdit} />}
            </Grid.Column>
        </Grid>
    )
}