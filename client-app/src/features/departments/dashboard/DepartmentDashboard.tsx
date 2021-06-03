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
    editModeDepartment: boolean;
    openFormDepartment: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (department: Department) => void;
    deleteDepartment: (id: string) => void;
    submitting: boolean;
}

export default function DepartmentDashboard({departments, selectedDepartment, selectDepartment, 
    cancelSelectDepartment, editModeDepartment, openFormDepartment, closeForm, createOrEdit, 
    deleteDepartment, submitting}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <DepartmentList 
                    departments={departments} 
                    selectDepartment={selectDepartment} 
                    deleteDepartment={deleteDepartment}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedDepartment && !editModeDepartment &&
                <DepartmentDetails 
                    department={selectedDepartment} 
                    cancelSelectDepartment={cancelSelectDepartment} 
                    openFormDepartment={openFormDepartment}
                />}
                {editModeDepartment &&
                <DepartmentForm 
                    closeForm={closeForm} 
                    department={selectedDepartment} 
                    createOrEdit={createOrEdit}
                    submitting={submitting} 
                />}
            </Grid.Column>
        </Grid>
    )
}