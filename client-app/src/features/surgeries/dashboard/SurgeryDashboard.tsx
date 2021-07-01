import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import SurgeryFilters from './SurgeryFilters';
import SurgeryList from './SurgeryList';

export default observer(function SurgeryDashboard() {

    const {surgeryStore} = useStore();
    const {loadSurgeries, surgeryRegistry} = surgeryStore;

    useEffect(() => {
        if (surgeryRegistry.size <= 1) loadSurgeries();
    }, [surgeryRegistry.size, loadSurgeries])

    if (surgeryStore.loadingInitial) return <LoadingComponent content='Loading app' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <SurgeryList />
            </Grid.Column>
            <Grid.Column width='5'>
              <SurgeryFilters/>
            </Grid.Column>
          
        </Grid>
    )
})