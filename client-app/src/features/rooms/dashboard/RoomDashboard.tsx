import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import RoomList from './RoomList';
import RoomFilters from './RoomFilters';

export default observer(function RoomDashboard(){
    const {roomStore} =useStore();     
    const {loadRooms, roomRegistry} = roomStore;  

        useEffect(() => {
         if (roomRegistry.size <= 1) loadRooms();
            }, [roomRegistry.size, loadRooms])

    if(roomStore.loadingInitial) return <LoadingComponent content ='Loading rooms...'/>
    return (
        <Grid>
            <Grid.Column width ='10'>
              <RoomList />
            </Grid.Column>
            <Grid.Column width="6">
                <RoomFilters />
            </Grid.Column>
        </Grid>
    )
})