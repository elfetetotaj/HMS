import { observer } from 'mobx-react-lite';
import React from 'react';
import { Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import RoomListItem from './RoomListItem';

export default observer( function RoomList(){
    const {roomStore} = useStore();
    const{roomsByDate} = roomStore;

    return (
           <Segment>
            <Item.Group divided>
            {roomsByDate.map(room =>(
                    <RoomListItem key={room.id} room={room} />
                ))}

            </Item.Group>
        </Segment>

    )
})