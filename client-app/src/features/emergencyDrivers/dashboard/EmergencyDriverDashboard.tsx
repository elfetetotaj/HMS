import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import EmergencyDriverFilters from './EmergencyDriverFilters';
import EmergencyDriverList from './EmergencyDriverList';

export default observer(function EmergencyDriverDashboard() {

    const {emergencyDriverStore} = useStore();
    const {loadEmergencyDrivers, emergencyDriverRegistry} = emergencyDriverStore;

    useEffect(() => {
        if (emergencyDriverRegistry.size <= 1) loadEmergencyDrivers();
    }, [emergencyDriverRegistry.size, loadEmergencyDrivers])

    if (emergencyDriverStore.loadingInitial) return <LoadingComponent content='Loading appointments...' />

    return (
        <Grid>
            <Grid.Row columns={2}>
                <Grid.Column>
                    <h2>EmergencyDrivers</h2>
                </Grid.Column>
                <Grid.Column>
                    <Button
                        as={Link}
                        to={`/createEmergencyDriver`}
                        color='blue'
                        floated='right'
                        content='Add'
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Column width='10'>
                <EmergencyDriverList />
            </Grid.Column>
            <Grid.Column width='6'>
                <EmergencyDriverFilters />
            </Grid.Column>
        </Grid>
    )
})