import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import CityFilters from './CityFilters';
import CityList from './CityList';

export default observer(function CityDashboard() {

    const {cityStore} = useStore();
    const {loadCities, cityRegistry} = cityStore;

    useEffect(() => {
        if (cityRegistry.size <= 1) loadCities();
    }, [cityRegistry.size, loadCities])

    if (cityStore.loadingInitial) return <LoadingComponent content='Loading app' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <CityList />
            </Grid.Column>
            <Grid.Column width='5'>
              <CityFilters/>
            </Grid.Column>

        </Grid>
    )
}) 