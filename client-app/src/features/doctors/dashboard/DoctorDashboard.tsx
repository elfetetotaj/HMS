import React, { useEffect } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import DoctorList from './DoctorList';
import DoctorFilters from './DoctorFilters';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';

export default observer(function DoctorDashboard(){
    
    const {doctorStore} =useStore();     
    const {loadDoctors, doctorRegistry} = doctorStore;  

        useEffect(() => {
         if (doctorRegistry.size <= 1) loadDoctors();
            }, [doctorRegistry.size, loadDoctors])

    if(doctorStore.loadingInitial) return <LoadingComponent content ='Loading app'/>
    return (
        <Grid>
            <Grid.Column width ='10'>
              <DoctorList />
            </Grid.Column>
            <Grid.Column width="6">
                <DoctorFilters />
                <Button
          as={Link}
          to={`/createDoctor`}
          color='blue'
           floated='right'
          content='Add'
        />
        <br /><br /><br />
          <Calendar />
            </Grid.Column>
        </Grid>
    )
})