import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import NurseFilters from './NurseFilters';
import NurseList from './NurseList';

export default observer(function NurseDashboard() {

    const {nurseStore} = useStore();
    const {loadNurses, nurseRegistry} = nurseStore;

    useEffect(() => {
        if (nurseRegistry.size <= 1) loadNurses();
    }, [nurseRegistry.size, loadNurses])

    if (nurseStore.loadingInitial) return <LoadingComponent content='Loading app' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <NurseList />
            </Grid.Column>
            <Grid.Column width='5'>
              <NurseFilters/>
            </Grid.Column>
          
        </Grid>
    )
})