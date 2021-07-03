import React, { useEffect } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EmergencyDriverList from './EmergencyDriverList';
import EmergencyDriverFilters from './EmergencyDriverFilters';
import { Link } from 'react-router-dom';

export default observer(function EmergencyDriverDashboard(){
    
    const {emergencyDriverStore} =useStore();     
    const {loadEmergencyDrivers, emergencyDriverRegistry} = emergencyDriverStore;  

        useEffect(() => {
         if (emergencyDriverRegistry.size <= 1) loadEmergencyDrivers();
            }, [emergencyDriverRegistry.size, loadEmergencyDrivers])

    if(emergencyDriverStore.loadingInitial) return <LoadingComponent content ='Loading app'/>
    return (
        <Grid>
            <Grid.Row columns={2}>
                <Grid.Column>
                    <h2>Surgeries</h2>
                </Grid.Column>
                <Grid.Column>
                    <Button
                        as={Link}
                        to={`/createEmergencyDrivers`}
                        color='blue'
                        floated='right'
                        content='Add'
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Column width ='10'>
              <EmergencyDriverList />
            </Grid.Column>
            <Grid.Column width="6">
                <EmergencyDriverFilters />
            </Grid.Column>
        </Grid>
    )
})