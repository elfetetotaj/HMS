import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import TherapyFilters from './TherapyFilters';
import TherapyList from './TherapyList';

export default observer(function TherapyDashboard() {

    const {therapyStore} = useStore();
    const {loadTherapies, therapyRegistry} = therapyStore;

    useEffect(() => {
        if (therapyRegistry.size <= 1) loadTherapies();
    }, [therapyRegistry.size, loadTherapies])

    if (therapyStore.loadingInitial) return <LoadingComponent content='Loading therapies...' />

    return (
        <Grid>
            <Grid.Row columns={2}>
                <Grid.Column>
                    <h2>Therapies</h2>
                </Grid.Column>
                <Grid.Column>
                    <Button
                        as={Link}
                        to={`/createTherapy`}
                        color='blue'
                        floated='right'
                        content='Add'
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Column width='10'>
                <TherapyList />
            </Grid.Column>
            <Grid.Column width='6'>
                <TherapyFilters />
            </Grid.Column>
        </Grid>
    )
})