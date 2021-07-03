import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import Add from './Add';

import BloodTypeList from './BloodTypeList';

export default observer(function BloodTypeDashboard() {

    const {bloodTypeStore} = useStore();
    const {loadBloodTypes, bloodTypeRegistry} = bloodTypeStore;

    useEffect(() => {
        if (bloodTypeRegistry.size <= 1) loadBloodTypes();
    }, [bloodTypeRegistry.size, loadBloodTypes])

    if (bloodTypeStore.loadingInitial) return <LoadingComponent content='Loading app' />

    return (
       
        
        <Grid >
            
            <Grid.Column width='5'>
                <BloodTypeList />
            </Grid.Column>
            <Grid.Column width='5'>
              <Add/>
            </Grid.Column>
            

        
          
        </Grid>
    )
})