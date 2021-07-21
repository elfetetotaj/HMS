import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import CityDetailedHeader from './CityDetailedHeader';
import CityDetailedInfo from './CityDetailedInfo';
import CityDetailedSidebar from './CityDetailedSidebar';

export default observer(function CityDetails() {
    const {cityStore} = useStore();
    const {selectedCity: city, loadCity, loadingInitial, clearSelectedCity} = cityStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadCity(id);
        return () => clearSelectedCity();
    }, [id, loadCity, clearSelectedCity]);

    if (loadingInitial || !city) return <LoadingComponent />;

    return (
        <Grid>
            <Grid.Column width={16}>
                <CityDetailedHeader city={city} />
                <CityDetailedInfo city={city} />
                {/* <DepartmentDetailedChat departmentId={department.id}/> */}
            </Grid.Column>
            <Grid.Column width={6}>
                {/* <CityDetailedSidebar/> */}
            </Grid.Column>
        </Grid>
    )
})