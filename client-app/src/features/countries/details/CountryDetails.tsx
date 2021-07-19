import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import CountryDetailedHeader from './CountryDetailedHeader';
import CountryDetailedInfo from './CountryDetailedInfo';
import CountryDetailedSidebar from './CountryDetailedSidebar';

export default observer(function CountryDetails() {
    const {countryStore} = useStore();
    const {selectedCountry: country, loadCountry, loadingInitial, clearSelectedCountry} = countryStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadCountry(id);
        return () => clearSelectedCountry();
    }, [id, loadCountry, clearSelectedCountry]);

    if (loadingInitial || !country) return <LoadingComponent />;

    return (
        <Grid>
            <Grid.Column width={16}>
                <CountryDetailedHeader country={country} />
                <CountryDetailedInfo country={country} />
                {/* <DepartmentDetailedChat departmentId={department.id}/> */}
            </Grid.Column>
            <Grid.Column width={6}>
                {/* <CountryDetailedSidebar/> */}
            </Grid.Column>
        </Grid>
    )
})