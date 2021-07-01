import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import CountryDetailedChat from './CountryDetailedChat';
import CountryDetailedHeader from './CountryDetailedHeader';
import CountryDetailedInfo from './CountryDetailedInfo';
import CountryDetailedSidebar from './CountryDetailedSidebar';

export default observer(function CountryDetails() {
    const {countryStore} = useStore();
    const {selectedCountry: country, loadCountry, loadingInitial} = countryStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadCountry(id);
    }, [id, loadCountry]);

    if (loadingInitial || !country) return <LoadingComponent />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <CountryDetailedHeader country={country} />
                <CountryDetailedInfo country={country} />
                <CountryDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <CountryDetailedSidebar/>
            </Grid.Column>
        </Grid>
    )
})