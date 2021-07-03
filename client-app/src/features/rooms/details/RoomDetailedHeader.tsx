import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import { Room } from '../../../app/models/room';

const roomImageStyle = {
    filter: 'brightness(30%)'
};

const roomImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    room: Room
}

export default observer (function RoomDetailedHeader({room: Room}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/user.png`} fluid style={roomImageStyle}/>
                <Segment style={roomImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={Room.type}
                                    style={{color: 'white'}}
                                />
                                <p>
                                    Hosted by <strong>HMS</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Room</Button>
                <Button as={Link} to='/rooms' color='orange' floated='right'>
                    Cancel
                </Button>
                <Button as={Link} to={`/manageroom/${Room.id}`} color='orange' floated='right'>
                    Manage Room
                </Button>
            </Segment>
        </Segment.Group>
    )
})