import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import DepartmentList from './DepartmentList';

export default observer( function DepartmentDashboard() {

    const {departmentStore} = useStore();
    const {loadDepartments, departmentRegistry} = departmentStore;

    useEffect(() => {
        if (departmentRegistry.size <= 1) loadDepartments();
    }, [departmentRegistry.size, loadDepartments])

    if (departmentStore.loadingInitial) return <LoadingComponent content='Loading app' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <DepartmentList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Department filters</h2>
            </Grid.Column>
        </Grid>
    )
})