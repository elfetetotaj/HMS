import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

import TechEmployeeList from './TechEmployeeList';

export default observer(function TechEmployeeDashboard() {

    const {techEmployeeStore} = useStore();
    const {loadTechEmployees, techEmployeeRegistry} = techEmployeeStore;

    useEffect(() => {
        if (techEmployeeRegistry.size <= 1) loadTechEmployees();
    }, [techEmployeeRegistry.size, loadTechEmployees])

    if (techEmployeeStore.loadingInitial) return <LoadingComponent content='Loading app' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <TechEmployeeList />
            </Grid.Column>
        
          
        </Grid>
    )
})