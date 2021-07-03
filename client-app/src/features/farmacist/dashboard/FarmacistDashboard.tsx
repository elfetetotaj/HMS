import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import FarmacistFilters from './FarmacistFilters';
import FarmacistList from './FarmacistList';

export default observer(function FarmacistDashboard() {

    const {farmacistStore} = useStore();
    const {loadFarmacists, farmacistRegistry} = farmacistStore;

    useEffect(() => {
        if (farmacistRegistry.size <= 1) loadFarmacists();
    }, [farmacistRegistry.size, loadFarmacists])

    if (farmacistStore.loadingInitial) return <LoadingComponent content='Loading app' />

    return (
        <Grid>
    
            
            <Grid.Column width='10'>
                <FarmacistList />
            </Grid.Column>
            <Grid.Column width='5'>
              <FarmacistFilters/>
              <Button
          as={Link}
          to={`/createFarmacist`}
          color='blue'
           floated='right'
          content='Add'
        />
            </Grid.Column>
          
        </Grid>
    )
})