import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EmergencyDriverList from './EmergencyDriverList';
import EmergencyDriverFilters from './EmergencyDriverFilters';

export default observer(function EmergencyDriverDashboard(){
    
    const {emergencyDriverStore} =useStore();     
    const {loadEmergencyDrivers, emergencyDriverRegistry} = emergencyDriverStore;  

        useEffect(() => {
         if (emergencyDriverRegistry.size <= 1) loadEmergencyDrivers();
            }, [emergencyDriverRegistry.size, loadEmergencyDrivers])

    if(emergencyDriverStore.loadingInitial) return <LoadingComponent content ='Loading app'/>
    return (
        <Grid>
            <Grid.Column width ='10'>
              <EmergencyDriverList />
            </Grid.Column>
            <Grid.Column width="6">
                <EmergencyDriverFilters />
            </Grid.Column>
        </Grid>
    )
})