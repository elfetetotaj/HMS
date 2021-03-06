import React, { useEffect } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import PatientList from './PatientList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import PatientFilters from './PatientFilters';
import { Link } from 'react-router-dom';

export default observer(function PatientDashboard(){
    const {patientStore} =useStore();     
    const {loadPatients, patientRegistry} = patientStore;  

        useEffect(() => {
         if (patientRegistry.size <= 1) loadPatients();
            }, [patientRegistry.size, loadPatients])

    if(patientStore.loadingInitial) return <LoadingComponent content ='Loading patients...'/>
    return (
        <Grid>
            <Grid.Column width ='10'>
              <PatientList />
            </Grid.Column>
            <Grid.Column width="6">
                <PatientFilters />
                <Button
          as={Link}
          to={`/createPatient`}
          color='blue'
           floated='right'
          content='Add'
        />
            </Grid.Column>
        </Grid>
    )
})