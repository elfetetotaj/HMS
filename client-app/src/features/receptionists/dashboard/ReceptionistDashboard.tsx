import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ReceptionistFilters from './ReceptionistFilters';
import ReceptionistList from './ReceptionistList';

export default observer(function ReceptionistDashboard() {
    
    const {receptionistStore} = useStore();
    const {loadReceptionists, receptionistRegistry} = receptionistStore;


    useEffect(() => {
      if(receptionistRegistry.size <= 1) loadReceptionists();
    }, [receptionistRegistry.size, loadReceptionists])
  
    
    if (receptionistStore.loadingInitial) return <LoadingComponent content='Loading app' />


    return (
        <Grid>
            <Grid.Column width='10'>
                <ReceptionistList/>
            </Grid.Column>
            <Grid.Column width='6'>
              <ReceptionistFilters/>
            </Grid.Column>
        </Grid>
    )
}) 