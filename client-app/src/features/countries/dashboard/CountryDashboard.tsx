import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import CountryFilters from './CountryFilters';
import CountryList from './CountryList';

export default observer(function CountryDashboard() {

    const {countryStore} = useStore();
    const {loadCountries, countryRegistry} = countryStore;

    useEffect(() => {
        if (countryRegistry.size <= 1) loadCountries();
    }, [countryRegistry.size, loadCountries])

    if (countryStore.loadingInitial) return <LoadingComponent content='Loading countries...' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <CountryList />
            </Grid.Column>
            <Grid.Column width='6'>
                <CountryFilters />
            </Grid.Column>
        </Grid>
    )
})