import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import DepartmentFilters from './DepartmentFilters';
import DepartmentList from './DepartmentList';

export default observer(function DepartmentDashboard() {

    const {departmentStore} = useStore();
    const {loadDepartments, departmentRegistry} = departmentStore;

    useEffect(() => {
        if (departmentRegistry.size <= 1) loadDepartments();
    }, [departmentRegistry.size, loadDepartments])

    if (departmentStore.loadingInitial) return <LoadingComponent content='Loading departments...' />

    return (
        <Grid>
            <Grid.Column width='16'>
                <DepartmentList />
            </Grid.Column>
            {/* <Grid.Column width='6'>
                <DepartmentFilters />
            </Grid.Column> */}
        </Grid>
    )
})