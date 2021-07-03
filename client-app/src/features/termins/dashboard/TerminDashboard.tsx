import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import TerminFilters from './TerminFilters';
import TerminList from './TerminList';

export default observer(function TerminDashboard() {

    const {terminStore} = useStore();
    const {loadTermins, terminRegistry} = terminStore;

    useEffect(() => {
        if (terminRegistry.size <= 1) loadTermins();
    }, [terminRegistry.size, loadTermins])

    if (terminStore.loadingInitial) return <LoadingComponent content='Loading appointments...' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <TerminList />
            </Grid.Column>
            <Grid.Column width='6'>
                <TerminFilters />
            </Grid.Column>
        </Grid>
    )
})