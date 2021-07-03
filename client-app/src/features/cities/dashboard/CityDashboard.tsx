import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import CityFilters from './CityFilters';
import CityList from './CityList';

export default observer(function CityDashboard() {

    const { cityStore } = useStore();
    const { loadCities, cityRegistry } = cityStore;

    useEffect(() => {
        if (cityRegistry.size <= 1) loadCities();
    }, [cityRegistry.size, loadCities])

    if (cityStore.loadingInitial) return <LoadingComponent content='Loading cities...' />

    return (
        <Grid>
            <Grid.Row columns={2}>
                <Grid.Column>
                    <h2>Cities</h2>
                </Grid.Column>
                <Grid.Column>
                    <Button
                        as={Link}
                        to={`/createCity`}
                        color='blue'
                        floated='right'
                        content='Add'
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Column width='10'>
                <CityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <CityFilters />
            </Grid.Column>

        </Grid>
    )
})