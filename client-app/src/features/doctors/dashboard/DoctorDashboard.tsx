import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import DoctorList from './DoctorList';
import DoctorFilters from './DoctorFilters';

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
            </Grid.Column>
        </Grid>
    )
})