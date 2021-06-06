import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import DepartmentDetails from '../details/DepartmentDetails';
import DepartmentForm from '../form/DepartmentForm';
import DepartmentList from './DepartmentList';

export default observer( function DepartmentDashboard() {

    const {departmentStore} = useStore();
    const {selectedDepartment, editMode} = departmentStore;
    return (
        <Grid>
            <Grid.Column width='10'>
                <DepartmentList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedDepartment && !editMode &&
                <DepartmentDetails />}
                {editMode &&
                <DepartmentForm />}
            </Grid.Column>
        </Grid>
    )
})