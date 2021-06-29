import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import DoctorDetailedHeader from './DoctorDetailedHeader';
import DoctorDetailedInfo from './DoctorDetailedInfo';
import DoctorDetailedSidebar from './DoctorDetailedSidebar';



export default observer( function DoctorDetails(){
   const{doctorStore} = useStore();
   const {selectedDoctor: doctor,loadDoctor, loadingInitial} = doctorStore;
   const {id} = useParams<{id:string}>();

   useEffect(() => {
     if (id) loadDoctor(id);
   }, [id, loadDoctor]);

   if(loadingInitial || !doctor) return <LoadingComponent />;

    return(
          <Grid>
            <Grid.Column width={10}>
              <DoctorDetailedHeader doctor={doctor} />
              <DoctorDetailedInfo doctor={doctor} />
            </Grid.Column>
            <Grid.Column width={6} >
              <DoctorDetailedSidebar />
            </Grid.Column>
          </Grid>
    )
})