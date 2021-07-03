import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import RoomDetailedHeader from './RoomDetailedHeader';
import RoomDetailedInfo from './RoomDetailedInfo';
import RoomDetailedSidebar from './RoomDetailedSidebar';



export default observer( function RoomDetails(){
   const{roomStore} = useStore();
   const {selectedRoom: room,loadRoom, loadingInitial} = roomStore;
   const {id} = useParams<{id:string}>();

   useEffect(() => {
     if (id) loadRoom(id);
   }, [id, loadRoom]);

   if(loadingInitial || !room) return <LoadingComponent />;

    return(
          <Grid>
            <Grid.Column width={10}>
              <RoomDetailedHeader room={room} />
              <RoomDetailedInfo room={room} />
            </Grid.Column>
            <Grid.Column width={6} >
              <RoomDetailedSidebar />
            </Grid.Column>
          </Grid>
    )
})