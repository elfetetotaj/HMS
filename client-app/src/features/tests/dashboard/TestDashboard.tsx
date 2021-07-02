import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import Add from './Add';
import TestList from './TestList';


export default observer(function TestDashboard() {

    const {testStore} = useStore();
    const {loadTests, testRegistry} = testStore;

    useEffect(() => {
        if (testRegistry.size <= 1) loadTests();
    }, [testRegistry.size, loadTests])

    if (testStore.loadingInitial) return <LoadingComponent content='Loading app' />

    return (
        
        <Grid>
            <Grid.Column width='13' >
                <TestList />
            </Grid.Column>
            <Add />
        
          
        </Grid>
        
    )
})