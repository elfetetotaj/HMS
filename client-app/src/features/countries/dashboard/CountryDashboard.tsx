import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from 'semantic-ui-react';
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

    if (countryStore.loadingInitial) return <LoadingComponent content='Loading appointments...' />

    return (
        <Grid>
            <Grid.Row columns={2}>
                <Grid.Column>
                    <h2>Countries</h2>
                </Grid.Column>
                <Grid.Column>
                    <Button
                        as={Link}
                        to={`/createCountry`}
                        color='blue'
                        floated='right'
                        content='Add'
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Column width='10'>
                <CountryList />
            </Grid.Column>
            <Grid.Column width='6'>
                <CountryFilters />
            </Grid.Column>
        </Grid>
    )
})