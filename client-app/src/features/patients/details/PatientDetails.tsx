import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import PatientDetailedChat from './PatientDetailedChat';
import PatientDetailedHeader from './PatientDetailedHeader';
import PatientDetailedInfo from './PatientDetailedInfo';
import PatientDetailedSidebar from './PatientDetailedSidebar';



export default observer( function PatientDetails(){
   const{patientStore} = useStore();
   const {selectedPatient: patient,loadPatient, loadingInitial} = patientStore;
   const {id} = useParams<{id:string}>();

   useEffect(() => {
     if (id) loadPatient(id);
   }, [id, loadPatient]);

   if(loadingInitial || !patient) return <LoadingComponent />;

    return(
          <Grid>
            <Grid.Column width={10}>
              <PatientDetailedHeader patient={patient} />
              <PatientDetailedInfo patient={patient} />
              <PatientDetailedChat />
            </Grid.Column>
            <Grid.Column width={6} >
              <PatientDetailedSidebar />
            </Grid.Column>
          </Grid>
    )
})